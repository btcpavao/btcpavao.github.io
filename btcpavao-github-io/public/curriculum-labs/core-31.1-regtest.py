#!/usr/bin/env python3
"""Disposable Bitcoin Core 31.1 laboratory. Never connects to a public network.

Run: python3 core-31.1-regtest.py --bin /path/to/bitcoin-31.1/bin
Requires Python 3.10+, official Core 31.1 bitcoind and bitcoin-cli.
Creates a new temporary directory, private Regtest chains and test-only wallets.
Never uses the default Bitcoin directory. No real wallet or passphrase inputs.
"""
import argparse
import itertools
import json
import pathlib
import socket
import shutil
import shlex
import subprocess
import tempfile
import time

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--bin', required=True, type=pathlib.Path)
parser.add_argument('--report', type=pathlib.Path)
parser.add_argument('--keep-running', action='store_true', help='Keep isolated nodes running for the follow-up lessons; session.sh contains helpers and a stop command.')
args = parser.parse_args()
root = pathlib.Path(tempfile.mkdtemp(prefix='core-curriculum-regtest-'))
# Public training credentials, deliberately not suitable for any real wallet.
OLD = 'PUBLIC-REGTEST-OLD-DO-NOT-USE'
NEW = 'PUBLIC-REGTEST-NEW-DO-NOT-USE'
results = []
nodes = []
completed = False

def check(condition, label):
    if not condition:
        raise AssertionError(label)
    results.append(label)
    print('PASS:', label, flush=True)

def free_port():
    with socket.socket() as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

class Node:
    def __init__(self, name, blocks_source=None):
        self.path = root / name
        self.path.mkdir()
        extra = []
        if blocks_source:
            (self.path / "regtest").mkdir()
            shutil.copytree(blocks_source / "regtest" / "blocks", self.path / "regtest" / "blocks")
            extra = ["-reindex", "-assumevalid=0"]
        self.port = free_port()
        self.cli = [str(args.bin / 'bitcoin-cli'), '-regtest', '-datadir=' + str(self.path), '-rpcport=' + str(self.port)]
        self.process = subprocess.Popen([str(args.bin / 'bitcoind'), '-regtest', '-datadir=' + str(self.path), '-nosettings', '-listen=0', '-connect=0', '-networkactive=0', '-discover=0', '-dnsseed=0', '-fallbackfee=0.00002', '-rpcport=' + str(self.port)] + extra, stdout=open(self.path / 'process.log', 'w'), stderr=subprocess.STDOUT, start_new_session=True)
        nodes.append(self)
        for _ in range(100):
            try:
                info = self.rpc('getnetworkinfo')
                check(info['version'] == 310100, name + ': official target RPC version 310100')
                check(info['networkactive'] is False and info['connections'] == 0, name + ': no peer networking')
                check(self.rpc('getblockchaininfo')['chain'] == 'regtest', name + ': Regtest identity')
                break
            except RuntimeError:
                time.sleep(.1)
        else:
            raise RuntimeError('Isolated Regtest node did not start; inspect its temporary process.log')

    def rpc(self, method, *params, wallet=None):
        cmd = self.cli + (['-rpcwallet=' + wallet] if wallet else []) + [method]
        cmd += [p if isinstance(p, str) else json.dumps(p, separators=(',', ':')) for p in params]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode:
            raise RuntimeError(method + ': ' + result.stderr.strip())
        value = result.stdout.strip()
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            return value

    def create(self, name, private=True, blank=False, encrypted=False):
        return self.rpc('createwallet', name, not private, blank, OLD if encrypted else '')

    def stop(self):
        if self.process.poll() is None:
            self.rpc('stop')
            self.process.wait(timeout=30)

def public_desc(node, expression):
    return node.rpc('getdescriptorinfo', expression)['descriptor']

def import_desc(node, wallet, expression, *, active=False, internal=False, ranged=False):
    # getdescriptorinfo deliberately strips secrets; use its checksum with the original
    # expression to import a private descriptor inside this disposable test process.
    checksum = node.rpc('getdescriptorinfo', expression)['checksum']
    req = {'desc': expression + '#' + checksum, 'timestamp': 0, 'active': active, 'internal': internal}
    if ranged:
        req['range'] = [0, 50]
    result = node.rpc('importdescriptors', [req], wallet=wallet)
    check(all(x['success'] for x in result), wallet + ': descriptor import succeeds')
    return public_desc(node, expression)

try:
    online, offline = Node('online'), Node('offline')
    online.create('miner')
    mining_address = online.rpc('getnewaddress', '', 'bech32', wallet='miner')
    def mine(n=1):
        return online.rpc('generatetoaddress', n, mining_address)
    mine(101)
    check(online.rpc('getbalance', wallet='miner') > 0, 'Mature test coinbase funds available')

    # First-time encryption rotates the active derivation seed, retaining old keys.
    online.create('first-encryption')
    old_address = online.rpc('getnewaddress', '', 'bech32', wallet='first-encryption')
    initial = root / 'before-first-encryption.dat'
    online.rpc('backupwallet', str(initial), wallet='first-encryption')
    old_active = {d['desc'] for d in online.rpc('listdescriptors', wallet='first-encryption')['descriptors'] if d['active']}
    online.rpc('encryptwallet', OLD, wallet='first-encryption')
    new_active = {d['desc'] for d in online.rpc('listdescriptors', wallet='first-encryption')['descriptors'] if d['active']}
    new_address = online.rpc('getnewaddress', '', 'bech32', wallet='first-encryption')
    online.rpc('restorewallet', 'before-encryption-restored', str(initial))
    check(old_active.isdisjoint(new_active), 'First encryption replaces active descriptor roots')
    check(online.rpc('getaddressinfo', old_address, wallet='first-encryption')['ismine'], 'First encryption preserves ownership of earlier addresses')
    check(not online.rpc('getaddressinfo', new_address, wallet='before-encryption-restored')['ismine'], 'Pre-encryption backup does not cover new post-encryption addresses')

    # Wallet lifecycle, including the unchanged password on an old snapshot.
    online.create('lifecycle', encrypted=True)
    address = online.rpc('getnewaddress', 'recorded before backup', 'bech32', wallet='lifecycle')
    online.rpc('sendtoaddress', address, 1, wallet='miner')
    mine()
    before = root / 'before-change.dat'
    after = root / 'after-change.dat'
    online.rpc('backupwallet', str(before), wallet='lifecycle')
    online.rpc('walletpassphrasechange', OLD, NEW, wallet='lifecycle')
    online.rpc('backupwallet', str(after), wallet='lifecycle')
    online.rpc('restorewallet', 'old-restored', str(before))
    try:
        online.rpc('walletpassphrase', NEW, 10, wallet='old-restored')
        check(False, 'Old snapshot must reject the new password')
    except RuntimeError as e:
        check('incorrect' in str(e).lower(), 'Old snapshot rejects new password')
    online.rpc('walletpassphrase', OLD, 10, wallet='old-restored')
    online.rpc('walletlock', wallet='old-restored')
    check(online.rpc('getwalletinfo', wallet='old-restored')['unlocked_until'] == 0, 'Old snapshot unlocks with OLD and relocks')
    online.rpc('restorewallet', 'new-restored', str(after))
    online.rpc('walletpassphrase', NEW, 60, wallet='new-restored')
    check(online.rpc('getaddressinfo', address, wallet='new-restored')['ismine'], 'New backup recognizes the original address')
    txid = online.rpc('sendtoaddress', mining_address, .1, wallet='new-restored')
    mine()
    check(online.rpc('gettransaction', txid, wallet='new-restored')['confirmations'] > 0, 'Restored wallet signs a new confirmed test payment')
    online.rpc('walletlock', wallet='new-restored')

    # Offline single-sig signer / online watch-only coordinator.
    offline.create('single-signer', encrypted=True)
    descriptors = offline.rpc('listdescriptors', wallet='single-signer')['descriptors']
    online.create('single-watch', private=False, blank=True)
    requests = [{'desc': d['desc'], 'timestamp': 0, 'active': d['active'], 'internal': d['internal'], 'range': [0, 50]} for d in descriptors if d['active']]
    check(all(r['success'] for r in online.rpc('importdescriptors', requests, wallet='single-watch')), 'Public receive and change descriptors imported')
    check(not online.rpc('getwalletinfo', wallet='single-watch')['private_keys_enabled'], 'Coordinator cannot hold private keys')
    receive = online.rpc('getnewaddress', '', 'bech32', wallet='single-watch')
    online.rpc('sendtoaddress', receive, 1, wallet='miner')
    mine()
    funded = online.rpc('walletcreatefundedpsbt', [], [{mining_address: .2}], 0, {'fee_rate': 2}, True, wallet='single-watch')
    check(online.rpc('analyzepsbt', funded['psbt'])['next'] == 'signer', 'Unsigned single-sig PSBT needs a signer')
    offline.rpc('walletpassphrase', OLD, 60, wallet='single-signer')
    signed = offline.rpc('walletprocesspsbt', funded['psbt'], True, 'ALL', True, False, wallet='single-signer')
    offline.rpc('walletlock', wallet='single-signer')
    final = online.rpc('finalizepsbt', signed['psbt'])
    check(final['complete'], 'Offline signer produces a finalizable PSBT without any blocks')
    check(online.rpc('testmempoolaccept', [final['hex']])[0]['allowed'], 'Signed single-sig payment is valid')
    online.rpc('sendrawtransaction', final['hex'])
    mine()
    check(offline.rpc('getblockcount') == 0, 'Offline signer still has zero downloaded blocks')
    single_backup = root / 'single-signer.dat'
    offline.rpc('backupwallet', str(single_backup), wallet='single-signer')
    offline.rpc('unloadwallet', 'single-signer')
    offline.rpc('restorewallet', 'replacement-signer', str(single_backup))
    offline.rpc('walletpassphrase', OLD, 60, wallet='replacement-signer')
    replacement = offline.rpc('walletprocesspsbt', funded['psbt'], True, 'ALL', True, False, wallet='replacement-signer')
    check(online.rpc('finalizepsbt', replacement['psbt'])['complete'], 'Replacement signer can sign from an encrypted backup')
    offline.rpc('walletlock', wallet='replacement-signer')

    # Independent test HD roots; private strings remain in temporary wallets/process memory.
    keys = []
    for i in range(3):
        name = 'root-' + str(i)
        offline.create(name, encrypted=True)
        offline.rpc('walletpassphrase', OLD, 60, wallet=name)
        key = offline.rpc('gethdkeys', {'active_only': True, 'private': True}, wallet=name)[0]
        keys.append((key['xpub'] + '/0/0', key['xprv'] + '/0/0'))
        offline.rpc('walletlock', wallet=name)
    pubs = [k[0] for k in keys]

    def policy_wallets(prefix, build):
        expression = build(pubs)
        coordinator = prefix + '-watch'
        online.create(coordinator, private=False, blank=True)
        desc = import_desc(online, coordinator, expression)
        signers = []
        for i in range(3):
            name = prefix + '-signer-' + str(i)
            mixed = [keys[j][1] if i == j else keys[j][0] for j in range(3)]
            has_private = keys[i][1] in build(mixed)
            offline.create(name, private=has_private, blank=True, encrypted=has_private)
            if has_private:
                offline.rpc('walletpassphrase', OLD, 60, wallet=name)
            import_desc(offline, name, build(mixed))
            if has_private:
                offline.rpc('walletlock', wallet=name)
            signers.append(name)
        return coordinator, signers, online.rpc('deriveaddresses', desc)[0]

    def funded_policy(wallet, address, amount=.2, sequence=0xfffffffd):
        txid = online.rpc('sendtoaddress', address, round(amount + .1, 8), wallet='miner')
        mine()
        utxo = next(u for u in online.rpc('listunspent', 1, 9999999, [], True, {}, wallet=wallet) if u['txid'] == txid)
        inputs = [{'txid': txid, 'vout': utxo['vout'], 'sequence': sequence}]
        return online.rpc('walletcreatefundedpsbt', inputs, [{mining_address: amount}], 0, {'add_inputs': False, 'fee_rate': 2, 'changeAddress': address}, True, wallet=wallet)['psbt']

    def sign(psbt, wallets, sighash='ALL'):
        for wallet in wallets:
            offline.rpc('walletpassphrase', OLD, 60, wallet=wallet)
            psbt = offline.rpc('walletprocesspsbt', psbt, True, sighash, True, False, wallet=wallet)['psbt']
            offline.rpc('walletlock', wallet=wallet)
        return online.rpc('finalizepsbt', psbt)

    coordinator, signers, address = policy_wallets('multisig', lambda k: 'wsh(sortedmulti(2,' + ','.join(k) + '))')
    multisig_address = address
    for method in ['createwallet', 'getnewaddress', 'getaddressinfo', 'getwalletinfo', 'getblockchaininfo', 'combinepsbt']:
        check(bool(online.rpc('help', method)), 'installed 31.1 RPC help: ' + method)
    rpc_address = online.rpc('getnewaddress', wallet='miner')
    check(online.rpc('getaddressinfo', rpc_address, wallet='miner')['ismine'], 'basic RPC address belongs to the selected test wallet')
    # Two independently signed copies must combine into the same spend.
    separate_psbt = funded_policy(coordinator, address)
    partials = []
    for wallet in signers[:2]:
        offline.rpc('walletpassphrase', OLD, 60, wallet=wallet)
        partial = offline.rpc('walletprocesspsbt', separate_psbt, True, 'ALL', True, False, wallet=wallet)['psbt']
        offline.rpc('walletlock', wallet=wallet)
        check(not online.rpc('finalizepsbt', partial)['complete'], 'independent partial is insufficient: ' + wallet)
        partials.append(partial)
    combined = online.rpc('combinepsbt', partials)
    combined_final = online.rpc('finalizepsbt', combined)
    check(combined_final['complete'], 'combinepsbt assembles two independent signatures')
    check(online.rpc('testmempoolaccept', [combined_final['hex']])[0]['allowed'], 'combined independent signatures pass validation')
    combined_txid = online.rpc('sendrawtransaction', combined_final['hex'])
    mine()
    check(online.rpc('gettransaction', combined_txid, wallet=coordinator)['confirmations'] > 0, 'combined PSBT spend confirms')

    for pair in itertools.combinations(range(3), 2):
        psbt = funded_policy(coordinator, address)
        check(not sign(psbt, [signers[pair[0]]])['complete'], '2-of-3: one signature is insufficient for pair ' + str(pair))
        final = sign(psbt, [signers[i] for i in pair])
        check(final['complete'] and online.rpc('testmempoolaccept', [final['hex']])[0]['allowed'], '2-of-3: pair ' + str(pair) + ' can spend')
        online.rpc('sendrawtransaction', final['hex'])
        mine()

    # A Taproot key path is still single-sig, not automatically multisig.
    coordinator, signers, address = policy_wallets('taproot', lambda k: 'tr(' + k[0] + ')')
    psbt = funded_policy(coordinator, address)
    final = sign(psbt, [signers[0]], 'DEFAULT')
    check(final['complete'] and online.rpc('testmempoolaccept', [final['hex']])[0]['allowed'], 'Taproot key-path descriptor and PSBT spend work')
    online.rpc('sendrawtransaction', final['hex'])
    mine()

    # A real Miniscript policy: 2-of-3 immediately, signer C alone after 6 blocks.
    def recovery_policy(k):
        return 'wsh(or_d(multi(2,' + ','.join(k) + '),and_v(v:pk(' + k[2].rsplit('/', 1)[0] + '/1),older(6))))'
    coordinator, signers, address = policy_wallets('recovery', recovery_policy)
    immediate = funded_policy(coordinator, address)
    final = sign(immediate, signers[:2])
    check(final['complete'] and online.rpc('testmempoolaccept', [final['hex']])[0]['allowed'], 'Miniscript normal 2-of-3 branch spends immediately')
    online.rpc('sendrawtransaction', final['hex'])
    mine()
    delayed = funded_policy(coordinator, address, sequence=6)
    final = sign(delayed, [signers[2]])
    check(final['complete'], 'Miniscript recovery branch can be signed before maturity')
    early = online.rpc('testmempoolaccept', [final['hex']])[0]
    check(not early['allowed'], 'Signed recovery transaction is rejected before relative lock matures')
    mine(6)
    check(online.rpc('testmempoolaccept', [final['hex']])[0]['allowed'], 'Recovery branch is accepted after relative lock matures')
    online.rpc('sendrawtransaction', final['hex'])
    mine()
    # Recovery requires policy as well as key material.
    saved = root / 'recovery-signer.dat'
    offline.rpc('backupwallet', str(saved), wallet=signers[2])
    offline.rpc('unloadwallet', signers[2])
    offline.rpc('restorewallet', 'restored-policy-signer', str(saved))
    restored = sign(delayed, ['restored-policy-signer'])
    check(restored['complete'], 'Encrypted policy wallet backup restores descriptor and recovery signing')
    check(offline.rpc('getblockcount') == 0, 'All offline policy signing completed without blockchain synchronization')
    if args.keep_running:
        multisig_psbt = funded_policy('multisig-watch', multisig_address)
        recovery_psbt = funded_policy('recovery-watch', address, sequence=6)
        helpers = ['# Generated by your disposable Regtest lab. Review before sourcing.',
                   '# These helpers use only the explicit temporary Regtest directories below.']
        for name, node in [('online', online), ('offline', offline)]:
            helpers.append(name + '() { ' + shlex.join(node.cli) + ' "$@"; }')
        public_variables = {'LAB_DIRECTORY': str(root), 'MINE_ADDRESS': mining_address,
                            'PUB_A': pubs[0], 'PUB_B': pubs[1], 'PUB_C': pubs[2],
                            'RECOVERY_C': pubs[2].rsplit('/', 1)[0] + '/1',
                            'UNSIGNED_PSBT': multisig_psbt, 'RECOVERY_PSBT': recovery_psbt}
        helpers += [key + '=' + shlex.quote(value) for key, value in public_variables.items()]
        helpers += ['# Stop only these two disposable nodes when finished:', '# online stop', '# offline stop']
        (root / 'session.sh').write_text('\n'.join(helpers) + '\n')
        print('Follow-up shell: review, then source', root / 'session.sh')
    else:
        # Reuse only block files from our own cleanly stopped test node, not its chainstate.
        expected_height = online.rpc('getblockcount')
        expected_hash = online.rpc('getbestblockhash')
        online.stop()
        migrated = Node('reindexed', blocks_source=online.path)
        for _ in range(300):
            info = migrated.rpc('getblockchaininfo')
            if info['blocks'] == expected_height and info['bestblockhash'] == expected_hash:
                break
            time.sleep(.1)
        check(info['blocks'] == expected_height and info['bestblockhash'] == expected_hash, 'Copied blocks rebuild the same chain with reindex and assumevalid=0')
        check(migrated.rpc('listwallets') == [], 'Block migration does not copy any wallets')
        check(migrated.rpc('getnetworkinfo')['connections'] == 0, 'Block migration finishes without network downloads')
    completed = True
finally:
    if not (completed and args.keep_running):
        for node in reversed(nodes):
            node.stop()
    report = {'core': '31.1', 'network': 'regtest', 'temporary_directory': str(root), 'completed': completed, 'checks_passed': len(results), 'checks': results, 'scope': 'Automated software integration on this host; not physical air-gap, Debian installation, funded Signet or mainnet validation.'}
    if args.report:
        args.report.write_text(json.dumps(report, indent=2) + '\n')
    print('Test-only data retained for inspection at', root)

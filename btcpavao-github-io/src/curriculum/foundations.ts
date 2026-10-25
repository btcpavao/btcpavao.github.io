import { foundationDemonstrations } from "./foundation-demonstrations"
import type { PlayerLesson } from "../bitcoin-core-curriculum-player-en-data"
import type { ConceptVisual, LessonMedia } from "./concept-types"

// Authored narrative, visual direction, check and recording script share one lesson ID.
const definitions: {
  id: string
  title: string
  chapter: string
  kind: ConceptVisual["kind"]
  concept: string
  paragraphs: string[]
  caption: string
  question: string
  answers: [string, string, string]
  answer: number
  feedback: string
  narration: [string, string]
}[] = [
  {
    id: "learn-from-first-principles",
    title: "Build understanding one idea at a time",
    chapter: "Information, loss and copies",
    kind: "learning",
    concept: "Derive a protection from a problem you can explain.",
    paragraphs: [
      "Imagine learning algebra without understanding multiplication. You might memorize a sequence of moves and occasionally obtain the right answer, yet have no way to recognize a mistake. A custody recipe can create the same illusion. Owning the recommended equipment does not mean understanding the system that protects your money.",
      "We will work differently. Begin with one simple observation, discover the problem it creates, propose a solution and examine its consequences. A file can disappear. A copy helps. Many copies help with disappearance, but now more people might find one. Each answer gives us the next question. The apparent simplicity is deliberate: pause to consider what follows from an idea before moving on.",
      "If you already use recovery words, a hardware wallet or several signers, temporarily set that configuration aside. Experience can make assumptions harder to notice. Forget your current wallet setup for a moment. What exactly are we trying to protect?",
      "Guided Learning keeps the next idea out of view until you have considered the current one and answered its understanding check. Open Curriculum lets you inspect everything freely. Both show the same lessons and keep the same local progress. Videos are optional; the written explanations stand on their own.",
    ],
    caption:
      "Observation → problem → attempted solution → consequence. Return to the observation when a solution becomes confusing.",
    question: "A familiar lesson feels obvious. What is the useful next step?",
    answers: [
      "Buy the suggested equipment immediately.",
      "Explain its consequences before adding another idea.",
      "Skip every foundational lesson.",
    ],
    answer: 1,
    feedback:
      "Understanding is the ability to reason from the idea, including when a familiar solution creates a new problem.",
    narration: [
      "Think of multiplication as a foundation under algebra. Today we are building that foundation for custody. Notice the loop in the illustration: a solution does not end the inquiry; it exposes the next question.",
      "Try this aloud: a file can be lost, so I make a copy. What has changed for me, and what has changed for someone trying to take it? Keep that question in mind. You do not need a preferred wallet to answer it.",
    ],
  },
  {
    id: "bitcoin-is-information",
    title: "A copy of the keys is not a copy of the coins",
    chapter: "Information, loss and copies",
    kind: "gold",
    concept: "Custody protects information that authorizes spending.",
    paragraphs: [
      "A gold bar occupies a particular place. Moving it from one vault to another removes it from the first vault. Making a photograph of the bar does not give you a second recoverable bar. Physical scarcity makes location central to gold custody.",
      "Bitcoin payments are recorded in a shared transaction history. Your wallet holds information used to recognize payments and authorize spending. In Bitcoin Core, wallet.dat is the wallet database. For now, focus on the secret signing information it contains. Copying that information can preserve your ability to spend after a computer fails.",
      "Ten wallet backups do not create ten times as much bitcoin. They reproduce access to the same spending authority. If a payment spends a particular output, another copy of the same keys cannot spend that output a second time on the same accepted chain.",
      "This changes the design problem. We do not need to keep a unique digital object in one perfect hiding place. We need to keep the required information recoverable for its owner and unavailable to an unauthorized spender. The physical devices matter as carriers of information, not as containers holding coins.",
    ],
    caption:
      "Gold must move. Signing information can be copied while every copy still controls the same outputs.",
    question:
      "You make ten valid backups of a wallet controlling 1 BTC. What changes?",
    answers: [
      "The wallet now controls 10 BTC.",
      "The coins have moved into the USB drives.",
      "There are ten recovery copies for the same spending authority.",
    ],
    answer: 2,
    feedback:
      "Copies duplicate information, not Bitcoin outputs. They provide alternative ways to recover the same authority.",
    narration: [
      "Watch the gold bar move: the first location becomes empty. Now copy the wallet information. The original remains, and the backup can recover the same authority. Nothing has created additional coins.",
      "That difference is our starting advantage. We can design recovery around many inexpensive copies. But ask who else could use a copy if the information is unprotected.",
    ],
  },
  {
    id: "one-file-can-disappear",
    title: "One working file is one point of failure",
    chapter: "Information, loss and copies",
    kind: "copies",
    concept: "Loss means losing the information needed to authorize a payment.",
    paragraphs: [
      "Imagine your only wallet exists on one laptop. The disk fails tomorrow. The blockchain still records the outputs, but the public history cannot reconstruct your secret keys. Knowing that the money is there is different from being able to spend it.",
      "The same consequence can follow a fire, accidental deletion, corruption or losing the laptop. A thief need not be able to read the disk to cause loss: simply taking the only copy can remove your access. We call this risk of loss.",
      "The simplest response is a valid backup on another device. Bitcoin Core provides File → Backup Wallet and the backupwallet operation for making a consistent snapshot. A casual copy of an active database is not our backup procedure. We will practice the supported operation later.",
      "A file listing proves only that something with a filename exists. Restoration and a controlled signing test establish much more: that the backup contains usable signing information and that the required password can be recovered. The first copy is useful only if it can actually do its job.",
    ],
    caption:
      "Remove the only location and nothing survives. Add a tested independent copy and the same failure becomes recoverable.",
    question:
      "Your laptop fails, but you know the wallet balance. What restores spending?",
    answers: [
      "The balance alone.",
      "A usable backup of the signing information and any required secrets.",
      "Downloading the blockchain to any computer.",
    ],
    answer: 1,
    feedback:
      "Public transaction history can be downloaded again. It does not reconstruct your missing private keys.",
    narration: [
      "Cross out the laptop in the diagram. The coins have not vanished from the ledger. What vanished was your only route to a signature.",
      "Now place a tested copy elsewhere. The same disk failure has a different outcome. Later we will prove that recovery by signing with the restored copy, not by looking at its filename.",
    ],
  },
  {
    id: "independent-copies",
    title: "A thousand copies can share one failure",
    chapter: "Information, loss and copies",
    kind: "copies",
    concept: "Count independent failure domains, not just files.",
    paragraphs: [
      "Two copies are better than one only for failures they do not share. Two files on the same USB survive deletion of one file, but neither survives losing the drive. Ten drives in the same drawer can all disappear in one burglary or fire.",
      "Increase the thought experiment to one thousand copies. If they sit in one cloud account, losing access to that account can remove all one thousand. The impressive count hides a single dependency. Independence asks which event can defeat several copies together.",
      "Separate devices, locations and access arrangements can reduce common failures. They introduce maintenance too: media need readers, accounts need access, and another person may forget what they agreed to keep. A backup plan is a set of recoverable routes, not a decorative collection of storage devices.",
      "The visual lets you change the copy count and then lose a location. It is a structural illustration, not a numerical probability estimate. Real failures are often correlated. Before adding a copy, name the failure it survives that your existing copies do not.",
    ],
    caption:
      "A shared-location failure removes all copies kept there. Distribution changes the outcome, not merely the count.",
    question:
      "A thousand backups are stored in one account. Which risk remains concentrated?",
    answers: [
      "Losing access to that account.",
      "Creating a thousand times more bitcoin.",
      "Having too many independent signing authorities.",
    ],
    answer: 0,
    feedback:
      "All copies depend on the same account. Copy count does not measure independence.",
    narration: [
      "Turn the copy count up. Now imagine the entire container disappears. Every object inside it disappears together. The thousand is misleading.",
      "Move some copies to independent locations and repeat the failure. This time something survives. The question is always: which failure did this additional copy actually remove?",
    ],
  },
  {
    id: "copies-and-theft",
    title: "The copy that rescues you can also expose you",
    chapter: "Information, loss and copies",
    kind: "copies",
    concept: "Unprotected redundancy creates more opportunities for theft.",
    paragraphs: [
      "We have made the signing information harder to lose. Now imagine someone else finds one unencrypted copy. If it contains usable signing secrets, the finder may be able to authorize a payment. They do not have to remove every backup or take your original computer.",
      "A thousand independent unprotected copies create a thousand places from which the same authority might be obtained. The owner can recover from any one of them; the thief may only need any one of them too. That is the tension between loss risk and theft risk.",
      "This is also the difficulty with a plainly readable recovery secret on paper or metal. Durability helps it survive, but readability is available to whoever encounters it. A copy does not distinguish its legitimate reader from an intruder.",
      "The solution is not to abandon redundancy. Ask a more precise question: can the file remain easy to copy while the information inside remains unusable to a finder? That question leads to encryption. We want copies of a protected object, with the unlocking secret managed separately.",
    ],
    caption:
      "Each unprotected copy is a recovery route for you and a possible access route for an attacker.",
    question: "Increasing unprotected copies from one to a thousand does what?",
    answers: [
      "Removes both loss and theft risk.",
      "Reduces concentrated loss risk while expanding exposure opportunities.",
      "Changes the wallet to a thousand-signature policy.",
    ],
    answer: 1,
    feedback:
      "Redundancy and exposure grow together when every copy contains directly usable secrets.",
    narration: [
      "Look at the same dots from the other side. Each one that helps you recover may also help a thief. They need only one usable copy.",
      "Keep the copying advantage. Change what is being copied. The next idea separates possession of the object from the ability to read its secrets.",
    ],
  },
  {
    id: "file-and-secret",
    title: "Encryption separates an object from its meaning",
    chapter: "Encryption, recovery and privacy",
    kind: "separation",
    concept:
      "An encrypted file and its decryption passphrase are different recovery components.",
    paragraphs: [
      "Imagine putting a document in a locked safe before making copies of the safe. Finding a safe is no longer the same as reading the document. Encryption provides a digital version of that separation: a protected file and a secret needed to recover its contents.",
      "We use GPG as the whole-file example. GPG can encrypt a Core wallet backup using a passphrase. The resulting encrypted bytes can be copied onto other media without distributing directly readable wallet contents. The passphrase is not a Bitcoin private key; it opens an encryption layer around information.",
      "Bitcoin Core wallet encryption and whole-file encryption have different coverage. Core protects private-key material inside its database, while some public wallet records remain readable. A GPG wrapper protects the complete backup contents, including those records. In practice the Core passphrase and the GPG passphrase are separate secrets.",
      "The safe analogy has a limit. An attacker can copy encrypted bytes and try password guesses privately, without a physical lockout counter. Therefore encryption needs an unpredictable secret as well as good storage. First, however, consider what happens if the owner loses that secret.",
    ],
    caption:
      "The file supplies encrypted data; a separate passphrase supplies access. Core encryption and whole-file GPG have different coverage.",
    question:
      "What does possessing a GPG-encrypted wallet file give its finder immediately?",
    answers: [
      "The wallet passphrase.",
      "Automatic permission to spend.",
      "Ciphertext that still needs the relevant decryption secret.",
    ],
    answer: 2,
    feedback:
      "Possession supplies a target for offline guessing, not automatic access. Passphrase strength and separate recovery still matter.",
    narration: [
      "Close the outer container. The copied file now carries ciphertext. It is useful to its owner only when paired with the right secret.",
      "There are two jobs in the practical system: GPG opens the whole-file wrapper; Core unlocks signing keys. Keep those jobs distinct when you count what recovery needs.",
    ],
  },
  {
    id: "backup-every-secret",
    title: "Ten safes do not replace one lost key",
    chapter: "Encryption, recovery and privacy",
    kind: "separation",
    concept: "Every indispensable secret needs its own redundant recovery.",
    paragraphs: [
      "Suppose ten encrypted wallet copies survive, but the only written passphrase is destroyed. The copies have done their job perfectly. Yet the owner cannot decrypt any of them. We moved the single point of failure from the file to its password.",
      "The general rule is broader than “back up the wallet.” Back up every indispensable recovery component. For a Core-encrypted wallet inside one GPG layer, that means the final encrypted file, the GPG passphrase and the Core passphrase. Each needs a recoverable route after the failures you intend to survive.",
      "Memory can provide another route, but illness, injury and death belong in a recovery plan. If a passphrase is kept in an encrypted password database, the database and its unlocking credential become dependencies too. Moving a secret into another locked container does not remove the need to recover it.",
      "Test the complete chain using disposable material. Set the original computer aside, retrieve separate records, open the outer file, restore the wallet and prove signing. Notice exactly where the procedure stops if one required component is missing. More copies of a different component cannot fill that gap.",
    ],
    caption:
      "File copies and passphrase copies solve different loss problems. All required categories must remain recoverable.",
    question:
      "Ten encrypted files survive, but all copies of a required passphrase are lost. What helps?",
    answers: [
      "Another copy of the same encrypted file.",
      "A recovery route for that missing secret, if one exists.",
      "Renaming the file wallet.dat.",
    ],
    answer: 1,
    feedback:
      "The missing component is the secret, not the file. Redundancy must cover every indispensable component.",
    narration: [
      "Hide the key in the illustration. Count the safes again: the number no longer helps. They all require the same missing information.",
      "Work backwards from a successful signature and list every dependency. Give each required secret its own recovery route. That is how a backup becomes an architecture.",
    ],
  },
  {
    id: "separate-recovery-components",
    title: "Do not leave the key in the safe",
    chapter: "Encryption, recovery and privacy",
    kind: "separation",
    concept:
      "Redundancy preserves components; separation prevents one compromise collecting them all.",
    paragraphs: [
      "A strong safe with its key taped to the door has a weak storage arrangement. The lock still exists, but anyone finding the object also finds the means to open it. The same is true when an encrypted file and every required passphrase sit in one accessible account.",
      "Start with a simplified system: one encrypted file, one file backup, one password record and one password backup. Four artifacts at four appropriately independent locations demonstrate both ideas. Two file locations protect against loss of a file. Two password locations protect against loss of the secret. Keeping the categories apart limits what one compromised location supplies.",
      "The practical Core-plus-GPG system has an additional Core secret. Do not mistake the simplified four-object diagram for a complete inventory of that implementation. Count the actual dependencies of the format and procedure you choose.",
      "Separation is about access, not merely distance on a shelf. Two accounts unlocked by the same compromised computer may share an attacker. Two rooms in one house may share a fire or coercive encounter. Describe the access relationships and common failures before calling locations independent.",
    ],
    caption:
      "Compare co-located keys with separately recoverable keys. Count the actual Core secret in the practical setup too.",
    question:
      "Two independently encrypted layers have both passphrases in one envelope. What is missing?",
    answers: [
      "A second filename.",
      "The mathematical existence of encryption.",
      "Independent storage of the unlocking secrets.",
    ],
    answer: 2,
    feedback:
      "The layers exist, but the envelope allows one discovery to supply both passwords. Separation has not increased.",
    narration: [
      "Move the key next to the safe, then move it to a different location. The lock has not changed; the consequences of discovering one location have.",
      "Now add backups of both categories. The goal is to survive loss without arranging a single discovery that supplies everything needed to steal.",
    ],
  },
  {
    id: "privacy-of-artifacts",
    title: "What does finding the object reveal?",
    chapter: "Encryption, recovery and privacy",
    kind: "privacy",
    concept:
      "Protect the meaning and relationships of recovery artifacts as well as their contents.",
    paragraphs: [
      "A gold bar advertises a purpose. Its weight provides a rough clue to its value. A Bitcoin-branded device or a paper labeled “100 BTC recovery password” also gives a discoverer useful context before any technical attack begins.",
      "A GPG file may be recognizable as encrypted data. That does not, by itself, disclose whether the plaintext is a diary, photograph, archive or wallet. Its size is not a measure of the bitcoin controlled by keys inside. A small file can protect a small or large balance.",
      "Likewise, six random words without a wallet label do not inherently identify their use or which file they open. Compare that with a record containing a balance, address and exact backup location. The latter joins several pieces of the attack together for its finder.",
      "This is information minimization, not magical invisibility. File names, account ownership, timing, purchase records and public statements can supply context. Keep recovery instructions privately usable by authorized people while limiting what an isolated artifact reveals. Making the map incomprehensible to your heir would turn privacy into a loss problem.",
    ],
    caption:
      "Reveal or hide contextual labels. Encryption hides content; surrounding metadata can still identify its owner or purpose.",
    question: "A neutrally named encrypted file proves which of these?",
    answers: [
      "Only that encrypted data is present; its purpose needs other evidence.",
      "That the owner has no bitcoin.",
      "That every trace of its origin is hidden.",
    ],
    answer: 0,
    feedback:
      "Whole-file encryption limits direct disclosure. Context and metadata can still reveal associations.",
    narration: [
      "Reveal the label next to the file: now you know its alleged purpose and value. Hide the label and that knowledge is no longer supplied by the object itself.",
      "Keep two questions separate: can someone open it, and what can someone infer about it? Privacy changes the second question even before we discuss the first.",
    ],
  },
  {
    id: "attack-cost-and-payoff",
    title: "An attack has a budget",
    chapter: "Uncertainty and economic choices",
    kind: "economics",
    concept:
      "Compare expected benefit with the resources and uncertainty an attack requires.",
    paragraphs: [
      "An attacker has alternatives for using time, equipment and attention. Finding a target, learning what it controls, obtaining artifacts, guessing secrets and moving money all consume resources. A technically possible attack can still be an unattractive investment.",
      "For intuition, expected reward can be represented as estimated value multiplied by a probability that value exists and a probability of success. Subtract the attack cost. The controls below are invented scenario inputs, not measured probabilities or a prediction about your attacker. Change one assumption at a time and explain the result.",
      "Suppose the value is $100,000. An attacker confident of success at a cost of $1,000 sees a different opportunity from one facing expensive guessing and uncertainty about whether the object contains anything valuable. Privacy changes information available for that decision; encryption and separation change work needed to succeed.",
      "The defender has a budget too. Equipment, travel, upkeep, recovery time and mistakes consume it. A sound design spends resources on concrete failures. It also considers future value and changes in attack capability rather than treating an illustrative dollar estimate as a permanent safety boundary.",
    ],
    caption:
      "Illustrative expected payoff = value × probability of value × probability of success − cost. Inputs are assumptions, not a forecast.",
    question:
      "Why can an unidentified encrypted object be less attractive to attack?",
    answers: [
      "Unknown files cannot be copied.",
      "The attacker may be uncertain about both reward and cost.",
      "Privacy increases the password’s mathematical entropy.",
    ],
    answer: 1,
    feedback:
      "Uncertainty affects target selection and expected reward. It does not change the entropy of a fixed generating process.",
    narration: [
      "Keep the cost fixed and lower the assumed chance that the file contains value. The expected return falls. Now increase the assumed cost and see the second effect.",
      "The arithmetic teaches sensitivity to assumptions. It does not tell you what a criminal knows. Build a system that remains understandable when those assumptions change.",
    ],
  },
  {
    id: "predictable-human-passwords",
    title: "Long does not mean unpredictable",
    chapter: "Uncertainty and economic choices",
    kind: "guessing",
    concept:
      "A generation process determines uncertainty; visual complexity does not.",
    paragraphs: [
      "Imagine a fictional person who posts their dog’s name, birthday, favorite band and street. A password assembled from those facts can be long and full of punctuation. Yet an attacker can try combinations of those facts before searching arbitrary strings.",
      "The relevant information can come from photographs, family profiles, likes, public subscriptions or leaked passwords. Replacing a letter with a number is a familiar rule, not a fresh random choice. An attacker can test likely rules along with likely words.",
      "Contrast that with words chosen independently and uniformly by a secure generator. The person’s favorite book gives no useful clue to those selections. Entropy describes uncertainty from the selection process. You cannot award a remembered sentence the same entropy as equally many independently random words.",
      "Do not enter a real password into the illustration or any online calculator. Its fictional footprint demonstrates why personal facts are poor ingredients. The next lesson counts possibilities only after specifying a genuinely random selection method.",
    ],
    caption:
      "Personal clues narrow a targeted guess list. Independently generated words have no intended relationship to the owner’s biography.",
    question:
      "Which phrase may legitimately use the independent-word entropy formula?",
    answers: [
      "A favorite quotation.",
      "A pet name plus a birthday.",
      "Words selected independently and uniformly from a known list.",
    ],
    answer: 2,
    feedback:
      "The formula describes random choices from a known space, not the apparent length of text invented by a human.",
    narration: [
      "The fictional profile gives us a name, a date and an interest. Those clues generate a small family of plausible guesses. Adding an exclamation mark is easy for an attacker to anticipate.",
      "Now erase the biography and use independent random selections. We can count that search space because we know how the phrase was generated.",
    ],
  },
  {
    id: "count-random-choices",
    title: "One extra random word multiplies the search",
    chapter: "Uncertainty and economic choices",
    kind: "entropy",
    concept: "Bits grow linearly while possible phrases grow exponentially.",
    paragraphs: [
      "Suppose a list contains exactly 7,776 words and each selection is independent and equally likely. One word has 7,776 possibilities. Two ordered words have 7,776 × 7,776 possibilities. Each additional word multiplies the number again. Repeated words are legitimate outcomes; rejecting them changes the method.",
      "For n selections from N words, the space is N to the power n. Entropy is n × log2(N) bits. A bit represents one doubling. With N = 7,776, three words give about 38.8 bits, four 51.7, five 64.6, six 77.5, seven 90.5 and eight 103.4. The straight line in bits represents an exponential number of candidates.",
      "The existing practical tutorial reviewed a KeePassXC package with 7,772 distinct words in its bundled list. That small difference must be stated rather than silently replacing the installed list count. Six selections still round to about 77.5 bits. Select the appropriate list size in the illustration and retain the generator’s actual settings in private recovery notes.",
      "Use KeePassXC’s passphrase generator on the prepared environment, keeping its random output rather than editing it into a familiar story. This page only models public numbers; it never generates or accepts a real secret. The practical lesson later covers the actual application and secure records.",
    ],
    caption:
      "Compare 7,776 theoretical entries with the reviewed 7,772-entry bundled list. Fixed separators add no entropy.",
    question:
      "With 7,776 equally likely choices per word, one more independent word multiplies candidates by what?",
    answers: ["7,776.", "Two.", "The number of letters in that word."],
    answer: 0,
    feedback:
      "Every existing phrase can be followed by any of the 7,776 words. Bits increase by log2(7,776), about 12.9.",
    narration: [
      "One column contains all choices for the first word. A second choice does not merely add another column of candidates; it pairs every first choice with every second choice.",
      "Move from five to six words. The bit count adds about thirteen, while the number of candidate phrases multiplies by thousands. Check the actual list size before using the calculation.",
    ],
  },
  {
    id: "enough-entropy",
    title: "Strength has an operational price",
    chapter: "Uncertainty and economic choices",
    kind: "strength-cost",
    concept:
      "Choose sufficient guessing resistance that you can also preserve and recover.",
    paragraphs: [
      "A forty-word random phrase has far more selection entropy than a six-word phrase. It also takes longer to transcribe, check, store and recover. Maximum theoretical strength does not automatically produce the best complete custody system.",
      "The work per password guess depends on the encryption format and its password-derivation parameters. A wallet.dat benchmark cannot simply be reused for a GPG layer or a 7z archive. Salt and repeated derivation work make guesses more expensive, but do not turn a predictable phrase into a random one.",
      "Compare the actual search assumptions, the value and time horizon being protected, and the cost of managing the record. Once guessing is implausibly expensive under the scenarios you care about, extra words can yield diminishing practical benefit while still adding owner burden. Six independently generated words are our baseline illustration, not a universal dollar limit.",
      "The existing attack-cost calculator remains available in practical study, with editable rates and costs. Treat its historical benchmark as an example. A hidden balance may reduce an attacker’s incentive, but it does not improve a weak secret if the attacker already has a reason to target you. Review both assumptions and recoverability over time.",
    ],
    caption:
      "Increasing word count changes a precisely defined keyspace. Owner effort and real attack costs need separate assessment.",
    question: "Why not automatically use forty random words?",
    answers: [
      "Long random phrases have less entropy.",
      "Recovery burden can rise after useful guessing resistance is already sufficient.",
      "Every six-word phrase is guaranteed safe forever.",
    ],
    answer: 1,
    feedback:
      "The objective is a maintainable architecture with suitable resistance, not maximizing one metric while ignoring loss and operational error.",
    narration: [
      "Turn the control up and watch the search space grow. Now imagine checking every word from a damaged paper record years later. The mathematical and operational questions are different.",
      "Ask what additional threat an extra word addresses. Keep the choices tied to a horizon and a recovery procedure, instead of making length a competition.",
    ],
  },
  {
    id: "encrypt-an-encrypted-file",
    title: "Put another lock around the protected file",
    chapter: "Layers and independent components",
    kind: "layers",
    concept:
      "Nested encryption adds another required secret without changing Bitcoin’s spending rule.",
    paragraphs: [
      "A digital file can be encrypted even when its contents are already encrypted. Start with a valid Core backup, encrypt it with GPG passphrase A, then encrypt that result with independently generated passphrase B. The final file contains an outer layer around an inner layer.",
      "Recovery reverses construction. Open B to recover the inner encrypted file, then open A to recover the Core backup. Core’s separate wallet passphrase unlocks signing when required. Two GPG layers therefore mean one final file and three passphrases in this practical example.",
      "The useful architectural choice is where those secrets live. Different locations or custodians can hold different components so that finding one does not supply them all. This does not require adding a second Bitcoin signing key. Once the wallet is unlocked, its original spending policy still applies.",
      "GPG is the current Vault candidate’s supported whole-file format. A 7z archive can also provide AES-256 password protection, with filename privacy depending on its header-encryption setting. It is a separate format with its own derivation and recovery requirements, not an interchangeable GPG layer. Earlier tooling choices are not evidence that the current GPG-only candidate accepts 7z. Preserve the software and procedure for any older archive you still rely on.",
      "Only the final outermost file carries all intended layers. A distributed inner file bypasses the outer protection. Keep intermediate plaintext and inner copies within the controlled working environment, and test complete recovery before retiring any older backup. A layer that cannot be reliably recovered has made the owner’s problem worse.",
    ],
    caption:
      "Construct from inside out; recover from outside in. The final file plus every required secret must survive.",
    question:
      "Which file should carry the intended two-layer protection to distributed backup storage?",
    answers: [
      "The unwrapped Core snapshot.",
      "The inner GPG file.",
      "The final outermost encrypted file.",
    ],
    answer: 2,
    feedback:
      "An inner copy offers an access path that skips outer layers. Distribute the final protected result.",
    narration: [
      "Add A around the backup, then B around A. To open it, reverse that order. The Core lock remains a separate final job.",
      "Now imagine leaving a copy of A outside B. An attacker can ignore B entirely. A sound design accounts for every surviving copy, not just the most impressive one.",
    ],
  },
  {
    id: "layers-need-recovery",
    title: "Every new lock creates another loss condition",
    chapter: "Layers and independent components",
    kind: "layers",
    concept:
      "Every indispensable layer needs an independent, tested secret-backup plan.",
    paragraphs: [
      "An additional passphrase can force an attacker to locate another secret. It can also prevent the owner from recovering if every record of that secret disappears. Both consequences follow from the same requirement: that layer must be opened.",
      "For each layer, name the generation method, redundant records, separate storage, recovery order and test procedure. Do not store every layer password in one accessible envelope and count the result as distributed access. The envelope is a common compromise point.",
      "Keep the final file redundantly too. Many secret records cannot reconstruct a missing ciphertext, just as many ciphertext copies cannot reconstruct a missing passphrase. Consider what one lost location removes across all component categories.",
      "During a test, use recovered records rather than a password cached in the current session. Successful automatic decryption can conceal a missing record. The existing GPG exercise disables its symmetric passphrase cache for this reason. Rehearse with disposable material before trusting an arrangement with meaningful funds.",
    ],
    caption:
      "Adding a layer adds a required secret category, not just another ring. Toggle a missing secret to see the recovery stop.",
    question:
      "A new layer’s only password record is lost. What did the extra layer introduce?",
    answers: [
      "An additional single point of failure.",
      "An automatic Bitcoin recovery path.",
      "A replacement for the final file.",
    ],
    answer: 0,
    feedback:
      "The layer is indispensable, so the loss of all access to its password can block recovery. It needs its own redundancy.",
    narration: [
      "Add a ring and count the records again. That ring represents work for the attacker and a responsibility for you.",
      "Remove its secret. The remaining keys cannot substitute for it. Before adding a layer, demonstrate where its recovery records will survive and how you will test them.",
    ],
  },
  {
    id: "sequential-layer-attacks",
    title: "Two secrets do not guarantee one multiplied attack",
    chapter: "Layers and independent components",
    kind: "layers",
    concept:
      "Combined secret entropy and the cost of attacking nested layers are different quantities.",
    paragraphs: [
      "Two independent random secrets contain more total uncertainty than either alone. If their entropies are H1 and H2, the pair has H1 + H2 bits of selection entropy. That statement describes the secret pair. It does not yet describe the best attack against a particular construction.",
      "Nested file formats can let an attacker recognize a successful outer decryption and then attack the inner file separately. In that case the work can resemble the sum of two searches rather than one search through every possible pair. Integrity checks and recognizable structure can provide validation of a guess.",
      "Use the visual to vary each layer independently. It displays the sum of selection entropies as a description of the secrets, and a separate illustrative sequential candidate count. Real cost also depends on the different work per guess for each format. Do not label the entropy sum as effective brute-force security of the nested archive.",
      "The operational benefit can remain substantial: distinct secrets at independent locations may require distinct discoveries or compromises. Analyze that logistical barrier separately from computational resistance. Four words outside six words is a different design from ten words in one passphrase, even though the total number of generated words is the same.",
    ],
    caption:
      "Selection entropies add for independent secrets. Sequentially testable layers may be attacked one at a time; candidate work is not automatically multiplied.",
    question:
      "Why is adding the bits of two layer passwords insufficient to price an attack?",
    answers: [
      "Independent secrets never add uncertainty.",
      "The construction may let the attacker verify and crack each layer separately.",
      "GPG passwords are Bitcoin signatures.",
    ],
    answer: 1,
    feedback:
      "An attacker may solve the outer search, verify it and then solve the inner search. The architecture and per-guess cost matter.",
    narration: [
      "Read the two numbers separately. The combined entropy tells us about the pair of secrets. The attack path tells us how a thief can test guesses.",
      "Open the outer ring and stop there. If that success can be recognized, the attacker does not need to repeat every inner guess for every outer guess. Preserve the separation benefit without inventing a multiplied cryptographic claim.",
    ],
  },
  {
    id: "privacy-and-deterrence",
    title: "An attack can end before it starts",
    chapter: "Threats, distance and complexity",
    kind: "deterrence",
    concept: "Uncertainty can change whether an attacker invests in a target.",
    paragraphs: [
      "Imagine finding an encrypted object without a label. Is it a wallet, a journal or an old photograph? If it is a wallet, does it control anything? Does one password open everything, or are further components needed? Those unanswered questions matter to a resource-limited attacker.",
      "Compare this with knowing that a particular file protects $100 million and uses two short random passphrases. The second case supplies actionable information about reward and possible effort. The same encrypted bytes can attract a different investment when the surrounding information changes.",
      "Privacy can therefore contribute to deterrence: reducing the chance that a target is identified, valued and selected for sustained attack. It belongs in the security budget alongside encryption and physical separation. A plainly identifiable device can disclose its use even if its local key protection is strong.",
      "Deterrence is conditional. A finder may keep the object cheaply, test common guesses or learn more later. Someone motivated by coercion or harm may not maximize financial profit. Build sufficient technical protection and maintain it; do not treat lack of a label as a guarantee that nobody will try.",
    ],
    caption:
      "Discover → identify → estimate value → estimate effort → decide. Withheld context increases uncertainty, not mathematical password strength.",
    question: "What does privacy chiefly change in this attack decision?",
    answers: [
      "The attacker’s information and incentive to invest.",
      "The number of words already generated.",
      "Bitcoin’s consensus rules.",
    ],
    answer: 0,
    feedback:
      "Privacy can make selection and valuation harder. It does not alter the cryptographic generation process.",
    narration: [
      "Follow the decision points. A clearly labeled high-value target supplies answers immediately. An unrelated-looking encrypted object leaves several questions open.",
      "That uncertainty is useful, but it is not a stronger password. Keep the privacy barrier and guessing barrier as separate lines in your reasoning.",
    ],
  },
  {
    id: "theft-collusion-coercion",
    title: "Different threats cross different boundaries",
    chapter: "Threats, distance and complexity",
    kind: "threats",
    concept:
      "Distinguish secret theft, cooperation between holders and forced disclosure.",
    paragraphs: [
      "Theft tries to obtain components without permission. Collusion occurs when people holding different components cooperate. Coercion attempts to force a person to reveal information or authorize a payment. One arrangement can behave very differently against these three threats.",
      "A file and two independently held passphrases require three component categories. A burglar taking only the file has not collected the secrets. Two holders cooperating may bridge the intended separation. An owner who remembers every secret may still be able to assemble everything immediately under pressure.",
      "Draw the actual access relationships. Who can retrieve each record? Which holders share an account, home or administrator? Can a password be transmitted remotely? Does the owner carry a convenient copy that bypasses the planned distance? The number of envelopes alone answers none of these questions.",
      "The goal is to make assumptions visible before adding complexity. Separation may raise logistical effort, but it is not a promise of personal safety during coercion. For the architectural comparison, evaluate what an attacker must acquire and what a legitimate recovery person can still obtain if the owner is unavailable.",
    ],
    caption:
      "Follow who can obtain each component. Physical location, access authority and remembered secrets can produce different paths.",
    question:
      "All passwords are stored far away, but the owner remembers every one. What follows?",
    answers: [
      "Distance forces a flight before any signing is possible.",
      "No attacker can coerce disclosure.",
      "Memory may provide an immediate route that bypasses stored-copy distance.",
    ],
    answer: 2,
    feedback:
      "Analyze all access paths, including memory and remotely available copies. Distance matters only when retrieval actually requires it.",
    narration: [
      "Separate three stories: a stolen file, cooperating holders and a pressured owner. The dots on the map are identical, but the access path changes.",
      "Ask who knows what, not only where paper sits. A remembered or remotely transmitted secret can bypass a distance that looked impressive on the map.",
    ],
  },
  {
    id: "distance-as-friction",
    title: "Distance can become retrieval time",
    chapter: "Threats, distance and complexity",
    kind: "geography",
    concept:
      "Geographic separation changes logistics only when required access is truly separated.",
    paragraphs: [
      "Two passwords in different rooms have some physical separation, but little retrieval delay. A required component two hours away changes the journey. A component requiring a ten-hour flight introduces a different level of scheduling, access and coordination. These are scenarios, not measured travel guarantees.",
      "The useful variable is the time and access needed to assemble all required components through the easiest available path. A nearby duplicate, remote photograph or holder who can send the password immediately may collapse the intended delay. More copies improve recovery but also create alternative access routes.",
      "Compare two design dimensions: the number of indispensable secrets and the separation between their storage arrangements. More secrets nearby and fewer secrets far apart impose different costs. Evaluate travel, availability, jurisdiction, trusted holders and the ability to recover during illness or disrupted transport.",
      "Distance burdens the owner too. A maintenance task that becomes prohibitively difficult may stop happening. Keep the design tied to how often you need to spend, who must recover and which concrete threat the delay addresses. Do not confuse an access delay with a Bitcoin timelock enforced by the network.",
    ],
    caption:
      "Same house, distant city and international travel are illustrative access scenarios. A remote copy can bypass the journey.",
    question:
      "When does storing a required secret overseas impose travel delay?",
    answers: [
      "Whenever its envelope has an overseas address.",
      "When no available route supplies that secret without the required travel or access.",
      "Whenever the node is pruned.",
    ],
    answer: 1,
    feedback:
      "The fastest real access path determines the delay. Nearby duplicates or remote transmission can defeat the intended friction.",
    narration: [
      "Switch from one house to a distant city. Then add a remotely readable copy. Watch the travel requirement lose its meaning.",
      "Design around the actual retrieval path, including your own recovery. Distance is a logistical tool, not a substitute for clear authority and backups.",
    ],
  },
  {
    id: "cost-of-components",
    title: "Four artifacts or one thousand?",
    chapter: "Threats, distance and complexity",
    kind: "complexity",
    concept:
      "Complexity creates maintenance work and opportunities for owner error.",
    paragraphs: [
      "Return to the simplified single-layer example: two encrypted file copies and two password records. Four artifacts can provide a understandable starting arrangement. In a Core-plus-GPG implementation, include the separate Core passphrase records as well.",
      "Now imagine one hundred encryption layers and ten records for every layer password. That is one thousand passphrase artifacts before counting file copies or the Core secret. Each has storage, access, transcription, replacement and inheritance requirements. The owner must keep the whole system coherent.",
      "If any required secret becomes entirely unavailable, the other ninety-nine cannot replace it. More indispensable components can therefore increase loss risk even as separation increases an attacker’s acquisition burden. Repeatedly adding locks is not the same as improving the complete system.",
      "Choose the simplest arrangement that covers the failures you named and can maintain. The counter below shows inventory growth, not a security score. Explain what each added layer buys, where its independent records live and how recovery still works. If you cannot do that, the numerical complexity is not evidence of improvement.",
    ],
    caption:
      "Layer secrets × copies per secret = passphrase artifacts, before final-file copies and Core records.",
    question:
      "One hundred layers, each with ten password records, create how many layer-password artifacts?",
    answers: [
      "1,000, before files and Core records.",
      "100 total recovery items.",
      "Ten independent Bitcoin signers.",
    ],
    answer: 0,
    feedback:
      "The inventory grows multiplicatively. Encryption layers do not add Bitcoin signing authorities.",
    narration: [
      "Set one hundred layers and ten records per layer. Those thousand marks are obligations: locate, check, maintain and eventually explain each category.",
      "Now reduce the design. A smaller plan can be stronger in practice when its protections match real threats and recovery remains dependable.",
    ],
  },
  {
    id: "gold-and-digital-scale",
    title: "More value need not mean a bigger container",
    chapter: "Choosing the computing foundation",
    kind: "scaling",
    concept:
      "The storage footprint of signing information is not proportional to the balance it controls.",
    paragraphs: [
      "Protecting a small gold bar and protecting hundreds of tons of gold require different physical arrangements. Space, weight, transport and guarding can grow with quantity. A vault must accommodate the asset itself.",
      "A Bitcoin wallet’s secrets can authorize a small or very large value without becoming proportionally heavier or larger. A database may grow with wallet activity, but its byte size is not a scale measuring the balance. Encryption does not require a physically bigger safe because purchasing power rises.",
      "That is why an individual can build an information-custody architecture for substantial value using ordinary equipment. The economic question moves from container capacity to key protection, privacy, independent validation, recoverability and human access.",
      "Value still matters. A larger potential payoff can justify more capable attackers and a different defensive budget. Reassess the threats rather than automatically multiplying devices with the balance. We return to this distinction when considering whether multiple signing authorities solve a real authorization problem.",
    ],
    caption:
      "Gold quantity changes physical storage. Bitcoin value changes incentives without proportionally changing the signing secret’s size.",
    question:
      "If the value controlled by the same keys rises substantially, what must necessarily grow?",
    answers: [
      "The number of private keys.",
      "The physical size of the backup.",
      "Neither; reassess threats and incentives instead.",
    ],
    answer: 2,
    feedback:
      "The same information can control greater purchasing power. Threat-model review matters more than a mechanical hardware rule.",
    narration: [
      "Enlarge the gold pile. Its storage problem grows visibly. Now change the value controlled by the same digital secret: the file need not grow with it.",
      "Do not mistake that physical advantage for unchanging threats. Greater reward can change who is interested, even while the bytes remain similar.",
    ],
  },
  {
    id: "target-concentration",
    title: "The ocean and the fishing pond",
    chapter: "Choosing the computing foundation",
    kind: "hardware",
    concept:
      "Specialization can make a population of potential targets easier to identify.",
    paragraphs: [
      "Imagine looking for a particular fish across the ocean, then in a pond advertised to contain that fish. The pond reduces the work of finding a likely target. Bitcoin-specific products can produce a similar concentration of users with an identifiable financial use case.",
      "An ordinary laptop belongs to a much larger and more varied population. Its purchase alone does not establish Bitcoin custody. A recognizable DIY signer occupies an intermediate position: generic components can still become identifiable through a distinctive build, packaging or public explanation.",
      "This is a spectrum of targeting signals, not proof that every ordinary computer is technically safer. Commodity platforms attract widespread malware, and firmware and supply chains remain trust dependencies. The course chooses generic hardware together with a dedicated minimal operating environment and Bitcoin Core, not an everyday browsing laptop.",
      "Evaluate the whole purchase and operating history: seller records, shipping information, support contacts, photographs and public statements. The benefit of avoiding a Bitcoin-specific product label can disappear if other evidence supplies the same association. The analogy teaches target selection, not a measured attack-success rate.",
    ],
    caption:
      "Broad commodity population → recognizable DIY configuration → purpose-built wallet market. Concentration changes identification signals.",
    question: "What does the fishing analogy explain?",
    answers: [
      "Generic firmware is always verifiable.",
      "The effort to identify a population likely to use Bitcoin custody.",
      "Every specialized chip is ineffective.",
    ],
    answer: 1,
    feedback:
      "It concerns targeting information. Device-level protections and generic-platform vulnerabilities remain separate questions.",
    narration: [
      "Look at the broad ocean and the smaller marked pond. The visual is about where to search, not how strong a particular fish is.",
      "Move along the hardware spectrum. A generic platform can become recognizable through its configuration. Consider the signals your complete workflow leaves behind.",
    ],
  },
  {
    id: "before-chip-security",
    title: "Identification comes before key extraction",
    chapter: "Choosing the computing foundation",
    kind: "hardware",
    concept:
      "Evaluate the attack chain before focusing on one component’s resistance.",
    paragraphs: [
      "A secure element or tamper-resistant enclosure addresses particular ways of extracting secrets from a captured device. That can be valuable. It does not answer how an attacker found the owner or learned that this device was worth taking.",
      "Ask what a recognizable wallet purchase discloses to a seller, shipping provider or someone who later obtains customer information. Combine that with public posts or identifiable support messages. Independent fragments can become an actionable association between a person, a place and a financial use case.",
      "Now compare a generic computer reserved privately for signing. Its model alone supplies less Bitcoin-specific context. That is one rationale for the course’s default. The remaining firmware, physical-access and operating-system risks still need controls; anonymity of purpose does not certify the hardware.",
      "Treat local technical protection and information privacy as different defenses. A well-protected chip can sit inside a poorly private architecture. A discreet object can sit inside a compromised machine. The later retained hardware case studies examine concrete failures; this lesson establishes the broader question they should answer.",
    ],
    caption:
      "Target discovery and identification occur before device capture and extraction. Strong protection at one stage does not erase the others.",
    question:
      "A device resists physical key extraction. What remains a separate concern?",
    answers: [
      "Whether customer or contextual data identifies its owner as a target.",
      "Whether the owner exists.",
      "Whether it changes the total bitcoin supply.",
    ],
    answer: 0,
    feedback:
      "Extraction resistance does not remove information disclosed by purchase records, branding or associated communications.",
    narration: [
      "Start at the beginning of the attack chain, before anyone holds the device. Where did the attacker learn to look?",
      "Now jump to the chip. Its protection matters at a later stage. Good architectural reasoning examines every stage rather than declaring the whole system safe from one strong component.",
    ],
  },
  {
    id: "dedicated-environment",
    title: "Separate signing from everyday computing",
    chapter: "Choosing the computing foundation",
    kind: "isolation",
    concept:
      "A dedicated minimal environment reduces unrelated paths into sensitive operations.",
    paragraphs: [
      "A daily computer opens messages, web pages, attachments and downloads. Every installed application and interaction creates another possible route for malicious code or deception. A keylogger need not break encryption if it can observe the password when you type it.",
      "Instead of trying to make every daily activity suitable for handling savings keys, separate the signing job. Use a dedicated generic computer with a minimal Linux installation and only the tools the custody workflow needs. Debian Stable is the project’s foundation; Linux remains software to verify and understand, not a magic security label.",
      "Prepare the software before creating or restoring private keys. Keep the offline signing environment disconnected, with no everyday browser or email use. The online node has a different job and intentionally needs networking. A switch inside Core is not proof that the whole operating system is offline.",
      "Isolation narrows exposure but does not remove every input. Payment-transfer media, file parsers, physical access and firmware remain relevant. The retained practical exercises explain controlled PSBT transfer and destination checking. The reason for each restriction should be a pathway you can name in the diagram.",
    ],
    caption:
      "Remove unrelated browser, mail, download and network paths from the signer; retain controlled transaction and backup pathways.",
    question:
      "Why is a dedicated signer different from a daily laptop with Core installed?",
    answers: [
      "It cannot contain firmware.",
      "It narrows software, network and activity exposure around private-key use.",
      "It makes destination checks unnecessary.",
    ],
    answer: 1,
    feedback:
      "The benefit is controlled purpose and reduced exposure. Physical, firmware and transferred-data risks still need attention.",
    narration: [
      "Trace the many arrows into the daily machine. Now remove the activities the signing job does not need. The smaller set is easier to reason about.",
      "One arrow remains for payment files. Offline does not mean no inputs. We will control that boundary and check the transaction before authorizing it.",
    ],
  },
  {
    id: "vault-memory-and-backups",
    title: "A RAM session makes backup explicit",
    chapter: "Choosing the computing foundation",
    kind: "vault",
    concept:
      "Stateless working storage trades persistence for a deliberate recovery obligation.",
    paragraphs: [
      "Bitcoin Core Vault is the project’s offline environment for private-key operations, signing, encryption and recovery. Its current source implements a RAM-session model that keeps working data in memory rather than treating the internal disk as the permanent wallet store. Generic hardware, Debian and Core remain the foundation.",
      "In such a session, creating a wallet is not the same as preserving it. Before shutdown, make the supported Core backup, apply the intended whole-file protection and verify the external result. The final encrypted artifact and separately recoverable secrets are what allow the next session to restore access.",
      "RAM-only is a property to verify on the actual image and hardware. Swap, hibernation, temporary files, mounted persistent folders and printing paths can write sensitive information elsewhere. Shutdown is not a universal guarantee against live capture or physical memory attacks. State the tested scope instead of promising that every trace disappears.",
      "The inspected Vault source supports both Live RAM and an installed operating system with volatile user data. Its current GPG-only candidate wraps TAR in independent AES-256 OCB layers; the published v0.2.0 image predates that candidate. The Node source is still development work without an accepted ISO. Source capability must not be presented as a tested downloadable release.",
      "The existing manual Debian signer tutorial deliberately uses persistent storage and tests a cold boot. Keep that workflow available as a separate arrangement. Do not silently apply its persistence expectations to a stateless Vault session. Published release instructions and actual image behavior must agree before following image-specific operational steps.",
    ],
    caption:
      "Working memory is temporary. Exported encrypted backups and separate records carry recovery across shutdown.",
    question: "What must survive outside a stateless session?",
    answers: [
      "Only the program’s desktop shortcut.",
      "Nothing; the blockchain restores private keys.",
      "The valid protected backup and every required recovery secret.",
    ],
    answer: 2,
    feedback:
      "Session disappearance is deliberate. Recovery must rely on independently preserved information, not the working RAM copy.",
    narration: [
      "The central workspace is memory. Turn the session off and that working state is no longer the recovery plan. Follow the backup arrow out before shutdown.",
      "Compare this with the retained persistent Debian tutorial. Both can be studied, but they make different promises about what survives a restart. Verify the mode you are actually using.",
    ],
  },
  {
    id: "core-trust-evidence",
    title: "Trust needs evidence you can inspect",
    chapter: "Validation and spending authority",
    kind: "trust",
    concept:
      "Public development and reproducible builds provide distinct kinds of evidence.",
    paragraphs: [
      "Bitcoin Core is the chosen software foundation because its node and wallet functions have a long public development history and an economically important role. Public changes, reviews and release artifacts make investigation possible. That is more useful than treating a brand name as an assurance.",
      "Separate three questions. What source code was intended? Do the downloaded bytes match an authenticated release? Can independent builders reproduce those bytes from the claimed source and build environment? Source review, signed checksums and reproducible builds contribute different evidence.",
      "Core’s Guix-based release process and builder attestations support independent comparison. A matching checksum alone only relates bytes to a digest; an attacker could substitute both. A valid signature relates a statement to a key whose identity still needs authentication. The existing practical verification lesson teaches these distinctions step by step.",
      "None of these checks proves that code has no flaws or that your computer is clean. Their value is reducing and exposing trust dependencies through repeatable evidence. Learn to say exactly what a check established before relying on it for private-key operations.",
    ],
    caption:
      "Source review, authenticated checksums and independent builds answer different questions about the software you run.",
    question:
      "A downloaded file matches a checksum from the same page. What is established by that alone?",
    answers: [
      "The file matches that digest, not necessarily an authentic release.",
      "The software has no bugs.",
      "Every hardware component is trustworthy.",
    ],
    answer: 0,
    feedback:
      "Authentication of the checksum and identity of signers require additional evidence; correctness of the program is another question.",
    narration: [
      "Follow the three evidence paths. A hash compares bytes. A signature binds a statement to a key. Independent building compares the intended source process with resulting bytes.",
      "Keep those claims precise. Verification becomes useful when you can explain both what the result proves and what remains outside its scope.",
    ],
  },
  {
    id: "validate-without-querying-wallet-service",
    title: "Verify locally without handing over the wallet map",
    chapter: "Validation and spending authority",
    kind: "wallet-privacy",
    concept:
      "Independent validation and wallet-query privacy belong in the custody architecture.",
    paragraphs: [
      "Controlling signing keys answers who can authorize a payment. It does not establish whether a claimed incoming payment satisfies Bitcoin’s rules. A validating node checks blocks and transactions against the rules it enforces, giving its owner a locally established view.",
      "A wallet service asked about addresses or related script identifiers can learn relationships from the queries. Giving a service an extended public key or complete public descriptor can expose a much broader address family and history. A descriptor is a precise description of how wallet addresses and spending conditions are constructed.",
      "The online Bitcoin Core Node runs validation and a watch-only wallet. Watch-only means it recognizes the wallet’s activity without holding the savings signing keys. It prepares payment proposals and broadcasts the result after the offline Vault signs. Public descriptors connect the two roles but remain sensitive financial information.",
      "Local validation removes the need for a third-party wallet-query service in this workflow. It does not make all network activity anonymous: peers, transaction broadcast and compromised endpoints remain separate considerations. Distinguish the privacy benefit actually obtained from a claim of complete invisibility.",
    ],
    caption:
      "The local node validates chain data and observes the wallet. Only transaction proposals cross to the offline signing environment.",
    question:
      "Why protect a public wallet descriptor if it cannot spend by itself?",
    answers: [
      "It is always a private key.",
      "It can reveal address relationships, balances and transaction history.",
      "It is needed to create new bitcoin.",
    ],
    answer: 1,
    feedback:
      "Observation and authorization are different powers. Public descriptor exposure can compromise privacy without enabling a signature.",
    narration: [
      "On one side, address queries travel to an outside wallet service. On the other, your own node recognizes the wallet using its local data.",
      "Now follow the private keys: they remain on the offline signer. This separates observation from authorization while keeping the public wallet map private too.",
    ],
  },
  {
    id: "validation-cost-and-friction",
    title: "The wait buys independent verification",
    chapter: "Validation and spending authority",
    kind: "blockchain",
    concept:
      "Synchronization and storage are operating costs to evaluate, not defects to hide.",
    paragraphs: [
      "A full validating node downloads and checks blockchain history. Pruning saves disk space by discarding old block files after validation; it does not skip that validation. Recovering an old wallet may require history the pruned node no longer retains.",
      "Compare a continuously synchronized node, an intermittently used local node and a separately hosted node. They trade availability, storage, administration and trust in different ways. A remotely hosted node can still be your own Core instance, but its host and connection belong in the threat and privacy model.",
      "If your local node is six months behind, obtaining an independently current view takes time. That delay can provide incidental friction in a pressured situation. It is not an enforced spending lock: someone with usable signing keys and another source of transaction information may bypass your unsynchronized node. Do not depend on being behind as a coercion defense.",
      "Choose the arrangement from the required workflow and horizon. For long-term savings, the resources spent on verification may be small compared with their value. For regular availability, a maintained online node paired with an offline signer keeps the jobs separate. The retained pruning and migration tutorials show the practical consequences.",
    ],
    caption:
      "Pruned, archival, intermittent and hosted arrangements trade retained history, availability and operating dependencies.",
    question:
      "Does a node six months behind impose a Bitcoin-enforced spending delay?",
    answers: [
      "Yes, until that exact machine synchronizes.",
      "Yes, if its wallet is encrypted.",
      "No; usable keys can potentially sign using another source of transaction information.",
    ],
    answer: 2,
    feedback:
      "Synchronization delay is local operational friction, not a consensus timelock on spending.",
    narration: [
      "Let the node fall behind. Your chosen workflow now needs catch-up time. But draw another source of transaction data and the supposed lock is gone.",
      "Treat the resource cost as an investment in your own current view. Choose availability deliberately rather than confusing inconvenience with a network-enforced rule.",
    ],
  },
  {
    id: "access-versus-authorization",
    title: "Protecting keys and dividing authority are different jobs",
    chapter: "Validation and spending authority",
    kind: "policy",
    concept:
      "Encryption controls access to stored secrets; multisig changes which signatures can spend.",
    paragraphs: [
      "Layered encryption protects access to signing information and lets its required secrets be stored separately. After all layers are opened, a single-signature wallet still needs one signing authority for a payment. The network does not know how many file-encryption passwords were used.",
      "A 2-of-3 multisignature policy instead requires valid signatures from any two designated keys. That rule applies to spending the outputs. It is useful when independent people or systems must share authorization, for example when two financial controllers must approve a treasury payment.",
      "Multisig can also tolerate a missing key or limit the effect of one compromised signer; those benefits depend on its threshold and actual independence. It still needs redundant backups, complete policy records and tested recovery. Encrypted backup architecture and threshold authorization can be combined rather than treated as interchangeable products.",
      "Common public multisig descriptors contain the keys and structure needed to observe the whole wallet. A holder of one backup may therefore learn balances without being able to spend alone. That visibility may fit authorized participants who need to assess what they sign, but it is still a privacy decision. Keep the detailed multi-vendor and recovery lessons for the advanced laboratory after mastering the simpler workflow.",
    ],
    caption:
      "Nested locks protect stored material. A 2-of-3 signature threshold governs spending even after a signer is unlocked.",
    question:
      "Two GPG layers around one single-sig wallet create which Bitcoin spending rule?",
    answers: [
      "The original single-signature rule.",
      "A 2-of-3 rule.",
      "A timelocked rule.",
    ],
    answer: 0,
    feedback:
      "File encryption does not change the output’s spending conditions. Multisig requires a separately constructed signing policy.",
    narration: [
      "Open every file lock on the left. You still reach one signing authority. On the right, unlock one signer: the two-of-three rule still requires another valid signature.",
      "Ask which problem you need to solve. Protecting stored secrets, tolerating loss and distributing authority are related, but they are not the same mechanism.",
    ],
  },
  {
    id: "connect-reasoning-to-practice",
    title: "Now make the reasoning work on real tools",
    chapter: "Validation and spending authority",
    kind: "architecture",
    concept:
      "A custody design becomes credible when its recovery works without the originals.",
    paragraphs: [
      "You can now explain why the architecture has separate jobs: validated information online, signing authority offline, protected backup files and independently recoverable secrets. Every component answers a problem we introduced earlier. The next part of the journey applies those ideas to the existing practical curriculum.",
      "Retained lessons cover Linux investigation, authenticated installation, wallet creation, passphrase generation, encryption, backups, receiving, fees, restoration and signing again. Practice starts with valueless test coins. Understanding a diagram does not demonstrate that you can select the correct wallet, recover its password or recognize a substituted destination.",
      "Then separate the online and offline roles. Public descriptors connect their address knowledge. PSBT files carry proposed and signed transactions between them. Restore on a replacement signer, rebuild the watch-only coordinator and complete a controlled payment without the original devices. Maintain readable recovery instructions and rehearse with the intended recovery person.",
      "Only after that foundation do the optional advanced lessons test independent signers, complete policy recovery, Taproot and time-conditioned alternatives. Keep protocol possibilities distinct from implemented tool workflows. A more elaborate policy must earn its place by solving a specific problem you can describe and test.",
    ],
    caption:
      "Validate and prepare online; inspect and sign offline; broadcast online. Recover from separate artifacts without the original computers.",
    question:
      "Which result provides the strongest evidence of a usable backup?",
    answers: [
      "A filename appearing on a drive.",
      "A controlled payment signed after independent restoration using recovered records.",
      "A progress badge on this website.",
    ],
    answer: 1,
    feedback:
      "Restoration followed by signing tests the complete recovery path. Local progress records understanding and self-reported practice, not custody certification.",
    narration: [
      "Trace the payment proposal across the boundary and the signature back. The private keys do not need to join the online node.",
      "Now remove the original computers. Follow the backup and record paths to replacements. That is the experiment the retained practical lessons will teach you to perform.",
    ],
  },
]

export const foundationLessons: (PlayerLesson & LessonMedia)[] =
  definitions.map((d, i) => ({
    id: d.id,
    slug: d.id,
    title: d.title,
    summary: d.concept,
    objective: d.concept,
    what: d.concept,
    why: d.paragraphs[0],
    risk: d.caption,
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Conceptual architecture · existing Core 31.1 practice",
    contentUpdated: "2026-10-25",
    sourceReviewed: "2026-10-25",
    reviewNote:
      "Conceptual explanation; practical procedures and their recorded verification scope remain in the linked existing lessons.",
    origin: "first-principles-v5",
    kind: "reading",
    optional: false,
    estimatedTime: "5–8 min",
    chapter: d.chapter,
    explanation: d.paragraphs,
    prerequisites: i ? [definitions[i - 1].id] : [],
    takeaway: d.concept,
    visual: { kind: d.kind, title: d.title, caption: d.caption },
    understanding: {
      prompt: d.question,
      correct: d.answer,
      options: d.answers.map((text, index) => ({
        text,
        feedback:
          index === d.answer
            ? d.feedback
            : `Reconsider the example. ${d.feedback}`,
      })),
    },
    videoUrl: null,
    videoScript: [
      {
        scene: "Introduce the visual and its starting arrangement.",
        narration: d.narration[0],
      },
      {
        scene:
          "Demonstrate the example step by step. Pause before revealing the changed state.",
        narration: foundationDemonstrations[d.id],
      },
      {
        scene:
          "Change the visual, pause for a prediction, then explain the result.",
        narration: d.narration[1],
      },
    ],
    sources: [
      ...(d.id === "vault-memory-and-backups" ||
      d.id === "encrypt-an-encrypted-file" ||
      d.id === "connect-reasoning-to-practice"
        ? [
            {
              label: "Bitcoin Core Vault: source and release status",
              url: "https://github.com/btcpavao/bitcoin-core-vault#readme",
            },
            {
              label: "Bitcoin Core Node: candidate status and roles",
              url: "https://github.com/btcpavao/bitcoin-core-node/tree/feature/node-v1#readme",
            },
          ]
        : []),
      ...(d.id === "core-trust-evidence"
        ? [
            {
              label: "Bitcoin Core: Guix build process",
              url: "https://github.com/bitcoin/bitcoin/blob/v31.1/contrib/guix/README.md",
            },
          ]
        : []),
      ...(d.id === "encrypt-an-encrypted-file"
        ? [
            {
              label: "7-Zip: 7z encryption format",
              url: "https://www.7-zip.org/7z.html",
            },
          ]
        : []),
      {
        label: "Bitcoin Core: wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "GnuPG: symmetric encryption and password derivation",
        url: "https://gnupg.org/documentation/manuals/gnupg/OpenPGP-Options.html",
      },
      {
        label: "KeePassXC: passphrase generator",
        url: "https://keepassxc.org/docs/KeePassXC_GettingStarted",
      },
    ],
  }))

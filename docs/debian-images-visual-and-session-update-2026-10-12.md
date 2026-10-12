# Debian images: illustration, software and session clarification

## User-visible changes

- Shared Debian announcement now includes Tux with the site's orange Bitcoin emblem.
- The curriculum announcement is inside the existing overview content container and shares the adjacent framework card's 70rem width.
- The image detail page links the named software to official project sites and shows a wrapping row of eight upstream application logos for Vault.
- Offline signer is described as live RAM only. Vault supports live RAM and installed OS modes, with private session data in RAM in either case. The online node retains chain/watch-only data.
- Three curriculum callouts now explain those storage distinctions.
- Added an independent verification explanation: authenticate the ISO, verify upstream packages/Core, inspect all local preparation, rebuild/compare and test runtime storage and recovery.

## Fact-check after drafting

Read-only evidence was obtained from the existing core-signer-os repository's README, RAM session hook, runtime mount checks, installer target setup and security-check script on 2026-10-12. These describe protected tmpfs for the Vault home/workspace, disabled swap and hibernation, volatile logs, disabled persistent crash dumps, and a persistent OS with a volatile private session when installed. The Core launcher confines writes to checked RAM locations. Export and file/archive tools can still deliberately write to external destinations.

The wording therefore does not promise that nothing anywhere can ever touch a disk, secure erasure of prior disk contents, or physical RAM sanitization. Session termination discards volatile workspace data; intentional exports remain. The signer’s live-only role follows the project owner's specified product distinction.

The same source explicitly records local helpers and patched or locally built Arqiver, Thunar and Calamares packages. The page identifies these additions instead of claiming that the whole image consists only of unchanged official binaries. Verification resources and complete-image reproducibility are presented as release requirements, not as an independent certification already performed in this website task.

Primary references:

- https://bitcoincore.org/en/download/
- https://manpages.debian.org/trixie/apt/apt-secure.8.en.html
- https://www.debian.org/CD/verify
- https://keepassxc.org/verifying-signatures/
- https://reproducible-builds.org/docs/definition/

The Debian image-verification URL is the official documentation destination; the web reader timed out on that page. Signature/checksum mechanics were cross-checked with the readable Core, APT and KeePassXC documentation.

## Artwork provenance

Final website asset: `btcpavao-github-io/public/illustrations/tux-bitcoin.webp` (600 × 670, transparent alpha, approximately 42 kB). Generated with the built-in imagegen tool, using `public/bitcoin-logo-official.png` as the logo reference. The PNG master was retained in the generated-images output; the website rendition was resized and encoded to WebP without changing the composition.

Generation prompt:

> Use case: illustration-story. Create a single transparent website mascot cutout: the classic, recognizable Linux Tux penguin, seated front-facing, with black head and flippers, a large white rounded belly, friendly classic Tux eyes, yellow-orange beak and two broad yellow-orange feet pointing outward. Faithful classic Linux Tux illustration style with smooth subtle shading and crisp clean contours, not a realistic bird or a new unrelated character. Put the Bitcoin logo from the supplied reference image centered on Tux's white belly, as a flat printed emblem: orange circular disk with the exact white clockwise-tilted Bitcoin B and two vertical strokes. The reference is only the logo to place on the belly. Keep the orange disk fully visible and clean, about half the width of the white belly. Full body with both feet, flippers, and head fully inside the canvas. Tight composition with about 5 percent transparent margin all around. No other objects, no lettering, no background, no ground plane, no cast shadow. Output actual transparent alpha. This illustration will appear roughly 190 to 230 CSS pixels tall on the right of a cream-colored Debian/Bitcoin Core announcement card and must also work on dark mode.

Official software icon source URLs, pinned to revisions, are in `public/software/sources.json`. Their license texts accompany them in `public/software/licenses/`. These icons were not AI-generated.

## Validation

Production build, internal-link/asset checks, 27 curriculum checks and targeted ESLint passed. The expanded Debian page is loaded as its own route chunk and preloaded before hydration; the shared entry remains within its existing size limit (353,765 bytes).

Desktop and mobile checks cover the homepage, Core hub, curriculum overview and Debian detail page. No horizontal overflow at 1280px or 390px; announcement text keeps 36px desktop and 28px mobile left clearance, and Tux keeps at least 25px from the mobile right border. All eight Vault software logos loaded. Light and dark theme presentation was inspected. Saved curriculum progress and completion requirements are unchanged.

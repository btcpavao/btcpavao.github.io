# btcpavao.github.io

Personal website for [Pavao Pahljina / @btcpavao](https://github.com/btcpavao), focused on Bitcoin Standard advisory work, writing, and community building.

## What This Site Is

This is Pavao's personal home base and lead funnel for practical Bitcoin Standard guidance.

The live site is:

- <https://btcpavao.github.io/>

The page highlights:

- Bitcoin Standard Advisor positioning
- Advisory calls and practical education
- Practical Bitcoin Standard writing
- Current Bitcoin education, books, media, and community projects
- Contact paths through email and Cal.com

## Current App Location

The active site is the Vite app in [`btcpavao-github-io/`](btcpavao-github-io/).

GitHub Pages deploys the generated [`btcpavao-github-io/dist/`](btcpavao-github-io/dist/) output through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Older static files were moved to [`archive/static-v1/`](archive/static-v1/) and are not deployed by the current workflow.

## Content Editing Guide

- Main page content: [`btcpavao-github-io/src/App.tsx`](btcpavao-github-io/src/App.tsx)
- Theme and global styles: [`btcpavao-github-io/src/index.css`](btcpavao-github-io/src/index.css)
- Theme persistence: [`btcpavao-github-io/src/components/theme-provider.tsx`](btcpavao-github-io/src/components/theme-provider.tsx)
- HTML metadata: [`btcpavao-github-io/index.html`](btcpavao-github-io/index.html)
- SEO and public assets: [`btcpavao-github-io/public/`](btcpavao-github-io/public/)
- GitHub Pages workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

## SEO Files

Public SEO assets live in [`btcpavao-github-io/public/`](btcpavao-github-io/public/):

- `robots.txt`
- `sitemap.xml`
- `og-image.svg`
- `favicon.svg`
- `manifest.webmanifest`

The active HTML head includes canonical, Open Graph, Twitter card, theme color, favicon, manifest, and Person JSON-LD metadata.

## Local Development

From the app directory:

```bash
cd btcpavao-github-io
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build/Test Commands

Run these from [`btcpavao-github-io/`](btcpavao-github-io/):

```bash
npm run typecheck
npm run lint
npm run build
```

The build command runs TypeScript project references and then creates the production Vite output in `dist/`.

## Deployment

Pushes to `main` trigger the Pages workflow. The workflow:

- checks out the repository
- installs dependencies with `npm ci` inside `btcpavao-github-io`
- builds the app
- uploads `btcpavao-github-io/dist`
- deploys the artifact to GitHub Pages

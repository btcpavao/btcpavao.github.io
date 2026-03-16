# btcpavao.github.io

Personal website for [@btcpavao](https://github.com/btcpavao), focused on Bitcoin projects, writing, advisory work, and community building.

## What this site is

This repository powers:

- `https://btcpavao.github.io`

The site highlights:

- Personal positioning and biography
- Core projects (`Saifedean.com`, `TheSaifHouse.com`, `TwentyOne.World`, `DvadesetJedan.com`)
- Writing (`Practical Bitcoin Standard`)
- Social and contact links (`X`, `Nostr`, `LinkedIn`, `Cal.com`, email)

## Tech

- Vite + React + TypeScript
- shadcn/ui components
- Tailwind CSS v4
- GitHub Pages deployment via GitHub Actions

## Project layout

- App source lives in [`btcpavao-github-io/`](/Users/pavao/Documents/Playground/btcpavao-github-io)
- GitHub Pages workflow lives in [`.github/workflows/deploy.yml`](/Users/pavao/Documents/Playground/.github/workflows/deploy.yml)

## Local development

From the app directory:

```bash
cd btcpavao-github-io
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Deployment

Pushes to `main` trigger the Pages workflow, which:

- installs dependencies inside `btcpavao-github-io`
- builds the app
- deploys the generated `dist/` output to GitHub Pages

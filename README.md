# btcpavao.github.io

Personal website for [@btcpavao](https://github.com/btcpavao), focused on Bitcoin projects, writing, and community work.

## What this site is

This is the public profile site behind:

- `https://btcpavao.github.io`

It highlights:

- Bio and background
- Core projects (`Saifedean.com`, `TheSaifHouse.com`, `TwentyOne.World`, `DvadesetJedan.com`)
- Writing (`Practical Bitcoin Standard` on GitBook)
- Social and contact links (`X`, `LinkedIn`, `GitHub`, `Cal.com`, email)

## Tech

- Static HTML
- Tailwind CSS via CDN for layout and styling
- Small custom stylesheet for font smoothing and reduced-motion fallback
- Hosted on GitHub Pages from `main` branch root

## Local development

Run a local static server from repo root:

```bash
python3 -m http.server 5173
```

Open:

- `http://localhost:5173/`

## Deployment

GitHub Pages user site configuration:

- Repository: `btcpavao.github.io`
- Branch: `main`
- Folder: `/ (root)`

Any push to `main` triggers the Pages deployment workflow.

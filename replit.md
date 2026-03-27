# btcpavao.github.io — Personal Website

A personal portfolio website for Pavao Pahljina (@btcpavao), a Bitcoin entrepreneur and advisor.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI)
- **Animations:** Motion (Framer Motion), motionwind-react
- **Fonts:** Geist (variable)
- **Package Manager:** npm

## Project Layout

```
btcpavao-github-io/     # Main app directory
  src/
    components/         # UI components (including shadcn/ui)
    lib/                # Utility functions
    assets/             # Static assets (SVGs)
    App.tsx             # Main app component
    main.tsx            # Entry point
    index.css           # Global styles + Tailwind directives
  public/               # Static files
  vite.config.ts        # Vite config (host: 0.0.0.0, port: 5000, allowedHosts: true)
  package.json
```

## Development

The dev server runs via the "Start application" workflow:
```
cd btcpavao-github-io && npm run dev
```
- Runs on `0.0.0.0:5000`
- `allowedHosts: true` for Replit proxy compatibility

## Deployment

Configured as a **static** site deployment:
- **Build:** `cd btcpavao-github-io && npm run build`
- **Public Dir:** `btcpavao-github-io/dist`

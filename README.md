# Nivmizz7 Portfolio

Personal portfolio website — live at **[nivmizz7.dev](https://nivmizz7.dev)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Tech Stack

| Render | Backend | Design |
|--------|---------|--------|
| TypeScript templates (SSR, no static HTML) | Node.js + Express 5 | Plain CSS, dark early-2000s style |
| Inline data (`src/data.ts`) | TypeScript (strict, ESM) | System fonts, no icons, no client JS |

## Setup

```bash
git clone https://github.com/Nivmizz7/web.git
cd web
npm install
npm run dev    # dev avec reload (tsx watch)
npm run build  # compile src/ -> dist/
npm start      # prod (node dist/server.js)
```

Server runs on `http://localhost:3000` by default. Set `PORT` env to change.

## Routes

| Route | Page |
|-------|------|
| `/` | Home : Projets, Traductions, Contributeurs |
| `/projets/:slug` | Page projet (logo, description, liens) |
| `/traductions/:slug` | Page traduction (fichier, métadonnées, téléchargement) |
| `/contact` | Contact |
| `/api/health` | Healthcheck JSON |
| `/lang/:lang?next=/...` | Switch FR/EN (cookie) |

Old `.html` URLs redirect (301) to the new routes.

## Content

The home page lists and detail pages are defined in `src/data.ts`:

- `PROJECTS` : projets, logo, description et liens.
- `TRANSLATIONS` : fichiers de traduction, auteurs, traducteurs, version et liens.
  `image` sert à l'aperçu affiché, `download` au fichier complet téléchargeable.
- `CONTRIBUTED_REPOS` : dépôts GitHub auxquels Nivmizz7 a contribué ou qu'il maintient.

Translation images are served from `assets/`.

## License

See [LICENSE](LICENSE).

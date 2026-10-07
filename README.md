# Nivmizz7 Portfolio

Personal portfolio website — live at **[nivmizz7.dev](https://nivmizz7.dev)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)


## Tech Stack

| Render | Backend | Design |
|----------|---------|--------|
| TypeScript templates (SSR, no static HTML) | Node.js + Express 5 | Glassmorphism |
| CSS3 | TypeScript (strict, ESM) | Google Fonts (Inter) |
| Inline client script (TS) | — | Font Awesome 6 + Devicon |


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
| `/` | Accueil |
| `/projets` | Index Staff + Contributeur |
| `/projets/:slug` | 1 page par projet (`tarkovtracker`, `data-overlay`, `trackerbot`, `tarkov-dev`, `tarkovmonitor`, `cultistcircle`, `wiki-changes`) |
| `/contact` | Contact |
| `/api/health` | Healthcheck JSON |
| `/lang/:lang?next=/...` | Switch FR/EN (cookie) |

Legacy `.html` URLs redirect (301) vers les jolies routes.

Server runs on `http://localhost:3000` by default. Set `PORT` env to change.

## License

See [LICENSE](LICENSE).
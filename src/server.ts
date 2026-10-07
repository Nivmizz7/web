import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getProject } from './data.js';
import { LANG_COOKIE, isLang, resolveLang, type Lang } from './i18n.js';
import {
  contactPage,
  homePage,
  layout,
  notFoundPage,
  pageForProjectSlug,
  projectPage,
  projectsIndexPage,
  type PageId,
} from './views.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/** Racine projet : fonctionne en dev (tsx src/) comme en prod (node dist/) */
const ROOT = path.resolve(__dirname, '..');

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.disable('x-powered-by');

// Statique : /assets/*, /static/* (styles.css). Pas de HTML statique servi.
app.use('/assets', express.static(path.join(ROOT, 'assets')));
app.use('/static', express.static(path.join(ROOT, 'public')));

function langOf(req: Request): Lang {
  return resolveLang({
    query: req.query.lang,
    cookieHeader: req.headers.cookie,
    acceptLanguage: req.headers['accept-language'],
  });
}

function send(req: Request, res: Response, page: PageId, title: string, description: string, body: string): void {
  const lang = langOf(req);
  res
    .status(page === 'notfound' ? 404 : 200)
    .type('html')
    .send(layout({ lang, page, title, description, path: req.path, body }));
}

// ---------- Routes jolies ----------
app.get('/', (req, res) => {
  const lang = langOf(req);
  send(req, res, 'home', 'Accueil', 'Portfolio de Nivmizz7', homePage(lang));
});

app.get('/projets', (req, res) => {
  const lang = langOf(req);
  send(req, res, 'projets', 'Projets', 'Projets Staff et contributions', projectsIndexPage(lang));
});

app.get('/projets/:slug', (req, res) => {
  const lang = langOf(req);
  const project = getProject(req.params.slug);
  if (!project) {
    send(req, res, 'notfound', '404', 'Page introuvable', notFoundPage(lang));
    return;
  }
  send(req, res, pageForProjectSlug(project.slug), project.title, project.short[lang], projectPage(lang, project));
});

app.get('/contact', (req, res) => {
  const lang = langOf(req);
  send(req, res, 'contact', 'Contact', 'Contacter Nivmizz7', contactPage(lang));
});

// ---------- API ----------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', version: '2.0.0-ts', uptime: Math.round(process.uptime()) });
});

// ---------- Langue : /lang/fr?next=/projets -> cookie + redirect ----------
app.get('/lang/:lang', (req, res) => {
  const rawNext = Array.isArray(req.query.next) ? req.query.next[0] : req.query.next;
  const next = typeof rawNext === 'string' && rawNext.startsWith('/') ? rawNext : '/';
  if (!isLang(req.params.lang)) {
    res.redirect(302, next);
    return;
  }
  res.cookie(LANG_COOKIE, req.params.lang, {
    maxAge: 365 * 24 * 3600 * 1000,
    path: '/',
    sameSite: 'lax',
  });
  res.redirect(302, next);
});

// ---------- Redirects legacy vieux .html -> jolies routes ----------
const LEGACY: Record<string, string> = {
  '/index.html': '/',
  '/contact.html': '/contact',
  '/projet-tarkovtracker.html': '/projets/tarkovtracker',
  '/projet-data-overlay.html': '/projets/data-overlay',
  '/projet-trackerbot.html': '/projets/trackerbot',
  '/projet-tarkovdev.html': '/projets/tarkov-dev',
  '/projet-tarkovmonitor.html': '/projets/tarkovmonitor',
  '/projet-cultist.html': '/projets/cultistcircle',
};
for (const [from, to] of Object.entries(LEGACY)) {
  app.get(from, (_req, res) => res.redirect(301, to));
}

// ---------- 404 ----------
app.use((req, res) => {
  const lang = langOf(req);
  send(req, res, 'notfound', '404', 'Page introuvable', notFoundPage(lang));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

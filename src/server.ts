import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getProject, getTranslation } from './data.js';
import { LANG_COOKIE, isLang, resolveLang, type Lang } from './i18n.js';
import {
  contactPage,
  homePage,
  layout,
  notFoundPage,
  projectPage,
  translationPage,
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

// ---------- Routes ----------
app.get('/', (req, res) => {
  const lang = langOf(req);
  send(req, res, 'home', 'Nivmizz7', 'Portfolio de Nivmizz7', homePage(lang));
});

app.get('/projets/:slug', (req, res) => {
  const lang = langOf(req);
  const project = getProject(req.params.slug);
  if (!project) {
    send(req, res, 'notfound', '404 — Nivmizz7', 'Page introuvable', notFoundPage(lang));
    return;
  }
  send(req, res, 'project', `${project.title[lang]} — Nivmizz7`, project.short[lang], projectPage(lang, project));
});

app.get('/traductions/:slug', (req, res) => {
  const lang = langOf(req);
  const translation = getTranslation(req.params.slug);
  if (!translation) {
    send(req, res, 'notfound', '404 — Nivmizz7', 'Page introuvable', notFoundPage(lang));
    return;
  }
  send(
    req,
    res,
    'translation',
    `${translation.file} — Nivmizz7`,
    `Traduction française de ${translation.file}`,
    translationPage(lang, translation),
  );
});

app.get('/contact', (req, res) => {
  const lang = langOf(req);
  send(req, res, 'contact', 'Contact — Nivmizz7', 'Contacter Nivmizz7', contactPage(lang));
});

// ---------- API ----------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', version: '3.0.0', uptime: Math.round(process.uptime()) });
});

// ---------- Langue : /lang/fr?next=/contact -> cookie + redirect ----------
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

// ---------- Redirects legacy -> nouvelles routes ----------
const LEGACY: Record<string, string> = {
  '/index.html': '/',
  '/contact.html': '/contact',
  '/projets': '/',
  '/traductions': '/',
  '/projet-tarkovtracker.html': '/projets/tarkovtracker',
  '/projet-data-overlay.html': '/',
  '/projet-trackerbot.html': '/',
  '/projet-tarkovdev.html': '/',
  '/projet-tarkovmonitor.html': '/',
  '/projet-cultist.html': '/',
};
for (const [from, to] of Object.entries(LEGACY)) {
  app.get(from, (_req, res) => res.redirect(301, to));
}

// ---------- 404 ----------
app.use((req, res) => {
  const lang = langOf(req);
  send(req, res, 'notfound', '404 — Nivmizz7', 'Page introuvable', notFoundPage(lang));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

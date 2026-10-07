import { type Lang, t } from './i18n.js';
import {
  type Project,
  PROJECTS,
  contribProjects,
  contributorAvatar,
  contributorProfile,
  ownProjects,
  projectNeighbors,
  staffProjects,
} from './data.js';

export type PageId =
  | 'home'
  | 'projets'
  | 'tracker'
  | 'overlay'
  | 'bot'
  | 'tarkovdev'
  | 'monitor'
  | 'cultist'
  | 'wikichanges'
  | 'contact'
  | 'notfound';

/** Slug projet -> PageId pour surligner l'entrée active du menu */
const SLUG_TO_PAGE: Record<string, PageId> = {
  tarkovtracker: 'tracker',
  'data-overlay': 'overlay',
  trackerbot: 'bot',
  'tarkov-dev': 'tarkovdev',
  tarkovmonitor: 'monitor',
  cultistcircle: 'cultist',
  'wiki-changes': 'wikichanges',
};

export function pageForProjectSlug(slug: string): PageId {
  return SLUG_TO_PAGE[slug] ?? 'projets';
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function miniVisualHtml(project: Project): string {
  return `<i class="mini-icon ${esc(project.icon)}"></i>`;
}

function projectCard(lang: Lang, project: Project): string {
  return `<a class="card" href="/projets/${esc(project.slug)}">
    <h3>${miniVisualHtml(project)} ${esc(project.title)}</h3>
    <p>${esc(project.short[lang])}</p>
    <span class="go">${esc(t(lang, 'home.open'))}</span>
  </a>`;
}

/** Drapeaux inline SVG (les emoji 🇫🇷/🇬🇧 ne s'affichent pas partout, ex. Linux sans fonte emoji) */
const FLAG_FR = `<svg class="flag-icon" viewBox="0 0 3 2" aria-hidden="true"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#ffffff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>`;
const FLAG_GB = `<svg class="flag-icon" viewBox="0 0 60 30" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2"/><path d="M30,0 V30 M0,15 H60" stroke="#ffffff" stroke-width="10"/><path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6"/></svg>`;

/** Petit script client inline (burger + dropdowns) — pas de fichier JS externe */
const CLIENT_SCRIPT = `
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');
  if (burger && nav) burger.addEventListener('click', () => nav.classList.toggle('open'));
  const toggles = document.querySelectorAll('.has-dropdown > .dropdown-toggle');
  toggles.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.parentElement;
      const wasOpen = parent && parent.classList.contains('open');
      document.querySelectorAll('.has-dropdown.open').forEach((d) => d.classList.remove('open'));
      if (parent && !wasOpen) parent.classList.add('open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.has-dropdown.open').forEach((d) => d.classList.remove('open'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.has-dropdown.open').forEach((d) => d.classList.remove('open'));
  });
  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
});
`;

export interface LayoutOpts {
  lang: Lang;
  page: PageId;
  title: string;
  description: string;
  path: string;
  body: string;
}

export function layout(opts: LayoutOpts): string {
  const { lang, page, title, description, path, body } = opts;
  const active = (id: string): string => (page === id ? ' active' : '');
  const next = encodeURIComponent(path);

  const staffLinks = staffProjects()
    .map(
      (p) =>
        `<a data-nav="${pageForProjectSlug(p.slug)}" class="${page === pageForProjectSlug(p.slug) ? 'active' : ''}" href="/projets/${p.slug}">${miniVisualHtml(p)} ${esc(p.title)}</a>`,
    )
    .join('\n');
  const contribLinks = contribProjects()
    .map(
      (p) =>
        `<a data-nav="${pageForProjectSlug(p.slug)}" class="${page === pageForProjectSlug(p.slug) ? 'active' : ''}" href="/projets/${p.slug}">${miniVisualHtml(p)} ${esc(p.title)}</a>`,
    )
    .join('\n');
  const ownLinks = ownProjects()
    .map(
      (p) =>
        `<a data-nav="${pageForProjectSlug(p.slug)}" class="${page === pageForProjectSlug(p.slug) ? 'active' : ''}" href="/projets/${p.slug}">${miniVisualHtml(p)} ${esc(p.title)}</a>`,
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} — Nivmizz7</title>
  <meta name="description" content="${esc(description)}">
  <link rel="icon" href="/assets/valery.png" type="image/png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
  <link rel="stylesheet" href="/static/styles.css">
</head>
<body data-page="${page}">
<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="/"><img src="/assets/valery.png" alt="Nivmizz7"> Nivmizz7</a>
    <button class="burger" id="burger" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
    <nav class="main-nav" id="main-nav">
      <a class="nav-link${active('home')}" href="/">${esc(t(lang, 'nav.home'))}</a>
      <div class="has-dropdown">
        <button class="dropdown-toggle" type="button"><span>${esc(t(lang, 'nav.projects'))}</span> <span class="caret">▼</span></button>
        <div class="dropdown-menu">
          <div class="dropdown-label">${esc(t(lang, 'nav.staff'))}</div>
          ${staffLinks}
          <div class="dropdown-label">${esc(t(lang, 'nav.contrib'))}</div>
          ${contribLinks}
          <div class="dropdown-label">${esc(t(lang, 'nav.own'))}</div>
          ${ownLinks}
        </div>
      </div>
      <a class="nav-link${active('contact')}" href="/contact">${esc(t(lang, 'nav.contact'))}</a>
      <div class="lang-switcher" role="group" aria-label="Language">
        <a class="lang-btn${lang === 'fr' ? ' active' : ''}" href="/lang/fr?next=${next}">${FLAG_FR} FR</a>
        <a class="lang-btn${lang === 'en' ? ' active' : ''}" href="/lang/en?next=${next}">${FLAG_GB} EN</a>
      </div>
    </nav>
  </div>
</header>
<main class="page">
${body}
</main>
<footer>
  <p>© <span id="current-year"></span> Nivmizz7 | <a href="https://github.com/Nivmizz7" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a> | <a href="https://status.nivmizz7.dev/status/niv" target="_blank"><i class="fa-solid fa-circle" style="color: #22c55e; font-size: 0.6rem;"></i> Status</a></p>
</footer>
<script>${CLIENT_SCRIPT}</script>
</body>
</html>`;
}

// ---------- Pages ----------

export function homePage(lang: Lang): string {
  const buttons = PROJECTS.map((p) => {
    return `<a class="see-btn" href="/projets/${esc(p.slug)}"><i class="${esc(p.icon)}"></i><span>${esc(p.title)}</span></a>`;
  }).join('\n');
  return `<section class="hero glass-panel hero-clean">
    <img src="/assets/valery.png" alt="Nivmizz7" class="profile-photo">
    <div>
      <h1>Nivmizz7</h1>
      <p class="subtitle">${esc(t(lang, 'home.subtitle'))}</p>
    </div>
  </section>
  <section class="section glass-panel">
    <h2>${esc(t(lang, 'home.see'))}</h2>
    <div class="see-grid">${buttons}</div>
  </section>`;
}

export function projectsIndexPage(lang: Lang): string {
  const staffCards = staffProjects().map((p) => projectCard(lang, p)).join('\n');
  const contribCards = contribProjects().map((p) => projectCard(lang, p)).join('\n');
  const ownCards = ownProjects().map((p) => projectCard(lang, p)).join('\n');
  return `<section class="section glass-panel">
    <h2>${esc(t(lang, 'projects.title'))}</h2>
    <p class="muted">${esc(t(lang, 'projects.subtitle'))}</p>
    <h3 class="group-title">${esc(t(lang, 'nav.staff'))}</h3>
    <div class="cards">${staffCards}</div>
    <h3 class="group-title">${esc(t(lang, 'nav.contrib'))}</h3>
    <div class="cards">${contribCards}</div>
    <h3 class="group-title">${esc(t(lang, 'nav.own'))}</h3>
    <div class="cards">${ownCards}</div>
  </section>`;
}

export function projectPage(lang: Lang, project: Project): string {
  const { prev, next } = projectNeighbors(project.slug);
  const tags = project.tags.map((tag) => `<span>${esc(tag)}</span>`).join('');
  const features = project.features.map((f) => `<li>${esc(f)}</li>`).join('');
  const avatars = project.contributors
    .map(
      (login) =>
        `<a href="${esc(contributorProfile(login))}" target="_blank" rel="noopener" title="${esc(login)}"><img src="${esc(contributorAvatar(login))}" alt="${esc(login)}" loading="lazy"></a>`,
    )
    .join('\n');
  const links = project.links
    .map((l) =>
      l.label === 'Live'
        ? `<a class="btn btn-primary" href="${esc(l.href)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>`
        : `<a class="btn" href="${esc(l.href)}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>`,
    )
    .join('\n');
  return `<article class="glass-panel project-hero">
    <div class="project-content">
      <h1>${esc(project.title)}</h1>
      <p class="desc">${esc(project.short[lang])}</p>
      <div class="tags">${tags}</div>
      <p class="desc">${esc(project.long[lang])}</p>
      <h2 style="font-size:1rem">${esc(t(lang, 'projects.features'))}</h2>
      <ul class="feature-list">${features}</ul>
      <h2 style="font-size:1rem">${esc(t(lang, 'projects.contributors'))}</h2>
      <div class="contributors">${avatars}</div>
      <div class="links-row">${links}</div>
      <div class="prev-next">
        <a class="btn" href="/projets/${esc(prev.slug)}">${esc(t(lang, 'projects.prev'))}</a>
        <a class="btn" href="/projets/${esc(next.slug)}">${esc(t(lang, 'projects.next'))}</a>
      </div>
    </div>
  </article>`;
}

export function contactPage(lang: Lang): string {
  return `<section class="section glass-panel">
    <h2>${esc(t(lang, 'contact.title'))}</h2>
    <p class="muted">${esc(t(lang, 'contact.text'))}</p>
    <div class="contact-lines">
      <p><i class="fa-solid fa-envelope" style="color:#64748b; margin-right:10px;"></i><a href="mailto:niv@nivmizz7.dev">niv@nivmizz7.dev</a></p>
      <p><i class="fa-brands fa-discord" style="color:#5865F2; margin-right:10px;"></i><a href="https://discord.gg/PpdDwd2M6V" target="_blank" rel="noopener noreferrer">${esc(t(lang, 'contact.discord'))}</a></p>
      <p><i class="fa-brands fa-github" style="margin-right:10px;"></i><a href="https://github.com/Nivmizz7" target="_blank" rel="noopener">github.com/Nivmizz7</a></p>
    </div>
  </section>`;
}

export function notFoundPage(lang: Lang): string {
  return `<section class="section glass-panel" style="text-align:center">
    <h2>404 — ${esc(t(lang, 'notfound.title'))}</h2>
    <p class="muted">${esc(t(lang, 'notfound.text'))}</p>
    <div class="cta-row" style="justify-content:center"><a class="btn btn-primary" href="/">Nivmizz7 — ${esc(t(lang, 'nav.home'))}</a></div>
  </section>`;
}

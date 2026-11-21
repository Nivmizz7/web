import { type Lang, t } from './i18n.js';
import {
  type Project,
  type Translation,
  CONTRIBUTED_REPOS,
  PROJECTS,
  TRANSLATIONS,
} from './data.js';

export type PageId = 'home' | 'project' | 'translation' | 'contact' | 'notfound';

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

interface ListEntry {
  label: string;
  href: string;
  external?: boolean;
}

function linkList(entries: ListEntry[]): string {
  return entries
    .map((entry) => {
      const attrs = entry.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<li><span class="dash">-</span> <a href="${esc(entry.href)}"${attrs}>${esc(entry.label)}</a></li>`;
    })
    .join('\n');
}

function peopleLinks(people: { name: string; url: string }[]): string {
  return people
    .map(
      (person) =>
        `<a href="${esc(person.url)}" target="_blank" rel="noopener noreferrer">${esc(person.name)}</a>`,
    )
    .join(', ');
}

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
  const next = encodeURIComponent(path);
  const year = new Date().getFullYear();

  const navLink = (id: PageId, href: string, label: string): string =>
    `<a href="${href}"${page === id ? ' class="active"' : ''}>${esc(label)}</a>`;

  const langLink = (code: Lang): string =>
    lang === code
      ? `<span class="active">${code.toUpperCase()}</span>`
      : `<a href="/lang/${code}?next=${next}">${code.toUpperCase()}</a>`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="icon" href="/assets/valery.png" type="image/png">
  <link rel="stylesheet" href="/static/styles.css">
</head>
<body data-page="${page}">
<header class="topbar">
  <div class="topbar-inner">
    <a class="pp" href="/" aria-label="Nivmizz7"><img src="/assets/valery.png" alt="Nivmizz7" width="30" height="30"></a>
    <nav class="main-nav">
      ${navLink('home', '/', t(lang, 'nav.home'))}
      ${navLink('contact', '/contact', t(lang, 'nav.contact'))}
    </nav>
    <div class="langs">${langLink('fr')}<span>/</span>${langLink('en')}</div>
  </div>
</header>
<main class="page">
${body}
</main>
<footer>
  <p>© ${year} Nivmizz7 | <a href="https://github.com/Nivmizz7" target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="https://status.nivmizz7.dev/status/niv" target="_blank" rel="noopener noreferrer">Status</a></p>
</footer>
</body>
</html>`;
}

// ---------- Pages ----------

export function homePage(lang: Lang): string {
  const projects: ListEntry[] = PROJECTS.map((project) => ({
    label: project.title[lang],
    href: `/projets/${project.slug}`,
  }));
  const translations: ListEntry[] = TRANSLATIONS.map((translation) => ({
    label: translation.title,
    href: `/traductions/${translation.slug}`,
  }));
  const repos: ListEntry[] = CONTRIBUTED_REPOS.map((repo) => ({
    label: repo.name,
    href: repo.url,
    external: true,
  }));

  return `<h1 class="sr-only">Nivmizz7</h1>
<section>
  <h2>${esc(t(lang, 'home.projects'))}</h2>
  <ul class="links">
${linkList(projects)}
  </ul>
</section>
<section>
  <h2>${esc(t(lang, 'home.translations'))}</h2>
  <ul class="links">
${linkList(translations)}
  </ul>
</section>
<section>
  <h2>${esc(t(lang, 'home.contributors'))}</h2>
  <ul class="links">
${linkList(repos)}
  </ul>
</section>`;
}

export function projectPage(lang: Lang, project: Project): string {
  const role = project.role
    ? `<p class="role">${esc(t(lang, 'project.role'))} ${esc(project.role[lang])}</p>`
    : '';
  const links: ListEntry[] = project.links.map((link) => ({
    label: link.label,
    href: link.href,
    external: true,
  }));

  const title = project.title[lang];

  return `<h1>${esc(title)}</h1>
${role}
<div class="project-head">
  <img class="project-logo" src="${esc(project.logo)}" alt="${esc(title)}">
  <p>${esc(project.short[lang])}</p>
</div>
<h2>${esc(t(lang, 'project.links'))}</h2>
<ul class="links">
${linkList(links)}
</ul>
<p class="back"><span class="dash">-</span> <a href="/">${esc(t(lang, 'common.back'))}</a></p>`;
}

export function translationPage(lang: Lang, translation: Translation): string {
  const otherLinks: ListEntry[] = translation.otherLinks.map((link) => ({
    label: link.label,
    href: link.href,
    external: true,
  }));

  return `<h1>${esc(translation.title)}</h1>
<p><a href="${esc(translation.download)}" target="_blank" rel="noopener noreferrer"><img class="translation-image" src="${esc(translation.image)}" alt="${esc(translation.file)}"></a></p>
<p><strong>${esc(t(lang, 'translation.authors'))}</strong> ${peopleLinks(translation.authors)}</p>
<p><strong>${esc(t(lang, 'translation.translators'))}</strong> ${peopleLinks(translation.translators)}</p>
<p><strong>${esc(t(lang, 'translation.version'))}</strong> ${esc(translation.version)}</p>
<div class="translation-download">
<h2>${esc(t(lang, 'translation.download'))}</h2>
<ul class="links">
  <li><span class="dash">-</span> <a href="${esc(translation.download)}" download="${esc(translation.file)}">${esc(translation.file)}</a></li>
</ul>
</div>
<h2>${esc(t(lang, 'translation.otherLinks'))}</h2>
<ul class="links">
${linkList(otherLinks)}
</ul>
<p class="back"><span class="dash">-</span> <a href="/">${esc(t(lang, 'common.back'))}</a></p>`;
}

export function contactPage(lang: Lang): string {
  return `<h1>${esc(t(lang, 'contact.title'))}</h1>
<p>${esc(t(lang, 'contact.text'))}</p>
<ul class="links">
  <li><span class="dash">-</span> <a href="mailto:niv@nivmizz7.dev">niv@nivmizz7.dev</a></li>
  <li><span class="dash">-</span> <a href="https://discord.gg/PpdDwd2M6V" target="_blank" rel="noopener noreferrer">${esc(t(lang, 'contact.discord'))}</a></li>
  <li><span class="dash">-</span> <a href="https://github.com/Nivmizz7" target="_blank" rel="noopener noreferrer">github.com/Nivmizz7</a></li>
</ul>`;
}

export function notFoundPage(lang: Lang): string {
  return `<h1>404 — ${esc(t(lang, 'notfound.title'))}</h1>
<p>${esc(t(lang, 'notfound.text'))}</p>
<ul class="links">
  <li><span class="dash">-</span> <a href="/">${esc(t(lang, 'common.back'))}</a></li>
</ul>`;
}

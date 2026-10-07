export type Lang = 'fr' | 'en';

export const LANG_COOKIE = 'niv-lang';
export const DEFAULT_LANG: Lang = 'fr';

const STRINGS = {
  // nav
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.projects': { fr: 'Projets', en: 'Projects' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.staff': { fr: 'Staff', en: 'Staff' },
  'nav.contrib': { fr: 'Contributeur', en: 'Contributor' },
  'nav.own': { fr: 'Perso', en: 'Own' },
  // home
  'home.subtitle': {
    fr: 'Développeur Web Back-end & Gestion / Maintenance de serveurs',
    en: 'Back-end Web Developer & Server Management / Maintenance',
  },
  'home.see': { fr: 'Voir :', en: 'See:' },
  'home.open': { fr: 'Ouvrir →', en: 'Open →' },
  // projets
  'projects.title': { fr: 'Projets', en: 'Projects' },
  'projects.subtitle': {
    fr: 'Un projet = une page. Choisis dans le menu ou ci-dessous.',
    en: 'One project = one page. Pick from the menu or below.',
  },
  'projects.features': { fr: 'Points clés', en: 'Highlights' },
  'projects.contributors': { fr: 'Contributeurs', en: 'Contributors' },
  'projects.prev': { fr: '← Projet précédent', en: '← Previous project' },
  'projects.next': { fr: 'Projet suivant →', en: 'Next project →' },
  // contact
  'contact.title': { fr: 'Contact', en: 'Contact' },
  'contact.text': {
    fr: 'Une question, une collaboration, un bug à signaler ? Écris-moi.',
    en: 'A question, a collaboration, a bug to report? Message me.',
  },
  'contact.discord': { fr: 'Rejoindre le serveur Discord', en: 'Join the Discord Server' },
  // 404
  'notfound.title': { fr: 'Page introuvable', en: 'Page not found' },
  'notfound.text': {
    fr: "Cette extraction ne mène nulle part. Retour à l'accueil ?",
    en: 'This extract leads nowhere. Back home?',
  },
} as const;

export type I18nKey = keyof typeof STRINGS;

export function t(lang: Lang, key: I18nKey): string {
  return STRINGS[key][lang];
}

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const name = part.slice(0, idx).trim();
    const value = decodeURIComponent(part.slice(idx + 1).trim());
    if (name) out[name] = value;
  }
  return out;
}

function parseAcceptLanguage(header: string | undefined): Lang | null {
  if (!header) return null;
  const first = header.split(',')[0]?.split(';')[0]?.trim().toLowerCase() ?? '';
  if (first.startsWith('en')) return 'en';
  if (first.startsWith('fr')) return 'fr';
  return null;
}

export interface LangSource {
  query?: unknown;
  cookieHeader?: string;
  acceptLanguage?: string;
}

/** Ordre : ?lang= > cookie > Accept-Language > défaut fr */
export function resolveLang(source: LangSource): Lang {
  if (source.query === 'fr' || source.query === 'en') return source.query;
  const cookie = parseCookies(source.cookieHeader)[LANG_COOKIE];
  if (cookie === 'fr' || cookie === 'en') return cookie;
  return parseAcceptLanguage(source.acceptLanguage) ?? DEFAULT_LANG;
}

export function isLang(value: unknown): value is Lang {
  return value === 'fr' || value === 'en';
}

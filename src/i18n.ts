export type Lang = 'fr' | 'en';

export const LANG_COOKIE = 'niv-lang';
export const DEFAULT_LANG: Lang = 'fr';

const STRINGS = {
  // nav
  'nav.home': { fr: 'Home', en: 'Home' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  // home
  'home.projects': { fr: 'Projets :', en: 'Projects:' },
  'home.translations': { fr: 'Traductions :', en: 'Translations:' },
  'home.contributors': { fr: 'Contributeurs :', en: 'Contributors:' },
  // projet
  'project.role': { fr: 'Rôle :', en: 'Role:' },
  'project.links': { fr: 'Liens', en: 'Links' },
  // traduction
  'translation.authors': { fr: 'Auteur(s) :', en: 'Author(s):' },
  'translation.translators': { fr: 'Traducteur(s) :', en: 'Translator(s):' },
  'translation.version': { fr: 'Version :', en: 'Version:' },
  'translation.download': {
    fr: 'Lien de téléchargement',
    en: 'Download link',
  },
  'translation.otherLinks': { fr: 'Autres liens', en: 'Other links' },
  // contact
  'contact.title': { fr: 'Contact', en: 'Contact' },
  'contact.text': { fr: 'Pour me contacter :', en: 'Get in touch:' },
  'contact.discord': { fr: 'Serveur Discord', en: 'Discord server' },
  // commun
  'common.back': { fr: "Retour à l'accueil", en: 'Back home' },
  // 404
  'notfound.title': { fr: 'Page introuvable', en: 'Page not found' },
  'notfound.text': { fr: "Cette page n'existe pas.", en: 'This page does not exist.' },
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

export interface RepoLink {
  name: string;
  url: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: { fr: string; en: string };
  role?: { fr: string; en: string };
  logo: string;
  short: { fr: string; en: string };
  links: ProjectLink[];
}

export interface PersonLink {
  name: string;
  url: string;
}

export interface Translation {
  slug: string;
  title: string;
  file: string;
  image: string;
  authors: PersonLink[];
  translators: PersonLink[];
  version: string;
  download: string;
  otherLinks: ProjectLink[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'tarkovtracker',
    title: { fr: 'TarkovTracker.org', en: 'TarkovTracker.org' },
    logo: '/assets/tarkovtracker-org.png',
    short: {
      fr: 'Plateforme communautaire de suivi de progression pour Escape from Tarkov : quêtes, hideout, compétences et équipes. Maintenance, fonctionnalités et support.',
      en: 'Community progression tracking platform for Escape from Tarkov: quests, hideout, skills and teams. Maintenance, features and support.',
    },
    links: [
      { label: 'Site', href: 'https://tarkovtracker.org' },
      { label: 'Code', href: 'https://github.com/tarkovtracker-org/tarkovtracker' },
    ],
  },
  {
    slug: 'wiki-eft-fr',
    title: { fr: 'Wiki français Escape from Tarkov', en: 'French Escape from Tarkov Wiki' },
    role: { fr: 'Administrateur', en: 'Administrator' },
    logo: '/assets/wiki-eft-fr.png',
    short: {
      fr: 'Administration du wiki francophone d’Escape from Tarkov : maintenance des pages, traductions et gestion de la communauté.',
      en: 'Administration of the French Escape from Tarkov wiki: page maintenance, translations and community management.',
    },
    links: [
      { label: 'Wiki', href: 'https://escapefromtarkov.fandom.com/fr' },
      {
        label: 'Contributions',
        href: 'https://escapefromtarkov.fandom.com/fr/wiki/Sp%C3%A9cial:Contributions/Nivmizz7',
      },
    ],
  },
  {
    slug: 'wiki-eft-arena-fr',
    title: { fr: 'Wiki français Escape from Tarkov : Arena', en: 'French Escape from Tarkov: Arena Wiki' },
    role: { fr: 'Bureaucrate', en: 'Bureaucrat' },
    logo: '/assets/arena-logo.png',
    short: {
      fr: 'Bureaucrate du wiki francophone d’Escape from Tarkov : Arena — structuration du wiki, maintenance et traduction des pages.',
      en: 'Bureaucrat on the French Escape from Tarkov: Arena wiki — wiki structure, maintenance and page translation.',
    },
    links: [
      { label: 'Wiki', href: 'https://escapefromtarkov-arena.fandom.com/fr' },
      {
        label: 'Contributions',
        href: 'https://escapefromtarkov-arena.fandom.com/fr/wiki/Sp%C3%A9cial:Contributions/Nivmizz7',
      },
    ],
  },
];

export const TRANSLATIONS: Translation[] = [
  {
    slug: 'nivfactory-french-1-7c',
    title: 'Usine',
    file: 'NivFactoryFrench1_7c.png',
    image: '/assets/NivFactoryFrench1_7c-preview.png',
    authors: [{ name: 'RE3MR', url: 'https://re3mr.com' }],
    translators: [{ name: 'Nivmizz7', url: 'https://github.com/Nivmizz7' }],
    version: '1.7c',
    download: '/assets/NivFactoryFrench1_7c.png',
    otherLinks: [
      { label: 'Usine — wiki FR', href: 'https://escapefromtarkov.fandom.com/fr/wiki/Usine' },
    ],
  },
  {
    slug: 'nivground-zero-0-3c',
    title: 'Point Zéro',
    file: 'NivGroundZero03c.png',
    image: '/assets/NivGroundZero03c.png',
    authors: [{ name: 'RE3MR', url: 'https://re3mr.com' }],
    translators: [{ name: 'Nivmizz7', url: 'https://github.com/Nivmizz7' }],
    version: '0.3c',
    download: '/assets/NivGroundZero03c.png',
    otherLinks: [
      { label: 'Point Zéro — wiki FR', href: 'https://escapefromtarkov.fandom.com/fr/wiki/Point_Z%C3%A9ro' },
    ],
  },
];

/** Dépôts auxquels Nivmizz7 a contribué ou qu'il maintient. */
export const CONTRIBUTED_REPOS: RepoLink[] = [
  { name: 'tarkovtracker-org/tarkovtracker', url: 'https://github.com/tarkovtracker-org/tarkovtracker' },
  { name: 'tarkovtracker-org/trackerbot', url: 'https://github.com/tarkovtracker-org/trackerbot' },
  { name: 'the-hideout/tarkov-dev', url: 'https://github.com/the-hideout/tarkov-dev' },
  { name: 'the-hideout/tarkovmonitor', url: 'https://github.com/the-hideout/tarkovmonitor' },
  { name: 'Wilsman/cultist-circle', url: 'https://github.com/Wilsman/cultist-circle' },
  { name: 'Wilsman/tarkovcodes', url: 'https://github.com/Wilsman/tarkovcodes/pull/1' },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getTranslation(slug: string): Translation | undefined {
  return TRANSLATIONS.find((translation) => translation.slug === slug);
}

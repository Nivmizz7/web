export type Role = 'staff' | 'contrib' | 'own';

export interface ProjectLink {
  label: 'Live' | 'Code';
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  role: Role;
  /** Classe Font Awesome (ex. 'fa-solid fa-database') */
  icon: string;
  /** 'owner/repo' sur GitHub — sert à lier les contributeurs */
  repo: string;
  /** Logins GitHub (humains, bots exclus) */
  contributors: string[];
  tags: string[];
  short: { fr: string; en: string };
  long: { fr: string; en: string };
  features: string[];
  links: ProjectLink[];
}

/** PP GitHub d'un contributeur (pas de clé API, redirect officiel github.com) */
export function contributorAvatar(login: string): string {
  return `https://github.com/${login}.png?size=72`;
}

export function contributorProfile(login: string): string {
  return `https://github.com/${login}`;
}

export const PROJECTS: Project[] = [
  {
    slug: 'tarkovtracker',
    title: 'TarkovTracker.org',
    role: 'staff',
    icon: 'fa-solid fa-list-check',
    repo: 'tarkovtracker-org/tarkovtracker',
    contributors: [
      'DysektAI',
      'Nivmizz7',
      'maxloo2',
      'Adealia',
      'codecrete-ross',
      'bluedude487',
      'atzorvas',
      'MiwiDots',
      'GiribaldiTTV',
    ],
    tags: ['TypeScript', 'Nuxt 4', 'Vue'],
    short: {
      fr: 'Plateforme complète de suivi de quêtes et de progression pour Escape from Tarkov. Suivi live, équipe, hideout, skills.',
      en: 'Full quest tracking and progression platform for Escape from Tarkov. Live tracking, teams, hideout, skills.',
    },
    long: {
      fr: 'Suivi de progression complet : quêtes Prapor → Kappa, hideout, compétences, équipe en temps réel. Stack Nuxt 4 + TypeScript, auth TarkovTracker, multi-langue. Mon rôle : maintenance, features, support.',
      en: 'Full progression tracking: Prapor → Kappa quests, hideout, skills, real-time teams. Nuxt 4 + TypeScript stack, TarkovTracker auth, multi-language. My role: maintenance, features, support.',
    },
    features: ['Quest tracking & team sync', 'Hideout / skills / traders', 'Multi-langue, auth TarkovTracker'],
    links: [
      { label: 'Live', href: 'https://tarkovtracker.org' },
      { label: 'Code', href: 'https://github.com/tarkovtracker-org/tarkovtracker' },
    ],
  },
  {
    slug: 'data-overlay',
    title: 'tarkov-data-overlay',
    role: 'staff',
    icon: 'fa-solid fa-layer-group',
    repo: 'tarkovtracker-org/tarkov-data-overlay',
    contributors: ['DysektAI', 'Nivmizz7', 'Adealia', 'MiwiDots', 'Wilsman'],
    tags: ['JavaScript', 'JSON / API'],
    short: {
      fr: "Overlay de données basé sur l'API tarkov.dev — prix, quêtes et infos items en surimpression.",
      en: 'Data overlay powered by the tarkov.dev API — prices, quests and item info on top of your game.',
    },
    long: {
      fr: "Overlay léger consommant l'API tarkov.dev pour afficher prix et infos sans quitter le jeu.",
      en: 'Lightweight overlay consuming the tarkov.dev API to show prices and info without leaving the game.',
    },
    features: ['Live market prices', 'JSON / API driven', 'Lightweight JS'],
    links: [{ label: 'Code', href: 'https://github.com/tarkovtracker-org/tarkov-data-overlay' }],
  },
  {
    slug: 'trackerbot',
    title: 'TrackerBot',
    role: 'staff',
    icon: 'fa-brands fa-discord',
    repo: 'tarkovtracker-org/trackerbot',
    contributors: ['Nivmizz7', 'DysektAI', 'Adealia'],
    tags: ['JavaScript', 'Discord.js'],
    short: {
      fr: 'Bot Discord officiel du serveur TarkovTracker.org — liaison comptes, progression, notifications.',
      en: 'Official Discord bot for the TarkovTracker.org server — account linking, progression, notifications.',
    },
    long: {
      fr: 'Bot Discord communautaire : link du compte TarkovTracker, commandes de progression, modération.',
      en: 'Community Discord bot: TarkovTracker account linking, progression commands, moderation.',
    },
    features: ['Account linking', 'Progress commands', 'Discord.js'],
    links: [{ label: 'Code', href: 'https://github.com/tarkovtracker-org/trackerbot' }],
  },
  {
    slug: 'tarkov-dev',
    title: 'tarkov.dev',
    role: 'contrib',
    icon: 'fa-solid fa-database',
    repo: 'the-hideout/tarkov-dev',
    contributors: [
      'Razzmatazzz',
      'kokarn',
      'Shebuka',
      'GrantBirki',
      'oskarrisberg',
      'AllanOcelot',
      'Gyran',
      'Nivmizz7',
      'austinhodak',
      'PaiJi',
    ],
    tags: ['TypeScript', 'Node.js', 'GraphQL'],
    short: {
      fr: 'La référence open-data Tarkov : prix du marché, quêtes, hideout, munitions. API GraphQL publique.',
      en: 'The Tarkov open-data reference: market prices, quests, hideout, ammo. Public GraphQL API.',
    },
    long: {
      fr: 'Écosystème open-data : site, API GraphQL, bots. Contributions sur data, docs et tooling.',
      en: 'Open-data ecosystem: website, GraphQL API, bots. Contributions on data, docs and tooling.',
    },
    features: ['Market / quests / ammo charts', 'Public GraphQL API', 'Open-source'],
    links: [
      { label: 'Live', href: 'https://tarkov.dev' },
      { label: 'Code', href: 'https://github.com/the-hideout/tarkov-dev' },
    ],
  },
  {
    slug: 'tarkovmonitor',
    title: 'TarkovMonitor',
    role: 'contrib',
    icon: 'fa-solid fa-desktop',
    repo: 'the-hideout/tarkovmonitor',
    contributors: [
      'Razzmatazzz',
      'GiribaldiTTV',
      'thaddeus',
      'Nivmizz7',
      'Wraiith32',
      'GrantBirki',
      'DysektAI',
      'Owaan',
      'teefus',
      'nickpetty',
      'Andrew-Webberley',
      'bwdotdev',
    ],
    tags: ['C#', '.NET'],
    short: {
      fr: 'App desktop qui détecte vos quêtes et items en temps réel depuis les logs du jeu.',
      en: 'Desktop app that detects your quests and items in real time from game logs.',
    },
    long: {
      fr: 'Surveille les logs du jeu pour auto-détecter quêtes, morts et loot — se connecte à TarkovTracker.',
      en: 'Watches game logs to auto-detect quests, deaths and loot — syncs with TarkovTracker.',
    },
    features: ['Real-time log parsing', 'C# / .NET desktop', 'TarkovTracker sync'],
    links: [{ label: 'Code', href: 'https://github.com/the-hideout/tarkovmonitor' }],
  },
  {
    slug: 'cultistcircle',
    title: 'CultistCircle',
    role: 'contrib',
    icon: 'fa-solid fa-moon',
    repo: 'Wilsman/cultist-circle',
    contributors: ['Wilsman', 'Oxylad', 'Nivmizz7', 'nlosc'],
    tags: ['TypeScript', 'Vue / Nuxt'],
    short: {
      fr: 'Calculateur de sacrifices pour le Cultist Circle du hideout — optimisez vos crafts à 5 slots.',
      en: 'Sacrifice calculator for the hideout Cultist Circle — optimize your 5-slot crafts.',
    },
    long: {
      fr: 'Optimiseur de recettes Cultist Circle : testez combos à 5 items et partagez vos résultats.',
      en: 'Cultist Circle recipe optimizer: test 5-item combos and share your results.',
    },
    features: ['5-slot sacrifice calculator', 'Community results', 'Vue / Nuxt + TS'],
    links: [
      { label: 'Live', href: 'https://cultistcircle.com' },
      { label: 'Code', href: 'https://github.com/Wilsman/cultist-circle' },
    ],
  },
  {
    slug: 'wiki-changes',
    title: 'wiki-changes',
    role: 'own',
    icon: 'fa-solid fa-book-open',
    repo: 'nivmizz7/wiki-changes',
    contributors: ['Nivmizz7', 'Wilsman'],
    tags: ['JavaScript', 'Node.js', 'SSE'],
    short: {
      fr: "Moniteur d'activité temps réel des dix éditions linguistiques du wiki Fandom Escape from Tarkov.",
      en: 'Real-time activity monitor for the ten language editions of the Escape from Tarkov Fandom wiki.',
    },
    long: {
      fr: "Le flux recentchanges de chaque édition est sondé en continu et persisté en JSON local. Une ligne par jour (total, types, barre d'activité), page détaillée par jour, nouveautés poussées en SSE, recherche Ctrl+K et export brut. Zéro dépendance, que du Node.js natif.",
      en: 'Each edition recentchanges feed is polled continuously and persisted to local JSON. One line per day (totals, types, activity bar), per-day detail pages, SSE live updates, Ctrl+K search and raw export. Zero dependencies, pure Node.js built-ins.',
    },
    features: ['10 wikis, 1 ligne par jour', 'Live SSE + recherche Ctrl+K', 'Zéro dépendance (Node natif)'],
    links: [
      { label: 'Live', href: 'https://wiki-changes.nivmizz7.dev' },
      { label: 'Code', href: 'https://github.com/nivmizz7/wiki-changes' },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function staffProjects(): Project[] {
  return PROJECTS.filter((p) => p.role === 'staff');
}

export function contribProjects(): Project[] {
  return PROJECTS.filter((p) => p.role === 'contrib');
}

export function ownProjects(): Project[] {
  return PROJECTS.filter((p) => p.role === 'own');
}

/** prev/next circulaire pour la navigation entre pages projets */
export function projectNeighbors(slug: string): { prev: Project; next: Project } {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const at = idx === -1 ? 0 : idx;
  return {
    prev: PROJECTS[(at - 1 + PROJECTS.length) % PROJECTS.length]!,
    next: PROJECTS[(at + 1) % PROJECTS.length]!,
  };
}

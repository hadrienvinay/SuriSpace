// data/posts.ts
export interface StaticPost {
  href: string;
  image: string;
  title: string;
  excerpt: string;
  tag: string;
  year: string;
  color: string;
  accent: string;
  tagBg: string;
}

export const STATIC_POSTS: StaticPost[] = [
  {
    href: '/posts/algoculture',
    image: '/uploads/image-1769438168655-893060458.jpg',
    title: "L'algoculture",
    excerpt: "La culture des algues est vieille de plusieurs siècles, mais connaît aujourd'hui une croissance rapide à l'échelle mondiale.",
    tag: 'Environnement',
    year: '2025',
    color: 'border-emerald-500/30',
    accent: 'text-emerald-400',
    tagBg: 'bg-emerald-500/10',
  },
  {
    href: '/posts/negative',
    image: '/posts/univers.webp',
    title: 'La masse négative',
    excerpt: "Réfutée dans les années 50, l'hypothèse de la masse négative pourrait s'avérer un candidat sérieux pour expliquer la structure de l'univers.",
    tag: 'Physique',
    year: '2026',
    color: 'border-violet-500/30',
    accent: 'text-violet-400',
    tagBg: 'bg-violet-500/10',
  },
  {
    href: '/posts/space',
    image: '/posts/artemis.jpg',
    title: "L'actualité spatiale 2026",
    excerpt: "Un panorama des dernières nouvelles et missions prévues pour le spatial en 2026.",
    tag: 'Espace',
    year: '2026',
    color: 'border-blue-500/30',
    accent: 'text-blue-400',
    tagBg: 'bg-blue-500/10',
  },
  {
    href: '/posts/hydrogene',
    image: '/posts/hydrogene.png',
    title: "L'hydrogène vert marin",
    excerpt: "Produire de l'hydrogène grâce aux courants marins et à la houle : le potentiel des océans pour la transition énergétique.",
    tag: 'Energie',
    year: '2026',
    color: 'border-yellow-500/30',
    accent: 'text-yellow-400',
    tagBg: 'bg-yellow-500/10',
  },
  {
    href: '/posts/astro',
    image: '/posts/astro.jpg',
    title: 'Le ciel en 2026',
    excerpt: "Éclipses, comètes, étoiles filantes et rendez-vous planétaires : le calendrier astronomique complet de 2026.",
    tag: 'Astronomie',
    year: '2026',
    color: 'border-indigo-500/30',
    accent: 'text-indigo-400',
    tagBg: 'bg-indigo-500/10',
  },
  {
    href: '/posts/earth',
    image: '/posts/earth.jpg',
    title: "L'histoire de la Terre",
    excerpt: "De boule de lave à monde vivant : 4,5 milliards d'années d'histoire, entre extinctions de masse et explosions de vie.",
    tag: 'Sciences de la Terre',
    year: '2026',
    color: 'border-orange-500/30',
    accent: 'text-orange-400',
    tagBg: 'bg-orange-500/10',
  },
];

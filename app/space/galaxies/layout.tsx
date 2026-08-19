import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galaxies',
  description: "Explorez les galaxies de l'univers observable — Voie Lactée, Andromède, Groupe Local et plus de 15 galaxies remarquables avec données et images.",
  keywords: ['galaxies', 'Voie Lactée', 'Andromède', 'Groupe Local', 'astronomie', 'espace'],
  openGraph: {
    title: 'Galaxies | Suri Space',
    description: "Voie Lactée, Andromède et les galaxies les plus remarquables de l'univers observable.",
    url: 'https://suri-space.vercel.app/space/galaxies',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

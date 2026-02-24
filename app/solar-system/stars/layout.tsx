import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carte du Ciel',
  description: "Étoiles voisines, types spectraux, constellations et nébuleuses — cartographie stellaire interactive de l'hémisphère nord.",
  keywords: ['étoiles', 'carte du ciel', 'constellations', 'types spectraux', 'nébuleuses', 'astronomie', 'hémisphère nord'],
  openGraph: {
    title: 'Carte du Ciel | Suri Space',
    description: "Étoiles, constellations et nébuleuses — cartographie stellaire interactive.",
    url: 'https://surispace.fr/solar-system/stars',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

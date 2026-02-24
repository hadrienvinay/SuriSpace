import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue Messier',
  description: "Les 110 objets du catalogue Messier — nébuleuses, amas globulaires, amas ouverts et galaxies du ciel profond. Filtrable et interactif.",
  keywords: ['catalogue Messier', 'ciel profond', 'nébuleuses', 'amas globulaires', 'galaxies', 'astronomie amateur'],
  openGraph: {
    title: 'Catalogue Messier | Suri Space',
    description: "110 objets du ciel profond — nébuleuses, amas et galaxies de Charles Messier (1774).",
    url: 'https://surispace.fr/solar-system/astronomie/messier',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// app/echelles/page.tsx
import type { Metadata } from 'next';
import EchellesClient from './EchellesClient';
import { JsonLd } from '@/components/common/JsonLd';

export const metadata: Metadata = {
  title: 'Échelles de l\'Univers',
  description: "De la longueur de Planck à l'univers observable — un voyage à travers 62 ordres de grandeur, de l'infiniment petit à l'infiniment grand.",
  keywords: ['échelles', 'longueur de Planck', 'univers observable', 'infiniment petit', 'infiniment grand', 'ordre de grandeur', 'physique'],
  openGraph: {
    title: 'Échelles de l\'Univers | Suri Space',
    description: "De la longueur de Planck à l'univers observable — 62 ordres de grandeur à explorer.",
    url: 'https://suri-space.vercel.app/echelles',
  },
};

export default function EchellesPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Échelles de l\'Univers', item: 'https://suri-space.vercel.app/echelles' },
        ]},
        { '@type': 'CollectionPage', name: "Échelles de l'Univers", url: 'https://suri-space.vercel.app/echelles',
          description: "De la longueur de Planck à l'univers observable — un voyage à travers 62 ordres de grandeur.",
          inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Suri Space', url: 'https://suri-space.vercel.app' } },
      ]}} />
      <EchellesClient />
    </>
  );
}

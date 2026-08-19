import type { Metadata } from 'next';
import BiologieLayout from '@/components/layout/BiologieLayout';
import { JsonLd } from '@/components/common/JsonLd';
import CorpsClient from './CorpsClient';

export const metadata: Metadata = {
  title: 'Corps Humain | Biologie',
  description: 'Explorez les 8 grands systèmes du corps humain : circulatoire, respiratoire, nerveux, digestif, musculaire, squelettique, immunitaire et endocrinien.',
  keywords: ['corps humain', 'systèmes du corps', 'organes', 'anatomie', 'biologie'],
  openGraph: {
    title: 'Corps Humain | Suri Space',
    description: 'Schéma interactif des 8 systèmes du corps humain — organes, fonctions et faits clés.',
    url: 'https://suri-space.vercel.app/biologie/corps',
  },
};

export default function CorpsPage() {
  return (
    <BiologieLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Biologie', item: 'https://suri-space.vercel.app/biologie' },
          { '@type': 'ListItem', position: 3, name: 'Corps Humain', item: 'https://suri-space.vercel.app/biologie/corps' },
        ]},
        { '@type': 'WebPage', name: 'Corps Humain', url: 'https://suri-space.vercel.app/biologie/corps',
          description: 'Les 8 systèmes du corps humain : anatomie, organes et fonctions.',
          inLanguage: 'fr' },
      ]}} />
      <CorpsClient />
    </BiologieLayout>
  );
}

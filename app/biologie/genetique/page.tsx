import type { Metadata } from 'next';
import BiologieLayout from '@/components/layout/BiologieLayout';
import { JsonLd } from '@/components/common/JsonLd';
import GenetiqueClient from './GenetiqueClient';

export const metadata: Metadata = {
  title: 'Génétique | Biologie',
  description: 'Lois de Mendel, carré de Punnett interactif, types de mutations, maladies génétiques, CRISPR et génomique.',
  keywords: ['génétique', 'Mendel', 'Punnett', 'mutation', 'ADN', 'maladies génétiques', 'CRISPR', 'biologie'],
  openGraph: {
    title: 'Génétique | Suri Space',
    description: 'Lois de Mendel, carré de Punnett, mutations et génomique moderne.',
    url: 'https://suri-space.vercel.app/biologie/genetique',
  },
};

export default function GenetiquePage() {
  return (
    <BiologieLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Biologie', item: 'https://suri-space.vercel.app/biologie' },
          { '@type': 'ListItem', position: 3, name: 'Génétique', item: 'https://suri-space.vercel.app/biologie/genetique' },
        ]},
        { '@type': 'WebPage', name: 'Génétique', url: 'https://suri-space.vercel.app/biologie/genetique',
          description: 'Hérédité, mutations et génomique.', inLanguage: 'fr' },
      ]}} />
      <GenetiqueClient />
    </BiologieLayout>
  );
}

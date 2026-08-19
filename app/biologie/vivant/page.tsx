import type { Metadata } from 'next';
import BiologieLayout from '@/components/layout/BiologieLayout';
import { JsonLd } from '@/components/common/JsonLd';
import VivantClient from './VivantClient';

export const metadata: Metadata = {
  title: 'Le Vivant | Biologie',
  description: 'L\'arbre du vivant : les 3 domaines (Bacteria, Archaea, Eukarya) et les 5 règnes — animaux, plantes, champignons, bactéries, virus.',
  keywords: ['vivant', 'arbre du vivant', 'animaux', 'plantes', 'champignons', 'bactéries', 'virus', 'biodiversité'],
  openGraph: {
    title: 'Le Vivant | Suri Space',
    description: 'Les 3 domaines et 5 règnes du vivant — encyclopédie de la biodiversité.',
    url: 'https://suri-space.vercel.app/biologie/vivant',
  },
};

export default function VivantPage() {
  return (
    <BiologieLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Biologie', item: 'https://suri-space.vercel.app/biologie' },
          { '@type': 'ListItem', position: 3, name: 'Le Vivant', item: 'https://suri-space.vercel.app/biologie/vivant' },
        ]},
        { '@type': 'WebPage', name: 'Le Vivant', url: 'https://suri-space.vercel.app/biologie/vivant',
          description: 'Arbre du vivant, règnes et biodiversité.', inLanguage: 'fr' },
      ]}} />
      <VivantClient />
    </BiologieLayout>
  );
}

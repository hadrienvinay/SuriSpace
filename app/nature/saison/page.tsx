import { Metadata } from 'next';
import SaisonClient from './SaisonClient';
import { SEASONAL_ITEMS } from '@/data/seasonal';

export const metadata: Metadata = {
  title: 'Fruits & Légumes de Saison — Nature',
  description: 'Découvrez les fruits et légumes de saison en France, mois par mois, avec leurs informations nutritionnelles et conseils de culture.',
};

export default function SaisonPage() {
  return <SaisonClient items={SEASONAL_ITEMS} />;
}

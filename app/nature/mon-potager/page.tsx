import PotagerClient from './PotagerClient';
import { PLANTS } from '@/data/plants';

export const metadata = {
  title: 'Mon Potager — Dashboard de culture',
  description: 'Créez votre potager virtuel : sélectionnez vos plantes, définissez les quantités et visualisez vos récoltes estimées par an.',
};

export default function PotagerPage() {
  return <PotagerClient plants={PLANTS} />;
}

import NatureClient from '../NatureClient';
import { PLANTS } from '@/data/plants';

export const metadata = {
  title: 'Plantes & Jardinage — Nature',
  description: 'Guide de culture des plantes en France : calendrier de plantation, arrosage, germination et étapes de croissance pour légumes, arbres, aromates et fruits.',
};

export default function PlantesPage() {
  return <NatureClient plants={PLANTS} />;
}

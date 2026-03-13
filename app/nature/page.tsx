import NatureClient from './NatureClient';
import { PLANTS } from '@/data/plants';

export const metadata = {
  title: 'Nature — Jardinage & Plantes',
  description: 'Guide de culture des plantes en France : calendrier de plantation, arrosage, germination et étapes de croissance pour légumes, arbres, aromates et fruits.',
};

export default function NaturePage() {
  return <NatureClient plants={PLANTS} />;
}

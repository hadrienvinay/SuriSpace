import AgendaClient from './AgendaClient';
import { PLANTS } from '@/data/plants';

export const metadata = {
  title: 'Agenda du mois — Mon Potager',
  description: 'Les tâches de jardinage à faire ce mois-ci pour votre potager : semis, plantation, récolte, matériel et temps estimé.',
};

export default function AgendaPage() {
  return <AgendaClient plants={PLANTS} />;
}

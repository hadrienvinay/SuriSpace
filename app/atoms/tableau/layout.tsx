import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableau Périodique',
  description: "Tableau périodique des éléments interactif — propriétés physico-chimiques, catégories, configurations électroniques et informations sur tous les éléments.",
  keywords: ['tableau périodique', 'éléments chimiques', 'chimie', 'Mendeleïev', 'propriétés chimiques', 'atomes'],
  openGraph: {
    title: 'Tableau Périodique | Suri Space',
    description: "Tableau périodique interactif — propriétés et informations sur les 118 éléments.",
    url: 'https://surispace.fr/atoms/tableau',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

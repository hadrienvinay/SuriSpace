import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Particules élémentaires',
  description: 'Le modèle standard de la physique des particules : quarks, leptons, bosons et leurs propriétés.',
  alternates: { canonical: '/atoms/particules' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

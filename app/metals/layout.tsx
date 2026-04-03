import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cours des métaux',
  description: 'Cours en temps réel des métaux précieux : or, argent, platine, palladium et cuivre.',
  alternates: { canonical: '/metals' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

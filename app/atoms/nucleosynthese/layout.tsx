import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nucléosynthèse',
  description: 'Les processus de nucléosynthèse : Big Bang, fusion stellaire, supernovae et capture neutronique — comment les éléments sont créés.',
  alternates: { canonical: '/atoms/nucleosynthese' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

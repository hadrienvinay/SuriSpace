import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accélérateurs de particules',
  description: "LHC, Fermilab, SLAC, ITER, LIGO — les grands accélérateurs, réacteurs et détecteurs qui explorent la structure de la matière à travers le monde.",
  keywords: ['accélérateur de particules', 'LHC', 'CERN', 'Fermilab', 'ITER', 'collisionneur', 'physique des particules', 'réacteur nucléaire'],
  openGraph: {
    title: 'Accélérateurs de particules | Suri Space',
    description: "Les grands instruments qui explorent la structure de la matière — LHC, Fermilab, SLAC, ITER, LIGO.",
    url: 'https://suri-space.vercel.app/atoms/instruments',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

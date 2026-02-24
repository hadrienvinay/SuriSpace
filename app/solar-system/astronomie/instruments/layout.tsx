import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Observatoires',
  description: "Hubble, JWST, VLT, ALMA, ELT, Keck, Chandra — les grands observatoires terrestres et spatiaux qui ont révolutionné notre connaissance de l'Univers.",
  keywords: ['observatoires', 'Hubble', 'JWST', 'James Webb', 'VLT', 'ALMA', 'télescopes', 'astronomie'],
  openGraph: {
    title: 'Observatoires | Suri Space',
    description: "Les grands télescopes terrestres et spatiaux — Hubble, JWST, VLT, ALMA et ELT.",
    url: 'https://surispace.fr/solar-system/astronomie/instruments',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

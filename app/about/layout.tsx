import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: "Hadrien Vinay — ingénieur passionné d'aéronautique et d'espace, basé sur Arcachon. Découvrez mon parcours, mes activités et mon CV.",
  keywords: ['Hadrien Vinay', 'ingénieur aéronautique', 'spatial', 'portfolio', 'Bordeaux', 'Arcachon', 'CV'],
  openGraph: {
    title: 'À propos | Suri Space',
    description: "Parcours, activités et CV d'Hadrien Vinay — ingénieur passionné d'espace et d'aéronautique.",
    url: 'https://suri-space.vercel.app/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

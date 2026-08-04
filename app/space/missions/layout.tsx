import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Missions Spatiales',
  description: "Apollo, Voyager, James Webb, Perseverance — 50+ missions spatiales historiques et en cours depuis 1957. Chronologie et données complètes.",
  keywords: ['missions spatiales', 'Apollo', 'Voyager', 'James Webb', 'Perseverance', 'NASA', 'ESA', 'conquête spatiale'],
  openGraph: {
    title: 'Missions Spatiales | Suri Space',
    description: "50+ missions historiques — de Spoutnik au James Webb Telescope.",
    url: 'https://suri-space.vercel.app/space/missions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

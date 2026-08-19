import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abondance des éléments',
  description: 'Classement et visualisation de l\'abondance des éléments chimiques dans l\'univers, la croûte terrestre et le corps humain.',
  alternates: { canonical: '/atoms/abondance' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Histoire cosmique des atomes',
  description: 'Du Big Bang aux étoiles : la chronologie de la formation des éléments chimiques dans l\'univers.',
  alternates: { canonical: '/atoms/histoire' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

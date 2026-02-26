import ActionsManager from '@/components/ActionsManager';

export const metadata = {
  title: 'Mes actions',
};


export default function ActionsPage() {

  return (

    <section className="space-y-6">
      <ActionsManager />
    </section>
  );
}

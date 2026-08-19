import ActionsManager from '@/components/common/ActionsManager';

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

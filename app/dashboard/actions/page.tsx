import ActionsManager from '@/components/ActionsManager';

export const metadata = {
  title: 'Mes actions',
};

export default function ActionsPage() {
  return (
    <section className="space-y-16">
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          Mes actions <span className="text-blue-600">Suri</span>
        </h1>
      <ActionsManager />
    </div>
    </section>
  );
}

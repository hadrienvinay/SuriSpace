import ActionsManager from '@/components/ActionsManager';

export const metadata = {
  title: 'Mes actions',
};

export default function ActionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes actions</h1>
      <ActionsManager />
    </div>
  );
}

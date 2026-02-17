'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteProjectButton({ projectId }: { projectId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      console.log(response)

      if (response.ok) {
        // Rafraîchir la page ou rediriger
        //window.location.reload();
        // Ou avec Next.js router:
        router.push('/projects');
      } else {
        console.log(response)
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-1 py-1 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isDeleting ? 'Suppression...' : 'Del'}
    </button>
  );
}
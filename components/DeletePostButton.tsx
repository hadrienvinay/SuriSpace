'use client';

import { useState } from 'react';

export default function DeletePostButton({ postId }: { postId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Rafraîchir la page ou rediriger
        window.location.reload();
        // Ou avec Next.js router:
        // router.refresh();
      } else {
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
      className="px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isDeleting ? 'Suppression...' : 'Del'}
    </button>
  );
}
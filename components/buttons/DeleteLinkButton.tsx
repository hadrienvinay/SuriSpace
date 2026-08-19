'use client';

import { useState } from 'react';

export default function DeleteLinkButton({ linkId }: { linkId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/link/${linkId}`, {
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
      alert('Erreur lors de la suppression du lien');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
        color: '#f87171', borderRadius: 6, padding: '2px 10px', fontSize: 11,
        cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
      }}
      className="disabled:opacity-50"
    >
      {isDeleting ? '…' : 'Supprimer'}
    </button>
  );
}

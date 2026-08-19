'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteProjectButton({ projectId }: { projectId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/projects');
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
      aria-label="Supprimer le projet"
      title="Supprimer le projet"
      className="flex items-center justify-center w-8 h-8 rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-wait cursor-pointer"
      style={{
        background: 'rgba(8,12,28,0.75)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(239,68,68,0.3)',
        color: '#f87171',
      }}
    >
      {isDeleting ? (
        <span
          className="w-3 h-3 rounded-full animate-spin"
          style={{ border: '2px solid rgba(248,113,113,0.3)', borderTopColor: '#f87171' }}
        />
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      )}
    </button>
  );
}

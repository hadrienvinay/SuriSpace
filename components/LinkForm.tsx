// components/CreatePostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface LinkFormProps {
  initialData?: {
    id?: number
    titre: string
    description: string
    tag: string
    link: string
  }
  mode: 'create' | 'edit'
}

export default function CreateLinkForm({ initialData, mode }: LinkFormProps) {
  const [titre, setTitre] = useState(initialData?.titre || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [tag, setTag] = useState(initialData?.tag || '')
  const [link, setLink] = useState(initialData?.link || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('titre', titre);
      formData.append('description', description);
      formData.append('tag', tag);
      formData.append('link', link);

      const url = mode === 'create' 
        ? '/api/link' 
        : `/api/link/${initialData?.id}`
      
      const method = mode === 'create' ? 'POST' : 'PUT'
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        const message = mode === 'create' 
          ? 'Lien créé avec succès !' 
          : 'Lien modifié avec succès !'
        alert(message)        
        //router.refresh();
        router.push('/dashboard');
        router.refresh();

      } else {
        const data = await response.json();
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du lien');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">
        {mode === 'create' ? 'Ajouter une nouvelle ressource' : 'Modifier la ressource'}
      </h2>

      {/* Champ Titre */}
      <div>
        <label htmlFor="titre" className="block mb-2 font-medium">
          Titre
        </label>
        <input
          type="text"
          id="titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg className border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez le titre de l'article"
        />
      </div>

      {/* Champ Description */}
      <div>
        <label htmlFor="description" className="block mb-2 font-medium">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description du lien"
        />
      </div>

      {/* Champ Tag */}
      <div>
        <label htmlFor="tag" className="block mb-2 font-medium">
          Tags
        </label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tags"
        />
      </div>

      {/* Champ Lien */}
      <div>
        <label htmlFor="link" className="block mb-2 font-medium">
          Lien
        </label>
        <input
          type="text"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Liens"
        />
      </div>


      {/* Bouton Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 text-white rounded-lg hover:bg-blue-700 bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {mode === 'create' ? (isSubmitting ? 'Ajout en cours...' : 'Ajouter le lien') : isSubmitting ? 'Modification en cours...' : 'Mettre à jour le lien'}

      </button>
    </form>
  );
}
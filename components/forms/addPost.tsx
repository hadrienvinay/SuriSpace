// components/CreatePostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CreatePostForm() {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('titre', titre);
      formData.append('contenu', contenu);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Article créé avec succès !');
        setTitre('');
        setContenu('');
        setImage(null);
        setPreview(null);
        //router.refresh();
        router.push('/posts');
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création de l\'article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Créer un nouvel article</h2>

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
          className="w-full px-4 py-2 border rounded-lg  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez le titre de l'article"
        />
      </div>

      {/* Champ Contenu */}
      <div>
        <label htmlFor="contenu" className="block mb-2 font-medium">
          Contenu
        </label>
        <textarea
          id="contenu"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          required
          rows={8}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Écrivez votre article..."
        />
      </div>

      {/* Champ Image */}
      <div>
        <label htmlFor="image" className="block mb-2 font-medium">
          Image (optionnelle)
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Aperçu de l'image */}
      {preview && (
        <div className="relative w-full h-64">
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Aperçu :</p>
          <Image
            src={preview}
            alt="Aperçu"
            fill
            className="object-contain rounded-lg"
          />
        </div>
      )}

      {/* Bouton Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Création en cours...' : 'Créer l\'article'}
      </button>
    </form>
  );
}
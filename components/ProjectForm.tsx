// components/CreatePostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


interface ProjectFormProps {
  initialData?: {
    id: number
    title: string
    content: string
    content2: string
    resume: string
    image?: string
    image2?: string
    imageTitle?: string
    imageTitle2?: string
    link: string
}
}

export default function CreateProjectForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [content2, setContent2] = useState('');
  const [resume, setResume] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageTitle2, setImageTitle2] = useState('');
  const [link, setLink] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
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
  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file2 = e.target.files?.[0];
    if (file2) {
        setImage2(file2);
        // Créer un aperçu de l'image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview2(reader.result as string);
        };
        reader.readAsDataURL(file2);
        }
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('content2', content2);
      formData.append('resume', resume);
      formData.append('link', link);
      if (image) {
        formData.append('image', image);
        formData.append('imageTitle',imageTitle)
        if (image2) {
        formData.append('image2', image2);
        formData.append('imageTitle2',imageTitle2)
      }
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Projet créé avec succès !');
        //router.refresh();
        router.push('/projects');
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du projet');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Créer un nouvel projet</h2>

      {/* Champ Titre */}
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez le titre du projet"
        />
      </div>
        {/* Champ Résume */}
      <div>
        <label htmlFor="resume" className="block mb-2 font-medium">
          Resumé
        </label>
        <textarea
          id="resume"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Résumé du projet..."
        />
      </div>
      {/* Champ Contenu */}
      <div>
        <label htmlFor="content" className="block mb-2 font-medium">
          Contenu
        </label>
        <textarea
          id="contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={2}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Présentation 1 du projet..."
        />
      </div>
       {/* Champ Contenu 2*/}
      <div>
        <label htmlFor="content2" className="block mb-2 font-medium">
          Contenu 2
        </label>
        <textarea
          id="content2"
          value={content2}
          onChange={(e) => setContent2(e.target.value)}
          required
          rows={2}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Présentation 2 du projet..."
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
      <div>
        <label htmlFor="imageTitle" className="block mb-2 font-medium">
          Titre Image
        </label>
        <textarea
          id="imageTitle"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
          required
          rows={2}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Présentation 2 du projet..."
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
      {/* Champ Image 2*/}
      <div>
        <label htmlFor="image2" className="block mb-2 font-medium">
          Image (optionnelle)
        </label>
        <input
          type="file"
          id="image2"
          accept="image/*"
          onChange={handleImageChange2}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="imageTitle2" className="block mb-2 font-medium">
          Titre Image 2
        </label>
        <textarea
          id="imageTitle2"
          value={imageTitle2}
          onChange={(e) => setImageTitle2(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Présentation 2 du projet..."
        />
      </div>
      {/* Aperçu de l'image 2 */}
      {preview2 && (
        <div className="relative w-full h-64">
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Aperçu 2:</p>
          <Image
            src={preview2}
            alt="Aperçu"
            fill
            className="object-contain rounded-lg"
          />
        </div>
        
      )}
      {/* Champ lien github*/}
      <div>
        <label htmlFor="link" className="block mb-2 font-medium">
          Lien Github
        </label>
        <textarea
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://github/hadrienvinay/Project"
        />
      </div>


      {/* Bouton Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Création en cours...' : 'Créer le projet'}
      </button>
    </form>
  );
}


export  function EditProjectForm(props?: ProjectFormProps) {
  const projectId = props?.initialData?.id
  console.log(projectId)
  const [title, setTitle] = useState(props?.initialData?.title ?? '');
  const [content, setContent] = useState(props?.initialData?.content ?? '');
  const [content2, setContent2] = useState(props?.initialData?.content2 ?? '');
  const [resume, setResume] = useState(props?.initialData?.resume ?? '');
  const [imagePath, setImagePath] = useState(props?.initialData?.image);
  const [image2Path, setImage2Path] = useState(props?.initialData?.image2);
  const [image, setImage] = useState<File| null>(null);
  const [image2, setImage2] = useState<File | null>(null);

  const [imageTitle, setImageTitle] = useState(props?.initialData?.imageTitle ??'');
  const [imageTitle2, setImageTitle2] = useState(props?.initialData?.imageTitle2 ?? '');
  const [link, setLink] = useState(props?.initialData?.link ??'');
  const [preview, setPreview] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
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
  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file2 = e.target.files?.[0];
    if (file2) {
        setImage2(file2);
        // Créer un aperçu de l'image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview2(reader.result as string);
        };
        reader.readAsDataURL(file2);
        }
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('content2', content2);
      formData.append('resume', resume);
      formData.append('resume', resume);
      formData.append('link', link);
      formData.append('imageTitle',imageTitle)
      formData.append('imageTitle2',imageTitle2)

      if (image) {
        formData.append('image', image);
        if (image2) {
        formData.append('image2', image2);
      }
      }
      console.log(formData)
      console.log("/////////")

      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Projet modifié avec succès !');
        //router.refresh();
        router.push('/projects');
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la modification du projet');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Modifier le projet {title}</h2>

      {/* Champ Titre */}
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg  border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez le titre du projet"
        />
      </div>
        {/* Champ Résume */}
      <div>
        <label htmlFor="resume" className="block mb-2 font-medium">
          Resumé
        </label>
        <textarea
          id="resume"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Résumé du projet..."
        />
      </div>
      {/* Champ Contenu */}
      <div>
        <label htmlFor="content" className="block mb-2 font-medium">
          Contenu
        </label>
        <textarea
          id="contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={2}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Présentation 1 du projet..."
        />
      </div>
       {/* Champ Contenu 2*/}
      <div>
        <label htmlFor="content2" className="block mb-2 font-medium">
          Contenu 2
        </label>
        <textarea
          id="content2"
          value={content2}
          onChange={(e) => setContent2(e.target.value)}
          required
          rows={2}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Présentation 2 du projet..."
        />
      </div>

      {/* Champ Image */}
      <div>
        <label htmlFor="image" className="block mb-2 font-medium">
          Image : { imagePath }
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="imageTitle" className="block mb-2 font-medium">
          Titre Image
        </label>
        <textarea
          id="imageTitle"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Présentation 2 du projet..."
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
      {/* Champ Image 2*/}
      <div>
        <label htmlFor="image2" className="block mb-2 font-medium">
            Image { image2Path }
        </label>
        <input
          type="file"
          id="image2"
          accept="image/*"
          onChange={handleImageChange2}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="imageTitle2" className="block mb-2 font-medium">
          Titre Image 2
        </label>
        <textarea
          id="imageTitle2"
          value={imageTitle2}
          onChange={(e) => setImageTitle2(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Présentation 2 du projet..."
        />
      </div>
      {/* Aperçu de l'image 2 */}
      {preview2 && (
        <div className="relative w-full h-64">
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Aperçu 2:</p>
          <Image
            src={preview2}
            alt="Aperçu"
            fill
            className="object-contain rounded-lg"
          />
        </div>
        
      )}
      {/* Champ lien github*/}
      <div>
        <label htmlFor="link" className="block mb-2 font-medium">
          Lien Github
        </label>
        <textarea
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://github/hadrienvinay/Project"
        />
      </div>


      {/* Bouton Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Modification en cours...' : 'Modifier le projet'}
      </button>
    </form>
  );
}
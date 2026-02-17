// components/CreatePostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CreateMessageForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Message envoyé avec succès !');
        setName('');
        setEmail('');
        setMessage('');
        //router.refresh();
        router.push('/');
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
        <form onSubmit={handleSubmit} className="rounded-xl  dark:bg-gray-700 p-5 transition-colors duration-300" id="contactForm">
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-user text-gray-500 dark:text-gray-400"></i>
                    </div>
                    <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nom"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-envelope text-gray-500 dark:text-gray-400"></i>
                    </div>
                    <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse Email"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    />
                </div>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                    <i className="fas fa-comment text-gray-500 dark:text-gray-400"></i>
                    </div>
                    <textarea
                    rows={6}
                    name="message"
                    placeholder="Votre message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    ></textarea>
                </div>
            </div>

            <div>
            <button type="submit" 
            className="hover:cursor-pointer w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
            disabled={isSubmitting}
            >
            {isSubmitting ? 'Envoie en cours...' : 'Envoyer'}
            </button>
            </div>
            </form>
  );
}
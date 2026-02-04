// components/CreateLinkModal.tsx
'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'

interface CreateLinkModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateLinkModal({ isOpen, onClose }: CreateLinkModalProps) {
    
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [link, setLink] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('titre', titre)
      formData.append('description', description)
      formData.append('tag', tag)
      formData.append('link', link)

      const response = await fetch('/api/link', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Lien créé avec succès !')
        // Réinitialiser le formulaire
        setTitre('')
        setDescription('')
        setTag('')
        setLink('')
        onClose() // Fermer le modal
        router.refresh()
        router.push('/dashboard')
      } else {
        const data = await response.json()
        alert(`Erreur: ${data.error}`)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création du lien')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-50" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-green-200 p-6 shadow-xl transition-all">
                {/* Header avec bouton fermer */}
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-2xl font-bold">
                    Ajouter une nouvelle ressource
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className=""
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Entrez le titre de l'article"
                    />
                  </div>

                  {/* Champ Description */}
                  <div>
                    <label htmlFor="description" className="block mb-2 font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Séparez les tags par des virgules"
                    />
                  </div>

                  {/* Champ Lien */}
                  <div>
                    <label htmlFor="link" className="block mb-2 font-medium">
                      Lien
                    </label>
                    <input
                      type="url"
                      id="link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Ajout en cours...' : 'Ajouter le lien'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

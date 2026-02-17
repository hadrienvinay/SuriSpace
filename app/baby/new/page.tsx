'use client'
import { useRouter } from 'next/navigation';
// pages/baby-bet.tsx
import { useState, FormEvent } from 'react';

type Bet = {
  id: string;
  date: string;
  sexe: string;
  poids: string;
  taille: string;
  yeux: string;
  cheveux: string;
  nom: string;
  autres: string;
  parieurName: string;
};

export default function BabyBetPage() {
    const [formData, setFormData] = useState({
        sexe: '',
        poids: '',
        taille: '',
        yeux: '',
        cheveux: '',
        date: '',
        prenom: '',
        autres: '',
        parieurName: '',
    });
    const router = useRouter()



  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataPari = new FormData();
    formDataPari.append('sexe', formData.sexe)
    formDataPari.append('poids', formData.poids)
    formDataPari.append('taille', formData.taille)
    formDataPari.append('yeux', formData.yeux)
    formDataPari.append('cheveux', formData.cheveux)
    formDataPari.append('date', formData.date)
    formDataPari.append('prenom', formData.prenom)
    formDataPari.append('autres', formData.autres)
    formDataPari.append('parieurName', formData.parieurName)


    // Envoie les données à l'API
      const response = await fetch('/api/baby', {
        method: 'POST',
        body: formDataPari,
      });

      if (response.ok) {
        const message = 'pari crée avec succès'
        alert(message)        
        //router.refresh();
        router.push('/baby');
        router.refresh();

      } else {
        const data = await response.json();
        alert(`Erreur: ${data.error}`);
      }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-black">
  {/* Éléments décoratifs : cœurs et étoiles */}
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
    <div className="absolute top-10 left-10 text-pink-200 animate-pulse">❤️</div>
    <div className="absolute top-20 right-20 text-pink-200 animate-pulse">🌟</div>
    <div className="absolute bottom-10 left-10 text-pink-200 animate-pulse">❤️</div>
    <div className="absolute bottom-10 right-10 text-pink-200 animate-pulse">🌟</div>
    <div className="absolute top-1/3 right-10 text-pink-200 animate-pulse">👶</div>
    <div className="absolute top-1/3 left-10 text-pink-200 animate-pulse">💖</div>
    <div className="absolute bottom-1/3 left-9 text-pink-200 animate-pulse">💕</div>
  </div>

  {/* Conteneur principal */}
  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 relative z-10 border-2 border-pink-100">
    <div className="flex justify-center mb-6">
      <div className="text-5xl text-pink-400">👶💖</div>
    </div>
    <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
      Pariez sur le futur bébé des Babes !
    </h1>
    <p className="text-center text-xl mb-8 ">
      Remplissez ce formulaire et comparez vos prédictions après la naissance.
      <br />
      Tentez de gagner un super cadeau !
    </p>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Votre nom */}
      <div>
        <label className="block text-sm font-medium ">Votre nom (pour le classement)</label>
        <input
          type="text"
          name="parieurName"
          value={formData.parieurName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 transition duration-150 ease-in-out"
          placeholder="Ex: Jean Dupont"
        />
      </div>

      {/* Sexe */}
      <div className={`${formData.sexe ==='fille' ? 'bg-pink-100 ' : 'bg-blue-100 '} p-4 rounded-lg"`}>
        <label className="block text-sm font-medium  mb-2">Sexe</label>
        <div className="mt-2 space-x-6 flex justify-center">
          <label className="inline-flex items-center cursor-pointer bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition">
            <input
              type="radio"
              name="sexe"
              value="garçon"
              checked={formData.sexe === 'garçon'}
              onChange={handleChange}
              className="form-radio text-pink-500 focus:ring-pink-500"
            />
            <span className="ml-2  font-medium">Garçon 👦</span>
          </label>
          <label className="inline-flex items-center cursor-pointer bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition">
            <input
              type="radio"
              name="sexe"
              value="fille"
              checked={formData.sexe === 'fille'}
              onChange={handleChange}
              className="form-radio text-pink-500 focus:ring-pink-500"
            />
            <span className="ml-2  font-medium">Fille 👧</span>
          </label>
        </div>
      </div>

      {/* Date de naissance */}
      <div>
        <label className="block text-sm font-medium ">Date de naissance</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 transition duration-150 ease-in-out"
        />
      </div>

      {/* Prénom */}
      <div>
        <label className="block text-sm font-medium ">Prénom du nouveau-né</label>
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 transition duration-150 ease-in-out"
          placeholder="Ex: Emma, Lucas, etc."
        />
      </div>

      {/* Poids et Taille */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium ">Poids (en grammes)</label>
          <input
            type="number"
            name="poids"
            value={formData.poids}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 transition duration-150 ease-in-out"
            placeholder="Ex: 3200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium ">Taille (en cm)</label>
          <input
            type="number"
            name="taille"
            value={formData.taille}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 transition duration-150 ease-in-out"
            placeholder="Ex: 50"
          />
        </div>
      </div>

      {/* Couleur des yeux et cheveux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium ">Couleur des yeux</label>
          <select
            name="yeux"
            value={formData.yeux}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 transition duration-150 ease-in-out"
          >
            <option value="">-- Choisir --</option>
            <option value="bleu">Bleu 👁️💙</option>
            <option value="marron">Marron 👁️🤎</option>
            <option value="vert">Vert 👁️💚</option>
            <option value="gris">Gris 👁️⚪</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium ">Couleur des cheveux</label>
          <select
            name="cheveux"
            value={formData.cheveux}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 transition duration-150 ease-in-out"
          >
            <option value="">-- Choisir --</option>
            <option value="blond">Blond 💇‍♂️💛</option>
            <option value="brun">Brun 💇‍♂️🤎</option>
            <option value="roux">Roux 💇‍♂️🧡</option>
            <option value="noir">Noir 💇‍♂️⚫</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      {/* Autres paris */}
      <div>
        <label className="block text-sm font-medium ">Autres paris (optionnel)</label>
        <textarea
          name="autres"
          value={formData.autres}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 transition duration-150 ease-in-out"
          placeholder="Ex: Il/elle aura un grain de beauté sur la joue, il/elle sourira dès la naissance, etc."
        />
      </div>

      {/* Bouton de soumission */}
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="cursor-pointer inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-105 transition duration-150 ease-in-out"
        >
          Valider mes paris ❤️
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

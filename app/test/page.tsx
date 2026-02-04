'use client';

import { useEffect, useState } from 'react';
import Weather from '@/components/Weather'
import Ratp from '@/components/Ratp'
import StocksTable from '@/components/stockTable';
import { CreateLinkModal } from '@/components/CreateLinkModal';
import ShowStats from '@/components/ShowStats';
import ShowMessages from '@/components/ShowMessages';
// Note: Verify that Weather component accepts city as a string prop

export default function TestPage() {
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <section className={`mt-10 transition-colors duration-500 w-full overflow-hidden ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Ma Page</h1>
          <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle ressource
        </button>
                  
          {/* Toggle Switch */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`relative w-16 h-8 rounded-full transition-colors ${
              isDark ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 flex items-center justify-center ${
              isDark ? 'translate-x-8' : 'translate-x-0'
            }`}>
              {isDark ? '🌙' : '☀️'}
            </div>
          </button>
        </div>

        <div className="max-w-2xl space-y-6">
          <section className={`p-6 rounded-xl shadow-lg transition-all ${
            isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-gray-200'
          }`}>
            <h2 className="text-2xl font-bold mb-4">Bienvenue</h2>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Cette page démontre un système de thème simple mais efficace. 
              Cliquez sur le bouton en haut à droite pour basculer entre les modes clair et sombre.
            </p>
          </section>

          <section className={`p-6 rounded-xl shadow-lg transition-all ${
            isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-gray-200'
          }`}>
            <h2 className="text-2xl font-bold mb-4">Météo</h2>
            <Weather city="Paris" />
            <Weather city="Madrid" />
            <Ratp />
            <ul className={`list-disc list-inside space-y-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>Transition fluide entre les thèmes</li>
              <li>Design responsive</li>
              <li>Couleurs adaptées pour chaque mode</li>
              <li>Interface utilisateur intuitive</li>
            </ul>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg text-center transition-all ${
              isDark 
                ? 'bg-blue-900/30 border border-blue-700' 
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <p className="text-3xl font-bold">127</p>
              <p className="text-sm mt-1">Visiteurs</p>
            </div>
            <div className={`p-4 rounded-lg text-center transition-all ${
              isDark 
                ? 'bg-green-900/30 border border-green-700' 
                : 'bg-green-50 border border-green-200'
            }`}>
              <p className="text-3xl font-bold">42</p>
              <p className="text-sm mt-1">Articles</p>
            </div>
          </div>
        </div>
      </div>
      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
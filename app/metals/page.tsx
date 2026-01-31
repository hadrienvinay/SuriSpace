// app/metals/page.jsx
'use client';

import { useState, useEffect } from 'react';

export default function MetalsPrice() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchPrices();
    
    // Rafraîchir automatiquement toutes les 2 minutes si activé
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchPrices, 120000); // 2 minutes
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/metals');
      const data = await response.json();
      console.log('Données des prix:', data);

      if (response.ok && data.success) {
        setPrices(data);
        setLastUpdate(new Date());
        setError(null);
      } else {
        setError(data.error || 'Erreur inconnue');
        console.error('Erreur API:', data.details);
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error('Erreur fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  // État de chargement initial
  if (loading && !prices) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-900 dark:text-white">Chargement des prix spot...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Tentative de connexion aux sources de données...
          </p>
        </div>
      </div>
    );
  }

  // État d'erreur (sans prix précédents)
  if (error && !prices) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg max-w-md w-full">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span>❌</span>
            <span>Erreur de chargement</span>
          </h3>
          <p className="mb-4">{error}</p>
          <button
            onClick={fetchPrices}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }


  return (
    <section className=''>
    <div className="mt-10 min-h-screen bg-gradient-to-br from-yellow-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            💰 Prix Spot des métaux précieux
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Données en temps réel - Source: {prices?.gold?.source || 'Multiple'}
          </p>
          
          {/* Indicateur de source et statut */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow">
              <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {loading ? 'Mise à jour...' : 'Connecté'}
              </span>
            </div>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                autoRefresh 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400'
              }`}
            >
              {autoRefresh ? '🔄 Auto (2min)' : '⏸️ Manuel'}
            </button>
          </div>
          
          {/* Alerte d'erreur (si prix existants) */}
          {error && prices && (
            <div className="mt-4 inline-block bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 px-4 py-2 rounded">
              ⚠️ {error} - Affichage des dernières données
            </div>
          )}
        </div>
        
        {/* Grille des métaux */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Carte Or */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Or</h2>
                <p className="text-sm text-yellow-100">Prix Spot USD</p>
              </div>
              <span className="text-5xl md:text-6xl">🥇</span>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <p className="text-4xl md:text-6xl font-bold text-white">
                  ${prices?.gold?.price?.toFixed(2) || '0.00'}
                </p>
                <p className="text-sm text-yellow-100 mt-2">par once troy</p>
              </div>

              {prices?.gold?.pricePerGram && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <p className="text-xs text-yellow-100">Prix par gramme</p>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    ${prices.gold.pricePerGram.toFixed(2)}
                  </p>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-white font-semibold">En temps réel</p>
                </div>
                <p className="text-xs text-yellow-100">
                  Source: {prices?.gold?.source}
                </p>
              </div>
            </div>
          </div>

          {/* Carte Argent */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-500 rounded-2xl shadow-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Argent</h2>
                <p className="text-sm text-gray-100">Prix Spot USD</p>
              </div>
              <span className="text-5xl md:text-6xl">🥈</span>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <p className="text-4xl md:text-6xl font-bold text-white">
                  ${prices?.silver?.price?.toFixed(2) || '0.00'}
                </p>
                <p className="text-sm text-gray-100 mt-2">par once troy</p>
              </div>

              {prices?.silver?.pricePerGram && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <p className="text-xs text-gray-100">Prix par gramme</p>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    ${prices.silver.pricePerGram.toFixed(2)}
                  </p>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-white font-semibold">En temps réel</p>
                </div>
                <p className="text-xs text-gray-100">
                  Source: {prices?.silver?.source}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Analytics */}
        {prices?.gold?.price && prices?.silver?.price && (
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Ratio Or/Argent */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                📊 Ratio Or/Argent
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                {(prices.gold.price / prices.silver.price).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                1 oz Or = {(prices.gold.price / prices.silver.price).toFixed(2)} oz Argent
              </p>
            </div>

            {/* Valeur 1kg Or */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                🥇 Valeur 1 kg d'Or
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                ${(prices.gold.price * 32.15).toLocaleString('fr-FR', {maximumFractionDigits: 0})}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                1 kg ≈ 32.15 onces troy
              </p>
            </div>

            {/* Valeur 1kg Argent */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                🥈 Valeur 1 kg d'Argent
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-gray-600 dark:text-gray-400">
                ${(prices.silver.price * 32.15).toLocaleString('fr-FR', {maximumFractionDigits: 0})}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                1 kg ≈ 32.15 onces troy
              </p>
            </div>
          </div>
        )}

        {/* Calculateur rapide */}
        <div className="mt-6 md:mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            🧮 Calculateur rapide
          </h3>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <QuickCalculator
              metal="Or"
              price={prices?.gold?.price}
              color="yellow"
              icon="🥇"
            />
            <QuickCalculator
              metal="Argent"
              price={prices?.silver?.price}
              color="gray"
              icon="🥈"
            />
          </div>
        </div>

        {/* Bouton de rafraîchissement */}
        <div className="mt-6 md:mt-8 text-center">
          <button
            onClick={fetchPrices}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 md:px-8 rounded-lg transition shadow-lg flex items-center gap-2 mx-auto ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className={loading ? 'animate-spin' : ''}>🔄</span>
            {loading ? 'Mise à jour...' : 'Rafraîchir maintenant'}
          </button>
          
          <div className="mt-4 space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {autoRefresh ? 'Rafraîchissement automatique activé (toutes les 2 minutes)' : 'Rafraîchissement manuel'}
            </p>
            {lastUpdate && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dernière actualisation: {lastUpdate.toLocaleTimeString('fr-FR')}
              </p>
            )}
          </div>
        </div>

        {/* Info sources */}
        <div className="mt-6 md:mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Sources multiples:</strong> Cette application utilise plusieurs sources de données avec fallback automatique:
          </p>
          <ul className="text-xs text-blue-700 dark:text-blue-300 mt-2 space-y-1 ml-4">
            <li>• <strong>GoldPrice.org</strong> -  Source principale - données Json</li>
            <li>• <strong>Alpha Vantage</strong> - Fallback #2 (25 req/jour)</li>
          </ul>
        </div>
      </div>
    </div>
    </section>
  );
}

// Composant calculateur
function QuickCalculator({ metal, price, color, icon }) {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('oz'); // 'oz' ou 'g'

  if (!price) return null;

  const calculateValue = () => {
    if (unit === 'oz') {
      return price * quantity;
    } else {
      // Convertir grammes en onces troy (1 oz = 31.1035g)
      return (price / 31.1035) * quantity;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <h4 className="font-semibold text-gray-900 dark:text-white">{metal}</h4>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Quantité
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Unité
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="oz">Onces</option>
            <option value="g">Grammes</option>
          </select>
        </div>
      </div>
      
      <div className={`bg-${color}-50 dark:bg-${color}-900/20 rounded-lg p-4 border border-${color}-200 dark:border-${color}-800`}>
        <p className="text-sm text-gray-600 dark:text-gray-400">Valeur totale</p>
        <p className={`text-3xl font-bold text-${color}-600 dark:text-${color}-400`}>
          ${calculateValue().toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {quantity} {unit === 'oz' ? 'once(s)' : 'gramme(s)'} × ${unit === 'oz' ? price.toFixed(2) : (price / 31.1035).toFixed(2)}/{unit}
        </p>
      </div>
    </div>
  );
}
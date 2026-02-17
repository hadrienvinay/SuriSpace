'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Question1Page() {
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const router = useRouter();

  const pokemons = [
    { id: 'pikachu', name: 'Pikachu', image: '/pikachu.png' },
    { id: 'bulbizarre', name: 'Bulbizarre', image: '/bulbizarre.png' },
    { id: 'salamèche', name: 'Salamèche', image: '/salamèche.png' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPokemon) return;
    // Stocke la réponse (ex: dans un contexte global ou localStorage)
    router.push('/evg/aventure/question2');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-pokemon-red">
      <h1 className="text-3xl font-bold text-pokemon-yellow mb-8">Question 1</h1>
      <div className="card w-full max-w-md">
        <h2 className="text-xl mb-4 text-pokemon-black">
          Quel Pokémon choisis-tu pour commencer ton aventure ?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer ${
                selectedPokemon === pokemon.id
                  ? 'bg-amber-600  bg-opacity-20'
                  : 'border-pokemon-gray'
              }`}
              onClick={() => setSelectedPokemon(pokemon.id)}
            >
              <input
                type="radio"
                id={pokemon.id}
                name="pokemon"
                value={pokemon.id}
                checked={selectedPokemon === pokemon.id}
                onChange={() => setSelectedPokemon(pokemon.id)}
                className="hidden"
              />
              <label
                htmlFor={pokemon.id}
                className="flex items-center w-full cursor-pointer"
              >
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-12 h-12 mr-4"
                />
                <span className="text-lg">{pokemon.name}</span>
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="button w-full mt-4"
            disabled={!selectedPokemon}
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

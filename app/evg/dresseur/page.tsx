export default function DresseurPage() {
  const pokemons = ["Pikachu", "Bulbizarre", "Salamèche"];
  const inventaire = ["Potion", "Poké Ball", "Badges x3"];

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Ton profil de dresseur</h1>
      <div className="mb-8">
        <h2 className="text-2xl mb-2">Tes Pokémon</h2>
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon} className="text-xl">{pokemon}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl mb-2">Inventaire</h2>
        <ul>
          {inventaire.map((item) => (
            <li key={item} className="text-xl">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

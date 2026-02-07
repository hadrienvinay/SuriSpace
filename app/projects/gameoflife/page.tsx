import GameofLife from '@/components/GameOfLife';
import Image from 'next/image';

export const metadata = {
  title: 'Jeu de la Vie',
};

export default function GameofLifePage() {
  return (
    <section className="space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          Le Jeu de <span className="text-blue-600">la Vie</span>
        </h1>
        
      </div>
      <GameofLife />

      <p className="mt-6 text-xl ">
          Le Jeu de la Vie est un automate cellulaire inventé par le mathématicien britannique John Horton Conway en 1970. Il s'agit d'un jeu de simulation dans lequel des cellules vivent, meurent ou se reproduisent en fonction de règles simples basées sur le nombre de voisins vivants.
        </p>
        <div className="mt-6 text-xl">
            Les règles du Jeu de la Vie sont les suivantes :
            <ul className="list-disc list-inside text-left mt-4">
            <li>Une cellule vivante avec moins de 2 voisins vivants meurt (sous-population).</li>
            <li>Une cellule vivante avec 2 ou 3 voisins vivants survit.</li>
            <li>Une cellule vivante avec plus de 3 voisins vivants meurt (surpopulation).</li>
            <li>Une cellule morte avec exactement 3 voisins vivants devient vivante (reproduction).</li>
            </ul>
        </div>
        <div>
            <Image src="/uploads/gameoflife_exemples.png" alt="Game of Life" width={600} height={400} className="mx-auto rounded-lg shadow-md" />
            <div className="mt-3 text-sm text-center">
                Exemple de structures connues
              </div>
        </div>
      </section>
  );
}

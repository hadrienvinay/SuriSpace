import Link from "next/link";
import dynamic from "next/dynamic";
import MapboxMap from "../../components/Map"

export  default function EvgPage() {

  return (
    <section className="space-y-4 evg_page">

      {/* HERO */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          L'EVG de <span className="text-blue-600">ROMAIN</span>
        </h1>
        <p className="subtitle">Prêt à devenir le meilleur dresseur ?</p>
        <div className="text-2xl mt-2 gap-6 flex flex-col items-center">
          <div className="evg_card text-center">
            <h2 className="text-2xl mb-4">Ta progression</h2>
            <p className="text-lg ">Pokémon capturés : 0/10</p>
            <p className="text-lg">Badges obtenus : 0/5</p>
          </div>
          <Link href="/evg/aventure" className="bg-pokemon-yellow bg-red-400 text-pokemon-red px-4 py-2 rounded-lg text-xl font-bold">
            Lancer l’aventure
          </Link>
          <Link  href="/evg/dresseur" className="bg-pokemon-yellow bg-blue-400 text-pokemon-red px-4 py-2 rounded-lg text-xl font-bold" >
            Mon profil de dresseur
          </Link>
        </div>
      </div>

      {/*/ HERO <MapboxMap />*/}
      

    </section>

  );
}

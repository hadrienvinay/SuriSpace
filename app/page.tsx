
import Link from "next/link";
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Weather from '@/components/Weather'
import Ratp from '@/components/Ratp'

export default function Home() {
    
    //const user = await prisma.user.findMany()
    //console.log(user)
  
  return (
    <section className="space-y-16">
      {/* HERO */}
      <div className="text-center mt-10">
        
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          Bienvenue sur <span className="text-blue-600">Suri's Page</span>
        </h1>
        <p className="mt-6 text-xl max-w-2xl mx-auto">
          Un blog permettant de centraliser mes projets, idées et avancées 
          Framework NextJs, Prisma pour la base de donnée, NextAuth pour l'authentification
          Diverses API : MapBox, Météo, Ratp, Bourses
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/Hadrien-Vinay-Resume.pdf" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">
            Voir mon CV
          </Link>
          <Link href="/about" className="px-6 py-3 bg-green-400 text-white rounded-lg font-semibold shadow hover:bg-green-500 transition">
            Qui suis-je ? 
          </Link>
        </div>
      </div>

      {/* FEATURED CARDS */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        
        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold">🌅​ Météo</h3>
          <div className="mt-2">
            <Weather city="Paris" />
          </div>
          <div className="mt-2">  
            <Weather city="Madrid" />
          </div>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold">🚇 Horraires transports</h3>
            <Ratp />
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold">⚡ Astro</h3>
          <p className="mt-2">
            Prochaine éclipse totale : 12 août 2026
          </p>
        </div>

      </div>

      <div>
         
      <div className="max-w-screen-xl mx-auto py-4 px-2 lg:py-16 lg:px-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center mb-10">
            <h2 className="text-4xl tracking-tight font-bold text-primary-800">Projets récents</h2>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="mr-0 md:mr-8 mb-6 md:mb-0 mt-10">
              <Image
                  src="/python_img.webp" 
                  width={400}
                  height={400}
                  alt="current"
                  className="w-1/2 md:w-full mx-auto"
                />
          </div>

            <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
                <div className="w-full sm:w-1/2 mb-4 px-2 ">
                    <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                        <h3 className="text-2xl font-bold text-md mb-6">Site Web dynamique</h3>
                        <p className="text-sm">Site internet moderne fait en 2025 avec Next JS, mis à jour régulièrement</p>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 mb-4 px-2 ">
                    <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                        <h3 className="text-2xl font-bold text-md mb-6">Belote Coinchée</h3>
                        <p className="text-sm"> Réalisé en python en décembre 2025, vous pouvez vous entrainer à la coinche contre des ordinateurs. Bientôt une version multijoueur sur ce site ou en application indépendante ?</p>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 mb-4 px-2 ">
                    <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                        <h3 className="text-2xl font-bold text-md mb-6">Système solaire en 2D et en 3D</h3>
                        <p className="text-sm">Modèle de simulation avec les lois de Newton. Permet de jouer avec les masses et la gravité dans l'espace. 2 Modèles réalistes crées : système Terre-Lune et le système solaire complet.</p>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 mb-4 px-2 ">
                    <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                        <h3 className="text-2xl font-bold text-md mb-6">Bot de trading</h3>
                        <p className="text-sm"> En cours de réalisation, afin de parier sur la bourse. Spécialisé pour le moment dans la reconnaissance de patern et sur l'or et l'argent</p>
                    </div>
                </div>


            </div>
          </div>
        </div>

      </div>

    </section>

  );
}

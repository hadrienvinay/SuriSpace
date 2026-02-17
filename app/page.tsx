
import Link from "next/link";
import Image from 'next/image';
import Weather from '@/components/Weather'
import Ratp from '@/components/Ratp'
import Links from '@/components/ShowLinks'

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
        <p className="mt-6 text-xl max-w-3xl mx-auto">
          Un blog permettant de centraliser mes projets, idées et avancées 
          Fait avec le Framework NextJs, Prisma pour la base de donnée, NextAuth pour l'authentification
          Utilisation de diverses API : MapBox, Météo, Ratp, Bourses, LLM
        </p>
        <p className="mt-6 text-l max-w-6xl mx-auto justify italic">
          <b>Citation du jour : </b>"Pour découvrir les meilleures règles de société qui conviennent aux nations, il faudrait une intelligence supérieure qui vît toutes les passions des hommes
           et qui n'en éprouvât aucune; qui n'eût aucune rapport avec notre nature et qui la connût à fond ; dont le bonheur fût indépendant de nous et qui pourtant voulût bien 
           s'occuper du notre [...]. Il faudrait des Dieux pour donner des lois aux hommes." <b>(Jean-Jacques Rousseau, Du contrat social, 1762)</b>
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
          <div className="mt-2">  
            <Weather city="Arcachon" />
          </div>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold">🚇 Horraires transports</h3>
            <Ratp />
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">

          <h3 className="text-xl font-bold">⚡ Compétences</h3>
          <div className="mt-2 ">
            <div className="flex flex-wrap p-2 gap-2">
              <div className=" sm:w-5/11 w-full ">
                <div className="myclass bg-blue-100 rounded flex h-full items-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                        className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-2" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <span className="font-medium">C, C++</span>
                </div>
                </div>
                <div className=" sm:w-5/11 w-full">
                  <div className="myclass bg-blue-100 rounded flex h-full items-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                          className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-2" viewBox="0 0 24 24">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <span className="font-medium">Python</span>
                  </div>
                </div>
                <div className=" sm:w-5/11 w-full">
                  <div className="myclass bg-blue-100 rounded flex h-full items-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                          className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-2" viewBox="0 0 24 24">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <span className="font-medium">Web Framework</span>
                  </div>
                </div>
                <div className=" sm:w-5/11 w-full">
                  <div className="myclass bg-blue-100 rounded flex h-full items-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                          className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-2" viewBox="0 0 24 24">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <span className="font-medium">SQL, Backend</span>
                  </div>
                </div>
                <div className=" sm:w-5/11 w-full">
                  <div className="myclass bg-blue-100 rounded flex h-full items-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                          className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-2" viewBox="0 0 24 24">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <span className="font-medium">Embedded Systems</span>
                  </div>
                </div>
                <div className=" sm:w-5/11 w-full">
                  <div className="myclass bg-blue-100 rounded flex h-full items-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                          className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-2" viewBox="0 0 24 24">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <span className="font-medium">Versionning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>

         
      <div className="max-w-screen-xl mx-auto py-4 px-2 lg:py-16 lg:px-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center mb-10">
            <h2 className="text-4xl tracking-tight font-bold text-primary-800">Projets récents</h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="mr-0 md:mr-8 mb-10 lg:mb-0 mt-0 md:mt-10 lg:mt-20">
              <Image
                  src="/python_img.webp" 
                  width={400}
                  height={400}
                  alt="current"
                  className="w-1/2 md:w-full mx-auto rounded-2xl"
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

      <div className="max-w-screen-xl mx-auto py-4 px-2 lg:py-16 lg:px-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center mb-10">
            <h2 className="text-4xl tracking-tight font-bold text-primary-800">Médias et ressources utiles</h2>
        </div>  
        <Links/>   
      </div>



    </section>

  );
}

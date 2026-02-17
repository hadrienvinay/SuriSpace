import Link from "next/link";
import Image from 'next/image'
import prisma from '@/lib/prisma'
import MyMap from "@/components/Map_Suri"
import { SportCarousel, TripCarousel } from "@/components/Carousel"

export default async function About() {
  
  return (

<section className="w-full overflow-hidden mt-4">
    <div className="flex flex-col">
        <img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxlYXJ0aHxlbnwwfDB8fHwxNzQ2NTM0MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="User Cover" className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem]" />
        <div className="sm:w-[80%] w-[90%] mx-auto flex">
            <Image
                src="/uploads/profil/profil.png"
                width={1000}
                height={1000}
                alt="image"
                className="rounded-md lg:w-48 lg:h-48 md:w-40 md:h-40 sm:w-32 sm:h-32 w-28 h-28 outline-4 outline-offset-2 outline-blue-500 relative lg:-top-20 sm:-top-16 -top-12"
            />
            <h1 className="w-full text-left my-2 sm:mx-2 pl-4 lg:text-4xl md:text-3xl sm:text-3xl text-xl font-serif">
                Hadrien Vinay
            </h1>
        </div>
        
        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 -top-4">
            <p className="w-fit text-md">
                Jeune Ingénieur de 29 ans, spécialisé dans les systèmes d'information et les systèmes embarqués.<br></br>
                Féru de connaissances, j'ai à coeur de partager mais aussi de découvrir toujours de nouvelles idées, histoires et actualités sur le monde qui nous entoure.<br></br>
                Que ce soit les sciences de pointe comme la physique nucléaire ou bien mécanique céleste, l'économie, l'histoire, la géopolitique, l'informatique, chaque jour est source de nouvelles découvertes et d'aventure. <br></br>
                Je partage ici mes différents projets réalisés ces dernières années, mes dernières idées et recherches, mes diverses activités et voyages.
            </p>
            <div className="flex gap-2 flex-wrap justify-center max-w-3xl p-4 ">
             
                <Link href="/Hadrien-Vinay-Resume.pdf" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                    👨‍🎓 Voir mon CV 
                </Link>
                <Link href="https://www.linkedin.com/in/hadrien-vinay/" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                    <svg className="w-5 h-5 me-2 -ms-1 text-blue-500" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                          d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                          clipRule="evenodd" />
                      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                    </svg>
                    Profil Linkedin 

                </Link>
                <Link href="https://github.com/hadrienvinay" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                    <svg className="w-5 h-5 me-2 -ms-1 text-green-600" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" 
                      clipRule="evenodd" />
                    </svg>
                    Profil Github 
                </Link>
            </div>

            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                <div className="w-full flex sm:flex-row flex-col gap-2 justify-center">
                    <div className="w-full">
                        <dl className=" divide-y divide-gray-200 ">
                            <div className="flex flex-col pb-3">
                                <dt className="mb-1 text-gray-500 md:text-lg ">Prénom</dt>
                                <dd className="text-lg font-semibold">Hadrien</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 md:text-lg ">Nom de Famille</dt>
                                <dd className="text-lg font-semibold">Vinay</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 md:text-lg">Date de Naissance</dt>
                                <dd className="text-lg font-semibold">24/08/1996</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 md:text-lg">Sexe</dt>
                                <dd className="text-lg font-semibold">Masculin</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="w-full">
                        <dl className="divide-y divide-gray-200">
                            <div className="flex flex-col pb-3">
                                <dt className="mb-1 text-gray-500 md:text-lg ">Localisation</dt>
                                <dd className="text-lg font-semibold">Arcachon, France</dd>
                            </div>
                            <div className="flex flex-col pt-3">
                                <dt className="mb-1 text-gray-500 md:text-lg ">Numéro de Téléphone</dt>
                                <dd className="text-lg font-semibold">+33643079512</dd>
                            </div>
                            <div className="flex flex-col pt-3">
                                <dt className="mb-1 text-gray-500 md:text-lg ">Email</dt>
                                <dd className="text-lg font-semibold">hadrien.vinay@yahoo.fr</dd>
                            </div>
                            <div className="flex flex-col pt-3">
                                <dt className="mb-1 text-gray-500 md:text-lg ">Site Internet</dt>
                                <dd className="text-lg font-semibold hover:text-blue-500">
                                    <a href="https://suri-space.vercel.app/">https://suri-space.vercel.app/</a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                
                <div className="my-10 w-full ">
                    <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 lg:text-4xl md:text-3xl text-xl">
                        Activités
                    </h1>
                   <div className="flex flex-wrap items-center mt-10 text-left text-center">
                    <div className="w-full md:w-3/5 lg:w-1/2 px-4">
                        <SportCarousel />    
                    </div>
                    <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
                        <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                            Sports
                        </h3>
                        <p className="sm:text-lg mt-6">
                            Triathlète depuis peu, j'aime me dépasser et découvrir de nouveaux horizons, tout en m'entrainant régulièrement à la course à pied, au vélo et plus rarement à la natation dans le bassin d'Arcachon.
                            Amateur d'escalade tout d'abord en salle, je me suis confronté depuis quelques années aux falaises et voies naturelles, notamment en Espagne et en France.
                        </p>
                    </div>
                    </div>
                    <div className="flex flex-wrap items-center mt-10 text-left text-center">
                     <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
                        <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                            Voyage et randonnées
                        </h3>
                        <p className="sm:text-lg mt-6">
                            J'adore voyager en autonomie à travers la France et l'Europe dès que j'en ai l'occasion à vélo ou à pied avec un sac à dos.
                            Les Alpes, la Corse, les Dolomites, le chemin de Stevenson sont quelques-unes de mes plus belles expériences de randonnée.
                            Mon rêve est de traverser les Pyrénées en suivant le fameux tracé du GR10 et de faire le tour d'Espagne à vélo.
                        </p>
                    </div>
                     <div className="w-full md:w-3/5 lg:w-1/2 px-4">
                        <TripCarousel />    
                    </div>
                </div>
                </div>

                <div className="my-10 mb-70 g:w-[70%] md:h-[14rem] w-full h-[10rem]">
                    <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 lg:text-4xl md:text-3xl text-xl">
                        My Location
                    </h1>
                    <MyMap />
                </div>
            </div>

        </div>
    </div>

    <div className="fixed right-2 top-40 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
          <a href="https://www.linkedin.com/in/hadrien-vinay/">
              <div className="p-2 hover:text-primary hover:dark:text-primary">
                  <svg className="lg:w-6 lg:h-6 w-4 h-4 text-blue-500" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                          d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                          clipRule="evenodd" />
                      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                  </svg>

              </div>
          </a>
          <a href="https://github.com/hadrienvinay">
              <div className="p-2 hover:text-green-500 hover:dark:text-green-500">
                  <svg className="lg:w-6 lg:h-6 w-4 h-4 text-green-600" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" 
                      clipRule="evenodd" />
                  </svg>
              </div>
          </a>
          <a href="/Hadrien-Vinay-Resume.pdf">
              <div className="p-2 hover:text-primary hover:dark:text-primary">
                   <Image 
                    src="/file.svg" 
                    alt="Retour" 
                    width={24} 
                    height={24}
                    className="w-6 h-6"
                    />
              </div>
          </a>
        </div>
</section>



  );
}


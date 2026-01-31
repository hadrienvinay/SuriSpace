import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from "next/navigation";

export default async function Algoculture() {
  
  return (
    <section className="space-y-16">

    <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                    <div className="shrink-0">
                        <Image
                        src="/python_img.webp"
                        width={100}
                        height={100}
                        alt="image"
                        className="size-12 rounded-full"
                        />
                    </div>

                    <div className="grow">
                        <div className="flex justify-between items-center gap-x-2">
                            <div>
                            <div className="hs-tooltip [--trigger:hover] [--placement:bottom] inline-block">
                                <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                                <span className="font-semibold">
                                    Hadrien Vinay
                                </span>

                                <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl" role="tooltip">
                                    <div className="p-4 sm:p-5">
                                    <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                                        <div className="shrink-0">
                                        <Image
                                            src="/python_img.webp"
                                            width={100}
                                            height={100}
                                            alt="image"
                                            className="size-8 rounded-full"
                                            />
                                        </div>

                                        <div className="grow">
                                        <p className="text-lg font-semibold">
                                            Leyla Ludic
                                        </p>
                                        </div>
                                    </div>
                                    <p className="text-sm">
                                        Leyla is a Customer Success Specialist at Preline and spends her time speaking to in-house recruiters all over the world.
                                    </p>
                                    </div>

                                    <div className="flex justify-between items-center px-4 py-3 sm:px-5">
                                        <ul className="text-xs space-x-3">
                                            <li className="inline-block">
                                            <span className="font-semibold">56</span>
                                            <span className="text-gray-400 ">articles</span>
                                            </li>
                                            <li className="inline-block">
                                            <span className="font-semibold">1k+</span>
                                            <span className=" ">followers</span>
                                            </li>
                                        </ul>

                                        <div>
                                            <button type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                            Follow
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <ul className="text-xs">
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                Jan 18
                                </li>
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                                2 min read
                                </li>
                            </ul>
                        </div>

                        <div>
                        <button type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none :text-white">
                            <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                            Tweet
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
            

        <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
                <h2 className="text-center text-2xl font-bold md:text-3xl">🌱 La culture des algues dans le monde : un secteur en pleine expansion</h2>
                <p className="text-lg ">
                    La culture des algues — ou algoculture — est une activité vieille de plusieurs siècles, mais elle connaît aujourd’hui une croissance rapide à l’échelle mondiale. La production mondiale d’algues cultivées dépasse aujourd’hui les 14 millions de tonnes par an, principalement sous forme de macro-algues marines (comme les laminaires, le wakamé ou le nori). Elle est dominée par des pays d’Asie-Pacifique tels que la Chine, l’Indonésie et le Japon, qui représentent la majorité de la production mondiale.
                </p>
            </div>

            <p className="text-lg">
                Le rôle écologique de ces cultures n’est pas négligeable : les algues sont de redoutables pompes à carbone (elles captent le CO₂ par photosynthèse sans besoin d’intrants agricoles) et contribuent à atténuer l’acidification des océans — un atout dans un contexte de changement climatique.                    
            </p>

            <figure>
                <Image
                    src="/uploads/image-1769438168655-893060458.jpg"
                    width={100}
                    height={100}
                    alt="image"
                    className="w-full object-cover rounded-xl"
                    unoptimized
                    />
                <figcaption className="mt-3 text-sm text-center">
                    Une culture d'algue en Asie
                </figcaption>
            </figure>

            <blockquote className="text-center p-4 sm:px-7">
                <p className="text-xl font-medium md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal">
                    L'algoculture c'est ""
                </p>
                <p className="mt-5 text-gray-800">
                Nicole Grazioso
                </p>
            </blockquote>

            <div className="space-y-3">
                <h3 className="text-2xl font-semibold ">
                    🛠️ Applications : de l’alimentation aux biotechnologies
                </h3>

                <div className="text-lg ">
                    Les algues ont des usages très diversifiés :
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg ">
                        <li className="ps-2">🥢 Alimentation humaine : une part très importante de la production mondiale est destinée à la consommation directe comme légume marin (sushis, salades, snacks). </li>
                        <li className="ps-2">🧪 Industrie et chimie : elles fournissent des hydrocolloïdes (alginate, agar, carraghénanes) utilisés comme gélifiants et épaississants dans de nombreux produits alimentaires et cosmétiques.</li>
                        <li className="ps-2">💄 Cosmétiques & bien-être : extraits d’algues aux propriétés hydratantes, anti-âge et protectrices. </li>
                        <li className="ps-2">🚜 Agriculture & fertilisation : les algues et leurs extraits améliorent la qualité des sols et stimulent la croissance des plantes. </li>
                        <li className="ps-2">🐄 Alimentation animale et biocarburants : des pistes de développement (énergétiques et pour réduire les émissions) sont en cours d’exploration dans plusieurs pays. </li>
                    </ul>
                    Ce large éventail d’applications positionne la culture des algues comme une composante clé de l’économie bleue durable et de la bio-économie du XXIᵉ siècle.                    
                </div>
            </div>
            
            <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                    🇫🇷 Son usage en France
                </h3>
                <p className="text-lg ">
                En France, la filière algues est historique mais encore limitée :
                    * La production annuelle française s’élève à plusieurs dizaines de milliers de tonnes, mais elle est surtout issue de la récolte sauvage en mer, notamment en Bretagne et au Pays Basque, plutôt que de culture contrôlée. 
                    * L’algoculture commerciale reste moins développée qu’en Asie, avec une part minoritaire de la production totale. 
                    Pourtant, plusieurs facteurs plaident en faveur d’un développement plus fort :🌟 Potentiel technologique — des projets pilotes de culture en mer ou en bassins (y compris associée à la conchyliculture) explorent des modèles économiquement viables. 🌱 Demande croissante pour les produits d’algues alimentaires, cosmétiques et bio-technologiques. 📈 Soutien institutionnel — des missions ministérielles encouragent l’émergence d’une filière structurée, notamment pour valoriser les molécules d’intérêt.
                    Les défis restent néanmoins réels : le marché alimentaire pourrait évoluer plus lentement, les techniques de culture nécessitent encore des innovations pour devenir rentables à large échelle, et la gestion écologique du littoral doit s’équilibrer avec les objectifs de production.
                </p>
            </div>  
            <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                    🧭 En résumé
                </h3>
                <p className="text-lg">
                La culture des algues est une activité mondiale en forte croissance, avec des applications allant de l’alimentation humaine à l’industrie, aux cosmétiques, aux biocarburants et à l’agriculture durable. En France, malgré un héritage riche et des atouts naturels, l’algoculture en mer et en bassin reste un secteur émergent à fort potentiel, qui pourrait jouer un rôle stratégique dans l’économie bleue française si les obstacles techniques et économiques sont relevés dans les années à venir.
                </p>
            </div>  

            <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                    Ressources
                </h3>
                <div className="text-lg ">
                    Liste 
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg ">
                        <li className="ps-2">https://www.persee.fr/doc/geo_0003-4010_1996_num_105_591_21712</li>
                    </ul>

                </div>
            </div>  
        </div>
    </div>

    </section>

  );
}

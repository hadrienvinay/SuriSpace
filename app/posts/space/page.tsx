import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from "next/navigation";

export default function Space() {
  
  return (
    <section className="space-y-16">

    <div className="max-w-4xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl">
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
                                    </div>

                                    </div>

                                </div>
                            </div>
                            </div>

                            <ul className="text-xs">
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                31 Janvier 2026
                                </li>
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                                2 min de lecture
                                </li>
                            </ul>
                        </div>

                        <div>
                            <a id="back-button" href="/posts" type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                                </svg>
                                Retour
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
            

        <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
                <h2 className="text-center text-2xl font-bold md:text-3xl">L'actualité spatiale 2026</h2>
                <p className="text-lg ">
                    Voici un panorama des dernières nouvelles et tendances majeures du monde spatial en 2026 🌌. 
                </p>
                <p className="text-lg ">
                    Elles couvrent l’exploration humaine, les technologies spatiales, la compétition internationale et les projets scientifiques.            
                </p>
            </div>
            <div className="space-y-3">
                <h3 className="text-2xl font-semibold ">
                    🚀 Exploration habitée
                </h3>

                <div className="text-lg ">
                    Mission Artemis II : la NASA effectue les derniers tests avant la première mission habitée autour de la Lune depuis Apollo. Le lancement est prévu début février 2026, mais il a été temporairement retardé à cause du froid extrême sur la rampe de lancement en Floride.
                    Cette mission emportera quatre astronautes pour un survol lunaire, marquant une étape historique dans l’exploration spatiale humaine.
            </div>
            </div>
            <figure>
                <Image
                    src="/artemis.jpg"
                    width={100}
                    height={100}
                    alt="image"
                    className="w-full object-cover rounded-xl"
                    unoptimized
                    />
                <figcaption className="mt-3 text-sm text-center">
                   La fusée Artemis sur son pas de tir
                </figcaption>
            </figure>

            <blockquote className="text-center p-4 sm:px-7">
                <p className="text-lg font-medium md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal">
                    « Je suis ici aujourd'hui parce que j'ai été inspirée par une autre astronaute. Je me souviens très bien du lancement de Claudie Haigneré. J'avais 14 ans, et ce jour-là, quelque chose a fait tilt dans mon esprit. Elle était la première Française à aller dans l'espace et elle m'a inspirée à me dire : « Pourquoi pas moi ? »
                </p>
                <p className="mt-5 ">
                    Sophie Adenot, première femme astronaute française sélectionnée par l'ESA en 2022
                </p>
            </blockquote>

            <div className="space-y-3">
                <h3 className="text-2xl font-semibold ">
                    🚀 Exploration habitée
                </h3>

                <div className="text-lg ">
                    Mission Artemis II : la NASA effectue les derniers tests avant la première mission habitée autour de la Lune depuis Apollo. Le lancement est prévu début février 2026, mais il a été temporairement retardé à cause du froid extrême sur la rampe de lancement en Floride.
                    Cette mission emportera quatre astronautes pour un survol lunaire, marquant une étape historique dans l’exploration spatiale humaine.
            </div>
            </div>
            
            <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                    🛰️ Les lanceurs et infrastructures spatiales
                </h3>
                <p className="text-lg ">
                - Europe (Ariane) : l’Agence spatiale européenne et l’UE confient à la fusée Ariane 6 le lancement de satellites Galileo de nouvelle génération — un pas vers plus d’autonomie européenne.
                </p>
                <p className="text-lg ">

                - Fusées commerciales : des évolutions dans les designs de lanceurs (ex. nouveaux boosters plus puissants pour Ariane 6) sont prévues en 2026, tout comme des démonstrations technologiques autour des vols réutilisables.</p>
            </div> 
            <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                   🌐 Compétition et économie spatiale
                </h3>
                <p className="text-lg">
                    - IA dans l’espace : les applications d’intelligence artificielle en orbite deviennent un marché en croissance, avec intégration sur satellites et infrastructures spatiales.
                </p>
                <p className="text-lg">
                    - Fusion SpaceX / xAI ? Selon des sources récentes, SpaceX serait en discussions pour une fusion stratégique avec la société d’IA xAI, dans un projet visant à renforcer leur présence technologique et commerciale dans l’espace.                
                </p>
            </div> 
             <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                    🔭 Science et observation
                </h3>
                <p className="text-lg">
                    Parmi les grandes missions scientifiques attendues en 2026 (annonces récentes) :
                </p>
                <p className="text-lg">
                    - Télescopes spatiaux : le Roman Space Telescope (NASA) et PLATO (ESA) sont prévus cette année pour explorer des exoplanètes et étudier l’univers lointain.
                    </p>
                <p className="text-lg">
                    - Nouvelles cartographies stellaires : missions européennes comme PLATO viseront à surveiller des milliers d’étoiles pour trouver des mondes potentiellement habitables.                
                </p>
            </div>   
             <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                    📡 Autres tendances en 2026  
                </h3>
                <p className="text-lg">
                    New space & tourisme spatial : certains projets privent l’industrie des vols suborbitaux pour se concentrer sur des infrastructures lourdes (ex. Blue Origin recentrant ses efforts sur les capacités lunaires plutôt que les vols touristiques dans les deux prochaines années).                    </p>
                <p className="text-lg">
                    Budget(s) spatiaux en hausse : des gouvernements comme l’Inde renforcent leurs financements pour développer les capacités nationales de lancement et satellitaires.                </p>
            </div>  

            <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                    Ressources
                </h3>
                <div className="text-lg ">
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg ">
                        <li className="ps-2">https://www.space.com/news/live/artemis-2-moon-rocket-nasa-fueling-test-jan-31-2026</li>
                        <li className="ps-2">https://www.reuters.com/business/aerospace-defense/eu-space-agency-signs-contract-launch-galileo-satellites-with-ariane-6-2026-01-28/</li>
                        <li className="ps-2">https://www.nasaspaceflight.com/2026/01/space-science-2026-preview</li>
                        <li className="ps-2">https://nasaspacenews.com/2026/02/to-pause-space-tourism</li>
                        <li className="ps-2">https://phys.org/space-news/</li>
                    </ul>

                </div>
            </div>  
        </div>
    </div>

    </section>

  );
}

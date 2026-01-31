import Image from 'next/image'
import { notFound } from "next/navigation";

export default async function Negative() {
  
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
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <ul className="text-xs">
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                Jan 18
                                </li>
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                2 min read
                                </li>
                            </ul>
                        </div>

                        <div>
                        <button type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   ">
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
                <h2 className="text-center text-2xl font-bold md:text-3xl ">La masse négative : symétries, géométrie et cosmologies en miroir</h2>
                <p className="text-lg">
                    De la matière classique au modèle Janus face au ΛCDM
                </p>
            </div>

            <p className="text-lg ">
                La masse négative est l’une de ces idées qui semblent, à première vue, appartenir à la science-fiction. Pourtant, elle surgit régulièrement au cœur des équations fondamentales de la physique, comme une possibilité mathématique difficile à ignorer. Son étude oblige à revisiter la notion même de masse, les symétries profondes des lois physiques et la géométrie globale de l’Univers.              
                Dans la cosmologie contemporaine, deux grandes approches se font face :
                    •	le modèle standard ΛCDM, fondé sur la relativité générale et l’introduction de composantes invisibles (matière noire et énergie noire),
                    •	et des modèles alternatifs, dont le modèle Janus de Jean-Pierre Petit, qui réintroduit la symétrie matière / masse négative comme principe structurant.
                Explorer la masse négative, c’est donc aussi comparer deux visions de l’Univers.
            </p>
            <figure>
                <Image
                    src="/univers.webp"
                    width={100}
                    height={100}
                    alt="image"
                    className="w-full object-cover rounded-xl"
                    unoptimized
                    />
                <figcaption className="mt-3 text-sm text-center">
                    Image de l'univers
                </figcaption>
            </figure>

            <blockquote className="text-center p-4 sm:px-7">
                <p className="text-xl font-medium md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal ">
                    Présentation modèle Janus
                </p>
                <p className="mt-5 ">
                https://www.youtube.com/watch?v=9LxU0BSTmLs
                </p>
            </blockquote>
            
            <div className="space-y-3">
                <h3 className="text-2xl font-semibold ">
                    Masse et matière : fondements historiques
                </h3>
                <p className="text-lg ">
                    1.1 La masse dans la physique classique
                    Dans la mécanique newtonienne, la masse est une grandeur positive, mesurant à la fois :
                        •	l’inertie d’un corps,
                        •	sa capacité à interagir gravitationnellement.
                    La gravitation est toujours attractive, et l’Univers est pensé comme un espace absolu, passif.
                    Ce cadre fonctionne remarquablement bien à l’échelle humaine, mais il n’offre aucune explication profonde à l’origine de la masse ni à l’égalité entre masse inertielle et gravitationnelle.

                    1.2 Relativité générale et rôle géométrique de la masse
                    Avec Einstein, la masse devient une source de courbure de l’espace-temps. La matière ne se contente plus de “subir” l’espace : elle le façonne.
                    Les équations d’Einstein autorisent mathématiquement :
                        •	des densités d’énergie positives,
                        •	mais aussi nulles ou négatives, sans contradiction formelle.
                    C’est ici que la porte conceptuelle de la masse négative s’entrouvre.</p>
            </div>  

            <div className="space-y-3">
                <h3 className="text-2xl font-semibold ">
                    Symétries fondamentales et statut du signe de la masse
                </h3>
                <div className="text-lg">
                    La physique moderne est gouvernée par des symétries profondes (C, P, T, CPT). Or :
                        •	aucune symétrie fondamentale n’impose que la masse soit strictement positive,
                        •	le signe de la masse apparaît davantage comme un choix de solution que comme une nécessité absolue.
                    ⚠️ À noter :L’antimatière n’est pas de la masse négative. Elle possède une masse positive et obéit à la gravitation normale (à l’état des connaissances actuelles).
                    Dans une approche newtonienne naïve, on obtient un comportement étrange :
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg ">
                        <li className="ps-2"> la masse positive attire la masse négative,</li>
                        <li className="ps-2"> la masse négative fuit,</li>
                        <li className="ps-2"> les deux accélèrent indéfiniment.</li>
                    </ul>
                    Ce scénario, souvent cité comme argument contre la masse négative, repose toutefois sur une extension non relativiste et non symétrique des équations.
                    Il soulève une question centrale :👉 le paradoxe est-il fondamental, ou provient-il d’un cadre théorique incomplet ?

                </div>
            </div>  

            <div className="space-y-3">
                <h3 className="text-2xl font-semibold ">
                    Le modèle ΛCDM : la solution standard
                </h3>
                <p className="text-lg ">
                   Le modèle ΛCDM (Lambda Cold Dark Matter) est aujourd’hui le cadre dominant en cosmologie. Il repose sur :
                        •	la relativité générale,
                        •	une constante cosmologique Λ (énergie noire),
                        •	une matière noire froide, non baryonique.
                    Forces du modèle ΛCDM
                        •	excellent accord avec le fond diffus cosmologique,
                        •	reproduction statistique des grandes structures,
                        •	cadre mathématique bien maîtrisé.
                    Faiblesses conceptuelles
                        •	95 % du contenu de l’Univers est invisible et non détecté directement,
                        •	la nature de la matière noire et de l’énergie noire reste inconnue,
                        •	aucune symétrie fondamentale n’explique leur existence.
                    ΛCDM fonctionne remarquablement bien, mais au prix d’entités ad hoc.

                </p>
            </div>  

            <div className="space-y-3">
                <h3 className="text-2xl font-semibold ">
                    Le modèle Janus de Jean-Pierre Petit
                </h3>
                <h4 className="text-xl font-semibold ">
                    Principe général
                </h4>
                <p className="text-lg">
                    Le modèle Janus propose une extension symétrique de la relativité générale, reposant sur :
                        •	deux feuillets d’espace-temps conjugués,
                        •	l’un dominé par la masse positive,
                        •	l’autre par la masse négative.
                    Ces deux feuillets sont liés géométriquement mais séparés dynamiquement.
                </p>
                <h4 className="text-xl font-semibold ">
                    Interaction gravitationnelle répulsive
                </h4>
                <p className="text-lg ">
                    Contrairement au cadre newtonien classique :
                        •	la masse positive et la masse négative se repoussent mutuellement,
                        •	il n’existe pas de poursuite perpétuelle,
                        •	la dynamique est stable et symétrique.
                    Le paradoxe disparaît non pas par interdiction de la masse négative, mais par révision du cadre géométrique.
                </p>
            </div>  

            <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                    Conclusion et perspectives
                </h3>
                <p className="text-lg ">
                Il est essentiel de souligner que :
                    •	ΛCDM est largement admis aujourd’hui en raison de son efficacité prédictive mais certaines observations restent difficiles à expliquer pleinement,
                    •	Janus est cohérent théoriquement mais marginal, bien que la pluplart des observations faites aujourd’hui colle avec ses prédictions.
                Cependant, Janus présente une qualité rare :👉 il réduit le nombre d’hypothèses ad hoc en restaurant une symétrie fondamentale.

                La masse négative n’est peut-être pas une curiosité interdite, mais le signe d’une symétrie cosmique brisée dans nos modèles standards.
                    •	ΛCDM décrit efficacement l’Univers tel que nous l’observons,
                    •	le modèle Janus propose une lecture plus géométrique et symétrique de ces mêmes observations.
                L’histoire de la physique montre que les grandes avancées naissent souvent de telles tensions conceptuelles.Que la masse négative existe ou non comme entité physique, elle joue déjà un rôle crucial : forcer la cosmologie à interroger ses propres fondations.
                </p>
            </div>
        </div>
    </div>
</section>


  );
}
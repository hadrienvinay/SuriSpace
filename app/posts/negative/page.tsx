import Image from 'next/image'
import { notFound } from "next/navigation";

export default function Negative() {
  return (
    <section className="space-y-16">
      <article className="max-w-4xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">

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

                                    <div className="flex justify-between items-center px-4 py-3 sm:px-5">
                                        <div>
                                            <a href="/posts" id="back-button" type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   ">
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

                            <ul className="text-xs">
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                18 Janvier 2026
                                </li>
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                                2 min de lecture
                                </li>
                            </ul>
                        </div>

                        <div>
                            <a style={{color:"black"}} href="/posts" type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white  shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   ">
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
        {/* HERO / INTRO */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            De la matière classique au modèle Janus face au modèle ΛCDM
          </h1>

          <p className="text-lg ">
            La <strong>masse négative</strong> est l’une de ces idées qui semblent, à première vue,
            appartenir à la science-fiction. Pourtant, elle surgit régulièrement au cœur des équations
            fondamentales de la physique, comme une possibilité mathématique difficile à ignorer. Son
            étude oblige à revisiter la notion même de masse, les symétries profondes des lois physiques
            et la géométrie globale de l’Univers.
          </p>

          <p className="text-lg ">
            Dans la cosmologie contemporaine, plusieurs approches se font face :
          </p>

          <ul className="list-disc pl-6 space-y-2 ">
            <li>
              le modèle standard <strong>ΛCDM</strong>, fondé sur la relativité générale et qui stipule que l'univers est composé à 68% d'énergie noire, 
              à 27% de matière noire, des entités mystérieuses dont la nature exacte reste à élucider et enfin de 5% de matière ordinaire, celle que nous connaissons 
              et qui compose tous ce que nous voyons dans l'univers ( les galaxies faites d'étoiles, de gaz et de planètes).
              Beaucoup de théories et d'expériences sont en cours pour tenter de comprendre la nature de la matière noire et de l'énergie noire, depuis les années 70. 
            </li>
            <li>
              Nous n'en parlerons pas içi mais cela comprend de nombreuses hypothèses, comme les WIMPS, les axions, les neutrinos stériles, les trous noirs primordiaux, les modifications de la gravité à grande échelle, théorie MOND...
              Je vais me concentrer sur la description peu connue du <strong>modèle Janus</strong> de Jean-Pierre Petit,
              qui réintroduit la symétrie matière / masse négative comme principe structurant.
            </li>
          </ul>

          <p className="text-lg ">
            Explorer la masse négative, c’est donc aussi comparer deux visions de l’univers et tenter d'expliquer pourquoi il est structuré de manière si inégale.
          </p>
        </div>

        {/* IMAGE DE L'UNIVERS */}
        <figure className='mt-10'>
            <Image
                src="/univers.webp"
                width={100}
                height={100}
                alt="image"
                className="w-full object-cover rounded-xl"
                unoptimized
                />
            <figcaption className="mt-3 text-sm text-center">
                Image granulaire de l'univers
            </figcaption>
        </figure>


        {/* SECTION 1 */}
        <section className="space-y-6 mt-10">
          <h2 className="text-3xl font-semibold">
            Masse et matière : fondements historiques
          </h2>

          <p>
            Dans la mécanique newtonienne, la masse est une grandeur positive, mesurant à la fois :
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>l’inertie d’un corps,</li>
            <li>sa capacité à interagir gravitationnellement.</li>
          </ul>

          <p>
            La gravitation est toujours attractive, et l’Univers est pensé comme un espace absolu,
            passif. Ce cadre fonctionne remarquablement bien à l’échelle humaine, mais il n’offre
            aucune explication profonde à l’origine de la masse ni à l’égalité entre masse inertielle
            et gravitationnelle.
          </p>

          <p>
            Avec Einstein, la masse devient une <strong>source de courbure de l’espace-temps</strong>.
            La matière ne se contente plus de “subir” l’espace : elle le façonne.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>des densités d’énergie positives,</li>
            <li>mais aussi nulles ou négatives, sans contradiction formelle.</li>
          </ul>

          <p>
            C’est ici que la porte conceptuelle de la masse négative s’entrouvre.
          </p>
        </section>

        {/* SYMETRIES */}
        <section className="space-y-6 mt-10">
          <h2 className="text-3xl font-semibold">
            Symétries fondamentales et statut du signe de la masse
          </h2>

          <p>
            La physique moderne est gouvernée par des symétries profondes (C, P, T, CPT). Or :
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              aucune symétrie fondamentale n’impose que la masse soit strictement positive,
            </li>
            <li>
              le signe de la masse apparaît davantage comme un choix de solution que comme une
              nécessité absolue.
            </li>
          </ul>

          <div className=" border border-yellow-200 p-4 rounded-lg">
            <p>
              <strong>⚠️ À noter :</strong> L’antimatière n’est pas de la masse négative. Elle possède
              une masse positive et obéit à la gravitation normale (à l’état des connaissances
              actuelles). Ce sont uniquement les propriétés électriques (dit aussi charges) qui sont inversées, pas la masse.
            </p>
          </div>

          <p>Dans une approche newtonienne naïve, on obtient un comportement étrange :</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>la masse positive attire la masse négative,</li>
            <li>la masse négative fuit,</li>
            <li>les deux accélèrent indéfiniment.</li>
          </ul>

          <p>
            Ce scénario repose toutefois sur une extension non relativiste et non symétrique des
            équations mais les scientifiques ont décrété depuis les années 50 d'abandonner tous travaux sur la masse négative, jugeant peu sérieux son étude, à cause de ce paradoxe de la poursuite perpétuelle. 
            Pourtant, il existe des solutions relativistes stables et symétriques, comme le modèle Janus que nous allons présenter, oû :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>la masse positive attire la masse positive,</li>
            <li>la masse négative attire la masse négative,</li>
            <li>deux masses opposées se repoussent</li>
          </ul>

          <p className="italic">
            👉 Le paradoxe est-il fondamental, ou provient-il d’un cadre théorique incomplet ?
          </p>
        </section>

        

        {/* LAMBDA CDM */}
        <section className="space-y-6 mt-10">
          <h2 className="text-3xl font-semibold">Le modèle ΛCDM : la solution standard</h2>

          <p>
            Le modèle <strong>ΛCDM</strong> (Lambda Cold Dark Matter) est aujourd’hui le cadre dominant
            en cosmologie. Il repose sur :
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>la relativité générale,</li>
            <li>une constante cosmologique Λ (énergie noire),</li>
            <li>une matière noire froide, non baryonique.</li>
          </ul>

          <h3 className="text-2xl font-medium">Forces du modèle ΛCDM (Cold Dark Matter)</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>excellent accord avec le fond diffus cosmologique (CMB),</li>
            <li>reproduction statistique des grandes structures commme les galaxies, amas</li>
            <li>l'expansion de l'univers </li>
            <li>cadre mathématique bien maîtrisé.</li>
          </ul>

          <h3 className="text-2xl font-medium">Faiblesses conceptuelles</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>95 % du contenu de l’Univers est invisible,</li>
            <li>la nature de la matière noire reste inconnue,</li>
            <li>aucune symétrie fondamentale n’explique leur existence.</li>
          </ul>

          <p>
            ΛCDM fonctionne remarquablement bien, et est généralement considéré comme la meilleure description de l’Univers à grande échelle. 
            Cependant, il repose sur des composants mystérieux (matière noire, énergie noire) qui n’ont pas encore été détectés directement, et qui soulèvent des questions profondes sur la nature de la réalité cosmique.
          </p>
        </section>

        {/* VIDEO JANUS */}
        <section className="space-y-4 mt-10">
          <h2 className="text-2xl font-semibold">Présentation du modèle Janus</h2>

          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-xl shadow-md"
              src="https://www.youtube.com/embed/9LxU0BSTmLs"
              title="Présentation modèle Janus"
              allowFullScreen
            />
          </div>
        </section>

        {/* JANUS */}
        <section className="space-y-6 mt-10">
          <h2 className="text-3xl font-semibold">
            Le modèle Janus de Jean-Pierre Petit
          </h2>

          <h3 className="text-2xl font-medium">Principe général</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>deux univers/dimensions d’espace-temps conjugués,</li>
            <li>l’un dominé par la masse positive,</li>
            <li>l’autre par la masse négative.</li>
          </ul>

          <p>
            Ces deux feuillets sont liés géométriquement mais séparés dynamiquement. Ce modèle repose également sur une base mathématique solide :
             une extension de la relativité générale, avec des métriques conjuguées pour chaque type de masse, et une interaction gravitationnelle répulsive entre les deux.
             Cela complète donc les equations d'Einstein en introduisant une symétrie matière / masse négative, et en réinterprétant la gravitation comme une interaction géométrique plus riche que dans le cadre standard.
          </p>

          <h3 className="text-2xl font-medium">
            Interaction gravitationnelle répulsive
          </h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>la masse positive et la masse négative se repoussent mutuellement,</li>
            <li>il n’existe pas de poursuite perpétuelle,</li>
            <li>la dynamique est stable et symétrique.</li>
            <li>explique la structure lacunaire de l'univers, fait de 'trous' vides et de conglomérats de matières (amas de galaxies) </li>
            <li>explique la vitesse de rotation des galaxies, qui serait entouré de masse négative qui les confineraient </li>
            <li>l'univers contiendrait donc une dimension caché: celle des masses négatives, avec des propriétés et comportements différents (présence uniquement d'hydrogène et d'helium, vitesse de la lumière modifiée..)</li>

          </ul>
        </section>

        {/* CONCLUSION */}
        <section className="space-y-6 mt-10">
          <h2 className="text-3xl font-semibold">Conclusion et perspectives</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              ΛCDM est largement admis aujourd’hui en raison de son efficacité prédictive, bien qu'elle n'arrive pas à détecter cette matière noire et les
              particules résultantes de cette théorie (graviton, axions, WIMPS...) malgré des décennies de recherche.
            </li>
            <li>
              Janus est cohérent théoriquement mais marginal, bien que beaucoup d’observations
              collent avec ses prédictions.
            </li>
          </ul>

          <p className="italic">
            👉 Janus réduit le nombre d’hypothèses ad hoc en restaurant une symétrie fondamentale.
          </p>

          <p>
            La masse négative n’est peut-être pas une curiosité interdite, mais le signe d’une
            symétrie cosmique brisée dans nos modèles standards.
          </p>

          <p>En fin de compte, deux visions coexistent :</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>ΛCDM décrit efficacement l’Univers tel que nous l’observons,</li>
            <li>
              le modèle Janus propose une lecture plus géométrique et symétrique de ces mêmes
              observations.
            </li>
          </ul>

          <p>
            L’histoire de la physique montre que les grandes avancées naissent souvent de telles
            tensions conceptuelles.
          </p>
        </section>
            
         {/* RESSOURCES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ressources</h2>
          <a
            href="https://www.jp-petit.org/science/JANUS_COSMOLOGICAL_MODEL/JMC.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline"
          >
            → Modèle Janus de Jean-Pierre Petit
          </a>
          <br></br>
          <a
            href="http://pccollege.fr/cycle-4/cycle-4-classe-de-4eme/chapitre-iv-lunivers/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline"
          >
            → Structure de l'univers
          </a>
            <br></br>
          <a
            href="https://www.youtube.com/watch?v=9LxU0BSTmLs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline"
          >
            → Conférence de Jean-Pierre Petit sur le modèle Janus
          </a>
        </section>

      </article>
    </section>
  );
}

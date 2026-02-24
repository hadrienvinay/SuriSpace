// app/posts/space/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Space() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/posts"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Articles
        </Link>
        <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Espace
          </span>
          Hadrien Vinay · 31 Janvier 2026 · 3 min
        </div>
      </div>

      <article className="space-y-10 text-gray-300">

        {/* INTRO */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight text-center">
            L&apos;actualité spatiale 2026
          </h1>
          <p className="text-lg leading-relaxed">
            Voici un panorama des dernières nouvelles et tendances majeures du monde spatial en 2026 🌌.
          </p>
          <p className="text-lg leading-relaxed">
            Elles couvrent l&apos;exploration humaine, les technologies spatiales, la compétition internationale et les projets scientifiques.
          </p>
        </div>

        {/* EXPLORATION HABITÉE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🚀 Exploration habitée</h2>
          <p className="text-lg leading-relaxed">
            Mission Artemis II : la NASA effectue les derniers tests avant la première mission habitée autour de la Lune depuis Apollo.
            Le lancement est prévu début février 2026, mais il a été temporairement retardé à cause du froid extrême sur la rampe de lancement en Floride.
            Cette mission emportera quatre astronautes pour un survol lunaire, marquant une étape historique dans l&apos;exploration spatiale humaine.
          </p>
        </section>

        {/* IMAGE ARTEMIS */}
        <figure>
          <div className="rounded-2xl overflow-hidden border border-white/8">
            <Image
              src="/artemis.jpg"
              width={1200}
              height={600}
              alt="La fusée Artemis sur son pas de tir"
              className="w-full object-cover"
              unoptimized
            />
          </div>
          <figcaption className="mt-2 text-sm text-center text-gray-500">
            La fusée Artemis sur son pas de tir
          </figcaption>
        </figure>

        {/* CITATION */}
        <blockquote className="border-l-4 border-blue-500/60 pl-5 py-1">
          <p className="text-lg italic text-gray-300 leading-relaxed">
            &laquo; Je suis ici aujourd&apos;hui parce que j&apos;ai été inspirée par une autre astronaute. Je me souviens très bien du lancement de Claudie Haigneré.
            J&apos;avais 14 ans, et ce jour-là, quelque chose a fait tilt dans mon esprit. Elle était la première Française à aller dans l&apos;espace et elle m&apos;a inspirée à me dire : &laquo; Pourquoi pas moi ? &raquo;
          </p>
          <span className="block mt-3 text-sm text-gray-500">
            Sophie Adenot, première femme astronaute française sélectionnée par l&apos;ESA en 2022
          </span>
        </blockquote>

        {/* LANCEURS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🛰️ Les lanceurs et infrastructures spatiales</h2>
          <p className="leading-relaxed">
            <strong className="text-white">Europe (Ariane) :</strong> l&apos;Agence spatiale européenne et l&apos;UE confient à la fusée Ariane 6 le lancement de satellites Galileo de nouvelle génération — un pas vers plus d&apos;autonomie européenne.
          </p>
          <p className="leading-relaxed">
            <strong className="text-white">Fusées commerciales :</strong> des évolutions dans les designs de lanceurs (ex. nouveaux boosters plus puissants pour Ariane 6) sont prévues en 2026, tout comme des démonstrations technologiques autour des vols réutilisables.
          </p>
        </section>

        {/* COMPÉTITION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🌐 Compétition et économie spatiale</h2>
          <p className="leading-relaxed">
            <strong className="text-white">IA dans l&apos;espace :</strong> les applications d&apos;intelligence artificielle en orbite deviennent un marché en croissance, avec intégration sur satellites et infrastructures spatiales.
          </p>
          <p className="leading-relaxed">
            <strong className="text-white">Fusion SpaceX / xAI ?</strong> Selon des sources récentes, SpaceX serait en discussions pour une fusion stratégique avec la société d&apos;IA xAI, dans un projet visant à renforcer leur présence technologique et commerciale dans l&apos;espace.
          </p>
        </section>

        {/* SCIENCE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🔭 Science et observation</h2>
          <p className="leading-relaxed">Parmi les grandes missions scientifiques attendues en 2026 :</p>
          <p className="leading-relaxed">
            <strong className="text-white">Télescopes spatiaux :</strong> le Roman Space Telescope (NASA) et PLATO (ESA) sont prévus cette année pour explorer des exoplanètes et étudier l&apos;univers lointain.
          </p>
          <p className="leading-relaxed">
            <strong className="text-white">Nouvelles cartographies stellaires :</strong> missions européennes comme PLATO viseront à surveiller des milliers d&apos;étoiles pour trouver des mondes potentiellement habitables.
          </p>
        </section>

        {/* TENDANCES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">📡 Autres tendances en 2026</h2>
          <p className="leading-relaxed">
            <strong className="text-white">New space &amp; tourisme spatial :</strong> certains projets privent l&apos;industrie des vols suborbitaux pour se concentrer sur des infrastructures lourdes (ex. Blue Origin recentrant ses efforts sur les capacités lunaires plutôt que les vols touristiques dans les deux prochaines années).
          </p>
          <p className="leading-relaxed">
            <strong className="text-white">Budget(s) spatiaux en hausse :</strong> des gouvernements comme l&apos;Inde renforcent leurs financements pour développer les capacités nationales de lancement et satellitaires.
          </p>
        </section>

        {/* RESSOURCES */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Ressources</h2>
          <ul className="space-y-2 text-sm">
            {[
              'https://www.space.com/news/live/artemis-2-moon-rocket-nasa-fueling-test-jan-31-2026',
              'https://www.reuters.com/business/aerospace-defense/eu-space-agency-signs-contract-launch-galileo-satellites-with-ariane-6-2026-01-28/',
              'https://www.nasaspaceflight.com/2026/01/space-science-2026-preview',
              'https://nasaspacenews.com/2026/02/to-pause-space-tourism',
              'https://phys.org/space-news/',
            ].map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors break-all"
                >
                  → {url}
                </a>
              </li>
            ))}
          </ul>
        </section>

      </article>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-white/8">
        <Link
          href="/posts"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour aux articles
        </Link>
      </div>
    </div>
  );
}

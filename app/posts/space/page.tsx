// app/posts/space/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import ReadingProgress from '@/components/ReadingProgress';

export const metadata: Metadata = {
  title: "L'actualité spatiale 2026",
  description: "Un panorama des dernières nouvelles et missions prévues pour le spatial en 2026 : Artemis, SpaceX, JAXA et plus.",
  keywords: ['espace', 'actualité spatiale', 'Artemis', 'missions spatiales', '2026'],
  openGraph: { title: "L'actualité spatiale 2026", description: "Panorama des missions et actualités spatiales de 2026.", type: 'article', url: 'https://suri-space.vercel.app/posts/space' },
  alternates: { canonical: '/posts/space' },
};

const JSONLD = {
  '@context': 'https://schema.org', '@type': 'BlogPosting',
  headline: "L'actualité spatiale 2026",
  description: "Un panorama des dernières nouvelles et missions prévues pour le spatial en 2026.",
  datePublished: '2026-01-15', inLanguage: 'fr',
  author: { '@type': 'Person', name: 'Hadrien Vinay' },
  url: 'https://suri-space.vercel.app/posts/space',
  isPartOf: { '@type': 'Blog', name: 'Suri Space', url: 'https://suri-space.vercel.app' },
};

export default function Space() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <ReadingProgress />
      <JsonLd data={JSONLD} />
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
          Hadrien Vinay · 9 Mars 2026 · 8 min
        </div>
      </div>

      <article className="space-y-10 text-gray-300">

        {/* INTRO */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight text-center">
            L&apos;actualit&eacute; spatiale 2026
          </h1>
          <p className="text-lg leading-relaxed">
            2026 s&apos;annonce comme une ann&eacute;e charnière pour le spatial : retour de l&apos;Homme vers la Lune avec Artemis II,
            premier vol du Starship V3, t&eacute;lescopes spatiaux nouvelle g&eacute;n&eacute;ration, mont&eacute;e en puissance de la Chine
            et de l&apos;Inde... Voici un panorama complet des missions et &eacute;v&eacute;nements majeurs de cette ann&eacute;e.
          </p>
        </div>

        {/* ARTEMIS II */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Artemis II : le retour de l&apos;Homme vers la Lune</h2>
          <p className="leading-relaxed">
            Mission phare de 2026, <strong className="text-white">Artemis II</strong> sera le premier vol habit&eacute; autour de la Lune
            depuis Apollo 17 en 1972 — plus de 50 ans. Quatre astronautes embarqueront &agrave; bord du vaisseau Orion,
            propuls&eacute; par la fus&eacute;e SLS, pour une mission de 10 jours en trajectoire de retour libre autour de la Lune.
          </p>
          <p className="leading-relaxed">
            L&apos;&eacute;quipage fera l&apos;histoire : <strong className="text-white">Victor Glover</strong> sera la première personne noire,
            <strong className="text-white"> Christina Koch</strong> la première femme, et <strong className="text-white">Jeremy Hansen</strong> (canadien)
            la première personne non am&eacute;ricaine &agrave; atteindre l&apos;espace profond et les environs de la Lune.
            <strong className="text-white"> Reid Wiseman</strong> commandera la mission.
          </p>

          <div className="border border-blue-500/30 rounded-xl p-4" style={{ background: 'rgba(59,130,246,0.05)' }}>
            <p>
              <strong className="text-blue-300">Statut (mars 2026) :</strong> Après un test de remplissage r&eacute;ussi en f&eacute;vrier,
              un problème de flux d&apos;h&eacute;lium vers l&apos;&eacute;tage de propulsion cryog&eacute;nique a &eacute;t&eacute; d&eacute;tect&eacute;
              le 21 f&eacute;vrier. La fus&eacute;e a &eacute;t&eacute; ramen&eacute;e au VAB (Vehicle Assembly Building) pour r&eacute;parations.
              Le lancement est d&eacute;sormais vis&eacute; pour <strong className="text-white">avril 2026</strong>.
            </p>
          </div>
        </section>

        {/* IMAGE ARTEMIS */}
        <figure>
          <div className="rounded-2xl overflow-hidden border border-white/8">
            <Image
              src="/artemis.jpg"
              width={1200}
              height={600}
              alt="La fus&eacute;e SLS Artemis II sur son pas de tir au Kennedy Space Center"
              className="w-full object-cover"
              unoptimized
            />
          </div>
          <figcaption className="mt-2 text-sm text-center text-gray-500">
            La fus&eacute;e SLS Artemis II sur son pas de tir au Kennedy Space Center
          </figcaption>
        </figure>

        {/* CITATION */}
        <blockquote className="border-l-4 border-blue-500/60 pl-5 py-1">
          <p className="text-lg italic text-gray-300 leading-relaxed">
            &laquo; Je suis ici aujourd&apos;hui parce que j&apos;ai &eacute;t&eacute; inspir&eacute;e par une autre astronaute. Je me souviens très bien du lancement de Claudie Haigner&eacute;.
            J&apos;avais 14 ans, et ce jour-l&agrave;, quelque chose a fait tilt dans mon esprit. Elle &eacute;tait la première Fran&ccedil;aise &agrave; aller dans l&apos;espace et elle m&apos;a inspir&eacute;e &agrave; me dire : &laquo; Pourquoi pas moi ? &raquo;
          </p>
          <span className="block mt-3 text-sm text-gray-500">
            Sophie Adenot, première femme astronaute fran&ccedil;aise s&eacute;lectionn&eacute;e par l&apos;ESA en 2022
          </span>
        </blockquote>

        {/* Architecture Artemis révisée */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Le programme Artemis acc&eacute;lère</h2>
          <p className="leading-relaxed">
            La NASA a annonc&eacute; une r&eacute;vision de l&apos;architecture Artemis pour augmenter la cadence des missions.
            Les changements cl&eacute;s :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Artemis III</strong> devient une mission de d&eacute;monstration en orbite basse terrestre,
              pr&eacute;vue mi-2027, pour tester le rendez-vous et l&apos;amarrage entre Orion et les atterrisseurs commerciaux
              de SpaceX (Starship HLS) et Blue Origin (Blue Moon).
            </li>
            <li>
              Une mission suppl&eacute;mentaire a &eacute;t&eacute; ajout&eacute;e en 2027, avec l&apos;objectif d&apos;au moins
              <strong className="text-white"> un alunissage par an</strong> &agrave; partir de 2028.
            </li>
            <li>
              Standardisation de la configuration des v&eacute;hicules pour r&eacute;duire les co&ucirc;ts et les d&eacute;lais.
            </li>
          </ul>
        </section>

        {/* STARSHIP */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">SpaceX Starship : l&apos;ère V3</h2>
          <p className="leading-relaxed">
            Le programme Starship continue de repousser les limites. Après 11 vols d&apos;essai,
            SpaceX pr&eacute;pare le <strong className="text-white">Flight 12</strong>, le premier &agrave; utiliser du
            mat&eacute;riel <strong className="text-white">version 3</strong> — avec des am&eacute;liorations majeures
            sur le booster Super Heavy et l&apos;&eacute;tage sup&eacute;rieur Ship.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Ship 39</strong>, le premier Starship V3, a valid&eacute; ses tests cryog&eacute;niques
              et son système propulsif redessin&eacute; &agrave; Starbase (Boca Chica, Texas). Le lancement est vis&eacute; pour mars 2026.
            </li>
            <li>
              Expansion majeure des infrastructures : nouveau site de lancement au
              <strong className="text-white"> LC-39A</strong> (Kennedy Space Center) et pr&eacute;paration du
              <strong className="text-white"> SLC-37</strong> (Cape Canaveral).
            </li>
            <li>
              L&apos;Europe r&eacute;fl&eacute;chit &agrave; sa r&eacute;ponse au Starship, avec des &eacute;tudes
              pour un lanceur super-lourd europ&eacute;en.
            </li>
          </ul>
        </section>

        {/* BLUE ORIGIN */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Blue Origin New Glenn : mont&eacute;e en puissance</h2>
          <p className="leading-relaxed">
            Après son vol inaugural en janvier 2025, le lanceur lourd <strong className="text-white">New Glenn</strong> de Blue Origin
            acc&eacute;lère. La deuxi&egrave;me mission a d&eacute;ploy&eacute; avec succ&egrave;s les sondes jumelles
            <strong className="text-white"> ESCAPADE</strong> de la NASA vers Mars et a r&eacute;ussi la r&eacute;cup&eacute;ration
            du premier &eacute;tage sur un drone ship.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Prochain vol : lancement du satellite <strong className="text-white">BlueBird</strong> d&apos;AST SpaceMobile
              en orbite basse.
            </li>
            <li>
              Objectif ambitieux pour 2026 : atteindre la <strong className="text-white">dizaine de lancements</strong>,
              avec un potentiel de 24 si la cadence de production suit.
            </li>
            <li>
              Mission lunaire <strong className="text-white">Blue Moon Mark 1</strong> (atterrisseur robotique) pr&eacute;vue
              courant 2026 pour pr&eacute;parer les futures missions Artemis.
            </li>
          </ul>
        </section>

        {/* EUROPE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Europe : Ariane 6 et le t&eacute;lescope PLATO</h2>
          <p className="leading-relaxed">
            L&apos;ann&eacute;e 2026 est d&eacute;terminante pour l&apos;autonomie spatiale europ&eacute;enne avec
            <strong className="text-white"> Ariane 6</strong>, qui enchaîne les lancements apr&egrave;s son vol inaugural en 2024.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Lancement des satellites <strong className="text-white">Galileo</strong> de nouvelle g&eacute;n&eacute;ration,
              renfor&ccedil;ant l&apos;ind&eacute;pendance europ&eacute;enne en navigation par satellite.
            </li>
            <li>
              Mission phare : le t&eacute;lescope spatial <strong className="text-white">PLATO</strong> (PLAnetary Transits and Oscillations of stars),
              pr&eacute;vu pour fin 2026. Ses 26 cam&eacute;ras surveilleront 200 000 &eacute;toiles pour d&eacute;tecter des
              exoplan&egrave;tes dans la <strong className="text-white">zone habitable</strong>. Il sera plac&eacute; au
              point de Lagrange L2, &agrave; 1,5 million de km de la Terre — comme le James Webb.
            </li>
          </ul>
        </section>

        {/* TÉLESCOPE ROMAN */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Nancy Grace Roman : le successeur de Hubble</h2>
          <p className="leading-relaxed">
            La NASA a termin&eacute; la construction du <strong className="text-white">Nancy Grace Roman Space Telescope</strong>,
            un observatoire spatial dot&eacute; d&apos;un champ de vision 100 fois plus large que Hubble.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Lancement pr&eacute;vu &agrave; l&apos;automne 2026 (objectif septembre-octobre) par un <strong className="text-white">Falcon Heavy</strong>,
              avec une date limite de mai 2027.
            </li>
            <li>
              Le t&eacute;lescope sera envoy&eacute; au point L2, &agrave; 1,5 million de km de la Terre.
            </li>
            <li>
              Objectifs : cartographier l&apos;&eacute;nergie noire, d&eacute;tecter des milliers d&apos;exoplan&egrave;tes
              par microlentille gravitationnelle, et observer les premières galaxies de l&apos;Univers.
            </li>
          </ul>
        </section>

        {/* CHINE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Chine : station Tiangong et course vers la Lune</h2>
          <p className="leading-relaxed">
            La Chine renforce sa pr&eacute;sence spatiale avec un programme ambitieux pour 2026 :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Station Tiangong</strong> — deux missions habit&eacute;es et une mission cargo pr&eacute;vues.
              Un astronaute de l&apos;&eacute;quipage Shenzhou-23 r&eacute;alisera un <strong className="text-white">s&eacute;jour d&apos;un an</strong> en orbite,
              une première pour la Chine.
            </li>
            <li>
              Premier <strong className="text-white">astronaute pakistanais</strong> &agrave; bord de Tiangong,
              marquant l&apos;ouverture internationale de la station.
            </li>
            <li>
              Lancement pr&eacute;vu du t&eacute;lescope spatial <strong className="text-white">Xuntian</strong>,
              module compl&eacute;mentaire de la station.
            </li>
            <li>
              Pr&eacute;paration active de la mission lunaire habit&eacute;e (objectif ~2030) : construction acc&eacute;l&eacute;r&eacute;e
              des infrastructures au <strong className="text-white">centre de lancement de Wenchang</strong> (Hainan),
              et d&eacute;veloppement de la fus&eacute;e <strong className="text-white">Longue Marche 10</strong>,
              du vaisseau <strong className="text-white">Mengzhou</strong> et de l&apos;atterrisseur <strong className="text-white">Lanyue</strong>.
            </li>
          </ul>
        </section>

        {/* INDE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Inde : Gaganyaan en phase finale</h2>
          <p className="leading-relaxed">
            L&apos;ISRO (agence spatiale indienne) entre dans la dernière ligne droite de son programme de vol habit&eacute;
            <strong className="text-white"> Gaganyaan</strong> :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Gaganyaan-1</strong> (mars 2026) — première mission non habit&eacute;e avec
              le robot humano&iuml;de <strong className="text-white">Vyommitra</strong> &agrave; bord pour simuler les conditions
              d&apos;un astronaute et tester les syst&egrave;mes de support de vie.
            </li>
            <li>
              Plus de 8 000 tests au sol r&eacute;alis&eacute;s, avec les essais de logiciel de vol et les tests
              environnementaux en cours.
            </li>
            <li>
              Deux vols non habit&eacute;s pr&eacute;vus en 2026, avant le <strong className="text-white">premier vol habit&eacute; indien
              d&eacute;but 2027</strong>.
            </li>
            <li>
              7 missions de lancement pr&eacute;vues par l&apos;ISRO d&apos;ici mars 2026, incluant des d&eacute;monstrations
              de propulsion &eacute;lectrique et de distribution quantique de cl&eacute;s.
            </li>
          </ul>
        </section>

        {/* COMP&Eacute;TITION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Comp&eacute;tition et &eacute;conomie spatiale</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">IA dans l&apos;espace :</strong> int&eacute;gration croissante de l&apos;intelligence artificielle
              sur les satellites et les infrastructures spatiales — un march&eacute; en pleine expansion.
            </li>
            <li>
              <strong className="text-white">Budgets en hausse :</strong> les gouvernements (Inde, Chine, Japon, Europe)
              renforcent leurs financements spatiaux pour d&eacute;velopper leurs capacit&eacute;s de lancement et leur ind&eacute;pendance.
            </li>
            <li>
              <strong className="text-white">Course aux lanceurs r&eacute;utilisables :</strong> après SpaceX et Blue Origin,
              l&apos;Europe, la Chine et le Japon d&eacute;veloppent leurs propres technologies de r&eacute;cup&eacute;ration de boosters.
            </li>
          </ul>
        </section>

        {/* RESSOURCES */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Ressources</h2>
          <div className="space-y-2 text-sm">
            <a href="https://www.nasa.gov/mission/artemis-ii/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">NASA — Mission Artemis II</a>
            <a href="https://www.nasa.gov/news-release/nasa-adds-mission-to-artemis-lunar-program-updates-architecture/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">NASA — Nouvelle architecture Artemis</a>
            <a href="https://spacenews.com/spacex-plans-next-starship-test-flight-in-march/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">SpaceNews — Starship Flight 12 en mars</a>
            <a href="https://www.blueorigin.com/news/new-glenn-ng-1-mission" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">Blue Origin — New Glenn</a>
            <a href="https://www.esa.int/About_Us/Corporate_news/ESA_s_highlights_for_2026" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">ESA — Highlights 2026</a>
            <a href="https://www.esa.int/Science_Exploration/Space_Science/Plato" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">ESA — Mission PLATO</a>
            <a href="https://spaceexplored.com/2026/02/18/nasas-next-great-space-telescope-is-getting-ready-for-launch/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">Roman Space Telescope — Pr&eacute;paration au lancement</a>
            <a href="https://spacenews.com/china-set-for-its-first-one-year-human-spaceflight-mission-confirms-pakistani-astronaut-flight/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">SpaceNews — Chine : mission d&apos;un an sur Tiangong</a>
            <a href="https://www.space.com/space-exploration/human-spaceflight/india-delays-1st-gaganyaan-astronaut-launch-to-2027" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">Space.com — ISRO Gaganyaan</a>
          </div>
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

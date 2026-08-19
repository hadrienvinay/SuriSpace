// app/posts/negative/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/common/JsonLd';
import ReadingProgress from '@/components/common/ReadingProgress';

export const metadata: Metadata = {
  title: 'La masse négative',
  description: "Réfutée dans les années 50, l'hypothèse de la masse négative pourrait s'avérer un candidat sérieux pour expliquer la structure de l'univers.",
  keywords: ['masse négative', 'cosmologie', 'physique théorique', 'énergie noire', 'matière noire'],
  openGraph: { title: 'La masse négative', description: "L'hypothèse de la masse négative et la structure de l'univers.", type: 'article', url: 'https://suri-space.vercel.app/posts/negative' },
  alternates: { canonical: '/posts/negative' },
};

const JSONLD = {
  '@context': 'https://schema.org', '@type': 'BlogPosting',
  headline: 'La masse négative',
  description: "L'hypothèse de la masse négative comme candidat pour expliquer la structure de l'univers.",
  datePublished: '2026-02-01', inLanguage: 'fr',
  author: { '@type': 'Person', name: 'Hadrien Vinay' },
  url: 'https://suri-space.vercel.app/posts/negative',
  isPartOf: { '@type': 'Blog', name: 'Suri Space', url: 'https://suri-space.vercel.app' },
};

export default function Negative() {
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
          <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
            Physique
          </span>
          Hadrien Vinay · 18 Janvier 2026 · 5 min
        </div>
      </div>

      <article className="space-y-10 text-gray-300">

        {/* HERO / INTRO */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            De la matière classique au modèle Janus face au modèle ΛCDM
          </h1>

          <p className="text-lg leading-relaxed">
            La <strong className="text-white">masse négative</strong> est l'une de ces idées qui semblent, à première vue,
            appartenir à la science-fiction. Pourtant, elle surgit régulièrement au cœur des équations
            fondamentales de la physique, comme une possibilité mathématique difficile à ignorer. Son
            étude oblige à revisiter la notion même de masse, les symétries profondes des lois physiques
            et la géométrie globale de l'Univers.
          </p>

          <p className="text-lg leading-relaxed">
            Dans la cosmologie contemporaine, plusieurs approches se font face :
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              le modèle standard <strong className="text-white">ΛCDM</strong>, fondé sur la relativité générale et qui stipule que l'univers est composé à 68% d'énergie noire,
              à 27% de matière noire, des entités mystérieuses dont la nature exacte reste à élucider et enfin de 5% de matière ordinaire, celle que nous connaissons
              et qui compose tous ce que nous voyons dans l'univers (les galaxies faites d'étoiles, de gaz et de planètes).
              Beaucoup de théories et d'expériences sont en cours pour tenter de comprendre la nature de la matière noire et de l'énergie noire, depuis les années 70.
            </li>
            <li>
              Nous n'en parlerons pas içi mais cela comprend de nombreuses hypothèses, comme les WIMPS, les axions, les neutrinos stériles, les trous noirs primordiaux, les modifications de la gravité à grande échelle, théorie MOND...
              Je vais me concentrer sur la description peu connue du <strong className="text-white">modèle Janus</strong> de Jean-Pierre Petit,
              qui réintroduit la symétrie matière / masse négative comme principe structurant.
            </li>
          </ul>

          <p className="text-lg leading-relaxed">
            Explorer la masse négative, c'est donc aussi comparer deux visions de l'univers et tenter d'expliquer pourquoi il est structuré de manière si inégale.
          </p>
        </div>

        {/* IMAGE DE L'UNIVERS */}
        <figure>
          <div className="rounded-2xl overflow-hidden border border-white/8">
            <Image
              src="/posts/univers.webp"
              width={1200}
              height={600}
              alt="Structure lacunaire de l'univers"
              className="w-full object-cover"
              unoptimized
            />
          </div>
          <figcaption className="mt-2 text-sm text-center text-gray-500">
            L'univers a une structure lacunaire, faite de conglomérats de matière (galaxies, amas) entourés de vastes vides.
          </figcaption>
        </figure>

        {/* SECTION 1 */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Masse et matière : fondements historiques</h2>

          <p>Dans la mécanique newtonienne, la masse est une grandeur positive, mesurant à la fois :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>l'inertie d'un corps,</li>
            <li>sa capacité à interagir gravitationnellement.</li>
          </ul>

          <p>
            La gravitation est toujours attractive, et l'Univers est pensé comme un espace absolu,
            passif. Ce cadre fonctionne remarquablement bien à l'échelle humaine, mais il n'offre
            aucune explication profonde à l'origine de la masse ni à l'égalité entre masse inertielle
            et gravitationnelle.
          </p>

          <p>
            Avec Einstein, la masse devient une <strong className="text-white">source de courbure de l'espace-temps</strong>.
            La matière ne se contente plus de "subir" l'espace : elle le façonne.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>des densités d'énergie positives,</li>
            <li>mais aussi nulles ou négatives, sans contradiction formelle.</li>
          </ul>

          <p>C'est ici que la porte conceptuelle de la masse négative s'entrouvre.</p>
        </section>

        {/* SYMETRIES */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Symétries fondamentales et statut du signe de la masse</h2>

          <p>La physique moderne est gouvernée par des symétries profondes (C, P, T, CPT). Or :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>aucune symétrie fondamentale n'impose que la masse soit strictement positive,</li>
            <li>le signe de la masse apparaît davantage comme un choix de solution que comme une nécessité absolue.</li>
          </ul>

          <div className="border border-yellow-500/30 rounded-xl p-4" style={{ background: 'rgba(234,179,8,0.05)' }}>
            <p>
              <strong className="text-yellow-300">⚠️ À noter :</strong> L'antimatière n'est pas de la masse négative. Elle possède
              une masse positive et obéit à la gravitation normale (à l'état des connaissances actuelles).
              Ce sont uniquement les propriétés électriques (dit aussi charges) qui sont inversées, pas la masse.
            </p>
          </div>

          <p>Dans une approche newtonienne naïve, on obtient un comportement étrange :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>la masse positive attire la masse négative,</li>
            <li>la masse négative fuit,</li>
            <li>les deux accélèrent indéfiniment.</li>
          </ul>

          <p>
            Ce scénario repose toutefois sur une extension non relativiste et non symétrique des équations mais les scientifiques ont
            décrété depuis les années 50 d'abandonner tous travaux sur la masse négative, jugeant peu sérieux son étude, à cause de ce
            paradoxe de la poursuite perpétuelle. Pourtant, il existe des solutions relativistes stables et symétriques, comme le modèle
            Janus que nous allons présenter, où :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>la masse positive attire la masse positive,</li>
            <li>la masse négative attire la masse négative,</li>
            <li>deux masses opposées se repoussent.</li>
          </ul>

          <p className="italic text-gray-400">
            👉 Le paradoxe est-il fondamental, ou provient-il d'un cadre théorique incomplet ?
          </p>
        </section>

        {/* LAMBDA CDM */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Le modèle ΛCDM : la solution standard</h2>

          <p>Le modèle <strong className="text-white">ΛCDM</strong> (Lambda Cold Dark Matter) est aujourd'hui le cadre dominant en cosmologie. Il repose sur :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>la relativité générale,</li>
            <li>une constante cosmologique Λ (énergie noire),</li>
            <li>une matière noire froide, non baryonique.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">Forces du modèle ΛCDM (Cold Dark Matter)</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>excellent accord avec le fond diffus cosmologique (CMB),</li>
            <li>reproduction statistique des grandes structures comme les galaxies, amas,</li>
            <li>l'expansion de l'univers,</li>
            <li>cadre mathématique bien maîtrisé.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">Faiblesses conceptuelles</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>95 % du contenu de l'Univers est invisible,</li>
            <li>la nature de la matière noire reste inconnue,</li>
            <li>aucune symétrie fondamentale n'explique leur existence.</li>
          </ul>

          <p>
            ΛCDM fonctionne remarquablement bien, et est généralement considéré comme la meilleure description de l'Univers à grande échelle.
            Cependant, il repose sur des composants mystérieux (matière noire, énergie noire) qui n'ont pas encore été détectés directement,
            et qui soulèvent des questions profondes sur la nature de la réalité cosmique.
          </p>
        </section>

        {/* VIDEO JANUS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Présentation du modèle Janus</h2>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/8">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/9LxU0BSTmLs"
              title="Présentation modèle Janus"
              allowFullScreen
            />
          </div>
        </section>

        {/* JANUS */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Le modèle Janus de Jean-Pierre Petit</h2>
          <p>
            Cette théorie propose une vision radicalement différente de l'Univers, en introduisant une symétrie fondamentale entre la matière ordinaire (masse positive)
            et une hypothétique matière à masse négative. Il doit son nom à Janus, un dieu romain à deux visages des commencements et des fins, des choix, du passage et des portes.
            Il est représenté avec deux visages (aussi dit bifrons), une tournée vers le passé et une autre vers l'avenir,
            symbolisant les dualités et les transitions. De même, le modèle Janus envisage l'Univers comme composé de deux mondes,
            l'un dominé par la masse positive, l'autre par la masse négative.
          </p>

          <h3 className="text-xl font-semibold text-white">Principe général</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>deux univers/dimensions d'espace-temps conjugués,</li>
            <li>l'un dominé par la masse positive,</li>
            <li>l'autre par la masse négative.</li>
          </ul>

          <p>
            Ces deux feuillets sont liés géométriquement mais séparés dynamiquement. Ce modèle repose également sur une base mathématique solide :
            une extension de la relativité générale, avec des métriques conjuguées pour chaque type de masse, et une interaction gravitationnelle répulsive entre les deux.
            Cela complète donc les équations d'Einstein en introduisant une symétrie matière / masse négative, et en réinterprétant la gravitation comme une interaction géométrique plus riche que dans le cadre standard.
          </p>

          <h3 className="text-xl font-semibold text-white">Interaction gravitationnelle répulsive</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>la masse positive et la masse négative se repoussent mutuellement,</li>
            <li>il n'existe pas de poursuite perpétuelle,</li>
            <li>la dynamique est stable et symétrique,</li>
            <li>explique la structure lacunaire de l'univers, fait de 'trous' vides et de conglomérats de matières (amas de galaxies),</li>
            <li>explique la vitesse de rotation des galaxies, qui seraient entourées de masse négative qui les confinerait,</li>
            <li>l'univers contiendrait donc une dimension cachée : celle des masses négatives, avec des propriétés et comportements différents (présence uniquement d'hydrogène et d'hélium, vitesse de la lumière modifiée…)</li>
          </ul>
        </section>

        {/* CONCLUSION */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Conclusion et perspectives</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>ΛCDM est largement admis aujourd'hui en raison de son efficacité prédictive, bien qu'elle n'arrive pas à détecter cette matière noire et les particules résultantes de cette théorie (graviton, axions, WIMPS…) malgré des décennies de recherche.</li>
            <li>Janus est cohérent théoriquement mais marginal, bien que beaucoup d'observations collent avec ses prédictions.</li>
          </ul>

          <p className="italic text-gray-400">👉 Janus réduit le nombre d'hypothèses ad hoc en restaurant une symétrie fondamentale.</p>
          <p>La masse négative n'est peut-être pas une curiosité interdite, mais le signe d'une symétrie cosmique brisée dans nos modèles standards.</p>
          <p>En fin de compte, deux visions coexistent :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>ΛCDM décrit efficacement l'Univers tel que nous l'observons,</li>
            <li>le modèle Janus propose une lecture plus géométrique et symétrique de ces mêmes observations.</li>
          </ul>
          <p>L'histoire de la physique montre que les grandes avancées naissent souvent de telles tensions conceptuelles.</p>
        </section>

        {/* RESSOURCES */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Ressources</h2>
          <div className="space-y-2 text-sm">
            <a href="https://www.jp-petit.org/science/JANUS_COSMOLOGICAL_MODEL/JMC.htm" target="_blank" rel="noopener noreferrer" className="block text-violet-400 hover:text-violet-300 transition-colors">→ Modèle Janus de Jean-Pierre Petit</a>
            <a href="http://pccollege.fr/cycle-4/cycle-4-classe-de-4eme/chapitre-iv-lunivers/" target="_blank" rel="noopener noreferrer" className="block text-violet-400 hover:text-violet-300 transition-colors">→ Structure de l'univers</a>
            <a href="https://www.youtube.com/watch?v=9LxU0BSTmLs" target="_blank" rel="noopener noreferrer" className="block text-violet-400 hover:text-violet-300 transition-colors">→ Conférence de Jean-Pierre Petit sur le modèle Janus</a>
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

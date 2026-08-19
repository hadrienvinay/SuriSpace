import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/common/JsonLd';
import ReadingProgress from '@/components/common/ReadingProgress';

export const metadata: Metadata = {
  title: "L'hydrogène vert marin",
  description: "Produire de l'hydrogène grâce aux courants marins et à la houle : le potentiel des océans pour la transition énergétique.",
  keywords: ['hydrogène vert', 'énergie marine', 'transition énergétique', 'océan'],
  openGraph: { title: "L'hydrogène vert marin", description: "Le potentiel des océans pour produire de l'hydrogène vert.", type: 'article', url: 'https://suri-space.vercel.app/posts/hydrogene' },
  alternates: { canonical: '/posts/hydrogene' },
};

const JSONLD = {
  '@context': 'https://schema.org', '@type': 'BlogPosting',
  headline: "L'hydrogène vert marin",
  description: "Produire de l'hydrogène grâce aux courants marins et à la houle.",
  datePublished: '2026-01-20', inLanguage: 'fr',
  author: { '@type': 'Person', name: 'Hadrien Vinay' },
  url: 'https://suri-space.vercel.app/posts/hydrogene',
  isPartOf: { '@type': 'Blog', name: 'Suri Space', url: 'https://suri-space.vercel.app' },
};

export default function Hydrogene() {
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
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Energie
          </span>
          Hadrien Vinay · 9 Mars 2026 · 7 min
        </div>
      </div>

      <article className="space-y-10 text-gray-300">

        {/* HERO / INTRO */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Produire de l&apos;hydrogène vert grâce aux courants marins et à la houle
          </h1>

          <p className="text-lg leading-relaxed">
            Et si les océans devenaient nos futures centrales énergétiques ? L&apos;<strong className="text-white">hydrogène vert</strong>,
            produit par électrolyse de l&apos;eau à partir d&apos;électricité renouvelable, est considéré comme l&apos;un des
            vecteurs énergétiques les plus prometteurs pour décarboner l&apos;industrie, les transports et le stockage d&apos;énergie.
          </p>

          <p className="text-lg leading-relaxed">
            Parmi les sources renouvelables, l&apos;<strong className="text-white">énergie marine</strong> — issue des courants,
            des marées et de la houle — offre un potentiel colossal et encore largement inexploité. Des régions insulaires
            comme le <strong className="text-white">Cap-Vert</strong>, exposées en permanence à l&apos;océan Atlantique, pourraient
            devenir des pionnières dans cette transformation.
          </p>
        </div>

        {/* SECTION 1 — L'énergie marine */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">L&apos;énergie marine : une ressource sous-estimée</h2>

          <p>
            Les océans couvrent 71 % de la surface terrestre et contiennent une quantité d&apos;énergie cinétique
            et thermique immense. L&apos;énergie marine se décline en plusieurs formes :
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Énergie houlomotrice</strong> — captée à partir du mouvement des vagues.
              La houle est générée par le vent au large et se propage sur des milliers de kilomètres avec très peu de perte d&apos;énergie.
              On estime le potentiel mondial à environ <strong className="text-white">2 000 TWh/an</strong>.
            </li>
            <li>
              <strong className="text-white">Énergie hydrolienne</strong> — issue des courants marins et des marées.
              Fonctionnement similaire aux éoliennes, mais dans l&apos;eau. L&apos;eau étant 800 fois plus dense que l&apos;air,
              une hydrolienne de petite taille peut produire autant qu&apos;une grande éolienne.
            </li>
            <li>
              <strong className="text-white">Énergie marémotrice</strong> — exploite les différences de niveau d&apos;eau
              entre marée haute et marée basse (barrages, lagons artificiels).
            </li>
          </ul>

          <div className="border border-emerald-500/30 rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.05)' }}>
            <p>
              <strong className="text-emerald-300">Avantage clé :</strong> contrairement au solaire et à l&apos;éolien,
              l&apos;énergie marine est <strong className="text-white">prévisible</strong>. Les courants marins sont constants,
              et la houle peut être anticipée plusieurs jours à l&apos;avance.
              Cela en fait une source idéale pour alimenter un électrolyseur en continu.
            </p>
          </div>
        </section>

        {/* SECTION 2 — De la vague à l'hydrogène */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">De la vague à l&apos;hydrogène : le processus</h2>

          <p>
            La chaîne de conversion de l&apos;énergie marine en hydrogène suit trois étapes principales :
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Étape 1 */}
            <div className="rounded-xl border border-white/10 p-5 space-y-3" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <div className="text-2xl font-bold text-emerald-400">01</div>
              <h3 className="text-lg font-semibold text-white">Captation</h3>
              <p className="text-sm">
                Des dispositifs marins (bouées oscillantes, colonnes d&apos;eau, hydroliennes sous-marines)
                convertissent le mouvement de l&apos;eau en <strong className="text-white">énergie mécanique</strong>,
                puis en électricité via des générateurs.
              </p>
            </div>

            {/* Étape 2 */}
            <div className="rounded-xl border border-white/10 p-5 space-y-3" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <div className="text-2xl font-bold text-emerald-400">02</div>
              <h3 className="text-lg font-semibold text-white">Électrolyse</h3>
              <p className="text-sm">
                L&apos;électricité produite alimente un <strong className="text-white">électrolyseur</strong> qui décompose
                l&apos;eau (H₂O) en hydrogène (H₂) et oxygène (O₂). L&apos;eau de mer doit d&apos;abord être
                dessalée et purifiée.
              </p>
            </div>

            {/* Étape 3 */}
            <div className="rounded-xl border border-white/10 p-5 space-y-3" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <div className="text-2xl font-bold text-emerald-400">03</div>
              <h3 className="text-lg font-semibold text-white">Stockage & transport</h3>
              <p className="text-sm">
                L&apos;hydrogène est comprimé ou liquéfié, puis stocké dans des réservoirs.
                Il peut être transporté par <strong className="text-white">pipeline, navire ou camion</strong>,
                ou converti en ammoniac vert pour faciliter le transport longue distance.
              </p>
            </div>
          </div>

          <p>
            L&apos;électrolyse PEM (Proton Exchange Membrane) est la technologie la plus adaptée ici :
            elle démarre rapidement, supporte les variations de puissance et fonctionne bien avec des
            sources intermittentes comme la houle.
          </p>
        </section>

        {/* SECTION 3 — Technologies de captation */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Technologies de captation de l&apos;énergie marine</h2>

          <h3 className="text-xl font-semibold text-white">Convertisseurs houlomoteurs</h3>
          <p>Plusieurs concepts existent pour capter l&apos;énergie des vagues :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Bouées oscillantes (point absorber)</strong> — flotteurs reliés au fond marin
              par un câble ou un piston. Le mouvement vertical de la bouée entraîne un générateur linéaire.
              Ex : <em>CorPower Ocean</em> (Suède), <em>Carnegie Clean Energy</em> (Australie).
            </li>
            <li>
              <strong className="text-white">Colonne d&apos;eau oscillante (OWC)</strong> — une chambre partiellement
              immergée où la houle compresse et décompresse l&apos;air, entraînant une turbine.
              Ex : <em>Mutriku</em> (Pays Basque, opérationnel depuis 2011).
            </li>
            <li>
              <strong className="text-white">Atténuateurs</strong> — structures articulées flottantes alignées
              dans le sens des vagues. Leur flexion active des vérins hydrauliques.
              Ex : <em>Pelamis</em> (Écosse).
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6">Hydroliennes</h3>
          <p>Les hydroliennes fonctionnent comme des éoliennes sous-marines :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Sabella D10</strong> — hydrolienne française de 1 MW installée
              dans le passage du Fromveur (Bretagne), l&apos;un des courants les plus puissants d&apos;Europe.
            </li>
            <li>
              <strong className="text-white">Orbital Marine Power O2</strong> — la plus puissante hydrolienne
              au monde (2 MW), déployée aux Orcades (Écosse). Elle flotte en surface avec des rotors immergés.
            </li>
            <li>
              <strong className="text-white">SIMEC Atlantis</strong> — projet MeyGen dans le Pentland Firth (Écosse),
              le plus grand parc hydrolien au monde avec 6 MW installés.
            </li>
          </ul>
        </section>

        {/* SECTION 4 — Le cas du Cap-Vert */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Exemple : le Cap-Vert, laboratoire idéal</h2>

          <p>
            Le <strong className="text-white">Cap-Vert</strong>, archipel de 10 îles situé à 570 km des côtes
            du Sénégal, réunit des conditions exceptionnelles pour la production d&apos;hydrogène marin :
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>exposition permanente aux <strong className="text-white">alizés et à la houle atlantique</strong>, avec des vagues régulières de 1,5 à 3 mètres toute l&apos;année,</li>
            <li>des courants marins puissants entre les îles (canal de São Vicente, passage entre Santo Antão et São Vicente),</li>
            <li>une dépendance actuelle à 80 % aux <strong className="text-white">importations de diesel</strong> pour sa production électrique,</li>
            <li>un objectif national de 100 % d&apos;énergies renouvelables d&apos;ici 2040,</li>
            <li>une position géographique stratégique sur les routes maritimes transatlantiques.</li>
          </ul>

          <div className="border border-cyan-500/30 rounded-xl p-4" style={{ background: 'rgba(6,182,212,0.05)' }}>
            <p>
              <strong className="text-cyan-300">Scénario :</strong> des fermes houlomotrices et hydroliennes
              déployées entre les îles produiraient de l&apos;électricité verte alimentant des électrolyseurs côtiers.
              L&apos;hydrogène produit pourrait :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>remplacer le diesel dans les centrales électriques insulaires,</li>
              <li>alimenter des navires inter-îles à pile à combustible,</li>
              <li>être exporté vers l&apos;Europe ou l&apos;Afrique de l&apos;Ouest sous forme d&apos;ammoniac vert.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 5 — Autres exemples */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Autres initiatives dans le monde</h2>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-white">Écosse (Orcades)</strong> — le European Marine Energy Centre (EMEC) teste
              depuis 2017 la production d&apos;hydrogène vert à partir d&apos;énergie marémotrice et houlomotrice.
              L&apos;hydrogène produit alimente déjà des ferries et des bâtiments locaux.
            </li>
            <li>
              <strong className="text-white">Japon</strong> — le projet NEDO explore des systèmes hybrides
              combinant énergie des vagues et éolien offshore pour produire de l&apos;hydrogène,
              essentiel à la stratégie nationale japonaise de « société hydrogène ».
            </li>
            <li>
              <strong className="text-white">Australie</strong> — le projet Wave Swell Energy en Tasmanie utilise
              des colonnes d&apos;eau oscillantes pour générer de l&apos;électricité, avec un volet hydrogène en développement.
            </li>
            <li>
              <strong className="text-white">France (Bretagne)</strong> — le projet Sealhyfe de Lhyfe a mis en service
              en 2023 le premier électrolyseur offshore au monde, sur une plateforme flottante au large du Croisic,
              produisant de l&apos;hydrogène vert directement en mer.
            </li>
          </ul>
        </section>

        {/* SECTION 6 — Utilisations de l'hydrogène */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Les usages de l&apos;hydrogène vert</h2>

          <p>
            L&apos;hydrogène n&apos;est pas un combustible fossile : c&apos;est un <strong className="text-white">vecteur
            énergétique</strong>. Il stocke de l&apos;énergie produite ailleurs et la restitue proprement,
            en ne rejetant que de l&apos;eau lors de sa combustion ou de son utilisation dans une pile à combustible.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 p-5 space-y-2" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-white">Transport</h3>
              <p className="text-sm">
                Piles à combustible pour bus, camions, trains, navires et avions. Toyota Mirai,
                Hyundai Nexo, trains Alstom iLint en Allemagne. Particulièrement pertinent pour les
                véhicules lourds où les batteries sont trop lourdes.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5 space-y-2" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-white">Industrie</h3>
              <p className="text-sm">
                Décarbonation de l&apos;acier (DRI à l&apos;hydrogène), raffinage, production d&apos;ammoniac
                pour les engrais (3 % des émissions mondiales de CO₂), chimie lourde.
                L&apos;acier vert de SSAB/HYBRIT en Suède utilise déjà ce procédé.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5 space-y-2" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-white">Stockage d&apos;énergie</h3>
              <p className="text-sm">
                L&apos;hydrogène permet de stocker l&apos;excédent d&apos;électricité renouvelable sur de
                longues durées (saisonnier), contrairement aux batteries limitées à quelques heures.
                Conversion en électricité via pile à combustible ou turbine.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5 space-y-2" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-white">Chauffage & résidentiel</h3>
              <p className="text-sm">
                Injection dans les réseaux de gaz naturel (jusqu&apos;à 20 % en mélange),
                chaudières à hydrogène, micro-cogénération domestique.
                Le Royaume-Uni teste des quartiers entiers chauffés à l&apos;hydrogène.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7 — Défis */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Défis et perspectives</h2>

          <p>Malgré son potentiel, la filière hydrogène marin fait face à plusieurs obstacles :</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Coût</strong> — l&apos;hydrogène vert coûte encore 4 à 6 $/kg
              contre 1 à 2 $/kg pour l&apos;hydrogène gris (issu du gaz naturel). L&apos;objectif est d&apos;atteindre
              2 $/kg d&apos;ici 2030.
            </li>
            <li>
              <strong className="text-white">Corrosion marine</strong> — les équipements immergés subissent une usure
              accélérée (sel, biofouling, tempêtes). La maintenance en mer est coûteuse.
            </li>
            <li>
              <strong className="text-white">Dessalement</strong> — l&apos;électrolyse nécessite de l&apos;eau douce pure,
              ce qui ajoute une étape de dessalement et de filtration.
            </li>
            <li>
              <strong className="text-white">Infrastructure</strong> — pipelines, stations de compression,
              ports adaptés au stockage d&apos;hydrogène : tout reste à construire.
            </li>
          </ul>

          <p>
            Cependant, les courbes de coût suivent la même trajectoire que le solaire il y a 15 ans.
            Avec l&apos;industrialisation des électrolyseurs et la maturation des technologies marines,
            l&apos;hydrogène marin pourrait devenir compétitif avant 2035.
          </p>
        </section>

        {/* CONCLUSION */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Conclusion</h2>

          <p>
            La production d&apos;hydrogène vert à partir de l&apos;énergie marine représente une convergence
            unique entre deux ressources abondantes : <strong className="text-white">l&apos;eau et le mouvement des océans</strong>.
          </p>

          <p>
            Des archipels comme le Cap-Vert, les Orcades ou les îles japonaises sont les laboratoires
            naturels de cette transition. Ils montrent qu&apos;il est possible de transformer une dépendance
            énergétique en avantage compétitif, en exploitant ce que la nature offre de plus constant :
            la puissance de la mer.
          </p>

          <p>
            L&apos;hydrogène marin n&apos;est pas une utopie. C&apos;est une industrie naissante,
            portée par des projets concrets, et qui pourrait jouer un rôle majeur dans la
            décarbonation mondiale d&apos;ici les prochaines décennies.
          </p>
        </section>

        {/* RESSOURCES */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Ressources</h2>
          <div className="space-y-2 text-sm">
            <a href="https://www.emec.org.uk/" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">EMEC — European Marine Energy Centre (Orcades)</a>
            <a href="https://www.lhyfe.com/fr/" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">Lhyfe — Producteur d&apos;hydrogène vert offshore (Sealhyfe)</a>
            <a href="https://www.irena.org/publications/2022/May/Green-Hydrogen-for-Industry" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">IRENA — Green Hydrogen for Industry</a>
            <a href="https://www.iea.org/reports/the-future-of-hydrogen" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">IEA — The Future of Hydrogen</a>
            <a href="https://orbitalmarine.com/" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">Orbital Marine Power — Hydrolienne O2</a>
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

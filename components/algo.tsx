// components/algo.tsx
import Image from 'next/image';

export default function Algo() {
  return (
    <article className="space-y-10 text-gray-300">

      {/* INTRODUCTION */}
      <div className="space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          🌱 La culture des algues dans le monde : un secteur en pleine expansion
        </h1>

        <p className="text-lg leading-relaxed">
          La culture des algues — ou <strong className="text-white">algoculture</strong> — est une activité vieille de
          plusieurs siècles, mais elle connaît aujourd'hui une croissance rapide à l'échelle
          mondiale. La production mondiale d'algues cultivées dépasse aujourd'hui les{' '}
          <strong className="text-white">30 millions de tonnes par an</strong>, principalement sous forme de
          macro-algues marines (comme les laminaires, le wakamé ou le nori). La moitié est utilisée à des fins alimentaires, le reste pour des applications industrielles, cosmétiques et agricoles.
          Avec un taux de croissance annuel moyen supérieur à 5% depuis les années 2000, le commerce d'algues compte un chiffre d'affaire annuel compris en 4 et 5 miliards de dollars.
        </p>

        <p className="text-lg leading-relaxed">
          Elle est dominée par des pays d'Asie du Sud Est tels que la Chine, l'Indonésie et la Corée du Sud,
          qui représentent la majorité de la production mondiale (respectivement 58%, 28%, 5%).
        </p>

        <p className="text-lg leading-relaxed">
          Le rôle écologique de ces cultures n'est pas négligeable : les algues sont de redoutables
          pompes à carbone (elles captent le CO₂ par photosynthèse sans besoin d'intrants
          agricoles) et contribuent à atténuer l'acidification des océans — un atout dans un
          contexte de changement climatique. Elles permettent entre autre de purifier l'eau et ainsi de dépolluer les eaux et donc l'écosystème
          environnant, comme le font les arbres et les plantes pour le sol et l'air.
        </p>
      </div>

      {/* IMAGE */}
      <figure>
        <div className="rounded-2xl overflow-hidden border border-white/8">
          <Image
            src="/uploads/image-1769438168655-893060458.jpg"
            width={1200}
            height={600}
            alt="Culture d'algues en Asie"
            className="w-full object-cover"
            unoptimized
          />
        </div>
        <figcaption className="mt-2 text-sm text-center text-gray-500">
          Une culture d'algue en Asie
        </figcaption>
      </figure>

      {/* CITATION */}
      <blockquote className="border-l-4 border-emerald-500/60 pl-5 py-1">
        <p className="text-lg italic text-gray-300">
          "L'algoculture c'est la rencontre entre la mer, la science et l'avenir durable."
        </p>
        <span className="block mt-2 text-sm font-semibold text-gray-500">— Un futur algoculteur</span>
      </blockquote>

      {/* APPLICATIONS */}
      <section className="space-y-5">
        <h2 className="text-3xl font-semibold text-white">
          Applications : de l'alimentation aux biotechnologies
        </h2>

        <ul className="space-y-4 text-base">
          <li><strong className="text-white">🥢 Alimentation humaine :</strong> une part importante de la production mondiale est destinée à la consommation directe (environ la moitié), principalement en Asie (sushis, salades, snacks).</li>
          <li><strong className="text-white">🧪 Industrie et chimie :</strong> elles fournissent des hydrocolloïdes (alginate, agar, carraghénanes) utilisés comme gélifiants et épaississants dans de nombreux produits alimentaires et cosmétiques.</li>
          <li><strong className="text-white">💄 Cosmétiques &amp; bien-être :</strong> extraits d'algues aux propriétés hydratantes, anti-âge et protectrices.</li>
          <li><strong className="text-white">🚜 Agriculture &amp; fertilisation :</strong> les algues et leurs extraits améliorent la qualité des sols et stimulent la croissance des plantes.</li>
          <li><strong className="text-white">🐄 Alimentation animale &amp; biocarburants :</strong> des pistes de développement sont en cours d'exploration pour réduire les émissions et produire de l'énergie.</li>
        </ul>

        <p>
          Ce large éventail d'applications positionne la culture des algues comme une composante clé
          de l'<strong className="text-white">économie bleue durable</strong> et de la <strong className="text-white">bio-économie</strong> du XXIᵉ siècle.
        </p>
      </section>

      {/* LISTE DES ALGUES CULTIVÉES */}
      <section className="space-y-5 rounded-2xl border border-emerald-500/20 p-6" style={{ background: 'rgba(16,185,129,0.04)' }}>
        <h2 className="text-3xl font-semibold text-white">
          🌿 Principales algues cultivées et leurs usages
        </h2>

        <ul className="grid md:grid-cols-2 gap-5 text-sm">
          {[
            { name: 'Nori (Porphyra / Pyropia)', use: 'Consommation humaine (sushis), riche en protéines et vitamines.' },
            { name: 'Wakamé (Undaria pinnatifida)', use: 'Alimentation (soupes, salades), source d\'iode et minéraux.' },
            { name: 'Kombu / Laminaires', use: 'Cuisine asiatique, production d\'alginate, compléments alimentaires, biostimulants agricoles.' },
            { name: 'Spiruline (Arthrospira)', use: 'Complément alimentaire, riche en protéines, fer et antioxydants.' },
            { name: 'Chlorelle (Chlorella vulgaris)', use: 'Supplément nutritionnel, détox, recherche en biotechnologies et aquaculture.' },
            { name: 'Gracilaire (Gracilaria)', use: 'Production d\'agar (gélifiant), alimentation, cosmétique.' },
            { name: 'Eucheuma', use: 'Source principale de carraghénanes (texturants alimentaires et cosmétiques).' },
            { name: 'Ulve / Laitue de mer (Ulva)', use: 'Alimentation, fertilisants, bioremédiation.' },
          ].map((a) => (
            <li key={a.name} className="space-y-0.5">
              <strong className="text-white text-base">{a.name}</strong>
              <p className="text-gray-400">→ {a.use}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* USAGE EN FRANCE */}
      <section className="space-y-5">
        <h2 className="text-3xl font-semibold text-white">🇫🇷 Son usage en France</h2>

        <p>En France, la filière algues est historique mais encore limitée :</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>La production annuelle française s'élève à plusieurs dizaines de milliers de tonnes, mais elle est surtout issue de la récolte sauvage en mer, principalement en Bretagne (+90% de la production annuelle).</li>
          <li>L'algoculture commerciale reste moins développée qu'en Asie, avec une part minoritaire de la production totale.</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">Facteurs favorables</h3>
        <ul className="space-y-2">
          <li><strong className="text-white">🌟 Potentiel technologique :</strong> projets pilotes en mer et en bassins, parfois associés à la conchyliculture.</li>
          <li><strong className="text-white">🌱 Demande croissante :</strong> pour l'alimentation, les cosmétiques et les biotechnologies.</li>
          <li><strong className="text-white">📈 Soutien institutionnel :</strong> missions ministérielles pour structurer la filière.</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">Défis à relever</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Marché alimentaire encore en maturation.</li>
          <li>Innovations techniques nécessaires pour une culture rentable à grande échelle.</li>
          <li>Équilibre entre production et protection écologique du littoral.</li>
        </ul>
      </section>

      {/* RÉSUMÉ */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-white">🧭 En résumé</h2>
        <p>La culture des algues est une activité mondiale en forte croissance, avec des applications allant de l'alimentation humaine à l'industrie, aux cosmétiques, aux biocarburants et à l'agriculture durable.</p>
        <p>En France, malgré un héritage riche et des atouts naturels, l'algoculture en mer et en bassin reste un secteur émergent à fort potentiel, qui pourrait jouer un rôle stratégique dans l'économie bleue française si les obstacles techniques et économiques sont relevés dans les années à venir.</p>
      </section>

      {/* RESSOURCES */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Ressources</h2>
        <div className="space-y-2 text-sm">
          <a href="https://www.persee.fr/doc/geo_0003-4010_1996_num_105_591_21712" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">→ Article scientifique sur Persée</a>
          <a href="https://fr.wikipedia.org/wiki/Algoculture" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">→ Page Wikipédia</a>
          <a href="https://www.guidedesespeces.org/fr/algues" target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:text-emerald-300 transition-colors">→ Guide des espèces algues</a>
        </div>
      </section>

    </article>
  );
}

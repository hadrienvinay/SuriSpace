// app/posts/earth/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/common/JsonLd';
import ReadingProgress from '@/components/common/ReadingProgress';

export const metadata: Metadata = {
  title: "L'histoire de la Terre",
  description: "De boule de lave à monde vivant : 4,5 milliards d'années d'histoire de la Terre, entre extinctions de masse et explosions de vie.",
  keywords: ['histoire de la Terre', 'géologie', 'paléontologie', 'extinctions de masse', 'évolution', 'Hadéen', 'Terre boule de neige'],
  openGraph: { title: "L'histoire de la Terre", description: "4,5 milliards d'années d'histoire, de la Terre en fusion à nos jours.", type: 'article', url: 'https://suri-space.vercel.app/posts/earth' },
  alternates: { canonical: '/posts/earth' },
};

const JSONLD = {
  '@context': 'https://schema.org', '@type': 'BlogPosting',
  headline: "L'histoire de la Terre",
  description: "Retour sur 4,5 milliards d'années d'histoire de la Terre, de sa formation à nos jours, en passant par l'apparition de la vie et les grandes extinctions.",
  datePublished: '2026-08-05', inLanguage: 'fr',
  author: { '@type': 'Person', name: 'Hadrien Vinay' },
  url: 'https://suri-space.vercel.app/posts/earth',
  isPartOf: { '@type': 'Blog', name: 'Suri Space', url: 'https://suri-space.vercel.app' },
};

export default function Earth() {
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
          <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
            Sciences de la Terre
          </span>
          Hadrien Vinay · 5 Août 2026 · 12 min
        </div>
      </div>

      <article className="space-y-10 text-gray-300">

        {/* HERO / INTRO */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            L'histoire de la Terre : de la boule de lave au monde vivant
          </h1>

          <p className="text-lg leading-relaxed">
            La <strong className="text-white">Terre</strong> a environ <strong className="text-white">4,54 milliards d'années</strong>.
            Sur cette durée vertigineuse, elle est passée d'un océan de magma en fusion bombardé par des astéroïdes à une planète
            recouverte de glaciers globaux, puis à un monde grouillant d'une vie toujours plus complexe, ponctué de crises si
            violentes qu'elles ont failli, à plusieurs reprises, tout effacer.
          </p>

          <p className="text-lg leading-relaxed">
            Cette histoire se lit dans les roches, les isotopes et les fossiles. Elle se découpe en grandes ères géologiques,
            chacune marquée par une Terre radicalement différente de la précédente :
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              une <strong className="text-white">Terre de feu</strong>, sans atmosphère respirable ni eau liquide stable,
            </li>
            <li>
              une <strong className="text-white">Terre chaotique</strong> où la vie apparaît dans un environnement hostile et instable,
            </li>
            <li>
              des <strong className="text-white">Terres de glace</strong>, entièrement gelées à plusieurs reprises,
            </li>
            <li>
              puis une <strong className="text-white">Terre vivante</strong>, dont la biodiversité explose et s'effondre au gré de crises majeures.
            </li>
          </ul>

          <p className="text-lg leading-relaxed">
            Retracer cette histoire, c'est comprendre que la planète que nous habitons n'a rien d'un décor stable : c'est un
            système en perpétuelle transformation, dont l'équilibre actuel n'est qu'un instant dans une trajectoire de plusieurs milliards d'années.
          </p>
        </div>

        {/* VIDEO */}
        <section className="space-y-4">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/8">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/v8QjXxZMJt0"
              title="L'histoire de la Terre"
              allowFullScreen
            />
          </div>
        </section>

        {/* HADEEN */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">L'Hadéen (-4,54 à -4 Ga) : la Terre de lave</h2>

          <p>
            La Terre se forme par accrétion de poussières et de planétésimaux au sein du disque protoplanétaire qui entoure
            le jeune Soleil. Cette agrégation libère une chaleur colossale : la surface est un océan de magma en fusion,
            sans croûte solide stable, sans océan, sans atmosphère respirable.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>différenciation de la planète en noyau métallique (fer, nickel) et manteau silicaté,</li>
            <li>impact géant avec un corps de la taille de Mars (Théia), qui aurait formé la Lune,</li>
            <li>bombardement météoritique intense, avec un possible pic tardif (« grand bombardement tardif ») vers -4 à -3,8 Ga,</li>
            <li>atmosphère primitive dominée par la vapeur d'eau, le CO₂ et les gaz volcaniques, sans oxygène libre.</li>
          </ul>

          <div className="border border-orange-500/30 rounded-xl p-4" style={{ background: 'rgba(249,115,22,0.05)' }}>
            <p>
              <strong className="text-orange-300">🌋 À noter :</strong> le nom « Hadéen » vient d'Hadès, dieu grec des Enfers —
              un choix qui reflète les conditions de surface, jugées proches d'un enfer minéral : chaleur extrême, pluies de météorites,
              absence totale de vie connue.
            </p>
          </div>

          <p>
            Peu à peu, la surface se refroidit suffisamment pour qu'une croûte solide se forme et que la vapeur d'eau atmosphérique
            se condense. Des pluies torrentielles s'abattent alors sur la planète pendant des millénaires, donnant naissance
            aux premiers océans.
          </p>
        </section>

        {/* ARCHEEN */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">L'Archéen (-4 à -2,5 Ga) : l'apparition de la vie</h2>

          <p>
            L'Archéen voit l'apparition des premiers océans liquides stables et des premiers continents. C'est aussi, selon
            toute vraisemblance, la période où apparaît la vie sur Terre — un événement dont les mécanismes exacts restent débattus,
            mais dont les traces les plus anciennes (stromatolithes, isotopes du carbone) remontent à environ -3,5 voire -3,8 Ga.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>hypothèse d'un ancêtre commun universel (LUCA), une cellule procaryote simple,</li>
            <li>environnement de formation encore incertain : sources hydrothermales sous-marines, mares chaudes de surface…</li>
            <li>atmosphère toujours dépourvue d'oxygène libre, dominée par le méthane et le CO₂,</li>
            <li>apparition des premières cyanobactéries, capables de photosynthèse oxygénique.</li>
          </ul>

          <p className="italic text-gray-400">
            👉 Pendant près d'un milliard d'années, la vie reste unicellulaire, procaryote, et cantonnée aux océans —
            un monde microbien invisible mais déjà en pleine expansion.
          </p>
        </section>

        {/* GRANDE OXYDATION / PROTEROZOIQUE */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Le Protérozoïque (-2,5 Ga à -541 Ma) : oxygène et Terres boules de neige</h2>

          <h3 className="text-xl font-semibold text-white">La Grande Oxydation</h3>
          <p>
            Vers -2,4 Ga, l'activité photosynthétique des cyanobactéries a produit assez d'oxygène pour saturer les puits
            chimiques qui l'absorbaient (fer dissous, matière organique). L'oxygène s'accumule alors dans l'atmosphère :
            c'est la <strong className="text-white">Grande Oxydation</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>toxique pour l'immense majorité des organismes anaérobies de l'époque, provoquant une extinction massive du vivant microbien,</li>
            <li>précipitation du fer dissous dans les océans, à l'origine des gisements de fer rubané (BIF),</li>
            <li>chute possible du méthane atmosphérique, contribuant à un refroidissement global.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">Les Terres boules de neige</h3>
          <p>
            Le Cryogénien (-720 à -635 Ma) est marqué par plusieurs épisodes de glaciation si intenses que les calottes
            glaciaires auraient atteint l'équateur : l'hypothèse dite de la <strong className="text-white">Terre boule de neige</strong>
            (« Snowball Earth ») propose que la planète ait été presque entièrement gelée, océans compris.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>albédo extrême : la glace réfléchit la lumière solaire, entretenant le refroidissement,</li>
            <li>sortie de ces glaciations probablement due à l'accumulation de CO₂ volcanique sous la glace, provoquant un effet de serre extrême,</li>
            <li>fin de la dernière glaciation suivie d'un climat torride et d'une explosion de la diversité biologique.</li>
          </ul>

          <div className="border border-orange-500/30 rounded-xl p-4" style={{ background: 'rgba(249,115,22,0.05)' }}>
            <p>
              <strong className="text-orange-300">❄️ À noter :</strong> certains chercheurs préfèrent l'hypothèse d'une
              « Terre boule de neige fondante » (Slushball Earth), avec des zones océaniques restées libres de glace près
              de l'équateur — le débat scientifique reste ouvert.
            </p>
          </div>

          <p>
            C'est dans les eaux qui suivent ces glaciations que se développe la première grande faune multicellulaire connue :
            la <strong className="text-white">faune de l'Édiacarien</strong> (-635 à -541 Ma), des organismes mous, souvent
            énigmatiques, annonçant l'explosion de complexité à venir.
          </p>
        </section>

        {/* CAMBRIEN / PALEOZOIQUE */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">L'explosion cambrienne et le Paléozoïque (-541 à -252 Ma)</h2>

          <p>
            Il y a 541 millions d'années s'ouvre le Cambrien, marqué par l'<strong className="text-white">explosion cambrienne</strong> :
            en quelques dizaines de millions d'années seulement, la quasi-totalité des grands plans d'organisation animale
            actuels apparaissent — arthropodes, mollusques, premiers cordés.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>généralisation des squelettes et coquilles minéralisées, mieux fossilisées,</li>
            <li>diversification des relations prédateur-proie, moteur probable de cette explosion de formes,</li>
            <li>conquête progressive des terres émergées : plantes (à partir de -470 Ma), puis arthropodes et enfin vertébrés (tétrapodes, vers -375 Ma),</li>
            <li>apparition des premières forêts au Dévonien, transformant durablement le cycle du carbone.</li>
          </ul>

          <p>
            Le Paléozoïque se referme sur la plus grande extinction de masse connue : la crise <strong className="text-white">Permien-Trias</strong>,
            il y a environ 252 millions d'années, probablement causée par un épisode de volcanisme continental massif (trapps de Sibérie),
            provoquant un dérèglement climatique et une acidification des océans. Environ 96 % des espèces marines et 70 % des espèces
            terrestres disparaissent — un événement si sévère qu'il est parfois surnommé « la Grande Mortalité ».
          </p>
        </section>

        {/* MESOZOIQUE */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Le Mésozoïque (-252 à -66 Ma) : l'ère des dinosaures</h2>

          <p>
            La vie se reconstruit lentement après la crise Permien-Trias. Le supercontinent <strong className="text-white">Pangée</strong>,
            formé à la fin du Paléozoïque, commence à se fragmenter au Jurassique, dessinant progressivement la géographie
            des continents actuels.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>domination des dinosaures sur les milieux terrestres pendant plus de 150 millions d'années,</li>
            <li>essor des reptiles marins (ichtyosaures, plésiosaures) et volants (ptérosaures),</li>
            <li>apparition des premiers mammifères, petits et discrets, ainsi que des premières plantes à fleurs (angiospermes),</li>
            <li>climats globalement chauds, sans calotte polaire permanente.</li>
          </ul>

          <p>
            Le Mésozoïque s'achève brutalement il y a 66 millions d'années avec l'extinction <strong className="text-white">Crétacé-Paléogène</strong> :
            l'impact d'un astéroïde d'environ 10 km de diamètre près de l'actuel Chicxulub (Mexique), combiné à une activité
            volcanique intense (trapps du Deccan), plonge la planète dans un hiver d'impact. Les dinosaures non aviens,
            les ptérosaures et de nombreux groupes marins disparaissent.
          </p>
        </section>

        {/* CENOZOIQUE */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Le Cénozoïque (-66 Ma à aujourd'hui) : l'essor des mammifères</h2>

          <p>
            Débarrassés de la pression des grands dinosaures, les mammifères se diversifient rapidement et occupent
            les niches écologiques laissées vacantes. Le climat, d'abord chaud, se refroidit progressivement sur des dizaines
            de millions d'années.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>formation des calottes polaires permanentes, en Antarctique puis en Arctique,</li>
            <li>alternance de glaciations et de périodes interglaciaires au Quaternaire (depuis -2,6 Ma),</li>
            <li>apparition des premiers hominidés en Afrique, puis du genre <em>Homo</em>,</li>
            <li>émergence d'<strong className="text-white">Homo sapiens</strong> il y a environ 300 000 ans.</li>
          </ul>

          <div className="border border-orange-500/30 rounded-xl p-4" style={{ background: 'rgba(249,115,22,0.05)' }}>
            <p>
              <strong className="text-orange-300">🕐 À noter :</strong> en ramenant les 4,54 milliards d'années de la Terre
              à une seule année (le « calendrier cosmique » popularisé par Carl Sagan), la vie multicellulaire n'apparaît
              qu'au 1<sup>er</sup> novembre, les dinosaures disparaissent le 30 décembre vers 15h, et toute l'histoire de
              l'humanité moderne tient dans les dix dernières secondes du 31 décembre.
            </p>
          </div>
        </section>

        {/* TABLEAU EXTINCTIONS */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Les cinq grandes extinctions de masse</h2>

          <p>
            L'histoire du vivant n'est pas une progression linéaire : elle est ponctuée de crises brutales qui ont
            chacune éliminé une fraction considérable des espèces existantes, avant que la biodiversité ne se reconstitue,
            différemment, sur des millions d'années.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left text-gray-400">
                  <th className="py-2 pr-4 font-medium">Extinction</th>
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Cause probable</th>
                  <th className="py-2 font-medium">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-2 pr-4 text-white">Ordovicien-Silurien</td>
                  <td className="py-2 pr-4">-445 Ma</td>
                  <td className="py-2 pr-4">Glaciation et baisse du niveau des mers</td>
                  <td className="py-2">~85 % des espèces marines</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-white">Dévonien</td>
                  <td className="py-2 pr-4">-375 Ma</td>
                  <td className="py-2 pr-4">Anoxie océanique, refroidissement</td>
                  <td className="py-2">~75 % des espèces</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-white">Permien-Trias</td>
                  <td className="py-2 pr-4">-252 Ma</td>
                  <td className="py-2 pr-4">Volcanisme massif (trapps de Sibérie)</td>
                  <td className="py-2">~96 % des espèces marines</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-white">Trias-Jurassique</td>
                  <td className="py-2 pr-4">-201 Ma</td>
                  <td className="py-2 pr-4">Volcanisme (ouverture de l'Atlantique)</td>
                  <td className="py-2">~80 % des espèces</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-white">Crétacé-Paléogène</td>
                  <td className="py-2 pr-4">-66 Ma</td>
                  <td className="py-2 pr-4">Impact d'astéroïde et volcanisme (Deccan)</td>
                  <td className="py-2">~75 % des espèces, dont les dinosaures non aviens</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="italic text-gray-400">
            👉 De nombreux scientifiques considèrent qu'une sixième extinction de masse est en cours, cette fois d'origine
            humaine — liée à la destruction des habitats, au changement climatique et à la surexploitation des ressources.
          </p>
        </section>

        {/* CONCLUSION */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Conclusion et perspectives</h2>
          <p>
            De boule de magma sans atmosphère respirable à monde recouvert de glaces globales, puis à planète bleue
            grouillant de vie, la Terre a traversé des états radicalement différents. Chaque grande transition — apparition
            de l'oxygène, sortie des glaciations, explosion de la biodiversité, extinctions de masse — a redéfini les règles
            du jeu pour le vivant.
          </p>
          <p>
            Cette histoire rappelle que l'équilibre actuel de la planète n'est ni figé ni garanti : il résulte d'une
            succession de bouleversements, et il continuera d'évoluer, avec ou sans l'espèce humaine.
          </p>
          <p className="italic text-gray-400">
            👉 Comprendre le passé profond de la Terre, c'est aussi mieux mesurer l'ampleur des changements en cours aujourd'hui.
          </p>
        </section>

        {/* RESSOURCES */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Ressources</h2>
          <div className="space-y-2 text-sm">
            <a href="https://www.futura-sciences.com/planete/dossiers/geologie-histoire-terre-1000/" target="_blank" rel="noopener noreferrer" className="block text-orange-400 hover:text-orange-300 transition-colors">→ Futura Sciences — Histoire géologique de la Terre</a>
            <a href="https://www.snsb.info/collections/" target="_blank" rel="noopener noreferrer" className="block text-orange-400 hover:text-orange-300 transition-colors">→ Échelle des temps géologiques (International Commission on Stratigraphy)</a>
            <a href="https://www.cnrs.fr/fr/actualites-recentes?f%5B0%5D=disciplines%3A56" target="_blank" rel="noopener noreferrer" className="block text-orange-400 hover:text-orange-300 transition-colors">→ CNRS — Actualités en sciences de la Terre</a>
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

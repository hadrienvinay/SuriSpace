import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/common/JsonLd';
import ReadingProgress from '@/components/common/ReadingProgress';

export const metadata: Metadata = {
  title: 'Le ciel en 2026',
  description: "Éclipses, comètes, étoiles filantes et rendez-vous planétaires : le calendrier astronomique complet de 2026.",
  keywords: ['astronomie', 'calendrier astronomique', 'éclipse', 'étoiles filantes', 'perséides', '2026'],
  openGraph: { title: 'Le ciel en 2026', description: "Le calendrier astronomique complet de 2026.", type: 'article', url: 'https://suri-space.vercel.app/posts/astro' },
  alternates: { canonical: '/posts/astro' },
};

const JSONLD = {
  '@context': 'https://schema.org', '@type': 'BlogPosting',
  headline: 'Le ciel en 2026',
  description: "Éclipses, comètes, étoiles filantes et rendez-vous planétaires : le calendrier astronomique complet de 2026.",
  datePublished: '2026-03-09', inLanguage: 'fr',
  author: { '@type': 'Person', name: 'Hadrien Vinay' },
  url: 'https://suri-space.vercel.app/posts/astro',
  isPartOf: { '@type': 'Blog', name: 'Suri Space', url: 'https://suri-space.vercel.app' },
};

export default function Astro() {
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
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Astronomie
          </span>
          Hadrien Vinay · 9 Mars 2026 · 8 min
        </div>
      </div>

      <article className="space-y-10 text-gray-300">

        {/* INTRO */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight text-center">
            Le ciel en 2026 : les observations &agrave; ne pas manquer
          </h1>
          <p className="text-lg leading-relaxed">
            2026 est une ann&eacute;e exceptionnelle pour les amateurs d&apos;astronomie : une &eacute;clipse
            solaire totale visible depuis l&apos;Europe, deux com&egrave;tes potentiellement visibles &agrave;
            l&apos;&oelig;il nu, des pluies de m&eacute;t&eacute;ores spectaculaires et des rendez-vous
            plan&eacute;taires remarquables. Voici le calendrier complet.
          </p>
        </div>

        {/* ÉCLIPSES */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">&Eacute;clipses</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Éclipse lunaire totale */}
            <div className="rounded-xl border border-red-500/20 p-5 space-y-3" style={{ background: 'rgba(239,68,68,0.04)' }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌑</span>
                <h3 className="text-lg font-semibold text-white">&Eacute;clipse lunaire totale</h3>
              </div>
              <p className="text-sm font-mono text-red-400">3 mars 2026</p>
              <p className="text-sm">
                La Lune se teinte de rouge cuivr&eacute; pendant pr&egrave;s d&apos;une heure (totalit&eacute; de 11h04 &agrave; 12h03 UTC).
                Visible dans son int&eacute;gralit&eacute; depuis l&apos;<strong className="text-white">Am&eacute;rique du Nord et Centrale</strong>,
                le <strong className="text-white">Pacifique</strong>, l&apos;<strong className="text-white">Asie de l&apos;Est</strong> et
                l&apos;<strong className="text-white">Australie</strong>. Non visible depuis l&apos;Europe et l&apos;Afrique.
              </p>
            </div>

            {/* Éclipse solaire annulaire */}
            <div className="rounded-xl border border-amber-500/20 p-5 space-y-3" style={{ background: 'rgba(245,158,11,0.04)' }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌗</span>
                <h3 className="text-lg font-semibold text-white">&Eacute;clipse solaire annulaire</h3>
              </div>
              <p className="text-sm font-mono text-amber-400">17 f&eacute;vrier 2026</p>
              <p className="text-sm">
                &Eacute;clipse annulaire (anneau de feu) visible uniquement depuis l&apos;<strong className="text-white">Antarctique</strong>.
                La Lune est trop &eacute;loign&eacute;e pour couvrir enti&egrave;rement le Soleil,
                laissant un cercle lumineux autour de sa silhouette.
              </p>
            </div>

            {/* Éclipse solaire totale */}
            <div className="rounded-xl border border-yellow-500/20 p-5 space-y-3" style={{ background: 'rgba(234,179,8,0.04)' }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌘</span>
                <h3 className="text-lg font-semibold text-white">&Eacute;clipse solaire totale</h3>
              </div>
              <p className="text-sm font-mono text-yellow-400">12 ao&ucirc;t 2026</p>
              <p className="text-sm">
                L&apos;&eacute;v&eacute;nement de l&apos;ann&eacute;e. Première &eacute;clipse solaire totale en
                <strong className="text-white"> Europe continentale depuis 1999</strong>.
                La bande de totalit&eacute; traverse le <strong className="text-white">Groenland</strong>,
                l&apos;<strong className="text-white">Islande</strong>, puis le <strong className="text-white">nord de l&apos;Espagne</strong> et
                les <strong className="text-white">&icirc;les Bal&eacute;ares</strong> (Majorque).
                Une &eacute;clipse partielle sera visible dans toute l&apos;Europe, l&apos;Afrique du Nord et une partie de l&apos;Am&eacute;rique du Nord.
              </p>
            </div>

            {/* Éclipse lunaire partielle */}
            <div className="rounded-xl border border-orange-500/20 p-5 space-y-3" style={{ background: 'rgba(249,115,22,0.04)' }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌒</span>
                <h3 className="text-lg font-semibold text-white">&Eacute;clipse lunaire partielle</h3>
              </div>
              <p className="text-sm font-mono text-orange-400">28 ao&ucirc;t 2026</p>
              <p className="text-sm">
                &Eacute;clipse partielle profonde, visible depuis l&apos;<strong className="text-white">Europe</strong>,
                l&apos;<strong className="text-white">Afrique</strong>, l&apos;<strong className="text-white">Atlantique</strong> et
                les <strong className="text-white">Am&eacute;riques</strong>.
                Deux semaines seulement apr&egrave;s l&apos;&eacute;clipse solaire totale.
              </p>
            </div>
          </div>

          <div className="border border-yellow-500/30 rounded-xl p-4" style={{ background: 'rgba(234,179,8,0.05)' }}>
            <p>
              <strong className="text-yellow-300">A retenir :</strong> l&apos;&eacute;clipse solaire totale du 12 ao&ucirc;t
              est l&apos;occasion unique de voir la couronne solaire depuis l&apos;Espagne et l&apos;Islande.
              La prochaine &eacute;clipse totale visible en France m&eacute;tropolitaine aura lieu en 2081.
            </p>
          </div>
        </section>

        {/* COMÈTES */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Com&egrave;tes</h2>

          <p>
            Deux com&egrave;tes pourraient marquer 2026, avec un potentiel de visibilit&eacute; &agrave; l&apos;&oelig;il nu :
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-cyan-500/20 p-5 space-y-3" style={{ background: 'rgba(6,182,212,0.04)' }}>
              <h3 className="text-lg font-semibold text-white">C/2026 A1 (MAPS) — la « sungrazer »</h3>
              <p className="text-sm font-mono text-cyan-400">D&eacute;but avril 2026</p>
              <p className="text-sm">
                Com&egrave;te de type <strong className="text-white">Kreutz sungrazer</strong> : elle plongera extr&ecirc;mement
                pr&egrave;s du Soleil d&eacute;but avril. Si elle survit (comme Ikeya-Seki en 1965 ou Lovejoy en 2011),
                elle pourrait devenir <strong className="text-white">spectaculairement brillante</strong> pendant quelques jours,
                visible au cr&eacute;puscule &agrave; l&apos;&oelig;il nu — surtout depuis l&apos;h&eacute;misph&egrave;re sud.
                Mais les sungrazers sont impr&eacute;visibles : certaines se d&eacute;sint&egrave;grent en approchant du Soleil.
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/20 p-5 space-y-3" style={{ background: 'rgba(6,182,212,0.04)' }}>
              <h3 className="text-lg font-semibold text-white">C/2025 R3 (PanSTARRS) — candidate « grande com&egrave;te de 2026 »</h3>
              <p className="text-sm font-mono text-cyan-400">Mi-avril 2026 (p&eacute;rih&eacute;lie ~17 avril)</p>
              <p className="text-sm">
                D&eacute;couverte r&eacute;cemment, cette com&egrave;te pourrait atteindre une
                <strong className="text-white"> magnitude de 2,5</strong> selon les estimations optimistes,
                ce qui la rendrait clairement visible &agrave; l&apos;&oelig;il nu. La nouvelle Lune du 17 avril
                offrirait des conditions id&eacute;ales pour l&apos;observer. Les estimations plus prudentes
                tablent sur une magnitude 8 (jumelles n&eacute;cessaires).
              </p>
            </div>

            <div className="rounded-xl border border-white/10 p-5 space-y-3" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-white">10P/Tempel 2</h3>
              <p className="text-sm font-mono text-gray-400">2 ao&ucirc;t 2026 (p&eacute;rih&eacute;lie)</p>
              <p className="text-sm">
                Com&egrave;te p&eacute;riodique atteignant la magnitude 7–8 &agrave; son passage le plus proche
                de la Terre (3 ao&ucirc;t). Facile &agrave; rep&eacute;rer aux jumelles ou au petit t&eacute;lescope.
              </p>
            </div>
          </div>
        </section>

        {/* PLUIES DE MÉTÉORES */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Pluies d&apos;&eacute;toiles filantes</h2>

          <p>
            Les principales pluies de m&eacute;t&eacute;ores de l&apos;ann&eacute;e, class&eacute;es par intensit&eacute; :
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white font-semibold">Pluie</th>
                  <th className="py-3 pr-4 text-white font-semibold">Pic</th>
                  <th className="py-3 pr-4 text-white font-semibold">M&eacute;t&eacute;ores/h</th>
                  <th className="py-3 text-white font-semibold">Conditions 2026</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 pr-4 font-semibold text-yellow-400">G&eacute;minides</td>
                  <td className="py-3 pr-4">13–14 d&eacute;cembre</td>
                  <td className="py-3 pr-4 text-white font-bold">~150</td>
                  <td className="py-3">La meilleure pluie de l&apos;ann&eacute;e. M&eacute;t&eacute;ores brillants, multi-color&eacute;s, visibles toute la nuit.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-blue-400">Pers&eacute;ides</td>
                  <td className="py-3 pr-4">12–13 ao&ucirc;t</td>
                  <td className="py-3 pr-4 text-white font-bold">~60</td>
                  <td className="py-3">Le classique de l&apos;&eacute;t&eacute;. Co&iuml;ncide avec l&apos;&eacute;clipse solaire du 12 ao&ucirc;t — une soir&eacute;e d&apos;astronomie inoubliable.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-purple-400">Quadrantides</td>
                  <td className="py-3 pr-4">3–4 janvier</td>
                  <td className="py-3 pr-4 text-white font-bold">~40</td>
                  <td className="py-3">Pic tr&egrave;s bref (6h). M&eacute;t&eacute;ores brillants, id&eacute;al depuis l&apos;h&eacute;misph&egrave;re nord.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-green-400">Lyrides</td>
                  <td className="py-3 pr-4">22–23 avril</td>
                  <td className="py-3 pr-4 text-white font-bold">~20</td>
                  <td className="py-3">Pluie mod&eacute;r&eacute;e mais r&eacute;guli&egrave;re, avec des bolides occasionnels.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-orange-400">Orionides</td>
                  <td className="py-3 pr-4">21–22 octobre</td>
                  <td className="py-3 pr-4 text-white font-bold">~20</td>
                  <td className="py-3">D&eacute;bris de la com&egrave;te de Halley. M&eacute;t&eacute;ores rapides et brillants.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-teal-400">Eta Aquarides</td>
                  <td className="py-3 pr-4">6–7 mai</td>
                  <td className="py-3 pr-4 text-white font-bold">~50</td>
                  <td className="py-3">&Eacute;galement li&eacute;s &agrave; Halley. Meilleure visibilit&eacute; depuis l&apos;h&eacute;misph&egrave;re sud.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PLANÈTES */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Rendez-vous plan&eacute;taires</h2>

          <p>
            Les oppositions et conjonctions offrent les meilleures conditions pour observer les plan&egrave;tes :
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-amber-500/20 p-5 space-y-2" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-amber-400">Jupiter en opposition</h3>
              <p className="text-sm font-mono text-gray-400">10 janvier 2026</p>
              <p className="text-sm">
                Jupiter brille toute la nuit comme l&apos;objet le plus lumineux du ciel (hors Lune).
                Id&eacute;al pour observer ses bandes atmosph&eacute;riques et ses 4 lunes galil&eacute;ennes aux jumelles.
              </p>
            </div>

            <div className="rounded-xl border border-yellow-500/20 p-5 space-y-2" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-yellow-400">Saturne en opposition</h3>
              <p className="text-sm font-mono text-gray-400">4 octobre 2026</p>
              <p className="text-sm">
                Saturne au plus proche de la Terre, avec ses anneaux bien visibles au t&eacute;lescope.
                Les anneaux s&apos;inclinent progressivement vers la tranche — un ph&eacute;nom&egrave;ne rare
                qui atteindra son minimum en 2025–2026.
              </p>
            </div>

            <div className="rounded-xl border border-blue-500/20 p-5 space-y-2" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-blue-400">Conjonction Saturne-Neptune</h3>
              <p className="text-sm font-mono text-gray-400">16 f&eacute;vrier 2026</p>
              <p className="text-sm">
                Rapprochement apparent des deux plan&egrave;tes dans la constellation des Poissons.
                Saturne est visible &agrave; l&apos;&oelig;il nu, Neptune n&eacute;cessite des jumelles.
              </p>
            </div>

            <div className="rounded-xl border border-red-500/20 p-5 space-y-2" style={{ background: 'rgba(8,12,28,0.6)' }}>
              <h3 className="text-lg font-semibold text-red-400">Conjonction Jupiter-Mars</h3>
              <p className="text-sm font-mono text-gray-400">14 novembre 2026</p>
              <p className="text-sm">
                Les deux plan&egrave;tes apparaissent tr&egrave;s proches dans le ciel.
                Mars s&apos;approche de la Terre en pr&eacute;paration de son opposition de f&eacute;vrier 2027.
              </p>
            </div>
          </div>
        </section>

        {/* CALENDRIER RÉSUMÉ */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Calendrier r&eacute;sum&eacute;</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white font-semibold">Date</th>
                  <th className="py-3 pr-4 text-white font-semibold">&Eacute;v&eacute;nement</th>
                  <th className="py-3 text-white font-semibold">Visibilit&eacute;</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">3-4 jan.</td><td className="py-2 pr-4">Quadrantides</td><td className="py-2">H&eacute;misph&egrave;re nord</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">10 jan.</td><td className="py-2 pr-4">Opposition Jupiter</td><td className="py-2">Mondial</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">16 f&eacute;v.</td><td className="py-2 pr-4">Conjonction Saturne-Neptune</td><td className="py-2">Mondial</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">17 f&eacute;v.</td><td className="py-2 pr-4">&Eacute;clipse solaire annulaire</td><td className="py-2">Antarctique</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">3 mars</td><td className="py-2 pr-4">&Eacute;clipse lunaire totale</td><td className="py-2">Am&eacute;riques, Pacifique, Asie</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">D&eacute;b. avril</td><td className="py-2 pr-4">Com&egrave;te C/2026 A1 (MAPS)</td><td className="py-2">Potentiellement &oelig;il nu</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">17 avril</td><td className="py-2 pr-4">Com&egrave;te C/2025 R3 (PanSTARRS)</td><td className="py-2">Potentiellement &oelig;il nu</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">22-23 avril</td><td className="py-2 pr-4">Lyrides</td><td className="py-2">Mondial</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">6-7 mai</td><td className="py-2 pr-4">Eta Aquarides</td><td className="py-2">Mondial (sud favoris&eacute;)</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">2-3 ao&ucirc;t</td><td className="py-2 pr-4">Com&egrave;te 10P/Tempel 2</td><td className="py-2">Jumelles</td></tr>
                <tr className="text-white font-semibold"><td className="py-2 pr-4 font-mono text-yellow-400">12 ao&ucirc;t</td><td className="py-2 pr-4">&Eacute;clipse solaire totale</td><td className="py-2">Islande, Espagne, Bal&eacute;ares</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">12-13 ao&ucirc;t</td><td className="py-2 pr-4">Pers&eacute;ides</td><td className="py-2">Mondial</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">28 ao&ucirc;t</td><td className="py-2 pr-4">&Eacute;clipse lunaire partielle</td><td className="py-2">Europe, Afrique, Am&eacute;riques</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">4 oct.</td><td className="py-2 pr-4">Opposition Saturne</td><td className="py-2">Mondial</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">21-22 oct.</td><td className="py-2 pr-4">Orionides</td><td className="py-2">Mondial</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">14 nov.</td><td className="py-2 pr-4">Conjonction Jupiter-Mars</td><td className="py-2">Mondial</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-indigo-400">13-14 d&eacute;c.</td><td className="py-2 pr-4">G&eacute;minides</td><td className="py-2">Mondial</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CONSEILS */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-white">Conseils d&apos;observation</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Pollution lumineuse :</strong> &eacute;loignez-vous des villes.
              Utilisez la carte <em>Light Pollution Map</em> pour trouver des sites sombres.
            </li>
            <li>
              <strong className="text-white">Adaptation des yeux :</strong> laissez vos yeux s&apos;adapter &agrave; l&apos;obscurit&eacute;
              pendant 20 &agrave; 30 minutes. &Eacute;vitez les &eacute;crans et utilisez une lampe rouge.
            </li>
            <li>
              <strong className="text-white">&Eacute;toiles filantes :</strong> allongez-vous et regardez le z&eacute;nith (droit au-dessus).
              Pas besoin de jumelles ni de t&eacute;lescope.
            </li>
            <li>
              <strong className="text-white">&Eacute;clipse solaire :</strong> ne regardez <strong className="text-white">jamais</strong> le
              Soleil sans lunettes &agrave; &eacute;clipse certifi&eacute;es (norme ISO 12312-2). Seule la phase de totalit&eacute;
              peut &ecirc;tre observ&eacute;e sans protection.
            </li>
            <li>
              <strong className="text-white">Applications utiles :</strong> Stellarium (gratuit), Star Walk 2 ou SkySafari
              pour identifier les objets dans le ciel en temps r&eacute;el.
            </li>
          </ul>
        </section>

        {/* RESSOURCES */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Ressources</h2>
          <div className="space-y-2 text-sm">
            <a href="https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/" target="_blank" rel="noopener noreferrer" className="block text-indigo-400 hover:text-indigo-300 transition-colors">NASA — Most Notable 2026 Astronomical Events</a>
            <a href="https://www.timeanddate.com/eclipse/2026" target="_blank" rel="noopener noreferrer" className="block text-indigo-400 hover:text-indigo-300 transition-colors">TimeAndDate — &Eacute;clipses 2026</a>
            <a href="https://www.smithsonianmag.com/science-nature/dont-miss-these-ten-celestial-events-in-2026-from-aligned-planets-to-a-total-solar-eclipse-180987931/" target="_blank" rel="noopener noreferrer" className="block text-indigo-400 hover:text-indigo-300 transition-colors">Smithsonian — 10 Celestial Events in 2026</a>
            <a href="https://earthsky.org/tonight/best-comets-of-2026-wierzchos-panstarrs-tempel/" target="_blank" rel="noopener noreferrer" className="block text-indigo-400 hover:text-indigo-300 transition-colors">EarthSky — Best Comets of 2026</a>
            <a href="https://www.rmg.co.uk/stories/space-astronomy/space-astronomy-highlights-2026" target="_blank" rel="noopener noreferrer" className="block text-indigo-400 hover:text-indigo-300 transition-colors">Royal Observatory Greenwich — Highlights 2026</a>
            <a href="https://starwalk.space/en/news/astronomy-calendar-2026" target="_blank" rel="noopener noreferrer" className="block text-indigo-400 hover:text-indigo-300 transition-colors">Star Walk — Calendrier astronomique 2026</a>
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

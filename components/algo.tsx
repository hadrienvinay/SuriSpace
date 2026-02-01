import Image from 'next/image'

export default function Algo() {
  return (
    <div className=" ">
      <article className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* INTRODUCTION */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            🌱 La culture des algues dans le monde : un secteur en pleine expansion
          </h1>

          <p className="text-lg ">
            La culture des algues — ou <strong>algoculture</strong> — est une activité vieille de
            plusieurs siècles, mais elle connaît aujourd’hui une croissance rapide à l’échelle
            mondiale. La production mondiale d’algues cultivées dépasse aujourd’hui les{" "}
            <strong>14 millions de tonnes par an</strong>, principalement sous forme de
            macro-algues marines (comme les laminaires, le wakamé ou le nori).
          </p>

          <p className="text-lg ">
            Elle est dominée par des pays d’Asie-Pacifique tels que la Chine, l’Indonésie et le Japon,
            qui représentent la majorité de la production mondiale.
          </p>

          <p className="text-lg ">
            Le rôle écologique de ces cultures n’est pas négligeable : les algues sont de redoutables
            pompes à carbone (elles captent le CO₂ par photosynthèse sans besoin d’intrants
            agricoles) et contribuent à atténuer l’acidification des océans — un atout dans un
            contexte de changement climatique.
          </p>
        </div>

        {/* IMAGE */}
        <figure>
            <Image
                src="/uploads/image-1769438168655-893060458.jpg"
                width={100}
                height={100}
                alt="image"
                className="w-full object-cover rounded-xl"
                unoptimized
                />
            <figcaption className="mt-3 text-sm text-center">
                Une culture d'algue en Asie
            </figcaption>
        </figure>

        {/* CITATION */}
        <blockquote className="border-l-4 border-green-600 pl-4 italic text-lg ">
          “L’algoculture c’est la rencontre entre la mer, la science et l’avenir durable.”
          <span className="block mt-2 font-semibold">— Nicole Grazioso</span>
        </blockquote>

        {/* APPLICATIONS */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            🛠️ Applications : de l’alimentation aux biotechnologies
          </h2>

          <ul className="space-y-4">
            <li>
              <strong>🥢 Alimentation humaine :</strong> une part très importante de la production
              mondiale est destinée à la consommation directe comme légume marin (sushis, salades,
              snacks).
            </li>
            <li>
              <strong>🧪 Industrie et chimie :</strong> elles fournissent des hydrocolloïdes
              (alginate, agar, carraghénanes) utilisés comme gélifiants et épaississants dans de
              nombreux produits alimentaires et cosmétiques.
            </li>
            <li>
              <strong>💄 Cosmétiques & bien-être :</strong> extraits d’algues aux propriétés
              hydratantes, anti-âge et protectrices.
            </li>
            <li>
              <strong>🚜 Agriculture & fertilisation :</strong> les algues et leurs extraits
              améliorent la qualité des sols et stimulent la croissance des plantes.
            </li>
            <li>
              <strong>🐄 Alimentation animale & biocarburants :</strong> des pistes de développement
              sont en cours d’exploration pour réduire les émissions et produire de l’énergie.
            </li>
          </ul>

          <p>
            Ce large éventail d’applications positionne la culture des algues comme une composante clé
            de l’<strong>économie bleue durable</strong> et de la <strong>bio-économie</strong> du
            XXIᵉ siècle.
          </p>
        </section>

        {/* LISTE DES ALGUES CULTIVÉES */}
        <section className="space-y-6 light:bg-green-200 p-6 rounded-xl">
          <h2 className="text-3xl font-semibold">
            🌿 Principales algues cultivées et leurs usages
          </h2>

          <ul className="grid md:grid-cols-2 gap-6">
            <li>
              <strong>Nori (Porphyra / Pyropia)</strong>
              <p>→ Consommation humaine (sushis), riche en protéines et vitamines.</p>
            </li>

            <li>
              <strong>Wakamé (Undaria pinnatifida)</strong>
              <p>→ Alimentation (soupes, salades), source d’iode et minéraux.</p>
            </li>

            <li>
              <strong>Kombu / Laminaires (Saccharina, Laminaria)</strong>
              <p>
                → Cuisine asiatique, production d’alginate, compléments alimentaires, biostimulants
                agricoles.
              </p>
            </li>

            <li>
              <strong>Spiruline (Arthrospira)</strong>
              <p>→ Complément alimentaire, riche en protéines, fer et antioxydants.</p>
            </li>

            <li>
              <strong>Chlorelle (Chlorella vulgaris)</strong>
              <p>
                → Supplément nutritionnel, détox, recherche en biotechnologies et aquaculture.
              </p>
            </li>

            <li>
              <strong>Gracilaire (Gracilaria)</strong>
              <p>→ Production d’agar (gélifiant), alimentation, cosmétique.</p>
            </li>

            <li>
              <strong>Eucheuma</strong>
              <p>
                → Source principale de carraghénanes (texturants alimentaires et cosmétiques).
              </p>
            </li>

            <li>
              <strong>Ulve / Laitue de mer (Ulva)</strong>
              <p>→ Alimentation, fertilisants, bioremédiation.</p>
            </li>
          </ul>
        </section>

        {/* USAGE EN FRANCE */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">🇫🇷 Son usage en France</h2>

          <p>
            En France, la filière algues est historique mais encore limitée :
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              La production annuelle française s’élève à plusieurs dizaines de milliers de tonnes,
              mais elle est surtout issue de la récolte sauvage en mer, notamment en Bretagne et au
              Pays Basque.
            </li>
            <li>
              L’algoculture commerciale reste moins développée qu’en Asie, avec une part minoritaire
              de la production totale.
            </li>
          </ul>

          <h3 className="text-2xl font-medium">Facteurs favorables</h3>
          <ul className="space-y-2">
            <li>
              <strong>🌟 Potentiel technologique :</strong> projets pilotes en mer et en bassins,
              parfois associés à la conchyliculture.
            </li>
            <li>
              <strong>🌱 Demande croissante :</strong> pour l’alimentation, les cosmétiques et les
              biotechnologies.
            </li>
            <li>
              <strong>📈 Soutien institutionnel :</strong> missions ministérielles pour structurer la
              filière.
            </li>
          </ul>

          <h3 className="text-2xl font-medium">Défis à relever</h3>
          <ul className="space-y-2">
            <li>Marché alimentaire encore en maturation.</li>
            <li>Innovations techniques nécessaires pour une culture rentable à grande échelle.</li>
            <li>
              Équilibre entre production et protection écologique du littoral.
            </li>
          </ul>
        </section>

        {/* RÉSUMÉ */}
        <section className="space-y-6 ">
          <h2 className="text-3xl font-semibold">🧭 En résumé</h2>

          <p>
            La culture des algues est une activité mondiale en forte croissance, avec des applications
            allant de l’alimentation humaine à l’industrie, aux cosmétiques, aux biocarburants et à
            l’agriculture durable.
          </p>

          <p>
            En France, malgré un héritage riche et des atouts naturels, l’algoculture en mer et en
            bassin reste un secteur émergent à fort potentiel, qui pourrait jouer un rôle stratégique
            dans l’économie bleue française si les obstacles techniques et économiques sont relevés
            dans les années à venir.
          </p>
        </section>

        {/* RESSOURCES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ressources</h2>
          <a
            href="https://www.persee.fr/doc/geo_0003-4010_1996_num_105_591_21712"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline"
          >
            → Article scientifique sur Persée
          </a>
        </section>
      </article>
    </div>
  );
}

import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Suri",
    email: "hadrien.vinay@yahoo.fr",
    posts: {
      create: [
        {
          title: "Le spatial en 2026",
          content: "https://pris.ly/youtube",
          image: "/uploads/default.webp",
          published: true,
        },

      ],
    },
    projects: {
      create: [
        {
          title: "Simulation Système Solaire",
          resume: "Simulation du système solaire en 3D avec interactions gravitationnelles entre les corps.",
          content: "Projet réalisé en Python utilisant la bibliothèque OpenGL pour la visualisation 3D et pygame pour la gestion d'une fenêtre de jeu. Le modèle intègre les lois de Newton pour simuler les orbites planétaires et les interactions gravitationnelles.",
          content2: "La simulation permet de visualiser en 3D le mouvement des planètes autour du soleil ainsi que la lune autour de la terre. L'utilisateur peuvent ajuster les paramètres tels que la masse des corps célestes, leurs positions, l'échelle, la vitesse de la simulation et observer comment cela affecte leurs orbites.",
          link: "https://github.com/hadrienvinay/space_simulation",
          image: "/space_solar.png",
          imageTitle: "Capture d'écran du système solaire",
          image2: "/space_earth.png",
          image2Title: "Système Terre Lune dans la simulation",
          createdAt: new Date('2025-10-11'),
        },
        {
          title: "Jeu de Coinche",
          resume: "Jeu de belote coinchée contre des adversaires contrôlés par l'ordinateur.",
          content: "Jeu dévelopé en python avec la bibliothèque Pygame. Permet de jouer à la belote coinchée en solo contre des bots avec différents niveaux de difficulté. Interface utilisateur simple avec gestion des règles complètes de la belote coinchée, y compris les annonces et les plis.",
          link: "https://github.com/hadrienvinay/Belote_Game",
          image: "/coinche.png",
          imageTitle: "Capture d'écran du jeu de coinche",
          image2: "/coinche2.png",
          image2Title: "Bilan d'une partie",
          createdAt: new Date('2025-12-15'),
        },
        {
          title: "Blog Personnel",
          resume: "Site personnel réalisé avec Next JS pour présenter mon profil et mes projets.",
          content: "Approfondissement de mes compétences Web avec le framework Next JS. Le site inclut une page d'accueil, un blog pour partager des articles, une section projets pour présenter mes travaux et également une partie finance avec les prix spot de l'or et l'argent ainsi qu'un tableau dynamique des principales actions mondiales. Utilisation de TypeScript pour le typage statique et Tailwind CSS pour le design responsive. authentification utilisateur et gestion des données avec NextAuth, Prisma et une base de données PostgreSQL.",
          link: "https://github.com/hadrienvinay/SuriSpace",
          image: "/blog.png",
          imageTitle: "Capture d'écran du blog personnel",
          image2: "/bdd.png",
          image2Title: "Schéma de la base de données",
          createdAt: new Date('2026-01-15'),

        },
        {
          title: "Sudoku Solver",
          resume: "Création et résolution de Sudoku en C",
          content: "Permet de créer et de résoudre des grilles de Sudoku de différentes difficultés. Interface utilisateur simple avec pour le moment une saisie manuele des grilles dans le code source (premières lignes du fichier main.c). ",
          content2: "Peut être amélioré en utilisant des algorithmes de backtracking pour trouver la solution optimale plus rapidement et en ajoutant une interface graphique pour une meilleure expérience utilisateur. Pour le moment le rendu est dans le terminal. Je pense le refaire avec comme input une image prise en photo d'une grille de Sudoku et utiliser la reconnaissance d'image pour extraire la grille automatiquement.",
          link: "https://github.com/hadrienvinay/sudoku",
          image: "/sudoku1.png",
          imageTitle: "Capture d'écran du solveur Sudoku - Initialisation",
          image2: "/sudoku2.png",
          image2Title: "Fin de la résolution du Sudoku",
          createdAt: new Date('2019-05-20'),

        },
        {
          title: "Projet Kolibri",
          resume: "Site de mise en relation entre producteurs locaux et covoitureurs.",
          content: "Site internet développé avec le framework Symfony dans le cadre d'un projet d'école. Le site inclut une page d'accueil, une gestion des connexions et des utilisateurs, ainsi qu'une base de données PostgreSQL. Le producteur peut poster ses produits disponibles et les covoitureurs peuvent réserver des créneaux pour récupérer leurs commandes tout en étant rémunérés pour le trajet effectué.",
          link: "https://github.com/hadrienvinay/Kolibri",
          image: "/kolibri.png",
          imageTitle: "Capture d'écran du projet Kolibri",
          createdAt: new Date('2018-03-10'),
        },

      ],
    },

  },
 
];

const linkData =  [
  {
    title: "Cercle Aristote",
    description: "Association et éducation populaire",
    image: "/default.png",
    tag: "Education, Politique",
    link: "https://www.youtube.com/@CercleAristote"
  },
  {
    title: "Pierre Jovanovic",
    description: "Journalisate économique",
    image: "/default.png",
    tag: "Economie",
    link: "https://lejardindeslivres.fr/integrales.htm"
  },
  {
    title: "Balade Mentale",
    description: "Vulgarisateur scientifique",
    image: "/default.png",
    tag: "Education, Sciences",
    link: "https://www.youtube.com/@BaladeMentale"
  },
  {
    title: "Science Etonnnante",
    description: "Vulgarisateur scientifique",
    image: "/default.png",
    tag: "Education, Sciences",
    link: "https://www.youtube.com/@ScienceEtonnante"
  },
  {
    title: "Elucid",
    description: "Interview, articles économie, société, politique ",
    image: "/default.png",
    tag: "Education, Economie",
    link: "https://www.elucid-media.fr"
  },
  {
    title: "Idriss Aberkane",
    description: "Conférencier, Journaliste indépendant",
    image: "/default.png",
    tag: "Education, Actualité, Sciences",
    link: "https://www.youtube.com/@ScienceEtonnante"
  },
  {
    title: "3Blue1Brown",
    description: "Vulgarisation Mathématiques",
    image: "/default.png",
    tag: "Education, Mathématiques",
    link: "https://www.youtube.com/@3Blue1Brown"
  },
  {
    title: "Aurélien Barrau",
    description: "Professeur, chercheur",
    image: "/default.png",
    tag: "Education, Sciences",
    link: "https://www.youtube.com/@AurelienBarrau"
  },
  {
    title: "Jean Pierre Petit",
    description: "Scientifique",
    image: "/default.png",
    tag: "Education, Inventeur",
    link: "https://www.youtube.com/@JPPEtit"
  },
  {
    title: "Bataille de France",
    description: "Vulgarisation historique",
    image: "/default.png",
    tag: "Education, Histoire",
    link: "https://www.youtube.com/@ScienceEtonnante"
  },
  {
    title: "Hugo Lisoir",
    description: "Actualisté spatiale",
    image: "/default.png",
    tag: "Actualité, Espace",
    link: "https://www.youtube.com/@ScienceEtonnante"
  },
  {
    title: "Charles Gave",
    description: "Vulgarisateur scientifique",
    image: "/default.png",
    tag: "Economie, Education",
    link: "https://www.youtube.com/@ScienceEtonnante"
  },
  {
    title: "Juan Branco",
    description: "Avocat, défenseur des liberté",
    image: "/default.png",
    tag: "Droit, Défense",
    link: "https://www.youtube.com/@ScienceEtonnante"
  },
  {
    title: "Veridis Project",
    description: "Musique, remix et composition",
    image: "/default.png",
    tag: "Musique",
    link: "https://www.youtube.com/@VeridisProject"
  },
  {
    title: "Tocsin",
    description: "Radio citoyenne",
    image: "/default.png",
    tag: "Journalisme, Actualité",
    link: "https://www.youtube.com/@Tocsin"
  },


];

const actionsData: Prisma.ActionCreateInput[] = [
  {
    name: "ABC ARBITRAGE",
    ticker: "ABCA.PA",
    price: 5.55,
    purchasePrice: 5.39,
    quantity: 93,
    pe: 0,
    where: "PEA"
  },
  {
    name: "AIR FRANCE KLM",
    ticker: "AF.PA",
    price: 12.055,
    purchasePrice: 11.76,
    quantity: 15,
    pe: 0,
    where: "PEA"

  },
  {
    name: "AIRBUS",
    ticker: "AIR.PA",
    price: 191.30,
    purchasePrice: 195.57,
    quantity: 3,
    pe: 0,
    where: "PEA"
  },
  {
    name: "ArcelorMittal",
    ticker: "MT.PA",
    price: 51.2,
    purchasePrice: 30.28,
    quantity: 10,
    pe: 0,
    where: "PEA"
  },
  {
    name: "AXA",
    ticker: "CS.PA",
    price: 39.66,
    purchasePrice: 40.11,
    quantity: 4,
    pe: 0,
    where: "PEA"
  },
  {
    name: "BNP PARIBAS",
    ticker: "BNP.PA",
    price: 79.61,
    purchasePrice: 93.18,
    quantity: 3,
    pe: 0,
    where: "PEA"
  },
  {
    name: "CARBIOS",
    ticker: "ALCRB.PA",
    price: 9.85,
    purchasePrice: 11.919,
    quantity: 15,
    pe: 0,
    where: "PEA"
  },
    {
    name: "CROSSJECT",
    ticker: "ALCJ.PA",
    price: 2.03,
    purchasePrice: 2.32,
    quantity: 40,
    pe: 0,
    where: "PEA"
  },
    {
    name: "DASSAULT SYSTEMES",
    ticker: "DSY.PA",
    price: 22.25,
    purchasePrice: 25.41,
    quantity: 18,
    pe: 0,
    where: "PEA"
  },
    {
    name: "EIFFAGE",
    ticker: "FGR.PA",
    price: 134.3,
    purchasePrice: 110.99,
    quantity: 2,
    pe: 0,
    where: "PEA"
  },
    {
    name: "ELECTRICITE DE STRASBOURG",
    ticker: "ELEC.PA",
    price: 220,
    purchasePrice: 164,
    quantity: 3,
    pe: 0,
    where: "PEA"
  },
  {
    name: "ENGIE",
    ticker: "ENGI.PA",
    price: 25.7,
    purchasePrice: 18.34,
    quantity: 28,
    pe: 0,
    where: "PEA"
  },
  {
    name: "EUTELSAT COMMUNICATION",
    ticker: "ETL.PA",
    price: 2.105,
    purchasePrice: 2.356,
    quantity: 150,
    pe: 0,
    where: "PEA"
  },
  {
    name: "FRANCAISE ENERGIE",
    ticker: "FDE.PA",
    price: 34.05,
    purchasePrice: 33.97,
    quantity: 4,
    pe: 0,
    where: "PEA"
  },
  {
    name: "GAZTRANSPORT TECHNIGAZ",
    ticker: "GTT.PA",
    price: 177,
    purchasePrice: 157.9,
    quantity: 2,
    pe: 0,
    where: "PEA"
  },
    {
    name: "MICHELIN",
    ticker: "ML.PA",
    price: 32.98,
    purchasePrice: 31.14,
    quantity: 5,
    pe: 0,
    where: "PEA"
  },
    {
    name: "ORANGE",
    ticker: "ORA.PA",
    price: 16.5,
    purchasePrice: 13.929,
    quantity: 10,
    pe: 0,
    where: "PEA"
  },
    {
    name: "SAFRAN",
    ticker: "SAF.PA",
    price: 308,
    purchasePrice: 302.6,
    quantity: 2,
    pe: 0,
    where: "PEA"
  },
    {
    name: "STMICROELECTRONICS",
    ticker: "STMPA.PA",
    price: 24.89,
    purchasePrice: 23.84,
    quantity: 11,
    pe: 0,
    where: "PEA"
  },
  {
    name: "VALLOUREC",
    ticker: "VK.PA",
    price: 18.52,
    purchasePrice: 15.77,
    quantity: 5,
    pe: 0,
    where: "PEA"
  },
  {
    name: "VICAT",
    ticker: "VCT.PA",
    price: 76.4,
    purchasePrice: 61.6,
    quantity: 2,
    pe: 0,
    where: "PEA"
  },
  {
    name: "CAIXABANK",
    ticker: "CABK.MC",
    price: 10.87,
    purchasePrice: 8.7,
    quantity: 15,
    pe: 0,
    where: "PEA"
  },
  {
    name: "INTESA SANPAOLO",
    ticker: "ISP.MI",
    price: 5.97,
    purchasePrice: 5.5,
    quantity: 38,
    pe: 0,
    where: "PEA"
  },
    {
    name: "LEONARDO",
    ticker: "LDO.MI",
    price: 53.2,
    purchasePrice: 53.38,
    quantity: 5,
    pe: 0,
    where: "PEA"
  },
    {
    name: "SIEMENS AG",
    ticker: "SIE.DE",
    price: 250.5,
    purchasePrice: 247.33,
    quantity: 5,
    pe: 0,
    where: "PEA"
  },
    {
    name: "PEA EMERG AMUNDI",
    ticker: "PLEM",
    price: 22.104,
    purchasePrice: 21.331,
    quantity: 15,
    pe: 0,
    where: "PEA"
  },
   {
    name: "PEA MSCI AMUNDI",
    ticker: "PAEEM",
    price: 31,
    purchasePrice: 30.582,
    quantity: 30,
    pe: 0,
    where: "PEA"
  },
  {
    name: "PEA MSCI WORLD AMUNDI",
    ticker: "CW8U",
    price: 724.34,
    purchasePrice: 693.62,
    quantity: 2,
    pe: 0,
    where: "PEA"
  },
    {
    name: "AIR LIQUIDE",
    ticker: "AI.PA",
    price: 167.74,
    purchasePrice: 34.69,
    quantity: 33,
    pe: 0,
    where: "TITRES"
  },
  {
    name: "TOTAL ENERGIES",
    ticker: "TTE.PA",
    price: 62.58,
    purchasePrice: 33.054,
    quantity: 88,
    pe: 0,
    where: "TITRES"
  },
  {
    name: "ARKEMA",
    ticker: "ARKE.PA",
    price: 58,
    purchasePrice: 0,
    quantity: 2,
    pe: 0,
    where: "TITRES"
  },
  {
    name: "HSBC MIX EQUILAD",
    ticker: "HSBC.MC",
    price: 436,
    purchasePrice: 230,
    quantity: 34.889,
    pe: 0,
    where: "AV",
    notes: "FR0007003868 - HSBC MIX EQUILAD - 34.889 titres achetés"
  },
  {
    name: "NUANCE GRENADINE",
    ticker: "CE",
    price: 2635.59,
    purchasePrice: 2000,
    quantity: 1,
    pe: 0,
    where: "AV",
    notes: "Nuances Grenadine CE"
  },
  {
    name: "MILLEVIE PRENIUM",
    ticker: "CE",
    price: 27760,
    purchasePrice: 25500,
    quantity: 1,
    pe: 0,
    where: "AV",
    notes: "Assurance vie Millevie Premium CE, actions et obligations"
  },
  {
    name: "BITCOIN",
    ticker: "BTC-USDT",
    price: 70000,
    purchasePrice: 100000,
    quantity: 0.06,
    pe: 0,
    where: "BINANCE",
    notes: "Bitcoin acheté sur Binance, 0.06 BTC à 100000€ soit 6000€ d'investissement"
  },
    {
    name: "ETHERUM",
    ticker: "ETH-USDT",
    price: 2200,
    purchasePrice: 3000,
    quantity: 1,
    pe: 0,
    where: "BINANCE",
    notes: "Etherum acheté sur Binance, 1 ETH à 3000€ soit 3000€ d'investissement"
  },
  {
    name: "BNP MULTIPLACEMENT AVENIR",
    ticker: "BNP Assurance vie",
    price: 24450,
    purchasePrice: 22000,
    quantity: 1,
    pe: 0,
    where: "AV",
    notes: "Assurance vie BNP Multiplacement Avenir, reparti en fond diversifié, uniquement actions"
  },


];


export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }

    await prisma.link.createMany({
        data: linkData
    });
    await prisma.action.createMany({
        data: actionsData
    });
}

main()
  .catch((e) => {
      console.error('❌ Erreur pendant le seed', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
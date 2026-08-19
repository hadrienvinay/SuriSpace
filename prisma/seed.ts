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
          image2: "/atomes.png",
          image2Title: "Tableau de Mendeleïev",
          createdAt: new Date('2026-01-15'),

        },
        {
          title: "Sudoku Solver",
          resume: "Création et résolution de Sudoku en C",
          content: "Permet de créer et de résoudre des grilles de Sudoku de différentes difficultés. Interface utilisateur simple avec pour le moment une saisie manuele des grilles dans le code source (premières lignes du fichier main.c). ",
          content2: "Peut être amélioré en utilisant des algorithmes de backtracking pour trouver la solution optimale plus rapidement et en ajoutant une interface graphique pour une meilleure expérience utilisateur. Pour le moment le rendu est dans le terminal. Je pense le refaire avec comme input une image prise en photo d'une grille de Sudoku et utiliser la reconnaissance d'image pour extraire la grille automatiquement.",
          link: "https://github.com/hadrienvinay/sudoku",
          image: "/sudoku.png",
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
        {
          title: "Media Controller",
          resume: "Site de création de mix audio ou de vidéos personnalisés",
          content: "Plateforme web permettant de créer des fichiers audio ou vidéos personnalisés.Contient également un outil afin de couvertir un lien Youtube ou Soundcloud en format mp3 téléchargeable. Permet de créer un mix à partir de fichier audio entrant (gestion des transitions, synchronisation des rythmes, gestion de l'ordre des morceaux) ou bien un montage vidéo à partir d'image et de vidéos entrantes.",
          link: 'https://github.com/hadrienvinay/MediaControllerApp',
          image : "/media-controller.png",
          imageTitle: "Capture d'écran de la page d'accueil",
          content2: "On peut également faire un montage vidéo à partir de fichier img ou mp4 entrants et sélectionner la configuration et les options de notre choix. Le fichier sortant est enregistré et peut être télécharger au format mp4.",
          image2 : "/media-controller2.png",
          image2Title: "Capture d'écran de la page de création d'une vidéo",
          createdAt: new Date('2026-02-05'),

        }

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
    link: "https://elucid.media/"
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


const bookData: Prisma.BookCreateManyInput[] = [
  // ── 2021 ──────────────────────────────────────────────────────────
  { title: "L'insoutenable légèreté de l'être", author: "Milan Kundera",            date: "1984", dateRead: "2021-01" },
  { title: "L'immortalité",                      author: "Milan Kundera",            date: "1990", dateRead: "2021-01" },
  { title: "Risibles Amours",                    author: "Milan Kundera",            date: "1969", dateRead: "2021-01" },
  { title: "Le tour du monde en 80 jours",       author: "Jules Verne",              date: "1872", dateRead: "2021-01" },
  { title: "Malevil",                            author: "Barjavel",                 date: "1972", dateRead: "2021-01" },
  { title: "L'écume des jours",                  author: "Boris Vian",               date: "1947", dateRead: "2021-01" },
  { title: "Jonathan Livingston Le Goéland",     author: "Richard Bach",             date: "1970", dateRead: "2021-01" },
  { title: "Nouvelles du Paradis",               author: "David Lodge",              date: "1991", dateRead: "2021-01" },
  { title: "L'enfant de Noé",                    author: "Éric-Emmanuel Schmitt",    date: "2004", dateRead: "2021-01" },
  { title: "Cantique pour les étoiles",          author: "Simon Jimenez",            date: "2021", dateRead: "2021-01" },
  { title: "Arsène Lupin, gentleman cambrioleur",author: "Maurice Leblanc",          date: "1907", dateRead: "2021-01" },
  { title: "La promesse de l'aube",              author: "Romain Gary",              date: "1960", dateRead: "2021-01" },
  { title: "Petit guide de la conscience",       author: "Inconnu",                  date: "",     dateRead: "2021-01" },
  { title: "Une brève histoire de l'avenir",     author: "Jacques Attali",           date: "2006", dateRead: "2021-01" },
  { title: "Les fourmis",                        author: "Bernard Werber",           date: "1991", dateRead: "2021-01" },
  { title: "L'appel de la forêt",                author: "Jack London",              date: "1903", dateRead: "2021-01" },

  // ── 2022 ──────────────────────────────────────────────────────────
  { title: "Comme un roman",                                   author: "Daniel Pennac",              date: "1992", dateRead: "2022-01" },
  { title: "La petite marchande de prose",                     author: "Daniel Pennac",              date: "1989", dateRead: "2022-01" },
  { title: "La Horde du Contrevent",                           author: "Alain Damasio",              date: "2004", dateRead: "2022-01" },
  { title: "La loi du plus faible",                            author: "John Grisham",               date: "1999", dateRead: "2022-01" },
  { title: "Le plan de transformation de l'économie française",author: "Shift Project",              date: "2020", dateRead: "2022-01" },
  { title: "1984",                                             author: "Georges Orwell",             date: "1949", dateRead: "2022-01" },
  { title: "Magellan",                                         author: "Stefan Zweig",               date: "1938", dateRead: "2022-01" },
  { title: "Les particules élémentaires",                      author: "Michel Houellebecq",         date: "1998", dateRead: "2022-01" },
  { title: "Les fourmis (Tome 1 à 3)",                         author: "Bernard Werber",             date: "1991", dateRead: "2022-01" },
  { title: "Diderot, le bonheur de penser",                    author: "Jacques Attali",             date: "2012", dateRead: "2022-01" },
  { title: "Vol de nuit",                                      author: "Antoine de Saint-Exupéry",   date: "1931", dateRead: "2022-01" },
  { title: "Au-delà de l'impossible",                          author: "Didier Van Cauwelaert",      date: "2005", dateRead: "2022-01" },
  { title: "Un aller simple",                                  author: "Didier Van Cauwelaert",      date: "1994", dateRead: "2022-01" },
  { title: "La plume empoisonnée",                             author: "Agatha Christie",            date: "1945", dateRead: "2022-01" },
  { title: "Le bonheur était pour demain",                     author: "Philippe Bihouix",           date: "2014", dateRead: "2022-01" },
  { title: "Un animal doté de raison",                         author: "Inconnu",                    date: "",     dateRead: "2022-01" },
  { title: "Signé la tortue / À vous le plaisir",              author: "James Hadley Chase",         date: "",     dateRead: "2022-01" },

  // ── 2023 ──────────────────────────────────────────────────────────
  { title: "Vernon Subutex (1 et 2)",              author: "Virginie Despentes",        date: "2015", dateRead: "2023-01" },
  { title: "Opuscules sur l'histoire",             author: "Kant",                      date: "1784", dateRead: "2023-01" },
  { title: "Denier du rêve",                       author: "Marguerite Yourcenar",      date: "1934", dateRead: "2023-01" },
  { title: "Life and Times of Michael K",          author: "J. M. Coetzee",             date: "1983", dateRead: "2023-01" },
  { title: "Les Furtifs",                          author: "Alain Damasio",             date: "2019", dateRead: "2023-01" },
  { title: "Le rayon vert",                        author: "Jules Verne",               date: "1882", dateRead: "2023-01" },
  { title: "Ravage",                               author: "René Barjavel",             date: "1943", dateRead: "2023-01" },
  { title: "Les lions du Panshir",                 author: "Ken Follett",               date: "1986", dateRead: "2023-01" },
  { title: "Où est le sens",                       author: "Sébastien Bohler",          date: "2020", dateRead: "2023-01" },
  { title: "Thérapie",                             author: "David Lodge",               date: "1995", dateRead: "2023-01" },
  { title: "L'éloge de la fuite",                  author: "Henri Laborit",             date: "1976", dateRead: "2023-01" },
  { title: "Long Shadows",                         author: "David Baldacci",            date: "2022", dateRead: "2023-01" },
  { title: "Voir",                                 author: "Carlos Castaneda",          date: "1974", dateRead: "2023-01" },
  { title: "007: Bons baisers de Russie",          author: "Ian Fleming",               date: "1957", dateRead: "2023-01" },
  { title: "Journal d'un apprenti chaman",         author: "Corine Sombrun",            date: "2002", dateRead: "2023-01" },
  { title: "Terre des Hommes",                     author: "Antoine de Saint-Exupéry",  date: "1939", dateRead: "2023-01" },
  { title: "Jung",                                 author: "Frédéric Lenoir",           date: "2017", dateRead: "2023-01" },
  { title: "La légende",                           author: "David Gemmell",             date: "1984", dateRead: "2023-01" },
  { title: "La Zone du dehors",                    author: "Alain Damasio",             date: "1999", dateRead: "2023-01" },
  { title: "Sciences de l'âme",                    author: "André Dumas",               date: "",     dateRead: "2023-01" },
  { title: "Sur la route du papier",               author: "Erik Orsenna",              date: "2012", dateRead: "2023-01" },
  { title: "Cœur et âme",                          author: "Frank Conroy",              date: "1993", dateRead: "2023-01" },
  { title: "Mémoires d'Hadrien",                   author: "Marguerite Yourcenar",      date: "1951", dateRead: "2023-01" },
  { title: "J'irai nager dans plus de rivières",   author: "Philippe Labro",            date: "",     dateRead: "2023-01" },

  // ── 2024 ──────────────────────────────────────────────────────────
  { title: "La Métamorphose",                           author: "Franz Kafka",             date: "1915", dateRead: "2024-01" },
  { title: "Le labyrinthe des égarés",                  author: "Amin Maalouf",            date: "2023", dateRead: "2024-01" },
  { title: "Un voyant à la recherche du temps futur",   author: "Belline",                 date: "",     dateRead: "2024-01" },
  { title: "Les gens de la nuit",                       author: "Michel Déon",             date: "1975", dateRead: "2024-01" },
  { title: "Recherche Scientifique: un naufrage mondial",author: "Jean-Pierre Petit",      date: "",     dateRead: "2024-01" },
  { title: "Eutopia",                                   author: "Camille Leboulanger",     date: "2022", dateRead: "2024-01" },
  { title: "La pensée de Dieu",                         author: "Igor Bogdanov",           date: "",     dateRead: "2024-01" },
  { title: "Flash",                                     author: "Inconnu",                 date: "",     dateRead: "2024-01" },
  { title: "Le choc des générations",                   author: "Inconnu",                 date: "",     dateRead: "2024-01" },
  { title: "Le sursaut",                                author: "Franz-Olivier Giesbert",  date: "2024", dateRead: "2024-01" },
  { title: "Da Vinci Code",                             author: "Dan Brown",               date: "2003", dateRead: "2024-01" },

  // ── 2025 ──────────────────────────────────────────────────────────
  { title: "Biographie Napoléon III",                    author: "Pierre Milza",                     date: "",     dateRead: "2025-01" },
  { title: "Le grand livre des coïncidences",            author: "Paul Kammerer",                    date: "1919", dateRead: "2025-01" },
  { title: "888",                                        author: "Pierre Jovanovic",                 date: "",     dateRead: "2025-01" },
  { title: "Problème à trois corps",                     author: "Liu Cixin",                        date: "2008", dateRead: "2025-01" },
  { title: "Les chiens de Riga",                         author: "Henning Mankell",                  date: "1992", dateRead: "2025-01" },
  { title: "La radiesthésie",                            author: "Inconnu",                          date: "",     dateRead: "2025-01" },
  { title: "La muraille de lave",                        author: "Arnaldur Indridason",              date: "2012", dateRead: "2025-01" },
  { title: "Pourquoi les méduses ne vieillissent pas",   author: "Nicklas Brenberg",                 date: "2013", dateRead: "2025-01" },
  { title: "Récits d'un voyageur de l'astral",           author: "Anne Givaudan, Daniel Meurois",    date: "1987", dateRead: "2025-01" },
  { title: "Je vais mieux",                              author: "David Foenkinos",                  date: "2013", dateRead: "2025-01" },
  { title: "Ainsi parlait Zarathoustra",                 author: "Friedrich Nietzsche",              date: "1883", dateRead: "2025-01" },
  { title: "La condition humaine",                       author: "André Malraux",                    date: "1933", dateRead: "2025-01" },
  { title: "Le médecin de campagne",                     author: "Honoré de Balzac",                 date: "1833", dateRead: "2025-01" },
  { title: "La chartreuse de Parme",                     author: "Stendhal",                         date: "1839", dateRead: "2025-01" },
  { title: "Quatre-Vingt-Treize",                        author: "Victor Hugo",                      date: "1874", dateRead: "2025-01" },
  { title: "Quand la machine apprend",                   author: "Yann LeCun",                       date: "2019", dateRead: "2025-01" },
  { title: "Récits de voyage",                           author: "Guy de Maupassant",                date: "",     dateRead: "2025-01" },
  { title: "Histoire secrète de la conquête spatiale",   author: "Stéphane Koechlin",                date: "2019", dateRead: "2025-01" },
  { title: "La partie et le tout",                       author: "Werner Heisenberg",                date: "1969", dateRead: "2025-01" },

  // ── 2026 ──────────────────────────────────────────────────────────
  { title: "L'argent",                           author: "Émile Zola",                    date: "1891", dateRead: "2026-01" },
  { title: "Lettre à Ménécée",                   author: "Épicure",                       date: "-300", dateRead: "2026-01" },
  { title: "Le manifeste du parti communiste",   author: "Karl Marx",                     date: "1848", dateRead: "2026-01" },
  { title: "Au pays de l'or noir",               author: "Philippe Pétriat",              date: "",     dateRead: "2026-01" },
  { title: "La guerre des mondes",               author: "H. G. Wells",                   date: "1898", dateRead: "2026-01" },
  { title: "Technique du coup d'état",           author: "Curzio Malaparte",              date: "1931", dateRead: "2026-01" },
  { title: "Crime et Châtiment",                 author: "Fiodor Dostoïevski",            date: "1866", dateRead: "2026-01" },
  { title: "La dernière frontière",              author: "Volodia Petropavlovsky",         date: "",     dateRead: "2026-01" },
  { title: "Investir en Bourse avec succès",     author: "Didier Vitrac",                 date: "",     dateRead: "2026-01" },
  { title: "Du contrat social",                  author: "Jean-Jacques Rousseau",         date: "1762", dateRead: "2026-01" },
  { title: "Un million de révolutions tranquilles", author: "Bénédicte Manier",           date: "2012", dateRead: "2026-01" },
  { title: "Propos sur les pouvoirs",            author: "Alain",                         date: "1925", dateRead: "2026-01" },
  { title: "T-REX",                              author: "Douglas Preston",               date: "",     dateRead: "2026-01" },
  { title: "Si Einstein avait su",               author: "Alain Aspect",                  date: "",     dateRead: "2026-01" },
  { title: "Libérer votre cerveau",              author: "Idriss Aberkane",               date: "2016", dateRead: "2026-01" },
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
    await prisma.book.createMany({
        data: bookData,
        skipDuplicates: true,
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
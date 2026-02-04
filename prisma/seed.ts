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

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
  
    await prisma.link.createMany({
        data: linkData
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
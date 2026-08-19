export interface Citation {
  texte: string;
  auteur: string;
  ouvrage: string;
  date: string;
}

const citations: Citation[] = [
  {
    texte: "Pour découvrir les meilleures règles de société qui conviennent aux nations, il faudrait une intelligence supérieure qui vît toutes les passions des hommes et qui n'en éprouvât aucune.",
    auteur: 'Rousseau',
    ouvrage: 'Du contrat social',
    date: '1762',
  },
  {
    texte: "Le doute est le commencement de la sagesse.",
    auteur: 'Aristote',
    ouvrage: 'Métaphysique',
    date: 'IVe siècle av. J.-C.',
  },
  {
    texte: "L'imagination est plus importante que le savoir.",
    auteur: 'Albert Einstein',
    ouvrage: 'Sur la science',
    date: '1929',
  },
  {
    texte: "Je pense, donc je suis.",
    auteur: 'René Descartes',
    ouvrage: 'Discours de la méthode',
    date: '1637',
  },
  {
    texte: "La simplicité est la sophistication suprême.",
    auteur: 'Léonard de Vinci',
    ouvrage: 'Carnets',
    date: 'XVe siècle',
  },
  {
    texte: "Ce qui ne me tue pas me rend plus fort.",
    auteur: 'Friedrich Nietzsche',
    ouvrage: 'Le Crépuscule des idoles',
    date: '1888',
  },
  {
    texte: "La vie sans examen ne vaut pas la peine d'être vécue.",
    auteur: 'Socrate',
    ouvrage: 'Apologie de Socrate (Platon)',
    date: 'Ve siècle av. J.-C.',
  },
  {
    texte: "Le hasard ne favorise que les esprits préparés.",
    auteur: 'Louis Pasteur',
    ouvrage: 'Discours à l\'Université de Lille',
    date: '1854',
  },
  {
    texte: "Deux choses sont infinies : l'univers et la bêtise humaine ; en ce qui concerne l'univers, je n'en ai pas encore acquis la certitude absolue.",
    auteur: 'Albert Einstein',
    ouvrage: 'Attribué',
    date: 'XXe siècle',
  },
  {
    texte: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
    auteur: 'Antoine de Saint-Exupéry',
    ouvrage: 'Le Petit Prince',
    date: '1943',
  },
  {
    texte: "Le silence éternel de ces espaces infinis m'effraie.",
    auteur: 'Blaise Pascal',
    ouvrage: 'Pensées',
    date: '1670',
  },
  {
    texte: "Rien ne se perd, rien ne se crée, tout se transforme.",
    auteur: 'Antoine Lavoisier',
    ouvrage: 'Traité élémentaire de chimie',
    date: '1789',
  },
  {
    texte: "L'homme est né libre, et partout il est dans les fers.",
    auteur: 'Rousseau',
    ouvrage: 'Du contrat social',
    date: '1762',
  },
  {
    texte: "Connais-toi toi-même.",
    auteur: 'Socrate',
    ouvrage: 'Inscription du temple de Delphes',
    date: 'Ve siècle av. J.-C.',
  },
  {
    texte: "Il n'y a qu'un héroïsme au monde : c'est de voir le monde tel qu'il est, et de l'aimer.",
    auteur: 'Romain Rolland',
    ouvrage: 'Vie de Michel-Ange',
    date: '1907',
  },
  {
    texte: "La nature ne fait rien en vain.",
    auteur: 'Aristote',
    ouvrage: 'Politique',
    date: 'IVe siècle av. J.-C.',
  },
  {
    texte: "Celui qui déplace une montagne commence par déplacer de petites pierres.",
    auteur: 'Confucius',
    ouvrage: 'Entretiens',
    date: 'Ve siècle av. J.-C.',
  },
  {
    texte: "Si j'ai vu plus loin, c'est en montant sur les épaules de géants.",
    auteur: 'Isaac Newton',
    ouvrage: 'Lettre à Robert Hooke',
    date: '1675',
  },
  {
    texte: "La folie, c'est de faire toujours la même chose et de s'attendre à un résultat différent.",
    auteur: 'Albert Einstein',
    ouvrage: 'Attribué',
    date: 'XXe siècle',
  },
  {
    texte: "Il faut imaginer Sisyphe heureux.",
    auteur: 'Albert Camus',
    ouvrage: 'Le Mythe de Sisyphe',
    date: '1942',
  },
  {
    texte: "Tout ce que je sais, c'est que je ne sais rien.",
    auteur: 'Socrate',
    ouvrage: 'Apologie de Socrate (Platon)',
    date: 'Ve siècle av. J.-C.',
  },
  {
    texte: "Le cœur a ses raisons que la raison ne connaît point.",
    auteur: 'Blaise Pascal',
    ouvrage: 'Pensées',
    date: '1670',
  },
  {
    texte: "Science sans conscience n'est que ruine de l'âme.",
    auteur: 'François Rabelais',
    ouvrage: 'Pantagruel',
    date: '1532',
  },
  {
    texte: "L'essentiel n'est pas de vivre, mais de bien vivre.",
    auteur: 'Platon',
    ouvrage: 'Criton',
    date: 'Ve siècle av. J.-C.',
  },
  {
    texte: "La liberté des uns s'arrête là où commence celle des autres.",
    auteur: 'John Stuart Mill',
    ouvrage: 'De la liberté',
    date: '1859',
  },
  {
    texte: "On résiste à l'invasion des armées ; on ne résiste pas à l'invasion des idées.",
    auteur: 'Victor Hugo',
    ouvrage: 'Histoire d\'un crime',
    date: '1852',
  },
  {
    texte: "L'homme n'est qu'un roseau, le plus faible de la nature ; mais c'est un roseau pensant.",
    auteur: 'Blaise Pascal',
    ouvrage: 'Pensées',
    date: '1670',
  },
  {
    texte: "L'habitude est une seconde nature.",
    auteur: 'Aristote',
    ouvrage: 'Éthique à Nicomaque',
    date: 'IVe siècle av. J.-C.',
  },
  {
    texte: "Nous sommes ce que nous faisons de manière répétée. L'excellence n'est donc pas un acte, mais une habitude.",
    auteur: 'Aristote',
    ouvrage: 'Éthique à Nicomaque',
    date: 'IVe siècle av. J.-C.',
  },
  {
    texte: "Il n'est pas de vent favorable pour celui qui ne sait pas où il va.",
    auteur: 'Sénèque',
    ouvrage: 'Lettres à Lucilius',
    date: 'Ier siècle',
  },
  {
    texte: "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.",
    auteur: 'Confucius',
    ouvrage: 'Entretiens',
    date: 'Ve siècle av. J.-C.',
  },
  {
    texte: "Deviens ce que tu es.",
    auteur: 'Friedrich Nietzsche',
    ouvrage: 'Ainsi parlait Zarathoustra',
    date: '1883',
  },
  {
    texte: "L'univers n'est pas seulement plus étrange que nous le supposons, il est plus étrange que nous ne pouvons le supposer.",
    auteur: 'J.B.S. Haldane',
    ouvrage: 'Possible Worlds',
    date: '1927',
  },
  {
    texte: "La mesure de l'intelligence est la capacité de changer.",
    auteur: 'Albert Einstein',
    ouvrage: 'Attribué',
    date: 'XXe siècle',
  },
  {
    texte: "Le bonheur n'est pas quelque chose de tout fait. Il vient de vos propres actions.",
    auteur: 'Dalaï-Lama',
    ouvrage: 'L\'Art du bonheur',
    date: '1998',
  },
  {
    texte: "Vis comme si tu devais mourir demain. Apprends comme si tu devais vivre toujours.",
    auteur: 'Gandhi',
    ouvrage: 'Attribué',
    date: 'XXe siècle',
  },
  {
    texte: "Le vrai voyage de découverte ne consiste pas à chercher de nouveaux paysages, mais à avoir de nouveaux yeux.",
    auteur: 'Marcel Proust',
    ouvrage: 'À la recherche du temps perdu',
    date: '1923',
  },
  {
    texte: "Agis de telle sorte que la maxime de ta volonté puisse toujours valoir en même temps comme principe d'une législation universelle.",
    auteur: 'Emmanuel Kant',
    ouvrage: 'Critique de la raison pratique',
    date: '1788',
  },
  {
    texte: "L'enfer, c'est les autres.",
    auteur: 'Jean-Paul Sartre',
    ouvrage: 'Huis clos',
    date: '1944',
  },
  {
    texte: "Qui contrôle le passé contrôle le futur. Qui contrôle le présent contrôle le passé.",
    auteur: 'George Orwell',
    ouvrage: '1984',
    date: '1949',
  },
  {
    texte: "La beauté sauvera le monde.",
    auteur: 'Fiodor Dostoïevski',
    ouvrage: 'L\'Idiot',
    date: '1869',
  },
  {
    texte: "On ne naît pas femme, on le devient.",
    auteur: 'Simone de Beauvoir',
    ouvrage: 'Le Deuxième Sexe',
    date: '1949',
  },
  {
    texte: "Heureux qui, comme Ulysse, a fait un beau voyage.",
    auteur: 'Joachim du Bellay',
    ouvrage: 'Les Regrets',
    date: '1558',
  },
  {
    texte: "Eurêka !",
    auteur: 'Archimède',
    ouvrage: 'Attribué',
    date: 'IIIe siècle av. J.-C.',
  },
  {
    texte: "L'important dans la vie n'est point le triomphe, mais le combat ; l'essentiel, ce n'est pas d'avoir vaincu, mais de s'être bien battu.",
    auteur: 'Pierre de Coubertin',
    ouvrage: 'Discours aux Jeux olympiques',
    date: '1908',
  },
  {
    texte: "Peu importe si le début paraît petit.",
    auteur: 'Henry David Thoreau',
    ouvrage: 'Walden',
    date: '1854',
  },
  {
    texte: "La curiosité est le moteur de l'accomplissement.",
    auteur: 'Ken Robinson',
    ouvrage: 'L\'Élément',
    date: '2009',
  },
  {
    texte: "Ose savoir.",
    auteur: 'Emmanuel Kant',
    ouvrage: 'Qu\'est-ce que les Lumières ?',
    date: '1784',
  },
  {
    texte: "Nous ne voyons pas les choses telles qu'elles sont, nous les voyons telles que nous sommes.",
    auteur: 'Anaïs Nin',
    ouvrage: 'Seduction of the Minotaur',
    date: '1961',
  },
  {
    texte: "La terre est le berceau de l'humanité, mais on ne passe pas sa vie entière dans un berceau.",
    auteur: 'Constantin Tsiolkovski',
    ouvrage: 'Lettre',
    date: '1911',
  },

  // ── Amour ─────────────────────────────────────────────────────────────
  {
    texte: "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction.",
    auteur: 'Antoine de Saint-Exupéry',
    ouvrage: 'Terre des hommes',
    date: '1939',
  },
  {
    texte: "Il n'y a qu'un bonheur dans la vie, c'est d'aimer et d'être aimé.",
    auteur: 'George Sand',
    ouvrage: 'Correspondance',
    date: '1862',
  },
  {
    texte: "Aimer quelqu'un, c'est lui laisser toutes les possibilités d'être lui-même.",
    auteur: 'Antoine de Saint-Exupéry',
    ouvrage: 'Citadelle',
    date: '1948',
  },
  {
    texte: "L'amour ne se voit pas avec les yeux, mais avec l'esprit.",
    auteur: 'William Shakespeare',
    ouvrage: 'Le Songe d\'une nuit d\'été',
    date: '1595',
  },
  {
    texte: "Où il y a de l'amour, il y a de la vie.",
    auteur: 'Gandhi',
    ouvrage: 'Attribué',
    date: 'XXe siècle',
  },
  {
    texte: "Il n'y a pas de plus belle preuve d'amour que la confiance.",
    auteur: 'Marceline Desbordes-Valmore',
    ouvrage: 'Attribué',
    date: 'XIXe siècle',
  },
  {
    texte: "Vivre sans aimer n'est pas proprement vivre.",
    auteur: 'Molière',
    ouvrage: 'Dom Garcie de Navarre',
    date: '1661',
  },
  {
    texte: "L'amour est la seule chose qui grandit quand elle est partagée.",
    auteur: 'Antoine de Saint-Exupéry',
    ouvrage: 'Attribué',
    date: 'XXe siècle',
  },
  {
    texte: "Aimer, c'est agir.",
    auteur: 'Victor Hugo',
    ouvrage: 'Les Misérables',
    date: '1862',
  },
  {
    texte: "On n'aime que ce qu'on ne possède pas tout entier.",
    auteur: 'Marcel Proust',
    ouvrage: 'À la recherche du temps perdu',
    date: '1913',
  },

  // ── Beauté du monde ──────────────────────────────────────────────────
  {
    texte: "Le monde ne sera sauvé que par la beauté.",
    auteur: 'Fiodor Dostoïevski',
    ouvrage: 'L\'Idiot',
    date: '1869',
  },
  {
    texte: "Il faut avoir un chaos en soi pour accoucher d'une étoile qui danse.",
    auteur: 'Friedrich Nietzsche',
    ouvrage: 'Ainsi parlait Zarathoustra',
    date: '1883',
  },
  {
    texte: "La nature est un temple où de vivants piliers laissent parfois sortir de confuses paroles.",
    auteur: 'Charles Baudelaire',
    ouvrage: 'Les Fleurs du mal',
    date: '1857',
  },
  {
    texte: "Le beau est ce qui plaît universellement sans concept.",
    auteur: 'Emmanuel Kant',
    ouvrage: 'Critique de la faculté de juger',
    date: '1790',
  },
  {
    texte: "Il y a toujours de la beauté dans ce qui est simple.",
    auteur: 'Bouddha',
    ouvrage: 'Attribué',
    date: 'Ve siècle av. J.-C.',
  },
  {
    texte: "La beauté est une promesse de bonheur.",
    auteur: 'Stendhal',
    ouvrage: 'De l\'amour',
    date: '1822',
  },
  {
    texte: "Le ciel étoilé au-dessus de moi et la loi morale en moi.",
    auteur: 'Emmanuel Kant',
    ouvrage: 'Critique de la raison pratique',
    date: '1788',
  },
  {
    texte: "Regarde le ciel : il en dit plus sur ce que nous sommes que tous les livres réunis.",
    auteur: 'Hubert Reeves',
    ouvrage: 'Poussières d\'étoiles',
    date: '1984',
  },
  {
    texte: "Nous sommes faits de poussières d'étoiles.",
    auteur: 'Carl Sagan',
    ouvrage: 'Cosmos',
    date: '1980',
  },
  {
    texte: "La beauté sera convulsive ou ne sera pas.",
    auteur: 'André Breton',
    ouvrage: 'Nadja',
    date: '1928',
  },
  {
    texte: "Il n'est pas nécessaire de comprendre les choses pour en discuter, mais il n'est pas nécessaire non plus de les voir pour les trouver belles.",
    auteur: 'Vincent van Gogh',
    ouvrage: 'Correspondance',
    date: '1888',
  },

  // ── Philosophie ──────────────────────────────────────────────────────
  {
    texte: "L'homme est condamné à être libre.",
    auteur: 'Jean-Paul Sartre',
    ouvrage: 'L\'Être et le Néant',
    date: '1943',
  },
  {
    texte: "On ne se baigne jamais deux fois dans le même fleuve.",
    auteur: 'Héraclite',
    ouvrage: 'Fragments',
    date: 'VIe siècle av. J.-C.',
  },
  {
    texte: "Le bonheur est le sens et le but de la vie, le but et la fin de l'existence humaine.",
    auteur: 'Aristote',
    ouvrage: 'Éthique à Nicomaque',
    date: 'IVe siècle av. J.-C.',
  },
  {
    texte: "La mort n'est rien pour nous, car tant que nous sommes, elle n'est pas, et lorsqu'elle est là, nous ne sommes plus.",
    auteur: 'Épicure',
    ouvrage: 'Lettre à Ménécée',
    date: 'IIIe siècle av. J.-C.',
  },
  {
    texte: "Ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que nous n'osons pas qu'elles sont difficiles.",
    auteur: 'Sénèque',
    ouvrage: 'Lettres à Lucilius',
    date: 'Ier siècle',
  },
  {
    texte: "L'existence précède l'essence.",
    auteur: 'Jean-Paul Sartre',
    ouvrage: 'L\'Existentialisme est un humanisme',
    date: '1946',
  },
  {
    texte: "Ne cherche pas que les événements arrivent comme tu le veux, mais veuille qu'ils arrivent comme ils arrivent.",
    auteur: 'Épictète',
    ouvrage: 'Manuel',
    date: 'IIe siècle',
  },
  {
    texte: "Le sage est celui qui trouve tout étonnant.",
    auteur: 'Ludwig Wittgenstein',
    ouvrage: 'Tractatus logico-philosophicus',
    date: '1921',
  },
  {
    texte: "L'homme n'est rien d'autre que ce qu'il se fait.",
    auteur: 'Jean-Paul Sartre',
    ouvrage: 'L\'Existentialisme est un humanisme',
    date: '1946',
  },
  {
    texte: "Philosopher, c'est apprendre à mourir.",
    auteur: 'Michel de Montaigne',
    ouvrage: 'Essais',
    date: '1580',
  },
  {
    texte: "Ce que nous savons est une goutte d'eau, ce que nous ignorons est un océan.",
    auteur: 'Isaac Newton',
    ouvrage: 'Attribué',
    date: 'XVIIe siècle',
  },
  {
    texte: "L'homme est une corde tendue entre l'animal et le surhomme, une corde au-dessus d'un abîme.",
    auteur: 'Friedrich Nietzsche',
    ouvrage: 'Ainsi parlait Zarathoustra',
    date: '1883',
  },
  {
    texte: "Notre vie est faite du tissu même de nos rêves.",
    auteur: 'William Shakespeare',
    ouvrage: 'La Tempête',
    date: '1611',
  },
];

/**
 * Retourne la citation du jour basée sur la date.
 * Change automatiquement chaque jour, cycle sur toute la liste.
 */
export function getCitationDuJour(): Citation {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return citations[dayOfYear % citations.length];
}

export default citations;

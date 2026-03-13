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

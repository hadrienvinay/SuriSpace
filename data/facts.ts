// data/facts.ts
import { allElements } from './elements';
import { stars } from './stars';
import { scientists } from './scientists';

export interface Fact {
  text: string;
  source: string;
  category: 'Élément' | 'Étoile' | 'Scientifique';
  href: string;
}

const elementFacts: Fact[] = allElements
  .filter(e => !!e.description)
  .map(e => ({
    text: e.description,
    source: `${e.nameFr} (${e.symbol})`,
    category: 'Élément',
    href: `/atoms/element/${e.symbol.toLowerCase()}`,
  }));

const starFacts: Fact[] = stars
  .filter(s => !!s.description)
  .map(s => ({
    text: s.description,
    source: s.nameFr || s.name,
    category: 'Étoile',
    href: `/space/stars/star/${s.id}`,
  }));

const scientistFacts: Fact[] = scientists
  .filter(s => !!s.shortBio)
  .map(s => ({
    text: s.shortBio,
    source: s.name,
    category: 'Scientifique',
    href: `/sciences/scientists/${s.id}`,
  }));

const facts: Fact[] = [...elementFacts, ...starFacts, ...scientistFacts];

/**
 * Retourne le fait du jour, basé sur la date.
 * Change automatiquement chaque jour, cycle sur toute la liste.
 */
export function getFactDuJour(): Fact {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return facts[dayOfYear % facts.length];
}

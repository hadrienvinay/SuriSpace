import {
  Body,
  Elongation,
  Illumination,
  NextMoonQuarter,
  SearchMoonQuarter,
  SearchMaxElongation,
  SearchRelativeLongitude,
  Seasons,
  Observer,
  Equator,
  Horizon,
  AstroTime,
} from 'astronomy-engine';

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const MONTHS_FR_SHORT = [
  'janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
];

// Noms traditionnels des pleines lunes (selon le mois de la pleine lune)
const FULL_MOON_NAMES = [
  'Lune du Loup',       // janv
  'Lune des Neiges',    // févr
  'Lune du Ver',        // mars
  'Lune Rose',          // avril
  'Lune des Fleurs',    // mai
  'Lune des Fraises',   // juin
  'Lune du Cerf',       // juil
  'Lune de l\'Esturgeon', // août
  'Lune des Moissons',  // sept
  'Lune du Chasseur',   // oct
  'Lune du Castor',     // nov
  'Lune Froide',        // déc
];

const PHASE_INFO = [
  { icon: '🌑', name: 'Nouvelle Lune' },    // quarter 0
  { icon: '🌓', name: 'Premier Quartier' }, // quarter 1
  { icon: '🌕', name: 'Pleine Lune' },      // quarter 2
  { icon: '🌗', name: 'Dernier Quartier' }, // quarter 3
];

export interface MoonPhaseItem {
  icon: string;
  phase: string;
  date: string;
  highlight: boolean;
  name?: string;
  dayNumber: number;
}

export interface PlanetItem {
  name: string;
  symbol: string;
  visibility: string;
  detail: string;
  color: string;
  mag: string;
}

export interface EventItem {
  date: string;
  icon: string;
  text: string;
  dayNumber: number;
}

export function getCurrentMonthInfo(date: Date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  return {
    year,
    month,
    monthName: MONTHS_FR[month],
    monthNameShort: MONTHS_FR_SHORT[month],
    start: new Date(Date.UTC(year, month, 1, 0, 0, 0)),
    end: new Date(Date.UTC(year, month + 1, 1, 0, 0, 0)),
  };
}

function formatDay(date: Date, monthShort: string): string {
  return `${date.getUTCDate()} ${monthShort}`;
}

export function computeMoonPhases(date: Date = new Date()): MoonPhaseItem[] {
  const { month, monthNameShort, start, end } = getCurrentMonthInfo(date);

  // Démarre la recherche quelques jours avant le début du mois pour capturer la 1re phase
  const searchStart = new Date(start.getTime() - 3 * 24 * 3600 * 1000);
  let mq = SearchMoonQuarter(searchStart);
  const phases: MoonPhaseItem[] = [];

  while (mq.time.date < end) {
    if (mq.time.date >= start) {
      const info = PHASE_INFO[mq.quarter];
      const d = mq.time.date;
      const item: MoonPhaseItem = {
        icon: info.icon,
        phase: info.name,
        date: formatDay(d, monthNameShort),
        highlight: mq.quarter === 2, // pleine lune mise en avant
        dayNumber: d.getUTCDate(),
      };
      if (mq.quarter === 2) {
        item.name = FULL_MOON_NAMES[month];
      }
      phases.push(item);
    }
    mq = NextMoonQuarter(mq);
  }

  return phases;
}

const PLANET_DEFS: { body: Body; name: string; symbol: string; color: string; constellation?: string }[] = [
  { body: Body.Mercury, name: 'Mercure', symbol: '☿', color: '#A78BFA' },
  { body: Body.Venus,   name: 'Vénus',   symbol: '♀', color: '#FBBF24' },
  { body: Body.Mars,    name: 'Mars',    symbol: '♂', color: '#F87171' },
  { body: Body.Jupiter, name: 'Jupiter', symbol: '♃', color: '#FB923C' },
  { body: Body.Saturn,  name: 'Saturne', symbol: '♄', color: '#34D399' },
];

// Observateur par défaut : Paris (France)
const PARIS: Observer = new Observer(48.8566, 2.3522, 35);

function planetVisibility(body: Body, refDate: Date): { visibility: string; detail: string } {
  const elong = Elongation(body, refDate);
  const elongDeg = elong.elongation;

  // Trop près du Soleil : invisible
  if (elongDeg < 10) {
    return { visibility: 'Invisible', detail: `Conjonction solaire — perdue dans l'éclat du Soleil (élongation ${elongDeg.toFixed(0)}°)` };
  }

  // Observation au crépuscule astronomique (≈ 1h30 après coucher / avant lever)
  // On teste à minuit local (UTC+1) comme approximation pour la France
  const midnight = new Date(refDate);
  midnight.setUTCHours(23, 0, 0, 0);

  const eq = Equator(body, midnight, PARIS, true, true);
  const hor = Horizon(midnight, PARIS, eq.ra, eq.dec, 'normal');

  let visibility: string;
  const isInferior = body === Body.Mercury || body === Body.Venus;

  if (isInferior) {
    visibility = elong.visibility === 'morning' ? 'Matin' : 'Soir';
  } else {
    // Planètes supérieures : matin si lever après minuit, soir sinon
    // Approximation via la hauteur à minuit
    if (hor.altitude > 15) visibility = 'Nuit';
    else if (hor.altitude > 0) visibility = 'Soir';
    else visibility = 'Matin';
  }

  let detail: string;
  if (visibility === 'Matin') {
    detail = `Visible à l'est avant l'aurore — élongation ${elongDeg.toFixed(0)}° du Soleil`;
  } else if (visibility === 'Soir') {
    detail = `Visible à l'ouest après le coucher du Soleil — élongation ${elongDeg.toFixed(0)}°`;
  } else {
    detail = `Visible une grande partie de la nuit — élongation ${elongDeg.toFixed(0)}°`;
  }

  return { visibility, detail };
}

export function computePlanets(date: Date = new Date()): PlanetItem[] {
  // Utilise le milieu du mois comme date de référence
  const { year, month } = getCurrentMonthInfo(date);
  const mid = new Date(Date.UTC(year, month, 15, 22, 0, 0));

  return PLANET_DEFS.map(def => {
    const illum = Illumination(def.body, mid);
    const { visibility, detail } = planetVisibility(def.body, mid);
    const sign = illum.mag >= 0 ? '+' : '−';
    const mag = `${sign}${Math.abs(illum.mag).toFixed(1).replace('.', ',')}`;
    return {
      name: def.name,
      symbol: def.symbol,
      visibility,
      detail,
      color: def.color,
      mag,
    };
  });
}

export function computeEvents(date: Date = new Date()): EventItem[] {
  const { year, monthNameShort, start, end } = getCurrentMonthInfo(date);
  const events: EventItem[] = [];

  // Phases de la Lune
  const phases = computeMoonPhases(date);
  for (const p of phases) {
    let text = p.phase;
    if (p.name) text += ` « ${p.name} » — meilleure nuit pour observer les objets éclairés`;
    else if (p.phase === 'Nouvelle Lune') text += ' — nuits idéales pour le ciel profond';
    events.push({ date: p.date, icon: p.icon, text, dayNumber: p.dayNumber });
  }

  // Équinoxes / solstices
  const seasons = Seasons(year);
  const seasonalEvents: { time: AstroTime; icon: string; text: string }[] = [
    { time: seasons.mar_equinox,  icon: '🌸', text: 'Équinoxe de printemps — jour et nuit égaux' },
    { time: seasons.jun_solstice, icon: '🌞', text: 'Solstice d\'été — nuit la plus courte' },
    { time: seasons.sep_equinox,  icon: '🍂', text: 'Équinoxe d\'automne' },
    { time: seasons.dec_solstice, icon: '❄️', text: 'Solstice d\'hiver — nuit la plus longue' },
  ];
  for (const s of seasonalEvents) {
    const d = s.time.date;
    if (d >= start && d < end) {
      events.push({
        date: formatDay(d, monthNameShort),
        icon: s.icon,
        text: s.text,
        dayNumber: d.getUTCDate(),
      });
    }
  }

  // Élongations max Mercure / Vénus
  for (const body of [Body.Mercury, Body.Venus]) {
    try {
      const search = new Date(start.getTime() - 40 * 24 * 3600 * 1000);
      let ev = SearchMaxElongation(body, search);
      while (ev.time.date < end) {
        if (ev.time.date >= start) {
          const d = ev.time.date;
          const name = body === Body.Mercury ? 'Mercure' : 'Vénus';
          const symbol = body === Body.Mercury ? '☿' : '♀';
          const dir = ev.visibility === 'morning' ? 'ouest (matin)' : 'est (soir)';
          events.push({
            date: formatDay(d, monthNameShort),
            icon: symbol,
            text: `Élongation maximale de ${name} — ${ev.elongation.toFixed(1)}° du Soleil, visible le ${dir}`,
            dayNumber: d.getUTCDate(),
          });
        }
        ev = SearchMaxElongation(body, ev.time.AddDays(1));
      }
    } catch {
      // ignore
    }
  }

  // Oppositions des planètes supérieures (targetRelLon = 180)
  const superiors: { body: Body; name: string; symbol: string }[] = [
    { body: Body.Mars,    name: 'Mars',    symbol: '♂' },
    { body: Body.Jupiter, name: 'Jupiter', symbol: '♃' },
    { body: Body.Saturn,  name: 'Saturne', symbol: '♄' },
  ];
  for (const s of superiors) {
    try {
      const searchStart = new Date(start.getTime() - 5 * 24 * 3600 * 1000);
      const oppTime = SearchRelativeLongitude(s.body, 180, searchStart);
      const d = oppTime.date;
      if (d >= start && d < end) {
        events.push({
          date: formatDay(d, monthNameShort),
          icon: s.symbol,
          text: `Opposition de ${s.name} — visible toute la nuit, meilleure observation de l'année`,
          dayNumber: d.getUTCDate(),
        });
      }
    } catch {
      // ignore
    }
  }

  // Tri chronologique
  events.sort((a, b) => a.dayNumber - b.dayNumber);
  return events;
}

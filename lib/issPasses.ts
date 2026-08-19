// lib/issPasses.ts
// Calcule les prochains passages visibles à l'œil nu de l'ISS depuis un lieu donné.
import { Body, Equator, Horizon, Observer } from 'astronomy-engine';
import {
  twoline2satrec, propagate, gstime, eciToEcf, ecfToLookAngles,
  sunPos, shadowFraction, jday,
  type SatRec,
} from 'satellite.js';
import { PARIS } from './ephemerides';

export interface IssPass {
  start: string;         // ISO
  maxElevationTime: string; // ISO
  maxElevationDeg: number;
  end: string;            // ISO
  durationSec: number;
  direction: string;      // point cardinal au moment du maximum
}

const MIN_ELEVATION_DEG = 10;
const SUN_ALTITUDE_DARK_THRESHOLD = -6; // crépuscule civil ou plus sombre
const STEP_SECONDS = 15;

const COMPASS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
function compassFromAzimuth(azDeg: number): string {
  const idx = Math.round(((azDeg % 360) + 360) % 360 / 45) % 8;
  return COMPASS[idx];
}

function sunAltitudeAt(date: Date, observer: Observer): number {
  const eq = Equator(Body.Sun, date, observer, true, true);
  const hor = Horizon(date, observer, eq.ra, eq.dec, 'normal');
  return hor.altitude;
}

interface Sample {
  date: Date;
  elevationDeg: number;
  azimuthDeg: number;
  visible: boolean;
}

function sampleAt(
  satrec: SatRec,
  date: Date,
  observer: Observer,
  observerGeodetic: { longitude: number; latitude: number; height: number },
): Sample | null {
  const pv = propagate(satrec, date);
  if (!pv || !pv.position) return null;

  const gmst = gstime(date);
  const satEcf = eciToEcf(pv.position, gmst);
  const look = ecfToLookAngles(observerGeodetic, satEcf);
  const elevationDeg = (look.elevation * 180) / Math.PI;
  const azimuthDeg = (look.azimuth * 180) / Math.PI;

  if (elevationDeg < MIN_ELEVATION_DEG) {
    return { date, elevationDeg, azimuthDeg, visible: false };
  }

  const jd = jday(date);
  const { rsun } = sunPos(jd);
  const shadow = shadowFraction(rsun, pv.position); // 0 = éclairé, 1 = ombre totale
  const satelliteSunlit = shadow < 0.5;
  const skyDark = sunAltitudeAt(date, observer) < SUN_ALTITUDE_DARK_THRESHOLD;

  return { date, elevationDeg, azimuthDeg, visible: satelliteSunlit && skyDark };
}

/**
 * Calcule les prochains passages visibles de l'ISS depuis un lieu donné (Paris par défaut),
 * en scrutant les fenêtres crépusculaires (autour du lever/coucher du soleil) sur les
 * prochains jours — seule période où l'ISS (éclairée) est visible dans un ciel suffisamment sombre.
 */
export function computeNextIssPasses(
  tleLine1: string,
  tleLine2: string,
  from: Date = new Date(),
  maxPasses: number = 4,
  horizonDays: number = 30,
  observer: Observer = PARIS,
): IssPass[] {
  const satrec = twoline2satrec(tleLine1, tleLine2);
  const passes: IssPass[] = [];

  const observerGeodetic = {
    longitude: (observer.longitude * Math.PI) / 180,
    latitude: (observer.latitude * Math.PI) / 180,
    height: observer.height / 1000, // km
  };

  let current: { start: Date; maxEl: number; maxElDate: Date; maxAz: number } | null = null;
  const endTime = new Date(from.getTime() + horizonDays * 86_400_000);

  for (let t = from.getTime(); t < endTime.getTime() && passes.length < maxPasses; t += STEP_SECONDS * 1000) {
    const date = new Date(t);
    const sample = sampleAt(satrec, date, observer, observerGeodetic);

    if (sample?.visible) {
      if (!current) {
        current = { start: date, maxEl: sample.elevationDeg, maxElDate: date, maxAz: sample.azimuthDeg };
      } else if (sample.elevationDeg > current.maxEl) {
        current.maxEl = sample.elevationDeg;
        current.maxElDate = date;
        current.maxAz = sample.azimuthDeg;
      }
    } else if (current) {
      const durationSec = (date.getTime() - current.start.getTime()) / 1000;
      if (durationSec >= 60) {
        passes.push({
          start: current.start.toISOString(),
          maxElevationTime: current.maxElDate.toISOString(),
          maxElevationDeg: Math.round(current.maxEl),
          end: date.toISOString(),
          durationSec: Math.round(durationSec),
          direction: compassFromAzimuth(current.maxAz),
        });
      }
      current = null;
    }
  }

  return passes;
}

'use client';
// app/solar-system/astronomie/ciel/page.tsx
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import EarthOrbitMap from '@/components/EarthOrbitMap';

// ── Math helpers ─────────────────────────────────────────────────────────────
const rad = (d: number) => d * Math.PI / 180;
const deg = (r: number) => r * 180 / Math.PI;

function julianDate(d: Date) {
  const y = d.getUTCFullYear(), mo = d.getUTCMonth() + 1;
  const day = d.getUTCDate() + (d.getUTCHours() + d.getUTCMinutes() / 60) / 24;
  let Y = y, M = mo;
  if (M <= 2) { Y--; M += 12; }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + day + B - 1524.5;
}

function localSiderealTime(date: Date, lon: number): number {
  const jd = julianDate(date);
  const T = (jd - 2451545.0) / 36525.0;
  const gst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + T * T * (0.000387933 - T / 38710000);
  return (((gst + lon) % 360) + 360) % 360;
}

function altAz(ra: number, dec: number, lat: number, lstDeg: number) {
  const ha = rad(lstDeg - ra * 15);
  const d = rad(dec), l = rad(lat);
  const sinAlt = Math.sin(d) * Math.sin(l) + Math.cos(d) * Math.cos(l) * Math.cos(ha);
  const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
  const cosAz = (Math.sin(d) - Math.sin(alt) * Math.sin(l)) / (Math.cos(alt) * Math.cos(l));
  let az = Math.acos(Math.max(-1, Math.min(1, cosAz)));
  if (Math.sin(ha) > 0) az = 2 * Math.PI - az;
  return { alt: deg(alt), az: deg(az) };
}

// Stereographic projection (sky: North up, East LEFT)
function project(alt: number, az: number, cx: number, cy: number, R: number) {
  if (alt < -2) return null;
  const altR = rad(Math.max(alt, -1));
  const r = R * Math.cos(altR) / (1 + Math.sin(altR));
  return { x: cx - r * Math.sin(rad(az)), y: cy - r * Math.cos(rad(az)) };
}

// ── Sunrise / Sunset (NOAA algorithm) ────────────────────────────────────────
function jdToDate(jd: number): Date {
  const z = Math.floor(jd + 0.5), f = jd + 0.5 - z;
  let A = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    A = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day   = B - D - Math.floor(30.6001 * E);
  const month = E < 14 ? E - 1 : E - 13;
  const year  = month > 2 ? C - 4716 : C - 4715;
  const hours = f * 24, h = Math.floor(hours), m = Math.floor((hours - h) * 60);
  return new Date(Date.UTC(year, month - 1, day, h, m));
}

function sunriseSunset(date: Date, lat: number, lon: number): { sunrise: Date | null; sunset: Date | null } {
  const jd = julianDate(new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12)));
  const n = jd - 2451545.0;
  const Jstar = n - lon / 360;
  const M = ((357.5291 + 0.98560028 * Jstar) % 360 + 360) % 360;
  const Mrad = rad(M);
  const C = 1.9148 * Math.sin(Mrad) + 0.0200 * Math.sin(2 * Mrad) + 0.0003 * Math.sin(3 * Mrad);
  const lambda = ((M + C + 180 + 102.9372) % 360 + 360) % 360;
  const lRad = rad(lambda);
  const Jtransit = 2451545.0 + Jstar + 0.0053 * Math.sin(Mrad) - 0.0069 * Math.sin(2 * lRad);
  const sinDec = Math.sin(lRad) * Math.sin(rad(23.4397));
  const delta = Math.asin(sinDec);
  const cosOmega = (Math.sin(rad(-0.8333)) - Math.sin(rad(lat)) * sinDec) / (Math.cos(rad(lat)) * Math.cos(delta));
  if (Math.abs(cosOmega) > 1) return { sunrise: null, sunset: null };
  const omega0 = deg(Math.acos(cosOmega));
  return {
    sunrise: jdToDate(Jtransit - omega0 / 360),
    sunset:  jdToDate(Jtransit + omega0 / 360),
  };
}

function formatTime(d: Date | null, tzOffset = 1): string {
  if (!d) return '--:--';
  const utc = d.getUTCHours() + d.getUTCMinutes() / 60 + tzOffset;
  const h = Math.floor(((utc % 24) + 24) % 24);
  const m = Math.round((utc % 1) * 60);
  return `${String(h).padStart(2, '0')}h${String(m).padStart(2, '0')}`;
}

// ── Night time slots: 18h→8h local CET (UTC+1) ───────────────────────────────
// slot 0 = 18h CET = 17h UTC   slot 6 = 00h CET = 23h UTC (same day)
// slot 7 = 01h CET = 00h UTC+1  slot 14 = 08h CET = 07h UTC+1
const NIGHT_SLOTS = Array.from({ length: 15 }, (_, i) => ({
  cetHour: (i + 18) % 24,
  utcHour: (i + 17) % 24,
  nextDay: i >= 7,   // crosses UTC midnight at slot 7 (01h CET)
}));

// ── Star catalog [name, ra_hours, dec_deg, magnitude, spectral] ───────────────
const CATALOG: [string, number, number, number, string][] = [
  ['Sirius',      6.7525,  -16.7161, -1.46, 'A'],
  ['Arcturus',   14.2612,   19.1822, -0.04, 'K'],
  ['Vega',       18.6156,   38.7836,  0.03, 'A'],
  ['Capella',     5.2781,   45.9980,  0.08, 'G'],
  ['Rigel',       5.2423,   -8.2016,  0.13, 'B'],
  ['Procyon',     7.6552,    5.2250,  0.34, 'F'],
  ['Betelgeuse',  5.9195,    7.4070,  0.50, 'M'],
  ['Altair',     19.8461,    8.8683,  0.76, 'A'],
  ['Aldebaran',   4.5988,   16.5093,  0.86, 'K'],
  ['Antares',    16.4901,  -26.4320,  1.06, 'M'],
  ['Spica',      13.4199,  -11.1613,  0.97, 'B'],
  ['Pollux',      7.7553,   28.0260,  1.14, 'K'],
  ['Fomalhaut',  22.9608,  -29.6223,  1.16, 'A'],
  ['Deneb',      20.6905,   45.2803,  1.25, 'A'],
  ['Regulus',    10.1395,   11.9672,  1.35, 'B'],
  ['Adhara',      6.9771,  -28.9722,  1.50, 'B'],
  ['Castor',      7.5767,   31.8883,  1.57, 'A'],
  ['Bellatrix',   5.4189,    6.3497,  1.64, 'B'],
  ['Elnath',      5.4381,   28.6075,  1.65, 'B'],
  ['Alioth',     12.9004,   55.9598,  1.76, 'A'],
  ['Mirfak',      3.4054,   49.8612,  1.80, 'F'],
  ['Dubhe',      11.0621,   61.7511,  1.81, 'K'],
  ['Alkaid',     13.7924,   49.3133,  1.86, 'B'],
  ['Alnilam',     5.6036,   -1.2019,  1.69, 'B'],
  ['Alnitak',     5.6792,   -1.9428,  1.88, 'O'],
  ['Mintaka',     5.5336,   -0.2991,  2.23, 'O'],
  ['Alhena',      6.6285,   16.3993,  1.93, 'A'],
  ['Polaris',     2.5300,   89.2642,  1.97, 'F'],
  ['Hamal',       2.1197,   23.4624,  2.00, 'K'],
  ['Alphard',     9.4597,   -8.6586,  1.99, 'K'],
  ['Saiph',       5.7954,   -9.6697,  2.07, 'B'],
  ['Alpheratz',   0.1397,   29.0905,  2.06, 'A'],
  ['Mirach',      1.1622,   35.6203,  2.07, 'M'],
  ['Schedar',     0.6753,   56.5373,  2.24, 'K'],
  ['Caph',        0.1528,   59.1496,  2.28, 'F'],
  ['Ruchbah',     1.4302,   60.2353,  2.68, 'A'],
  ['Algol',       3.1362,   40.9557,  2.09, 'B'],
  ['Denebola',   11.8177,   14.5721,  2.14, 'A'],
  ['Phecda',     11.8968,   53.6948,  2.44, 'A'],
  ['Merak',      11.0307,   56.3824,  2.37, 'A'],
  ['Megrez',     12.2572,   57.0326,  3.31, 'A'],
  ['Mizar',      13.3992,   54.9255,  2.27, 'A'],
  ['Kochab',     14.8452,   74.1556,  2.07, 'K'],
  ['Scheat',     23.0628,   28.0825,  2.42, 'M'],
  ['Markab',     23.0795,   15.2053,  2.49, 'A'],
  ['Enif',       21.7364,    9.8748,  2.40, 'K'],
  ['Algenib',     0.2210,   15.1836,  2.83, 'B'],
  ['Mirzam',      6.3781,  -17.9559,  1.98, 'B'],
  ['Algieba',    10.3328,   19.8413,  2.01, 'K'],
  ['Zosma',      11.2353,   20.5237,  2.56, 'A'],
  ['Muphrid',    13.9114,   18.3977,  2.68, 'G'],
  ['Cor Caroli', 12.9338,   38.3182,  2.90, 'A'],
  ['Diphda',      0.7265,  -17.9866,  2.04, 'K'],
  ['Menkar',      3.0379,    4.0897,  2.53, 'M'],
  ['Nunki',      18.9213,  -26.2967,  2.02, 'B'],
  ['Wezen',       7.1398,  -26.3932,  1.84, 'F'],
];

// ── Constellation lines ───────────────────────────────────────────────────────
const CONST_LINES: { name: string; color: string; lines: [string, string][] }[] = [
  { name: 'Orion',        color: 'rgba(160,180,255,0.25)', lines: [['Betelgeuse','Bellatrix'],['Betelgeuse','Alnilam'],['Bellatrix','Mintaka'],['Mintaka','Alnilam'],['Alnilam','Alnitak'],['Mintaka','Rigel'],['Alnitak','Saiph'],['Rigel','Saiph']] },
  { name: 'Grande Ourse', color: 'rgba(100,180,255,0.25)', lines: [['Dubhe','Merak'],['Merak','Phecda'],['Phecda','Megrez'],['Megrez','Alioth'],['Alioth','Mizar'],['Mizar','Alkaid'],['Megrez','Dubhe']] },
  { name: 'Cassiopée',    color: 'rgba(180,160,255,0.25)', lines: [['Caph','Schedar'],['Schedar','Ruchbah'],['Ruchbah','Caph']] },
  { name: 'Gémeaux',      color: 'rgba(100,255,200,0.20)', lines: [['Castor','Pollux'],['Pollux','Alhena'],['Castor','Elnath']] },
  { name: 'Lion',         color: 'rgba(255,200,100,0.20)', lines: [['Regulus','Algieba'],['Algieba','Zosma'],['Zosma','Denebola']] },
  { name: 'Pégase',       color: 'rgba(200,180,255,0.20)', lines: [['Alpheratz','Scheat'],['Scheat','Markab'],['Markab','Algenib'],['Algenib','Alpheratz']] },
  { name: 'Persée',       color: 'rgba(255,180,120,0.20)', lines: [['Mirfak','Algol']] },
  { name: 'Bouvier',      color: 'rgba(255,200,80,0.20)',  lines: [['Arcturus','Muphrid']] },
  { name: 'Vierge',       color: 'rgba(180,255,180,0.20)', lines: [['Spica','Muphrid']] },
];

// ── Planet base positions (March 8, 2026) + daily motion ─────────────────────
// dRA = approximate RA drift in hours/day,  dDec = degrees/day
const PLANET_BASE: { name: string; ra: number; dec: number; dRA: number; dDec: number; color: string; mag: number; symbol: string }[] = [
  { name: 'Vénus',   ra: 21.65, dec: -17.4, dRA:  0.107, dDec:  0.10, color: '#FCD34D', mag: -4.2, symbol: '♀' },
  { name: 'Mars',    ra:  7.78, dec:  24.2, dRA:  0.035, dDec: -0.03, color: '#F87171', mag:  1.3, symbol: '♂' },
  { name: 'Jupiter', ra:  4.59, dec:  21.3, dRA:  0.005, dDec:  0.00, color: '#FB923C', mag: -2.1, symbol: '♃' },
  { name: 'Saturne', ra: 23.46, dec:  -8.8, dRA:  0.002, dDec:  0.00, color: '#34D399', mag:  1.2, symbol: '♄' },
  { name: 'Mercure', ra: 22.35, dec: -13.2, dRA: -0.100, dDec:  0.05, color: '#A78BFA', mag:  0.5, symbol: '☿' },
];

function starColor(spec: string) {
  switch (spec[0]) {
    case 'O': return '#9BB8FF';
    case 'B': return '#BBCFFF';
    case 'A': return '#EFEFFF';
    case 'F': return '#FFFFC0';
    case 'G': return '#FFE060';
    case 'K': return '#FFA040';
    case 'M': return '#FF6030';
    default:  return '#FFFFFF';
  }
}

const LAT = 48.85;
const LON = 2.35;
const TZ  = 1; // CET = UTC+1 (March before DST switch)
const DAY_RANGE = 6; // today + 5 days

function addDays(d: Date, n: number) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n));
}

function fmtDate(d: Date) {
  return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CielPage() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Base today — initialised client-side only
  const [today] = useState<Date>(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  });

  const [dayOffset,  setDayOffset]  = useState(0);   // 0=today … 5
  const [nightSlot,  setNightSlot]  = useState(4);   // 0=18h … 14=8h+1day  →  default 22h
  const [showConst,  setShowConst]  = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showPlanets,setShowPlanets]= useState(true);

  // ── Compute observation date ─────────────────────────────────────────────
  const { obsDate, cetHour } = useMemo(() => {
    const slot = NIGHT_SLOTS[nightSlot];
    const baseDay = addDays(today, dayOffset);
    const obsD = new Date(Date.UTC(
      baseDay.getUTCFullYear(), baseDay.getUTCMonth(),
      baseDay.getUTCDate() + (slot.nextDay ? 1 : 0),
      slot.utcHour, 0, 0
    ));
    return { obsDate: obsD, cetHour: slot.cetHour };
  }, [today, dayOffset, nightSlot]);

  // ── Sunrise / sunset ─────────────────────────────────────────────────────
  const { sunrise, sunset } = useMemo(() => {
    const dayDate = addDays(today, dayOffset);
    return sunriseSunset(dayDate, LAT, LON);
  }, [today, dayOffset]);

  const sunriseStr = formatTime(sunrise, TZ);
  const sunsetStr  = formatTime(sunset,  TZ);

  // Twilight bar: what fraction of the night slider is "dark"
  // For display in the slider track — approximate only
  const sunsetHourCET  = sunset  ? (sunset.getUTCHours()  + TZ + sunset.getUTCMinutes()  / 60 + 24) % 24 : 20.5;
  const sunriseHourCET = sunrise ? (sunrise.getUTCHours() + TZ + sunrise.getUTCMinutes() / 60 + 24) % 24 :  6.5;

  // ── Planet positions with drift ──────────────────────────────────────────
  const planets = useMemo(() =>
    PLANET_BASE.map(p => ({
      ...p,
      ra:  p.ra  + p.dRA  * dayOffset,
      dec: p.dec + p.dDec * dayOffset,
    })),
  [dayOffset]);

  // ── Canvas draw ──────────────────────────────────────────────────────────
  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 40;

    ctx.clearRect(0, 0, W, H);

    // Sky — slightly lit blue-night (not pitch black), like light-polluted sky
    const sky = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    sky.addColorStop(0,    '#080e2a');
    sky.addColorStop(0.55, '#060c22');
    sky.addColorStop(1,    '#040819');
    ctx.fillStyle = sky;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.fill();

    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.clip();

    // Altitude rings at 15°/30°/45°/60°/75°
    for (const a of [15, 30, 45, 60, 75]) {
      const altR = rad(a), r = R * Math.cos(altR) / (1 + Math.sin(altR));
      const isMain = a % 30 === 0;
      ctx.strokeStyle = isMain ? 'rgba(120,150,255,0.13)' : 'rgba(120,150,255,0.06)';
      ctx.lineWidth = isMain ? 0.9 : 0.6;
      ctx.setLineDash(isMain ? [4, 8] : [2, 10]);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI); ctx.stroke();
      ctx.setLineDash([]);
      if (isMain) {
        ctx.font = '8px monospace';
        ctx.fillStyle = 'rgba(130,155,255,0.40)';
        ctx.textAlign = 'left';
        ctx.fillText(`${a}°`, cx + r + 3, cy - 2);
      }
    }
    ctx.setLineDash([]);

    // Azimuth spokes every 45° (N/NE/E/SE/S/SO/O/NO)
    const azLabels: [string, number][] = [['N',0],['NE',45],['E',90],['SE',135],['S',180],['SO',225],['O',270],['NO',315]];
    for (const [, az] of azLabels) {
      const isCard = az % 90 === 0;
      ctx.strokeStyle = isCard ? 'rgba(120,150,255,0.10)' : 'rgba(120,150,255,0.05)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - R * Math.sin(rad(az)), cy - R * Math.cos(rad(az)));
      ctx.stroke();
    }

    const lstDeg = localSiderealTime(obsDate, LON);

    // Ecliptic — series of points along λ ∈ [0°, 360°]
    const eps = rad(23.4397);
    {
      ctx.beginPath();
      let started = false;
      for (let li = 0; li <= 360; li += 3) {
        const lRad = rad(li);
        const raE  = Math.atan2(Math.sin(lRad) * Math.cos(eps), Math.cos(lRad)) * 12 / Math.PI;
        const decE = deg(Math.asin(Math.sin(lRad) * Math.sin(eps)));
        const { alt, az } = altAz((raE + 24) % 24, decE, LAT, lstDeg);
        const p = project(alt, az, cx, cy, R);
        if (!p) { started = false; continue; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(255,200,80,0.18)'; ctx.lineWidth = 1.2; ctx.setLineDash([5, 6]);
      ctx.stroke(); ctx.setLineDash([]);
    }

    // Star positions map (for constellation lines)
    const posMap = new Map<string, { x: number; y: number }>();
    for (const [name, ra, dec] of CATALOG) {
      const { alt, az } = altAz(ra, dec, LAT, lstDeg);
      const p = project(alt, az, cx, cy, R);
      if (p) posMap.set(name, p);
    }

    // Constellation lines
    if (showConst) {
      for (const c of CONST_LINES) {
        const boosted = c.color.replace(/[\d.]+\)$/, '0.32)');
        ctx.strokeStyle = boosted; ctx.lineWidth = 1.0;
        for (const [a, b] of c.lines) {
          const pa = posMap.get(a), pb = posMap.get(b);
          if (pa && pb) { ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); }
        }
      }
    }

    // Stars — reduced sizes, clean rendering
    for (const [name, ra, dec, mag, spec] of CATALOG) {
      const { alt, az } = altAz(ra, dec, LAT, lstDeg);
      const p = project(alt, az, cx, cy, R);
      if (!p) continue;
      const size = Math.max(1.0, 4.8 - mag * 0.65);
      const col = starColor(spec);

      // Soft glow only for bright stars
      if (mag < 1.5) {
        const glowR = mag < 0.5 ? size * 5.5 : size * 3.5;
        const glowA = mag < 0.5 ? '99' : '55';
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        g.addColorStop(0, col + glowA); g.addColorStop(1, col + '00');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, 2 * Math.PI); ctx.fill();
      }

      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, 2 * Math.PI); ctx.fill();

      if (showLabels && mag < 2.0) {
        ctx.font = `${mag < 1.0 ? 12 : 10}px monospace`;
        ctx.fillStyle = mag < 1.0 ? 'rgba(220,230,255,0.90)' : 'rgba(190,205,255,0.75)';
        ctx.textAlign = 'left';
        ctx.fillText(name, p.x + size + 4, p.y + 4);
      }
    }

    // Planets
    if (showPlanets) {
      for (const planet of planets) {
        const { alt, az } = altAz(planet.ra, planet.dec, LAT, lstDeg);
        const p = project(alt, az, cx, cy, R);
        if (!p) continue;
        const size = Math.max(3, 5.5 - planet.mag * 0.45);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4);
        g.addColorStop(0, planet.color + 'AA'); g.addColorStop(1, planet.color + '00');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, size * 4, 0, 2 * Math.PI); ctx.fill();
        ctx.fillStyle = planet.color; ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, 2 * Math.PI); ctx.fill();

        if (planet.name === 'Saturne') {
          ctx.strokeStyle = planet.color + 'A0'; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.ellipse(p.x, p.y, size * 2.4, size * 0.85, 0.3, 0, 2 * Math.PI); ctx.stroke();
        }

        // Clean inline label: symbol + name + altitude
        const label = `${planet.symbol} ${planet.name}  ${Math.round(alt)}°`;
        ctx.font = '10px monospace';
        const bx = p.x + size + 6, by = p.y + 4;
        ctx.fillStyle = 'rgba(10,14,40,0.75)';
        ctx.fillRect(bx - 2, by - 10, ctx.measureText(label).width + 4, 13);
        ctx.fillStyle = planet.color;
        ctx.textAlign = 'left';
        ctx.fillText(label, bx, by);
      }
    }

    ctx.restore();

    // Warm horizon glow near E (sunrise) and W (sunset) — March, ~E/W
    for (const [azSun, col] of [[85, 'rgba(255,180,60,0.12)'], [275, 'rgba(255,120,40,0.10)']] as [number, string][]) {
      const gx = cx - R * Math.sin(rad(azSun)), gy = cy - R * Math.cos(rad(azSun));
      const horizG = ctx.createRadialGradient(gx, gy, 0, gx, gy, R * 0.55);
      horizG.addColorStop(0, col); horizG.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R + 2, 0, 2 * Math.PI); ctx.clip();
      ctx.fillStyle = horizG; ctx.fillRect(cx - R - 2, cy - R - 2, (R + 2) * 2, (R + 2) * 2);
      ctx.restore();
    }

    // Horizon ring
    ctx.strokeStyle = 'rgba(140,160,220,0.35)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();

    // Azimuth tick marks & labels on horizon ring
    ctx.font = '9px monospace';
    for (const [label, az] of azLabels) {
      const isCard = az % 90 === 0;
      const tickLen = isCard ? 7 : 4;
      const sin = Math.sin(rad(az)), cos = Math.cos(rad(az));
      ctx.strokeStyle = isCard ? 'rgba(160,180,255,0.50)' : 'rgba(160,180,255,0.25)';
      ctx.lineWidth = isCard ? 1.2 : 0.8;
      ctx.beginPath();
      ctx.moveTo(cx - R * sin, cy - R * cos);
      ctx.lineTo(cx - (R - tickLen) * sin, cy - (R - tickLen) * cos);
      ctx.stroke();
      // Labels outside the ring
      const lx = cx - (R + 16) * sin, ly = cy - (R + 16) * cos;
      ctx.fillStyle = isCard ? 'rgba(180,200,255,0.80)' : 'rgba(140,160,220,0.45)';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = isCard ? 'bold 11px sans-serif' : '8px monospace';
      ctx.fillText(label, lx, ly);
    }
    ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';

  }, [obsDate, showConst, showLabels, showPlanets, planets]);

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container) return;
    const size = Math.min(container.clientWidth, 720);
    canvas.width = size; canvas.height = size;
    draw(canvas);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container) return;
    const obs = new ResizeObserver(() => {
      const size = Math.min(container.clientWidth, 720);
      canvas.width = size; canvas.height = size;
      draw(canvas);
    });
    obs.observe(container);
    return () => obs.disconnect();
  }, [draw]);

  // ── Helpers for display ───────────────────────────────────────────────────
  const lstNow = localSiderealTime(obsDate, LON);

  const isMidnightCrossed = NIGHT_SLOTS[nightSlot].nextDay;
  const timeLabel = `${String(cetHour).padStart(2, '0')}h00 CET${isMidnightCrossed ? ' (+1j)' : ''}`;

  // Slot label ticks (every 2 slots)
  const TICK_LABELS = NIGHT_SLOTS
    .filter((_, i) => i % 2 === 0)
    .map(s => `${String(s.cetHour).padStart(2, '0')}h`);

  return (
    <SolarLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-mono mb-6">
          <Link href="/solar-system" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <Link href="/solar-system/astronomie" className="hover:text-white transition-colors">Astronomie</Link>
          <span>›</span>
          <span className="text-gray-400">Carte du ciel</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Carte du ciel
            </h1>
            <p className="text-gray-500 text-sm">
              Paris · 48,85°N · 2,35°E · Projection stéréographique · Nord haut · Est gauche
            </p>
          </div>
          {/* Sunrise/sunset badge */}
          <div className="flex items-center gap-3 text-sm font-mono shrink-0">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-yellow-500/20" style={{ background: 'rgba(234,179,8,0.08)' }}>
              <span className="text-yellow-400">☀</span>
              <span className="text-yellow-300">{sunriseStr}</span>
              <span className="text-gray-600 text-xs">lever</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-orange-500/20" style={{ background: 'rgba(249,115,22,0.08)' }}>
              <span className="text-orange-400">🌇</span>
              <span className="text-orange-300">{sunsetStr}</span>
              <span className="text-gray-600 text-xs">coucher</span>
            </span>
          </div>
        </div>

        {/* Day navigation */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs uppercase tracking-wider text-gray-600 mr-1">Jour :</span>
          {Array.from({ length: DAY_RANGE }, (_, i) => {
            const d = addDays(today, i);
            const isToday = i === 0;
            const selected = i === dayOffset;
            return (
              <button
                key={i}
                onClick={() => setDayOffset(i)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border"
                style={{
                  background: selected ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)',
                  borderColor: selected ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)',
                  color: selected ? '#C4B5FD' : '#6B7280',
                }}
              >
                {isToday ? "Aujourd'hui" : fmtDate(d)}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Canvas */}
          <div ref={containerRef} className="flex-1 w-full">
            <canvas
              ref={canvasRef}
              className="rounded-full block mx-auto"
              style={{ background: '#030610', maxWidth: '100%' }}
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-4">

            {/* Night time slider */}
            <div className="rounded-2xl border border-white/8 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Heure d&apos;observation</h3>
              <div className="text-2xl font-mono text-white mb-1">{timeLabel}</div>

              {/* Sunset / sunrise indicators */}
              <div className="flex justify-between text-[10px] font-mono text-gray-600 mb-1">
                <span className="text-orange-400">🌇 {sunsetStr}</span>
                <span className="text-yellow-400">☀ {sunriseStr}</span>
              </div>

              {/* Slider: 0–14 */}
              <input
                type="range"
                min={0} max={14} step={1}
                value={nightSlot}
                onChange={e => setNightSlot(Number(e.target.value))}
                className="w-full accent-violet-500"
              />
              <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-1">
                {TICK_LABELS.map((l, i) => (
                  <span key={i} className={l === '00h' ? 'text-indigo-400' : ''}>{l}</span>
                ))}
              </div>
              <div className="text-[10px] text-gray-700 mt-1 text-center font-mono">
                18h → minuit → 08h · CET
              </div>
            </div>

            {/* Display options */}
            <div className="rounded-2xl border border-white/8 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Affichage</h3>
              <div className="space-y-2">
                {[
                  { label: 'Constellations',   val: showConst,   set: setShowConst },
                  { label: "Noms des étoiles", val: showLabels,  set: setShowLabels },
                  { label: 'Planètes',          val: showPlanets, set: setShowPlanets },
                ].map(opt => (
                  <label key={opt.label} className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={opt.val} onChange={e => opt.set(e.target.checked)} className="accent-violet-500 w-3.5 h-3.5" />
                    <span className="text-sm text-gray-300">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Planets status */}
            <div className="rounded-2xl border border-white/8 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Planètes</h3>
              <div className="space-y-2.5">
                {planets.map(p => {
                  const { alt } = altAz(p.ra, p.dec, LAT, lstNow);
                  const visible = alt > 5;
                  return (
                    <div key={p.name} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{ background: `${p.color}25`, color: p.color, border: `1px solid ${p.color}50` }}>
                        {p.symbol}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold" style={{ color: p.color }}>{p.name}</span>
                        <span className="text-[10px] text-gray-600 font-mono ml-1">mag. {p.mag > 0 ? '+' : ''}{p.mag}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${visible ? 'bg-green-500/15 text-green-400' : 'bg-gray-700/40 text-gray-600'}`}>
                        {visible ? `↑ ${Math.round(alt)}°` : 'sous l\'horizon'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Color legend */}
            <div className="rounded-2xl border border-white/8 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Types spectraux</h3>
              <div className="space-y-1.5">
                {[
                  { col: '#BBCFFF', label: 'O/B — Bleues (très chaudes)' },
                  { col: '#EFEFFF', label: 'A — Blanches' },
                  { col: '#FFFFC0', label: 'F/G — Jaune-blanc (≈ Soleil)' },
                  { col: '#FFA040', label: 'K — Oranges' },
                  { col: '#FF6030', label: 'M — Rouges (géantes froides)' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.col }} />
                    <span className="text-[10px] text-gray-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Carte orbitale ── */}
        <div className="mt-10 mb-6">
          <EarthOrbitMap />
        </div>

        {/* Footer note */}
        <div className="mt-5 rounded-2xl border border-white/6 p-4" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <p className="text-xs text-gray-600 leading-relaxed">
            <span className="text-gray-500 font-semibold">Lecture :</span>{' '}
            Centre = zénith · Bord = horizon · Nord haut · Est gauche · Cercles pointillés = 30° et 60° d&apos;altitude.
            Lever/coucher du Soleil calculés pour Paris. Positions des planètes approximatives.
            {sunsetHourCET && sunriseHourCET && (
              <> Nuit astronomique entre ~{String(Math.round(sunsetHourCET + 1.5) % 24).padStart(2,'0')}h et ~{String(Math.round(sunriseHourCET - 1.5 + 24) % 24).padStart(2,'0')}h (CET).</>
            )}
          </p>
        </div>

      </div>
    </SolarLayout>
  );
}

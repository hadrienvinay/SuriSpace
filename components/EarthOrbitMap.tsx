'use client';

import { useState, useEffect, useCallback } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// ── Types ────────────────────────────────────────────────────────────────────
interface OrbitalObject {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  icon: string;
  type: 'station' | 'telescope' | 'moon';
  altitude?: string;
  detail?: string;
}

// ── Moon sub-point calculation ────────────────────────────────────────────────
function getMoonSubPoint(date: Date): { lat: number; lng: number } {
  const JD = 2440587.5 + date.getTime() / 86400000;
  const T = (JD - 2451545.0) / 36525.0;

  // Mean elements (simplified)
  const L0 = (218.3165 + 481267.8813 * T) % 360;
  const M  = (134.9634 + 477198.8676 * T) % 360;
  const F  = (93.2721  + 483202.0175 * T) % 360;
  const D  = (297.8502 + 445267.1115 * T) % 360;
  const Ms = (357.5291 + 35999.0503 * T)  % 360;

  const rad = (d: number) => d * Math.PI / 180;

  // Ecliptic longitude (main perturbations)
  const lambda = L0
    + 6.289 * Math.sin(rad(M))
    - 1.274 * Math.sin(rad(2 * D - M))
    + 0.658 * Math.sin(rad(2 * D))
    + 0.214 * Math.sin(rad(2 * M))
    - 0.186 * Math.sin(rad(Ms))
    - 0.114 * Math.sin(rad(2 * F));

  // Ecliptic latitude
  const beta = 5.128 * Math.sin(rad(F))
    + 0.281 * Math.sin(rad(M + F))
    + 0.278 * Math.sin(rad(M - F));

  // Obliquity
  const eps = 23.4393 - 0.0130 * T;

  // Ecliptic to equatorial
  const lambdaRad = rad(lambda);
  const betaRad = rad(beta);
  const epsRad = rad(eps);

  const sinDec = Math.sin(betaRad) * Math.cos(epsRad) + Math.cos(betaRad) * Math.sin(epsRad) * Math.sin(lambdaRad);
  const dec = Math.asin(sinDec) * 180 / Math.PI;

  const y = Math.sin(lambdaRad) * Math.cos(epsRad) - Math.tan(betaRad) * Math.sin(epsRad);
  const x = Math.cos(lambdaRad);
  const ra = ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360; // degrees

  // Greenwich Sidereal Time
  const GMST = (280.46061837 + 360.98564736629 * (JD - 2451545.0) + T * T * (0.000387933 - T / 38710000)) % 360;

  // Sub-point longitude = RA - GMST
  let lng = ((ra - GMST) + 540) % 360 - 180;
  if (lng < -180) lng += 360;

  return { lat: dec, lng };
}

// ── Orbital instruments (fixed well-known positions + approximate ground track) ──
const ORBITAL_INSTRUMENTS: Omit<OrbitalObject, 'lat' | 'lng'>[] = [
  {
    id: 'hubble',
    name: 'Hubble (HST)',
    color: '#60A5FA',
    icon: '🔭',
    type: 'telescope',
    altitude: '~540 km',
    detail: 'Orbite basse inclinée à 28,5° — Optique/UV/IR proche — Depuis 1990',
  },
  {
    id: 'jwst',
    name: 'James Webb (JWST)',
    color: '#FCD34D',
    icon: '🪞',
    type: 'telescope',
    altitude: '~1,5 M km (L2)',
    detail: 'Point de Lagrange L2 — Infrarouge — Miroir 6,5 m — Depuis 2021',
  },
  {
    id: 'chandra',
    name: 'Chandra',
    color: '#A78BFA',
    icon: '✨',
    type: 'telescope',
    altitude: '~16 000–133 000 km',
    detail: 'Orbite très elliptique — Rayons X — Depuis 1999',
  },
  {
    id: 'fermi',
    name: 'Fermi (GLAST)',
    color: '#34D399',
    icon: '⚡',
    type: 'telescope',
    altitude: '~550 km',
    detail: 'Orbite basse inclinée à 25,6° — Rayons gamma — Depuis 2008',
  },
  {
    id: 'tess',
    name: 'TESS',
    color: '#FB923C',
    icon: '🌍',
    type: 'telescope',
    altitude: '~108 000–376 000 km',
    detail: 'Orbite très elliptique en résonance 2:1 avec la Lune — Exoplanètes — Depuis 2018',
  },
  {
    id: 'gaia',
    name: 'Gaia',
    color: '#F472B6',
    icon: '📐',
    type: 'telescope',
    altitude: '~1,5 M km (L2)',
    detail: 'Point de Lagrange L2 — Astrométrie — Cartographie 2 Mds d\'étoiles — Depuis 2013',
  },
  {
    id: 'xmm',
    name: 'XMM-Newton',
    color: '#E879F9',
    icon: '🌀',
    type: 'telescope',
    altitude: '~7 000–114 000 km',
    detail: 'Orbite très elliptique — Rayons X — Depuis 1999',
  },
];

// Approximate ground-track position for LEO satellites based on time
function getLEOPosition(date: Date, inclinationDeg: number, periodMin: number, offsetDeg: number): { lat: number; lng: number } {
  const t = date.getTime() / 1000;
  const period = periodMin * 60;
  const phase = ((t / period) * 2 * Math.PI) + (offsetDeg * Math.PI / 180);
  const lat = inclinationDeg * Math.sin(phase);
  // Longitude drifts westward due to Earth rotation
  const lngRate = -360 / (24 * 3600); // deg/s
  const orbitalLngRate = 360 / period; // deg/s eastward
  const lng = ((offsetDeg + (orbitalLngRate + lngRate) * t) % 360 + 540) % 360 - 180;
  return { lat, lng };
}

// L2 point direction (opposite to Sun from Earth)
function getL2Direction(date: Date): { lat: number; lng: number } {
  const JD = 2440587.5 + date.getTime() / 86400000;
  const T = (JD - 2451545.0) / 36525.0;
  const M = (357.5291 + 35999.0503 * T) * Math.PI / 180;
  const sunLon = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) + (1.9146 * Math.sin(M) + 0.0200 * Math.sin(2 * M));
  // L2 is opposite to Sun
  const l2Lon = ((sunLon + 180) % 360 + 540) % 360 - 180;
  // GMST for sub-point
  const GMST = (280.46061837 + 360.98564736629 * (JD - 2451545.0)) % 360;
  const lng = ((l2Lon - GMST) + 540) % 360 - 180;
  return { lat: 0, lng };
}

// Elliptical orbit approximate position
function getEllipticalPosition(date: Date, incDeg: number, periodHours: number, offsetDeg: number): { lat: number; lng: number } {
  const t = date.getTime() / 1000;
  const period = periodHours * 3600;
  const phase = ((t / period) * 2 * Math.PI) + (offsetDeg * Math.PI / 180);
  const lat = incDeg * Math.sin(phase);
  const GMST = (280.46061837 + 360.98564736629 * ((2440587.5 + date.getTime() / 86400000) - 2451545.0)) % 360;
  const lng = ((offsetDeg + (360 / (periodHours * 3600)) * t * 180 / Math.PI - GMST) + 540) % 360 - 180;
  return { lat: Math.max(-85, Math.min(85, lat)), lng };
}

function getInstrumentPositions(date: Date): OrbitalObject[] {
  const l2 = getL2Direction(date);

  return ORBITAL_INSTRUMENTS.map(inst => {
    let pos: { lat: number; lng: number };
    switch (inst.id) {
      case 'hubble':
        pos = getLEOPosition(date, 28.5, 95, 0);
        break;
      case 'fermi':
        pos = getLEOPosition(date, 25.6, 96, 120);
        break;
      case 'jwst':
        pos = { lat: l2.lat + 2, lng: l2.lng + 3 }; // slight offset for visibility
        break;
      case 'gaia':
        pos = { lat: l2.lat - 2, lng: l2.lng - 3 };
        break;
      case 'chandra':
        pos = getEllipticalPosition(date, 28.5, 64.2, 45);
        break;
      case 'tess':
        pos = getEllipticalPosition(date, 37, 321.6, 200);
        break;
      case 'xmm':
        pos = getEllipticalPosition(date, 40, 48, 90);
        break;
      default:
        pos = { lat: 0, lng: 0 };
    }
    return { ...inst, lat: pos.lat, lng: pos.lng };
  });
}

// ── ISS orbit trail (future trajectory) ──────────────────────────────────────
function getISSTrail(currentLat: number, currentLng: number, isAscending: boolean): [number, number][][] {
  const segments: [number, number][][] = [];
  let currentSegment: [number, number][] = [];
  const periodSec = 92.68 * 60;
  const inclination = 51.6;

  // Fix phase based on ascending/descending direction
  const asinPhase = Math.asin(Math.max(-1, Math.min(1, currentLat / inclination)));
  const phase0 = isAscending ? asinPhase : Math.PI - asinPhase;

  let prevLng: number | null = null;

  for (let i = 0; i <= 60; i++) {
    const dt = (i / 60) * periodSec;
    const phase = phase0 + (dt / periodSec) * 2 * Math.PI;
    const lat = inclination * Math.sin(phase);
    const lngDrift = -(dt / 86400) * 360;
    const orbitalLng = (dt / periodSec) * 360;
    let lng = currentLng + orbitalLng + lngDrift;
    lng = ((lng + 540) % 360) - 180;

    // Split segment at antimeridian crossing to avoid cross-map line
    if (prevLng !== null && Math.abs(lng - prevLng) > 180) {
      segments.push(currentSegment);
      currentSegment = [];
    }

    currentSegment.push([lng, lat]);
    prevLng = lng;
  }

  if (currentSegment.length > 0) segments.push(currentSegment);
  return segments;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function EarthOrbitMap() {
  const [issPosition, setIssPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [moonPosition, setMoonPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [instruments, setInstruments] = useState<OrbitalObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<OrbitalObject | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [issTrail, setIssTrail] = useState<[number, number][][]>([]);

  const updatePositions = useCallback(async () => {
    const now = new Date();

    // Moon
    const moon = getMoonSubPoint(now);
    setMoonPosition(moon);

    // Instruments
    setInstruments(getInstrumentPositions(now));

    // ISS live — fetch 2 timestamps to determine ascending/descending
    try {
      const ts = Math.floor(now.getTime() / 1000);
      const res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${ts - 10},${ts}`);
      if (res.ok) {
        const [prev, curr] = await res.json();
        const issLat = curr.latitude;
        const issLng = curr.longitude;
        const isAscending = curr.latitude > prev.latitude;
        setIssPosition({ lat: issLat, lng: issLng });
        setIssTrail(getISSTrail(issLat, issLng, isAscending));
      }
    } catch {
      // Fallback: approximate ISS position
      const pos = getLEOPosition(now, 51.6, 92.68, 200);
      setIssPosition(pos);
      setIssTrail(getISSTrail(pos.lat, pos.lng, true));
    }

    setLastUpdate(now);
  }, []);

  useEffect(() => {
    updatePositions();
    const interval = setInterval(updatePositions, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, [updatePositions]);

  const trailGeoJSON = {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'MultiLineString' as const,
      coordinates: issTrail,
    },
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Carte orbitale en temps réel
          </h2>
          <p className="text-xs text-gray-500">
            Positions sub-orbitales projetées sur le globe — ISS rafraîchie toutes les 15s
          </p>
        </div>
        {lastUpdate && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-500">
              MAJ : {lastUpdate.toLocaleTimeString('fr-FR')}
            </span>
            <button
              onClick={updatePositions}
              className="text-xs px-2 py-1 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              Actualiser
            </button>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: 500 }}>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            latitude: 20,
            longitude: 0,
            zoom: 1.3,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          projection={{ name: 'globe' }}
        >
          {/* ISS trail */}
          {issTrail.length > 0 && (
            <Source id="iss-trail" type="geojson" data={trailGeoJSON}>
              <Layer
                id="iss-trail-line"
                type="line"
                paint={{
                  'line-color': '#F87171',
                  'line-width': 1.5,
                  'line-opacity': 0.4,
                  'line-dasharray': [4, 4],
                }}
              />
            </Source>
          )}

          {/* ISS */}
          {issPosition && (
            <Marker latitude={issPosition.lat} longitude={issPosition.lng} anchor="center">
              <button
                onClick={() => setSelectedObject({
                  id: 'iss', name: 'ISS', lat: issPosition.lat, lng: issPosition.lng,
                  color: '#F87171', icon: '🛰️', type: 'station',
                  altitude: '~420 km', detail: 'Station Spatiale Internationale — Orbite 51,6° — Période 92 min — 7,66 km/s',
                })}
                className="relative group cursor-pointer"
              >
                <div className="absolute -inset-3 rounded-full animate-ping opacity-30" style={{ background: '#F87171' }} />
                <div className="absolute -inset-5 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #F87171, transparent)' }} />
                <div className="relative text-2xl drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 6px #F87171)' }}>
                  🛰️
                </div>
              </button>
            </Marker>
          )}

          {/* Moon */}
          {moonPosition && (
            <Marker latitude={moonPosition.lat} longitude={moonPosition.lng} anchor="center">
              <button
                onClick={() => setSelectedObject({
                  id: 'moon', name: 'Lune', lat: moonPosition.lat, lng: moonPosition.lng,
                  color: '#E5E7EB', icon: '🌙', type: 'moon',
                  altitude: '~384 400 km', detail: 'Point sub-lunaire — Position au-dessus de la surface terrestre',
                })}
                className="relative group cursor-pointer"
              >
                <div className="absolute -inset-4 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #E5E7EB, transparent)' }} />
                <div className="relative text-3xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.5))' }}>
                  🌙
                </div>
              </button>
            </Marker>
          )}

          {/* Instruments */}
          {instruments.map(inst => (
            <Marker key={inst.id} latitude={inst.lat} longitude={inst.lng} anchor="center">
              <button
                onClick={() => setSelectedObject(inst)}
                className="relative group cursor-pointer"
              >
                <div className="absolute -inset-2 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${inst.color}, transparent)` }} />
                <div className="relative text-lg" style={{ filter: `drop-shadow(0 0 4px ${inst.color})` }}>
                  {inst.icon}
                </div>
              </button>
            </Marker>
          ))}
        </Map>
      </div>

      {/* Info panel + legend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Selected object detail */}
        <div
          className="lg:col-span-1 rounded-2xl border border-white/8 p-5"
          style={{ background: 'rgba(255,255,255,0.02)', minHeight: 160 }}
        >
          {selectedObject ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{selectedObject.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-base">{selectedObject.name}</h3>
                  <span className="text-xs font-mono" style={{ color: selectedObject.color }}>{selectedObject.altitude}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{selectedObject.detail}</p>
              <div className="flex gap-4 text-xs font-mono text-gray-500">
                <span>Lat: {selectedObject.lat.toFixed(2)}°</span>
                <span>Lng: {selectedObject.lng.toFixed(2)}°</span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600 text-sm">
              Cliquez sur un objet pour voir ses détails
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="lg:col-span-2 rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Objets en orbite</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {/* ISS */}
            <button
              onClick={() => issPosition && setSelectedObject({
                id: 'iss', name: 'ISS', lat: issPosition.lat, lng: issPosition.lng,
                color: '#F87171', icon: '🛰️', type: 'station',
                altitude: '~420 km', detail: 'Station Spatiale Internationale — Orbite 51,6° — Période 92 min — 7,66 km/s',
              })}
              className="flex items-center gap-2 text-left hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors"
            >
              <span className="text-base">🛰️</span>
              <div>
                <div className="text-xs font-semibold text-red-400">ISS</div>
                <div className="text-[10px] text-gray-600">~420 km · LEO</div>
              </div>
            </button>
            {/* Moon */}
            <button
              onClick={() => moonPosition && setSelectedObject({
                id: 'moon', name: 'Lune', lat: moonPosition.lat, lng: moonPosition.lng,
                color: '#E5E7EB', icon: '🌙', type: 'moon',
                altitude: '~384 400 km', detail: 'Point sub-lunaire — Position projetée sur la surface terrestre',
              })}
              className="flex items-center gap-2 text-left hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors"
            >
              <span className="text-base">🌙</span>
              <div>
                <div className="text-xs font-semibold text-gray-300">Lune</div>
                <div className="text-[10px] text-gray-600">~384 400 km</div>
              </div>
            </button>
            {/* Instruments */}
            {instruments.map(inst => (
              <button
                key={inst.id}
                onClick={() => setSelectedObject(inst)}
                className="flex items-center gap-2 text-left hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors"
              >
                <span className="text-base">{inst.icon}</span>
                <div>
                  <div className="text-xs font-semibold" style={{ color: inst.color }}>{inst.name}</div>
                  <div className="text-[10px] text-gray-600">{inst.altitude}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="text-[11px] text-gray-700 font-mono">
        * ISS : position live via API · Lune : point sub-lunaire calculé · Télescopes en orbite haute/L2 : positions projetées approximatives
      </p>
    </div>
  );
}

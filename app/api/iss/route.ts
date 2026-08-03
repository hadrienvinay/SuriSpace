// app/api/iss/route.ts
import { NextResponse } from 'next/server';
import { Observer } from 'astronomy-engine';
import { computeNextIssPasses } from '@/lib/issPasses';

function parseCoord(value: string | null, min: number, max: number): number | null {
  if (!value) return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseCoord(searchParams.get('lat'), -90, 90);
    const lon = parseCoord(searchParams.get('lon'), -180, 180);
    const observer = lat !== null && lon !== null ? new Observer(lat, lon, 0) : undefined;

    const res = await fetch('https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE', {
      next: { revalidate: 21_600 }, // TLE valable plusieurs jours — recache toutes les 6h
    });
    if (!res.ok) throw new Error('Erreur de récupération du TLE de l\'ISS');
    const text = await res.text();

    const lines = text.trim().split('\n').map(l => l.trim());
    const line1 = lines.find(l => l.startsWith('1 '));
    const line2 = lines.find(l => l.startsWith('2 '));
    if (!line1 || !line2) throw new Error('TLE ISS invalide');

    const passes = observer
      ? computeNextIssPasses(line1, line2, new Date(), 4, 30, observer)
      : computeNextIssPasses(line1, line2);

    return NextResponse.json({ passes });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors du calcul des passages de l\'ISS' },
      { status: 500 }
    );
  }
}

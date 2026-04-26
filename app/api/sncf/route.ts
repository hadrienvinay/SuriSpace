// app/api/sncf/route.ts
// Next departures from Gare d'Arcachon (UIC 87582668) via SNCF Open Data (Navitia).
// Register a free API key at https://numerique.sncf.com/startup/api/
// then add SNCF_API_KEY=... to your .env file.

import { NextResponse } from 'next/server';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const ARCACHON_STOP_AREA = 'stop_area:SNCF:87582668';

type NavitiaDeparture = {
  display_informations: {
    direction: string;
    commercial_mode: string;
    label?: string;
    headsign?: string;
    network?: string;
    trip_short_name?: string;
  };
  stop_date_time: {
    departure_date_time: string; // ISO-like: 20260426T143000
    base_departure_date_time?: string;
  };
};

// Navitia returns dates like "20260426T143000" (no separators) — convert to ISO
function navitiaDateToIso(s: string): string {
  if (!s || s.length < 15) return s;
  return `${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6,8)}T${s.slice(9,11)}:${s.slice(11,13)}:${s.slice(13,15)}`;
}

export async function GET() {
  const key = process.env.SNCF_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'SNCF_API_KEY non défini' },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.sncf.com/v1/coverage/sncf/stop_areas/${ARCACHON_STOP_AREA}/departures?count=6`;
    const auth = 'Basic ' + Buffer.from(`${key}:`).toString('base64');

    const res = await fetch(url, {
      method: 'GET',
      headers: { Authorization: auth },
      // Cache 60s to avoid hammering the API
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `SNCF API ${res.status}` },
        { status: res.status }
      );
    }

    const data: { departures?: NavitiaDeparture[] } = await res.json();
    const raw = data.departures ?? [];

    const departures = raw.map((d) => {
      const isoTime = navitiaDateToIso(d.stop_date_time.departure_date_time);
      const date = new Date(isoTime);
      const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: fr });
      const time = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      return {
        direction: d.display_informations.direction,
        mode: d.display_informations.commercial_mode, // "TER", "TGV INOUI", "Intercités", etc.
        label: d.display_informations.label ?? d.display_informations.trip_short_name ?? '',
        time,
        timeAgo,
        iso: isoTime,
      };
    });

    return NextResponse.json({ station: 'Arcachon', departures });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur SNCF' },
      { status: 500 }
    );
  }
}

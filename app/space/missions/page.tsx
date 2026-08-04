// app/space/missions/page.tsx  — server component
import type { Metadata } from 'next';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import { missions, solarSystem } from '@/data/space';
import MissionsClient from './MissionsClient';

export const metadata: Metadata = {
  title: 'Missions & Sondes Spatiales',
  description: 'Apollo, Voyager, James Webb, Perseverance… 50+ missions historiques et en cours depuis 1957.',
};

export default function Missions() {
  // Compute static stats server-side — zero JS shipped for this
  const activeCount    = missions.filter(m => m.status === 'active').length;
  const completedCount = missions.filter(m => m.status === 'completed').length;
  const agencyCount    = new Set(missions.map(m => m.agency)).size;

  const allTargetIds = new Set<string>();
  missions.forEach(m => m.target.forEach(t => allTargetIds.add(t)));
  const bodies = [...allTargetIds]
    .map(id => solarSystem.find(b => b.id === id))
    .filter(Boolean)
    .map(b => ({ id: b!.id, nameFr: b!.nameFr, color: b!.color }));

  return (
    <SolarLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/space" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <Link href="/space/carte" className="hover:text-white transition-colors">Système Solaire</Link>
          <span>›</span>
          <span className="text-gray-400">Missions</span>
        </div>

        {/* Header — static, no JS needed */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Missions &amp; Sondes Spatiales
          </h1>
          <p className="text-gray-500 text-base font-mono">
            {activeCount} missions actives · {completedCount} terminées · {missions.length} au total
          </p>
        </div>

        {/* Interactive part — client boundary */}
        <MissionsClient
          missions={missions}
          bodies={bodies}
          activeCount={activeCount}
          completedCount={completedCount}
          agencyCount={agencyCount}
        />

      </div>
    </SolarLayout>
  );
}

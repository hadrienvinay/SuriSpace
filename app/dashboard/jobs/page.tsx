"use client";
import { useEffect, useState } from 'react';

type JobPosting = {
  id: string;
  title: string;
  company: string;
  location: string;
  link?: string;
  source: string;
  sourceUrl?: string;
  date?: string;
  description?: string;
  salary?: string;
};

export default function JobsPage() {
  const [q, setQ] = useState('spatial');
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs(q);
  }, []);

  async function fetchJobs(query: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 mt-10">Recherche d'offres</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="border px-2 py-1 rounded"
          placeholder="Mot-clé (ex: spatial)"
        />
        <button
          onClick={() => fetchJobs(q)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Rechercher
        </button>
      </div>

      {loading && <div>Chargement…</div>}

      {!loading && jobs.length === 0 && <div>Aucune offre trouvée.</div>}

      <ul className="space-y-3">
        {jobs.map((j) => (
          <li key={j.id} className="p-4 border rounded shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{j.title}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">{j.company}</span>
                  {j.location && <span> • {j.location}</span>}
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">{j.source}</span>
            </div>
            {j.salary && <div className="text-sm text-green-600 font-semibold mt-2">💰 {j.salary}</div>}
            {j.date && <div className="text-xs text-gray-500 mt-1">Posté: {new Date(j.date).toLocaleDateString('fr-FR')}</div>}
            {j.description && <p className="text-sm text-gray-700 mt-2 line-clamp-2">{j.description}</p>}
            <div className="mt-3 flex gap-2">
              {j.link ? (
                <a href={j.link} target="_blank" rel="noreferrer" className="inline-block bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700">
                  Voir l'offre →
                </a>
              ) : (
                j.sourceUrl && (
                  <a href={j.sourceUrl} target="_blank" rel="noreferrer" className="inline-block bg-gray-600 text-white px-3 py-1 text-sm rounded hover:bg-gray-700">
                    Source →
                  </a>
                )
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

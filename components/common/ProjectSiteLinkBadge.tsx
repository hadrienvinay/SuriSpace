'use client';

export default function ProjectSiteLinkBadge({ siteUrl }: { siteUrl: string }) {
  return (
    <a
      href={siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110"
      style={{ background: 'rgba(8,12,28,0.75)', backdropFilter: 'blur(4px)', border: '1px solid rgba(96,165,250,0.4)' }}
    >
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14L21 3m0 0h-6m6 0v6M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" />
      </svg>
      Site
    </a>
  );
}

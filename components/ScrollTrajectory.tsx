'use client';

import { useEffect, useRef, useState } from 'react';

interface Waypoint {
  id: string;
  label: string;
}

const WAYPOINTS: Waypoint[] = [
  { id: 'wp-hero',       label: 'Accueil' },
  { id: 'wp-univers',    label: 'Univers' },
  { id: 'wp-savais-tu',  label: 'Savais-tu ?' },
  { id: 'wp-projets',    label: 'Projets' },
  { id: 'wp-liens',      label: 'Liens' },
];

function RocketIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C9 5 8 9 8 12c0 1.8.4 3.2 1 4.3L12 19l3-2.7c.6-1.1 1-2.5 1-4.3 0-3-1-7-4-10Z"
        fill="#60A5FA" stroke="#93C5FD" strokeWidth="1"
      />
      <circle cx="12" cy="10.5" r="1.6" fill="#0b1a42" stroke="#93C5FD" strokeWidth="0.8" />
      <path d="M8 13.5 L5 16.5 L7.5 16 Z" fill="#A78BFA" stroke="#C4B5FD" strokeWidth="0.6" />
      <path d="M16 13.5 L19 16.5 L16.5 16 Z" fill="#A78BFA" stroke="#C4B5FD" strokeWidth="0.6" />
      <path d="M11 18.5 Q12 22 12 23 Q12 22 13 18.5 Z" fill="#FB923C" opacity="0.85">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.6s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export default function ScrollTrajectory() {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0);

      let current = 0;
      WAYPOINTS.forEach((wp, i) => {
        const node = document.getElementById(wp.id);
        if (node && node.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          current = i;
        }
      });
      setActiveIndex(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center"
      style={{ height: 320 }}
      aria-hidden={false}
    >
      <div ref={trackRef} className="relative flex-1 w-px" style={{ background: 'transparent' }}>
        {/* dotted trajectory line */}
        <div
          className="absolute inset-0 w-px"
          style={{ background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.16) 0, rgba(255,255,255,0.16) 3px, transparent 3px, transparent 8px)' }}
        />

        {/* waypoint dots */}
        {WAYPOINTS.map((wp, i) => (
          <button
            key={wp.id}
            onClick={() => jumpTo(wp.id)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer"
            style={{ left: 0, top: `${(i / (WAYPOINTS.length - 1)) * 100}%` }}
            aria-label={`Aller à la section ${wp.label}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 8 : 5,
                height: i === activeIndex ? 8 : 5,
                background: i <= activeIndex ? '#A78BFA' : 'rgba(255,255,255,0.25)',
                boxShadow: i === activeIndex ? '0 0 10px #A78BFA' : 'none',
              }}
            />
            <span
              className="absolute right-4 whitespace-nowrap text-[11px] font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{ background: 'rgba(8,12,28,0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#e9eaf2' }}
            >
              {wp.label}
            </span>
          </button>
        ))}

        {/* rocket marker following scroll progress */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-[top] duration-150 ease-out"
          style={{ left: 0, top: `${progress}%`, filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        >
          <RocketIcon size={16} />
        </div>
      </div>
    </div>
  );
}

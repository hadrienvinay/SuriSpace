'use client';
import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #60A5FA, #A78BFA)',
          boxShadow: '0 0 6px rgba(167,139,250,0.6)',
        }}
      />
    </div>
  );
}

/** Estimate reading time from raw text (200 wpm average). */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

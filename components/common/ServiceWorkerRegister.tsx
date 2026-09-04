'use client';

import { useEffect } from 'react';

/** Enregistre le service worker pour rendre le site installable en PWA. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return null;
}

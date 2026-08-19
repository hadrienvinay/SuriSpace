// Aucun service worker actif pour ce site.
// Ce fichier vide évite un 404 sur /sw.js (requête automatique du navigateur).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

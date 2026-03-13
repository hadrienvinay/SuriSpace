First deployment of my blog with NextJs and Vercel

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Prisma (PostgreSQL) · next-auth v5 · recharts v3 · Mapbox GL · yahoo-finance2

## Dependencies

```bash
# Core
npm install next react react-dom

# DB & Auth
npm install @prisma/client @prisma/adapter-pg pg dotenv
npm install @auth/prisma-adapter next-auth
npm install prisma tsx @types/pg --save-dev

# UI & Charts
npm install react-map-gl mapbox-gl react-icons recharts
npm install @headlessui/react next-themes

# Data
npm install yahoo-finance2 axios cheerio date-fns

# Dev
npm install tailwindcss @tailwindcss/postcss typescript @types/react @types/react-dom eslint eslint-config-next --save-dev
```

## PostgreSQL

```bash
brew services start postgresql
brew services stop postgresql@14
```

## Prisma

```bash
npx prisma generate          # Générer le client après changement de schéma
npx prisma db push            # Synchroniser le schéma sans migration (préféré)
npx prisma migrate dev --name init  # Créer une migration
npx prisma migrate reset      # Reset complet de la DB
npx prisma db seed             # Peupler la DB
npx prisma studio              # Interface web pour explorer les données
```

## Scripts npm

```bash
npm run dev       # Serveur de développement (http://localhost:3000)
npm run build     # Build de production (prisma generate + next build)
npm run start     # Serveur de production
npm run lint      # ESLint
```

## API externes
| Service | Coût | Usage |
|---------|------|-------|
| Weather | Gratuit | Météo Paris / Madrid / Arcachon |
| Mapbox | 50k req gratuites puis payant | Cartes (orbitale, localisations) |
| RATP | Gratuit | Transports en commun |
| Gold/Silver | Gratuit | Cours des métaux |
| Yahoo Finance | Gratuit | Cours actions, crypto, ETF |
| Where The ISS At | Gratuit | Position ISS en temps réel |

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


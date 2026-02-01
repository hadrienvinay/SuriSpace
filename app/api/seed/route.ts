// pages/api/seed.ts
import { main } from '@/prisma/seed';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Ajoute une protection par mot de passe ou IP si nécessaire
  if (req.query.secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Ici, tu appelles ton script de seed
    await main();
    return res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error seeding database' });
  }
}

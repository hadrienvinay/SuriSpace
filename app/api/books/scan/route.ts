import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { image } = await req.json();
    if (!image) return NextResponse.json({ error: 'Image requise' }, { status: 400 });

    // image = data URL "data:image/jpeg;base64,..."
    const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) return NextResponse.json({ error: 'Format image invalide' }, { status: 400 });

    const mimeType = match[1];
    const base64Data = match[2];

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: { mimeType, data: base64Data },
      },
      `Analyse cette couverture de livre. Identifie le titre et l'auteur à partir de l'image.
Pour l'année de première publication : si elle est visible sur la couverture, utilise-la. Sinon, utilise tes connaissances pour retrouver l'année de première publication originale de ce livre.
Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks :
{"title": "titre du livre", "author": "auteur", "date": "année de publication (4 chiffres)"}
Si tu ne peux pas identifier une information, mets une chaîne vide.`,
    ]);

    const text = result.response.text().trim();
    // Nettoyer au cas où Gemini ajoute des backticks markdown
    const cleaned = text.replace(/^```json?\s*/, '').replace(/\s*```$/, '').trim();
    const bookInfo = JSON.parse(cleaned);

    return NextResponse.json(bookInfo);
  } catch (err) {
    console.error('POST /api/books/scan error', err);
    return NextResponse.json({ error: 'Erreur lors de l\'analyse de l\'image' }, { status: 500 });
  }
}

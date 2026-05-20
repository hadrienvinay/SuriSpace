import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// In-memory rate limit store: ip → [timestamps]
// Resets on server restart (serverless) — acceptable for a personal site
const ipLog = new Map<string, number[]>();
const RATE_LIMIT = 3;       // max requests
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipLog.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  ipLog.set(ip, timestamps);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  // Rate limiting by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Réessayez dans 10 minutes.' },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const name    = (formData.get('name')    as string | null)?.trim() ?? '';
    const email   = (formData.get('email')   as string | null)?.trim() ?? '';
    const message = (formData.get('message') as string | null)?.trim() ?? '';

    // Input validation
    if (!name || name.length > 100) {
      return NextResponse.json({ error: 'Nom invalide (1–100 caractères)' }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message trop long (max 2000 caractères)' }, { status: 400 });
    }

    // Persist to DB
    await prisma.message.create({ data: { name, email, message } });

    // Send email notification when Resend is configured
    if (resend && process.env.CONTACT_EMAIL) {
      const safeMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const safeName    = name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      await resend.emails.send({
        from:    'Suri Space <onboarding@resend.dev>',
        to:      process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `[Suri Space] Message de ${safeName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#f9fafb;border-radius:8px">
            <h2 style="color:#111827;margin:0 0 16px">Nouveau message de contact</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;width:80px">Nom</td><td style="padding:8px 0;font-weight:600">${safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#4f46e5">${email}</a></td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e7eb">
              <p style="margin:0;color:#374151;white-space:pre-wrap">${safeMessage || '(aucun message)'}</p>
            </div>
            <p style="margin-top:16px;font-size:12px;color:#9ca3af">Répondre à cet email contacte directement ${safeName}.</p>
          </div>`,
      });
    }

    return NextResponse.json({ message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Erreur contact:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}

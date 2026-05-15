import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name    = (formData.get('name')    as string)?.trim();
    const email   = (formData.get('email')   as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    if (!name || !email) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 });
    }

    // Always persist to DB
    await prisma.message.create({ data: { name, email, message: message ?? '' } });

    // Send email notification when Resend is configured
    if (resend && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from:    'Suri Space <onboarding@resend.dev>',
        to:      process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `[Suri Space] Message de ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#f9fafb;border-radius:8px">
            <h2 style="color:#111827;margin:0 0 16px">Nouveau message de contact</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;width:80px">Nom</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#4f46e5">${email}</a></td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e7eb">
              <p style="margin:0;color:#374151;white-space:pre-wrap">${message ?? '(aucun message)'}</p>
            </div>
            <p style="margin-top:16px;font-size:12px;color:#9ca3af">Répondre à cet email contacte directement ${name}.</p>
          </div>`,
      });
    }

    return NextResponse.json({ message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Erreur contact:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}

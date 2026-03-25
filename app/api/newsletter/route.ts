import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const { email: rawEmail } = await req.json();

    if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquante");
      return NextResponse.json(
        { error: "Configuration email manquante." },
        { status: 500 },
      );
    }

    const email = esc(rawEmail);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clement-seguin.fr";
    const unsubscribeToken = Buffer.from(rawEmail).toString("base64url");
    const unsubscribeUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(rawEmail)}&token=${unsubscribeToken}`;

    // Ajouter à l'audience Resend si RESEND_AUDIENCE_ID est défini
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email: rawEmail,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    // Notification à Clément
    await resend.emails.send({
      from: "Newsletter <noreply@clement-seguin.fr>",
      to: [process.env.CONTACT_EMAIL_TO || "contact@clement-seguin.fr"],
      subject: `Nouvel abonné newsletter — ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #2D9E6B;">Nouvel abonné newsletter</h2>
          <p>Email : <strong><a href="mailto:${email}" style="color: #2D9E6B;">${email}</a></strong></p>
        </div>
      `,
    });

    // Email de bienvenue à l'abonné
    await resend.emails.send({
      from: "Clément Seguin <noreply@clement-seguin.fr>",
      to: [email],
      subject: "Tu seras notifié du prochain article",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #07080A; color: #EDF2ED; padding: 40px 32px; border-radius: 12px;">
          <h2 style="color: #2D9E6B; margin-bottom: 16px;">C'est bon !</h2>
          <p style="color: #8A9A8B; line-height: 1.7;">
            Tu seras notifié dès la sortie du prochain article — conseils Webflow, UX et automatisations.
          </p>
          <p style="color: #8A9A8B; line-height: 1.7; margin-top: 12px;">
            En attendant, si tu as un projet à me soumettre :
          </p>
          <a href="https://clement-seguin.fr/fr#contact"
            style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #2D9E6B; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Réserver un appel gratuit →
          </a>
          <p style="margin-top: 32px; color: #4A574B; font-size: 13px;">
            <a href="${unsubscribeUrl}" style="color: #4A574B;">Se désabonner en 1 clic</a> — pas de spam, jamais.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur newsletter:", err);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription. Réessaie dans un instant." },
      { status: 500 },
    );
  }
}

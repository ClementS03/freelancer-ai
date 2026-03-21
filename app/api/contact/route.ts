import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, activity, site, offer, message } = body;

    if (!name || !email || !activity || !offer) {
      return NextResponse.json(
        { error: "Champs requis manquants." },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquante");
      return NextResponse.json(
        { error: "Configuration email manquante." },
        { status: 500 },
      );
    }

    // Init à la demande — pas au build
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      // Utilise onboarding@resend.dev si le domaine n'est pas encore vérifié
      // Une fois clement-seguin.fr vérifié dans Resend → remplacer par :
      // from: "Clément Seguin <noreply@clement-seguin.fr>",
      from: "Contact Form <noreply@clement-seguin.fr>",
      to: [process.env.CONTACT_EMAIL_TO || "contact@clement-seguin.fr"],
      replyTo: email,
      subject: `Nouvelle demande — ${offer}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2D9E6B; margin-bottom: 24px;">
            Nouvelle demande de contact
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Prénom</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #2D9E6B;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Activité</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${activity}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Site actuel</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${site || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Offre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #2D9E6B;">${offer}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 10px 0;">${message || "—"}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #f0faf5; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Répondre directement à cet email répondra à <strong>${email}</strong>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur Resend:", err);
    return NextResponse.json(
      {
        error:
          "Erreur lors de l'envoi. Réessayez ou contactez-moi directement.",
      },
      { status: 500 },
    );
  }
}

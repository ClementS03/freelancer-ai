import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  // Validation basique : token = base64(email)
  if (!email || !token) {
    return new NextResponse(html("Lien invalide.", false), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const expected = Buffer.from(email).toString("base64url");
  if (token !== expected) {
    return new NextResponse(html("Lien invalide ou expiré.", false), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Marquer comme désabonné dans Resend Audiences si configuré
  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.contacts.update({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: true,
      });
    } catch {
      // Ne pas bloquer l'utilisateur si Resend échoue
    }
  }

  return new NextResponse(html("Tu es bien désabonné.", true), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function html(message: string, success: boolean) {
  const color = success ? "#2D9E6B" : "#E55";
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Désabonnement</title>
  <style>
    body { font-family: sans-serif; background: #07080A; color: #EDF2ED;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; }
    .box { text-align: center; max-width: 400px; padding: 40px 32px; }
    h1 { color: ${color}; font-size: 1.5rem; margin-bottom: 12px; }
    p { color: #8A9A8B; line-height: 1.6; }
    a { color: #2D9E6B; }
  </style>
</head>
<body>
  <div class="box">
    <h1>${message}</h1>
    <p>${success
      ? "Tu ne recevras plus de notifications de nouveaux articles."
      : "Vérifie que le lien est complet."
    }</p>
    <p style="margin-top:24px"><a href="https://clement-seguin.fr/fr">← Retour au site</a></p>
  </div>
</body>
</html>`;
}

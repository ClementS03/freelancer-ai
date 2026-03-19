import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Handles the contact form submission.
 * Currently logs to console — wire up Resend or Formspree below.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, activity, site, offer, message } = body;

    // Basic validation
    if (!name || !email || !activity || !offer) {
      return NextResponse.json(
        { error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    // ── Option A: Resend ────────────────────────────────────
    // Uncomment and install: npm install resend
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: "Contact Form <noreply@votrenom.fr>",
    //   to: process.env.CONTACT_EMAIL_TO!,
    //   subject: `Nouvelle demande — ${offer}`,
    //   text: `
    //     Nom: ${name}
    //     Email: ${email}
    //     Activité: ${activity}
    //     Site actuel: ${site || "—"}
    //     Offre: ${offer}
    //     Message: ${message || "—"}
    //   `,
    // });

    // ── Option B: Formspree ─────────────────────────────────
    // Set NEXT_PUBLIC_FORMSPREE_ID in .env.local
    // Then call from the client directly — no API route needed.
    // Docs: https://formspree.io/docs

    // ── Dev fallback: just log ──────────────────────────────
    console.log("📧 Contact form submission:", {
      name,
      email,
      activity,
      site,
      offer,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez plus tard." },
      { status: 500 }
    );
  }
}

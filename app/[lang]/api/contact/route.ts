import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, activity, offer } = body;

    if (!name || !email || !activity || !offer) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // ── Option A: Resend (recommended) ─────────────────────
    // npm install resend
    // Then uncomment:
    //w
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Contact <noreply@clement-seguin.fr>",
    //   to: process.env.CONTACT_EMAIL_TO!,
    //   subject: `New request — ${offer}`,
    //   text: JSON.stringify(body, null, 2),
    // });

    // ── Option B: Formspree ─────────────────────────────────
    // Call Formspree directly from the client — no API route needed.
    // Set NEXT_PUBLIC_FORMSPREE_ID in .env.local and call:
    // fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, ...)

    // Dev: log only
    console.log("📧 Contact form:", body);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

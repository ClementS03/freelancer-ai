import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, activity, offer } = body;
    if (!name || !email || !activity || !offer) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    // TODO: wire up Resend or Formspree here — see README
    console.log("📧 Contact form:", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

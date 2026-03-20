import { notFound } from "next/navigation";
import { isValidLocale, getContent, type Locale } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { TechLogos, StatsStrip } from "@/components/sections/SocialProof";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Offers } from "@/components/sections/Offers";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale = lang as Locale;
  const c = getContent(locale);

  return (
    <>
      {/* Conversion funnel order:
          1. Hook    → Hero
          2. Proof   → Logo bar
          3. Empathy → Problem
          4. Numbers → Stats strip
          5. Trust   → Process
          6. Offer   → Offers
          7. Social  → Testimonials
          8. Human   → About
          9. Clarity → FAQ
         10. Convert → CTA + Form
      */}
      <Hero content={c.hero} locale={locale} />
      <TechLogos label={c.logosBar.label} />
      <Problem content={c.problem} />
      <StatsStrip locale={locale} />
      <Process content={c.process} />
      <Offers content={c.offers} />
      <Testimonials content={c.testimonials} />
      <About content={c.about} />
      <FAQ content={c.faq} meta={c.meta} />
      <CTA content={c.cta} contactContent={c.contact} meta={c.meta} />
    </>
  );
}

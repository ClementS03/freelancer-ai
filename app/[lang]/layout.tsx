import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isValidLocale, getContent, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HtmlLangSetter } from "@/components/layout/HtmlLangSetter";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clementseguin.fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const c    = getContent(lang as Locale);
  const isFr = lang === "fr";

  return {
    title: isFr
      ? "Clément Seguin — Webdesigner Webflow | Sites premium pour coachs & consultants"
      : "Clément Seguin — Webflow Designer | Premium sites for coaches & consultants",
    description: isFr
      ? "Clément Seguin, webdesigner Webflow freelance. Sites premium pour coachs, consultants et thérapeutes — livrés en 5 jours avec automatisations sur-mesure. 100% remote."
      : "Clément Seguin, freelance Webflow designer. Premium websites for coaches, consultants and therapists — delivered in 5 days with custom automations. 100% remote.",
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        fr:          `${SITE_URL}/fr`,
        en:          `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      title: isFr
        ? "Clément Seguin — Sites Webflow premium en 5 jours"
        : "Clément Seguin — Premium Webflow sites in 5 days",
      description: c.meta.description,
      url:    `${SITE_URL}/${lang}`,
      locale: isFr ? "fr_FR" : "en_US",
      alternateLocale: isFr ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale  = lang as Locale;
  const content = getContent(locale);

  return (
    <>
      <HtmlLangSetter locale={locale} />
      <Navbar content={content.nav} locale={locale} meta={content.meta} />
      <main>{children}</main>
      <Footer content={content.footer} meta={content.meta} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isValidLocale, getContent, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HtmlLangSetter } from "@/components/layout/HtmlLangSetter";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const c = getContent(lang as Locale);
  return {
    title: `${c.meta.siteName} — ${c.meta.tagline}`,
    description: c.meta.description,
    alternates: {
      canonical: `https://${c.meta.domain}/${lang}`,
      languages: {
        fr: `https://${c.meta.domain}/fr`,
        en: `https://${c.meta.domain}/en`,
        "x-default": `https://${c.meta.domain}/fr`,
      },
    },
    openGraph: {
      title: `${c.meta.siteName} — ${c.meta.tagline}`,
      description: c.meta.description,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
    },
  };
}

/**
 * Layout de langue — PAS de <html>/<body>.
 * Ces balises vivent exclusivement dans app/layout.tsx.
 */
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

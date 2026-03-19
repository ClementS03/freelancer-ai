import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `Blog — ${content.meta.siteName}`,
  description: "Conseils, stratégies et ressources pour coachs et consultants qui veulent une présence en ligne qui convertit.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

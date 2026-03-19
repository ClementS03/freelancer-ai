import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechLogos, StatsStrip } from "@/components/sections/SocialProof";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Offers } from "@/components/sections/Offers";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hero — capture attention & value prop */}
        <Hero />

        {/* 2. Tech logos — credibility */}
        <TechLogos />

        {/* 3. Problem — empathy & identification */}
        <Problem />

        {/* 4. Stats strip */}
        <StatsStrip />

        {/* 5. Process — trust via transparency */}
        <Process />

        {/* 6. Offers — conversion anchor */}
        <Offers />

        {/* 7. Testimonials — social proof */}
        <Testimonials />

        {/* 8. About — humanize & differentiate */}
        <About />

        {/* 9. FAQ — remove last objections */}
        <FAQ />

        {/* 10. CTA + Contact form — conversion */}
        <CTA />
      </main>

      <Footer />
    </>
  );
}

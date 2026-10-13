import { DemoSection } from "@/components/demo/DemoSection";
import { Band } from "@/components/hero/Band";
import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Pilot } from "@/components/pilot/Pilot";
import { Problem } from "@/components/problem/Problem";
import { Faq } from "@/components/sections/Faq";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Principles } from "@/components/sections/Principles";
import { Roadmap } from "@/components/sections/Roadmap";
import { UseCases } from "@/components/sections/UseCases";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="wrap">
          <Hero />
          <Band />
        </div>
        <Problem />
        <HowItWorks />
        <DemoSection />
        <Principles />
        <UseCases />
        <Roadmap />
        <Pilot />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

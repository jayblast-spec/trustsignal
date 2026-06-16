"use client";

import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ScanForm from "./components/ScanForm";
import Footer from "./components/Footer";

export default function Home() {
  const scanRef = useRef<HTMLDivElement>(null);

  function scrollToScan() {
    scanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <HeroSection onScanClick={scrollToScan} />
      <FeaturesSection />
      <div ref={scanRef} className="scroll-mt-8 pt-8">
        <div className="mx-auto max-w-2xl px-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Scan a domain</h2>
          <p className="text-sm text-muted mt-1">
            Enter any domain — yours, a competitor&apos;s, or a vendor you&apos;re evaluating. Get a full security report in seconds.
          </p>
        </div>
        <ScanForm />
      </div>
      <Footer />
    </main>
  );
}

"use client";

import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import ScanForm from "./components/ScanForm";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";

export default function Home() {
  const scanRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection onScanClick={() => scanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} />
      <div ref={scanRef}>
        <ScanForm />
      </div>
      <FeaturesSection />
      <Footer />
    </main>
  );
}

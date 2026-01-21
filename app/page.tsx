"use client"
import { VideoHero } from "@/components/home/VideoHero";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/home/CtaSection";
import { LoadItemInfo } from "@/components/side-effects/LoadItemInfo"


export default function Home() {

  return (
    <main className="max-w-5xl mx-auto">
      <VideoHero />
      <FeaturesSection />
      <AboutSection />
      <CtaSection />
      <LoadItemInfo />
    </main>
  );
}

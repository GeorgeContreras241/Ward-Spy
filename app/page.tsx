"use client"
import { VideoHero } from "@/components/home/VideoHero";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AboutSection } from "@/components/home/AboutSection";

export default function Home() {


  return (
    <main className="max-w-5xl mx-auto">
      <VideoHero />
      <FeaturesSection />
      <AboutSection />

      {/* CTA Section */}
      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-2">¿Listo para mejorar?</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Únete a la comunidad de Ward Spy y lleva tu juego al siguiente nivel.
            </p>
            <a
              href="/summoner"
              className="inline-flex items-center px-4 py-1.5 bg-primary text-white text-xs font-medium rounded hover:bg-primary/90 transition-colors"
            >
              Empezar ahora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

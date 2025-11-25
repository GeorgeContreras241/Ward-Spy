'use client';

import { useEffect, useRef } from 'react';

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay video when component mounts
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
        }
      } catch (err) {
        console.log('Autoplay prevented:', err);
      }
    };
    
    playVideo();
  }, []);

  return (
    <div className="relative w-full p-4 overflow-hidden bg-background border-b">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-background z-10" />
      
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Ward Spy
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Analiza y mejora tu rendimiento en League of Legends con estadísticas detalladas.
          </p>
          <div className="flex flex-wrap gap-2">
            <a 
              href="/summoner" 
              className="px-4 py-1.5 bg-primary text-white rounded text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              Buscar Invocador
            </a>
            <a 
              href="#features" 
              className="px-4 py-1.5 border border-border bg-card text-foreground rounded text-xs font-medium hover:bg-accent/50 transition-colors"
            >
              Ver Características
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="relative w-full p-6 md:p-8 overflow-hidden bg-gradient-to-br from-primary/90 to-primary/70 dark:from-primary/80 dark:to-primary/60">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] z-10" />
      
      <div className="relative z-20 max-w-5xl mx-auto h-full flex flex-col justify-center px-4">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm text-white rounded-full mb-4 border border-white/20">
            Proyecto en desarrollo
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ward Spy
          </h1>
          <p className="text-white/90 text-base md:text-lg mb-6">
            Analiza tus partidas de League of Legends, sigue tu progreso y mejora tu rendimiento con estadísticas detalladas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="/summoner" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Buscar Invocador
            </a>
            <a 
              href="#features" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
            >
              Ver características
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

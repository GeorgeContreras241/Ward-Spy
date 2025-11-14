import React from 'react';
import { ArrowRight, BarChart2, Eye, Search, Shield, Users } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: 'Estadísticas Detalladas',
      description: 'Analiza tu rendimiento con estadísticas avanzadas y métricas detalladas de tus partidas.'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Búsqueda Avanzada',
      description: 'Encuentra cualquier invocador y accede a su historial de partidas de manera rápida y sencilla.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Seguimiento en Tiempo Real',
      description: 'Monitorea partidas en vivo y obtén información en tiempo real sobre el rendimiento de los jugadores.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Análisis de Partidas',
      description: 'Revisa tus partidas anteriores para identificar fortalezas y áreas de mejora.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Compara con Otros',
      description: 'Compara tu rendimiento con otros jugadores y descubre nuevas estrategias.'
    },
    {
      icon: <ArrowRight className="w-8 h-8" />,
      title: 'Mejora Constante',
      description: 'Sigue tu progreso a lo largo del tiempo y alcanza nuevas clasificaciones.'
    }
  ];

  return (
    <section id="features" className="py-4">
      <div className="container mx-auto px-4">
        <div className="text-start mb-6 px-4">
          <h2 className="text-xl font-bold">Características</h2>
          <p className="text-xs text-muted-foreground">
            Mejora tu juego con Ward Spy
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-3 rounded border border-border hover:border-primary/20 transition-colors text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-primary/5 text-ring">
                  {React.cloneElement(feature.icon, { className: 'w-4 h-4' })}
                </div>
                <h3 className="font-medium">{feature.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

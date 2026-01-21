import React from 'react';
import { BarChart2, Search, Users } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <BarChart2 />,
      title: 'Estadísticas',
      description: 'Métricas detalladas de partidas'
    },
    {
      icon: <Search />,
      title: 'Búsqueda',
      description: 'Encuentra invocadores fácilmente'
    },
    {
      icon: <Users />,
      title: 'Comparativas',
      description: 'Analiza tu rendimiento'
    }
  ];

  return (
    <section className="py-8 border-t">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-6">Funcionalidades</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {React.cloneElement(feature.icon, { className: 'w-5 h-5' })}
                </div>
                <h3 className="font-medium">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

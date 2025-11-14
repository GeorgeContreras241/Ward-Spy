import { Trophy, BarChart3, Users } from 'lucide-react';

export function AboutSection() {
  const stats = [
    { value: '100%', label: 'Precisión', icon: <Trophy className="w-4 h-4" /> },
    { value: '24/7', label: 'Online', icon: <BarChart3 className="w-4 h-4" /> },
    { value: 'IA', label: 'Proximamente', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <section className="py-8  bg-card border-t px-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold mb-2">Sobre Ward Spy</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Mejora tu rendimiento en League of Legends con análisis detallados.
            </p>
            
            <div className="flex gap-2 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex-1 text-center p-2 bg-background rounded border text-xs">
                  <div className="text-ring flex justify-center mb-1">
                    {stat.icon}
                  </div>
                  <div className="font-semibold">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 h-40 md:h-48 bg-muted/50 rounded border overflow-hidden">
            <img
              src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/10/yuta-okkotsu-jujutsu-kaisen.jpeg?w=1600&h=900&fit=crop"
              alt="Ward Spy en acción"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

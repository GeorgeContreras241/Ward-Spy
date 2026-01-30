import { Code, Cpu, Wrench, AlertTriangle, Info, User } from 'lucide-react';

export function AboutSection() {
  const techStack = [
    { name: 'Next.js', description: 'Framework principal del proyecto' },
    { name: 'React 19', description: 'Para la interfaz de usuario' },
    { name: 'TypeScript', description: 'Tipado estático para mejor desarrollo' },
    { name: 'Tailwind CSS', description: 'Estilización de componentes' },
    { name: 'MongoDB', description: 'Almacenamiento de datos' },
    { name: 'Riot Games API', description: 'Datos de League of Legends' },
  ];

  return (
    <section className="py-12 bg-card border-t px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Sobre este proyecto</h2>
          <p className="text-muted-foreground">
            Un proyecto personal para analizar partidas de League of Legends
          </p>
        </div>

        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-200">Proyecto personal</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Este es un proyecto personal desarrollado como un ejercicio de programación y aprendizaje.
                No está destinado a uso comercial ni público en general.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-200">Limitaciones de la API</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Este proyecto utiliza la API de Riot Games, que tiene límites estrictos en la cantidad de solicitudes.
                Por esta razón, las búsquedas y actualizaciones de datos están limitadas para cumplir con estos requisitos.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Stack tecnológico
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {techStack.map((tech, index) => (
                <div key={index} className="p-3 bg-background rounded-lg border text-sm">
                  <h4 className="font-medium">{tech.name}</h4>
                  <p className="text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Estado actual
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-background rounded-lg border">
                <h4 className="font-medium">En desarrollo</h4>
                <p className="text-sm text-muted-foreground">
                  Actualmente trabajando en mejoras y nuevas funcionalidades.
                </p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-700 dark:text-yellow-300">Limitaciones</h4>
                <ul className="text-sm text-yellow-600 dark:text-yellow-400 list-disc pl-5 mt-1 space-y-1">
                  <li>Solo disponible para la región LAN (Latinoamérica Norte)</li>
                  <li>Uso limitado debido a restricciones de la API de Riot Games</li>
                  <li>Algunas características como Clash están en desarrollo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

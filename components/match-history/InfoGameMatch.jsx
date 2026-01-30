"use client"
import { PlayerList } from "@/components/match-history/PlayerList"
import { Chart } from "@/components/summoner/Chart"
import { Button } from "@/components/ui/button"
import { useState } from "react"


const stats = [
  { id: 1, name: "k", label: "Asesinatos" },
  { id: 2, name: "d", label: "Muertes" },
  { id: 3, name: "a", label: "Asistencias" },
  { id: 5, name: "ge", label: "Oro ganado" },
  { id: 6, name: "gs", label: "Oro gastado" },
  { id: 7, name: "cs", label: "Súbditos (CS)" },
  { id: 8, name: "lvl", label: "Nivel de campeón" },
  { id: 9, name: "xp", label: "Experiencia" },

  // Daño
  { id: 12, name: "dc", label: "Daño a campeones" },
  { id: 14, name: "dmc", label: "Daño mágico a campeones" },
  { id: 16, name: "dpc", label: "Daño físico a campeones" },
  { id: 18, name: "dvc", label: "Daño verdadero a campeones" },

  // Daño recibido / mitigado
  { id: 19, name: "dtk", label: "Daño recibido" },
  { id: 20, name: "dtk", label: "Daño mágico recibido" },
  { id: 21, name: "dfk", label: "Daño físico recibido" },

  // Objetivos
  { id: 28, name: "db", label: "Daño a torres" },
  { id: 31, name: "k", label: "Barones asesinados" },
  { id: 32, name: "k", label: "Dragones asesinados" },
  { id: 33, name: "k", label: "Inhibidores destruidos" },
  { id: 34, name: "k", label: "Torretas destruidas" },

  // Control de visión
  { id: 35, name: "vs", label: "Puntuación de visión" },
  { id: 36, name: "wp", label: "Wards colocados" },
  { id: 37, name: "wk", label: "Wards destruidos" },

  // Otras estadísticas
  { id: 40, name: "ttd", label: "Tiempo total muerto (s)" },
]



export const InfoGameMatch = ({ dataPlayers, version, urlListSpell, perks = [] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStat, setSelectedStat] = useState(stats[0]);
  const sortedPlayers = [...dataPlayers].sort((a, b) => {
    if (a.w && !b.w) return -1;
    if (!a.w && b.w) return 1;
    return 0;
  });


  return (
    <div className="w-full bg-[#1e1e1e] rounded-lg  shadow-lg text-[11px] md:text-xs px-1">
      {/* Navigation Tabs */}
      <nav className="flex border-b border-gray-700 px-1">
        <button onClick={() => setActiveTab(0)} className={`${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-400' : ''} px-2 py-1.5 text-xs font-medium  hover:bg-gray-800 transition-colors`}>
          Resumen
        </button>
        <button onClick={() => setActiveTab(1)} className={`${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-400' : ''} px-2 py-1.5 text-xs font-medium hover:bg-gray-800 transition-colors`}>
          Graficas
        </button>
      </nav>
      {console.log(sortedPlayers)}
      {/* info Player extend */}
      {activeTab === 0 && (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 p-1.5 ">
          <div className="overflow-x-auto rounded border border-gray-700 bg-gray-800/50">
            <div className="min-w-[480px] w-full">
              {sortedPlayers.map((player, index) => (
                player.ti === 100 ?
                  <PlayerList player={player} key={index} version={version} urlListSpell={urlListSpell} perks={perks} />
                  : null
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded border border-gray-700 bg-gray-800/50">
            <div className="min-w-[480px] w-full">
              {sortedPlayers.map((player, index) => (
                player.ti === 200 ?
                  <PlayerList player={player} key={index} version={version} urlListSpell={urlListSpell} perks={perks} />
                  : null
              ))}
            </div>
          </div>
        </div>
      )}
      {/* graphics */}
      {activeTab === 1 && (
        <div className="p-1.5">
          <h3 className="text-white text-md font-medium mb-2 px-1">Graficas de estadísticas</h3>
          <div className="flex flex-col md:flex-row items-start gap-4 justify-center">
            <div className="w-full flex items-center justify-center">
              <Chart dataPlayers={sortedPlayers} stat={selectedStat} version={version}  />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {
                stats.map((stat) => (
                  <Button
                    key={stat.id}
                    className="h-6"
                    variant={stat.name !== selectedStat.name ? 'default' : 'destructive'}
                    onClick={() => setSelectedStat(stat)}
                  >
                    {stat.label}
                  </Button>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

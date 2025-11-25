"use client"
import { PlayerList } from "@/components/match-history/PlayerList"
import { Chart } from "@/components/summoner/Chart"
import { Button } from "@/components/ui/button"
import { useState } from "react"


const stats = [
  { id: 1, name: "kills", label: "Asesinatos" },
  { id: 2, name: "deaths", label: "Muertes" },
  { id: 3, name: "assists", label: "Asistencias" },
  { id: 5, name: "goldEarned", label: "Oro ganado" },
  { id: 6, name: "goldSpent", label: "Oro gastado" },
  { id: 7, name: "totalMinionsKilled", label: "Súbditos (CS)" },
  { id: 8, name: "longestTimeSpentLiving", label: "Monstruos neutrales" },
  { id: 9, name: "champExperience", label: "Experiencia" },
  { id: 10, name: "champLevel", label: "Nivel de campeón" },

  // Daño
  { id: 11, name: "totalDamageDealt", label: "Daño total infligido" },
  { id: 12, name: "totalDamageDealtToChampions", label: "Daño a campeones" },
  { id: 13, name: "magicDamageDealt", label: "Daño mágico infligido" },
  { id: 14, name: "magicDamageDealtToChampions", label: "Daño mágico a campeones" },
  { id: 15, name: "physicalDamageDealt", label: "Daño físico infligido" },
  { id: 16, name: "physicalDamageDealtToChampions", label: "Daño físico a campeones" },
  { id: 17, name: "trueDamageDealt", label: "Daño verdadero infligido" },
  { id: 18, name: "trueDamageDealtToChampions", label: "Daño verdadero a campeones" },

  // Daño recibido / mitigado
  { id: 19, name: "totalDamageTaken", label: "Daño recibido" },
  { id: 20, name: "magicDamageTaken", label: "Daño mágico recibido" },
  { id: 21, name: "physicalDamageTaken", label: "Daño físico recibido" },
  { id: 22, name: "trueDamageTaken", label: "Daño verdadero recibido" },
  { id: 23, name: "damageSelfMitigated", label: "Daño mitigado" },
  { id: 24, name: "totalDamageShieldedOnTeammates", label: "Daño bloqueado en aliados" },

  // Curación
  { id: 25, name: "totalHeal", label: "Curación total" },
  { id: 26, name: "totalHealsOnTeammates", label: "Curación a aliados" },
  { id: 27, name: "totalUnitsHealed", label: "Unidades curadas" },

  // Objetivos
  { id: 28, name: "damageDealtToBuildings", label: "Daño a torres" },
  { id: 29, name: "damageDealtToTurrets", label: "Daño a torretas" },
  { id: 30, name: "damageDealtToObjectives", label: "Daño a objetivos" },
  { id: 31, name: "baronKills", label: "Barones asesinados" },
  { id: 32, name: "dragonKills", label: "Dragones asesinados" },
  { id: 33, name: "inhibitorKills", label: "Inhibidores destruidos" },
  { id: 34, name: "turretKills", label: "Torretas destruidas" },

  // Control de visión
  { id: 35, name: "visionScore", label: "Puntuación de visión" },
  { id: 36, name: "wardsPlaced", label: "Wards colocados" },
  { id: 37, name: "wardsKilled", label: "Wards destruidos" },
  { id: 38, name: "visionWardsBoughtInGame", label: "Wards de control comprados" },

  // Otras estadísticas
  { id: 39, name: "longestTimeSpentLiving", label: "Tiempo vivo más largo (s)" },
  { id: 40, name: "totalTimeSpentDead", label: "Tiempo total muerto (s)" },
  { id: 41, name: "timeCCingOthers", label: "Tiempo de CC a enemigos" },
  { id: 42, name: "totalTimeCCDealt", label: "Tiempo total de CC infligido" },
]



export const InfoGameMatch = ({ dataPlayers }) => {
  console.log(dataPlayers[0].timePlayed)
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStat, setSelectedStat] = useState(stats[0]);

  const sortedPlayers = [...dataPlayers].sort((a, b) => {
    if (a.win && !b.win) return -1;
    if (!a.win && b.win) return 1;
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

      {/* Players List */}
      {activeTab === 0 && (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 p-1.5 ">
          <div className="overflow-x-auto rounded border border-gray-700 bg-gray-800/50">
            <div className="min-w-[480px] w-full">
              {sortedPlayers.map((player, index) => (
                player.teamId === 100 ?
                  <PlayerList player={player} key={index} />
                  : null
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded border border-gray-700 bg-gray-800/50">
            <div className="min-w-[480px] w-full">
              {sortedPlayers.map((player, index) => (
                player.teamId === 200 ?
                  <PlayerList player={player} key={index} />
                  : null
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className="p-1.5">
          <h3 className="text-white text-md font-medium mb-2 px-1">Graficas de estadísticas</h3>
          <div className="bg-gray-800/80 grid grid-cols-1 md:grid-cols-2 gap-2 justify-around p-1 rounded border border-gray-700">
            <div className="min-h-[300px] w-fit flex items-center justify-center">
              <Chart dataPlayers={dataPlayers} stat={selectedStat} />
            </div>
            <div className="flex flex-wrap gap-x-[1px]">
              {
                stats.map((stat) => (
                  <Button
                    key={stat.id}
                    className={`w-fit text-[10px] font-bold hover:bg-gray-100/20 cursor-pointer h-5 px-2`}
                    variant={stat.name != selectedStat.name ? 'default' : 'destructive'}
                    onClick={() => setSelectedStat({ id: stat.id, name: stat.name })}
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

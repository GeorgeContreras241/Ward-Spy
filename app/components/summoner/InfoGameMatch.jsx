import { PlayerList } from "@/app/components/ui/PlayerList"

export const InfoGameMatch = ({ dataPlayers }) => {
 


  const sortedPlayers = [...dataPlayers].sort((a, b) => {
    if (a.win && !b.win) return -1;
    if (!a.win && b.win) return 1;
    return 0;
  });

  return (
    <div className=" w-full bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg text-[11px] md:text-xs px-1">
      {/* Navigation Tabs */}
      <nav className="flex border-b border-gray-700 px-1">
        <button className="px-2 py-1.5 text-xs font-medium text-blue-400 border-b-2 border-blue-500 hover:bg-gray-800 transition-colors">
          Resumen
        </button>
        <button className="px-2 py-1.5 text-xs font-medium text-gray-400 hover:bg-gray-800 transition-colors">
          Análisis de equipo
        </button>
        <button className="px-2 py-1.5 text-xs font-medium text-gray-400 hover:bg-gray-800 transition-colors">
          Análisis rival
        </button>
      </nav>

      {/* Players List */}
      <div className="grid lg:grid-cols-2 grid-cols-1 overflow-hidden">
        <div className="overflow-x-auto md:overflow-x-hidden">
          <section className="min-w-[600px] md:w-full md:min-w-0">
            {sortedPlayers.map((player, index) => (
              player.teamId === 100 ? 
              <PlayerList player={player} key={index} />
              : null
            ))}
          </section>
        </div>
        <div className="overflow-x-auto md:overflow-x-hidden">
          <section className="min-w-[550px] md:w-full md:min-w-0">
            {sortedPlayers.map((player, index) => (
              player.teamId === 200 ? 
              <PlayerList player={player} key={index} />
              : null
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

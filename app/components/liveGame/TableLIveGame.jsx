"use client"
import { useSumonnerStore } from "@/app/store/SummonerStore"
import { LeagueLiveGame } from "@/app/components/ui/LeagueLiveGame.jsx"

export const TableLIveGame = ({ data }) => {
  const { version, urlListChamp, urlListSpell } = useSumonnerStore()

  // Separate participants by team
  const team100 = data?.participants?.filter(p => p.teamId === 100) || [];
  const team200 = data?.participants?.filter(p => p.teamId === 200) || [];

  const renderPlayer = (player) => {
    const [gameName, tagLine] = player.riotId?.split('#') || ['', ''];
    const hasLeagueInfo = player.leagueInfo && player.leagueInfo.length > 0;
    const soloQ = hasLeagueInfo ? player.leagueInfo.find(league => league.queueType === 'RANKED_SOLO_5x5') : null;
    const flexQ = hasLeagueInfo ? player.leagueInfo.find(league => league.queueType === 'RANKED_FLEX_SR') : null;

    return (
      <article key={player.puuid} className="w-full min-h-15 flex items-center p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm gap-2.5">
        {/* Champion Image */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${urlListChamp[player.championId]}.png`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0 max-w-[120px]">
          <div className="flex items-baseline">
            <span className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
              {gameName}
            </span>
            <span className="ml-1 text-[11px] text-gray-500 dark:text-gray-400 flex-shrink-0">#{tagLine}</span>
          </div>

          {/* Spells */}
          <div className="flex items-center space-x-1 mt-1">
            <div className="w-6 h-6 rounded overflow-hidden">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[player.spell1Id]}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-6 h-6 rounded overflow-hidden">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[player.spell2Id]}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* League Info */}
        <div className="flex flex-col ml-auto">
          {soloQ && (
            <LeagueLiveGame leagueInfo={soloQ} compact />
          )}
          {flexQ && (
            <LeagueLiveGame leagueInfo={flexQ} compact />
          )}
          {!soloQ && !flexQ && hasLeagueInfo && (
            <div className="text-[9px] text-gray-500 dark:text-gray-400 w-[150px] text-right">Unranked</div>
          )}
        </div>
      </article>
    );
  };

  const renderBans = (teamId) => {
    if (!data?.bannedChampions?.length) return null;

    const teamBans = data.bannedChampions.filter(ban => ban.teamId === teamId);
    if (!teamBans.length) return null;

    return (
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">Bans:</span>
        <div className="flex space-x-1">
          {teamBans.map((ban, idx) => (
            <div key={idx} className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${urlListChamp[ban.championId]}.png`} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Game Header */}
      <div className="bg-gray-800 text-white p-3 sm:p-4">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="w-full sm:w-auto">
              <h1 className="text-base sm:text-lg font-bold truncate">{data?.gameMode}</h1>
              <p className="text-xs sm:text-sm text-gray-300 truncate">
                {data?.gameType} • {data?.platformId}
              </p>
            </div>
            <div className="w-full sm:w-auto text-right">
              <p className="text-xs sm:text-sm truncate">Game ID: {data?.gameId}</p>
              <p className="text-xs text-gray-300">
                {new Date(data?.gameStartTime || Date.now()).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          {/* Team 1 (Blue) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden w-full">
            <div className="bg-blue-600 text-white p-3 text-center font-medium text-sm sm:text-base">
              Equipo Azul
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {team100.map(renderPlayer)}
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              {renderBans(100)}
            </div>
          </div>

          {/* Team 2 (Red) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden w-full">
            <div className="bg-red-600 text-white p-3 text-center font-medium text-sm sm:text-base">
              Equipo Rojo
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {team200.map(renderPlayer)}
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              {renderBans(200)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


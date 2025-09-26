"use client"
import { useSumonnerStore } from "@/app/store/SummonerStore"
import { LeagueLiveGame } from "@/app/components/ui/LeagueLiveGame.jsx"
import Link from "next/link"

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
      <article key={player.puuid} className="w-full flex items-center hover:bg-accent/50 transition-colors text-sm gap-2 px-2 py-1">
        {gameName && tagLine ? (
          <div className={`relative w-7 h-7  rounded-full overflow-hidden border-2 ${player.teamId === 100
            ? 'border-blue-500' : 'border-red-500'} flex-shrink-0`} title={`${gameName}#${tagLine}`}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${urlListChamp[player.championId]}.png`}
              alt={`${gameName}`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`relative w-7 h-7 rounded-full overflow-hidden border-2 ${player.teamId === 100 ? 'border-blue-500' : 'border-red-500'} flex-shrink-0`}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${urlListChamp[player.championId]}.png`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Player Info */}
        <div className="flex-1 min-w-0 max-w-[130px] overflow-hidden">
          <div className="flex items-baseline">
            <Link href={`/summoner/${gameName}-${tagLine}`} className="text-[13px] font-semibold text-foreground ">
              {gameName}
              <span className="ml-1 text-[10px] text-muted-foreground flex-shrink-0">#{tagLine}</span>
            </Link>
          </div>

          {/* Spells */}
          <div className="flex items-center space-x-1 mt-0.5">
            <div className="w-5 h-5 rounded overflow-hidden">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[player.spell1Id]}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-5 h-5 rounded overflow-hidden">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[player.spell2Id]}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* League Info (fixed width, single block) */}
        <div className="flex flex-col ml-auto md:w-[240px] items-end">
          {soloQ ? (
            <LeagueLiveGame leagueInfo={soloQ} compact />
          ) : flexQ ? (
            <LeagueLiveGame leagueInfo={flexQ} compact />
          ) : (
            <p className="text-[11px] text-muted-foreground">Unranked</p>
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
      <div className="flex items-center space-x-2 mt-1.5">
        <span className="text-[11px] text-muted-foreground">Bans:</span>
        <div className="flex space-x-1">
          {teamBans.map((ban, idx) => (
            <div key={idx} className="w-8 h-8 rounded bg-muted flex items-center justify-center">
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
      <div className="bg-card border-b border-border py-2 ">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-row justify-between items-start sm:items-center gap-2">
            <div className="w-full sm:w-auto">
              <h1 className="text-sm sm:text-base font-bold truncate">{data?.gameMode}</h1>
              <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                {data?.gameType} • {data?.platformId}
              </p>
            </div>
            <div className="w-full sm:w-auto text-right">
              <p className="text-[11px] sm:text-xs truncate">Game ID: {data?.gameId}</p>
              <p className="text-[11px] text-muted-foreground">
                {new Date(data?.gameStartTime || Date.now()).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-3">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
          {/* Team 1 (Blue) */}
          <div className="bg-card border border-border rounded-[var(--radius)] shadow-sm overflow-hidden w-full">
            <div className="bg-chart-1 text-white py-2 px-3 text-xs font-bold">
              Equipo Azul
            </div>
            <div className="divide-y divide-border/70">
              {team100.map(renderPlayer)}
            </div>
            <div className="p-2 border-t border-border">
              {renderBans(100)}
            </div>
          </div>

          {/* Team 2 (Red) */}
          <div className="bg-card border border-border rounded-[var(--radius)] shadow-sm overflow-hidden w-full">
            <div className="bg-chart-2 text-white py-2 px-3 text-xs font-bold">
              Equipo Rojo
            </div>
            <div className="divide-y divide-border/70">
              {team200.map(renderPlayer)}
            </div>
            <div className="p-2 border-t border-border">
              {renderBans(200)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


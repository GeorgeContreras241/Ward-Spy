"use client"
import { useState } from "react"
import { Loader } from "@/components/ui/Loader"
import { useSumonnerStore } from "@/store/SummonerStore"
import { InfoSumonner } from "@/components/summoner/InfoSumonner"
import { Match } from "@/components/match-history/Match"
import { RecentGames } from "@/components/summoner/RecentGames"

export const MatchHistory = ({ itemsInfo }) => {
  const [page, setPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const dataSumonner = useSumonnerStore(state => state.dataSumonner)
  const matchs = useSumonnerStore(state => state.matchs)
  const setMatchs = useSumonnerStore(state => state.setMatchs)
  const version = useSumonnerStore(state => state.version)
  const urlListSpell = useSumonnerStore(state => state.urlListSpell)
  const perks = useSumonnerStore(state => state.perks)


  const reCallMatchHistory = async (page) => {
    setLoading(true)
    if (page >= 30) {
      console.log('Reached maximum pages');
      return;
    }
    setPage(page + 5);
    const res = await fetch('/api/riot/new-history',
      {
        method: 'POST',
        body: JSON.stringify({ puuid: dataSumonner.user.puuid, page: page })
      }
    )
    const data = await res.json()
    setMatchs(data.resMatchs);
    setLoading(false);

  };
  return (
    <div className="max-w-5xl w-full mx-auto text-white flex flex-col pb-6">
      <div className="grid grid-cols-1 h-full md:grid-cols-2 mt-2  gap-2 w-full">
        <InfoSumonner dataSumonner={dataSumonner} version={version} />
        <RecentGames dataSumonner={dataSumonner} matchs={matchs} version={version} />
      </div>

      <main className="w-full mt-2 space-y-1.5">
        {matchs?.map((match, index) => {
          const currentPlayer = match.p.find(player => player.id === dataSumonner?.user.puuid);
          const team1Players = match.p.filter(player => player.ti === 100);
          const team2Players = match.p.filter(player => player.ti === 200);
          
          // Calculate total kills for each team
          const team1Kills = team1Players.reduce((sum, player) => sum + (player.k || 0), 0);
          const team2Kills = team2Players.reduce((sum, player) => sum + (player.k || 0), 0);
          
          const team1 = { players: team1Players, kills: team1Kills };
          const team2 = { players: team2Players, kills: team2Kills };
          
          const gameDate = new Date(match.gc);
          const formattedDate = gameDate.toLocaleString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
          const gameDurationMinutes = Math.floor(match.gd / 60);
          return (
            <div key={`${match.gc}-${index}`}>
              <Match
                dataPlayer={currentPlayer}
                dataPlayers={match.p}
                team1={team1}
                team2={team2}
                gameCreation={gameDate.toLocaleDateString()}
                gameDurationMinutes={gameDurationMinutes}
                gameMode={match.gm}
                gameTimeCreation={formattedDate}
                urlListSpell={urlListSpell}
                itemsInfo={itemsInfo}
                version={version}
                perks={perks}
              />
            </div>
          );
        })}
        <div className="w-full grid place-items-center">
          {
            loading ? <Loader /> :
              <button
                className="border px-10 py-2 bg-blue-900 text-white mt-2 cursor-pointer hover:bg-blue-800 transition-colors rounded-md text-sm"
                onClick={() => reCallMatchHistory(page)}
                disabled={loading}
              >
                Ver mas
              </button>
          }

        </div>
      </main>
    </div>
  )
}

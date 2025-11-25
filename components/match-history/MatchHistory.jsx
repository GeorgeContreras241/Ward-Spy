"use client"
import { useSumonnerStore } from "@/store/SummonerStore"
import { InfoSumonner } from "@/components/summoner/InfoSumonner"
import { Match } from "@/components/match-history/Match"
import { RecentGames } from "@/components/summoner/RecentGames"

export const MatchHistory = () => {
  const { dataSumonner, version } = useSumonnerStore()

  return (
    <div className="max-w-5xl w-full mx-auto text-white flex flex-col pb-6">
      <div className="grid grid-cols-1 h-full md:grid-cols-2 mt-2  gap-2 w-full">
        <InfoSumonner dataSumonner={dataSumonner} version={version} />
        <RecentGames dataSumonner={dataSumonner} version={version} />
      </div>

      <main className="w-full mt-2 space-y-1.5">
        {
          dataSumonner?.matchs?.map((item, index) => {
            const puiidPlayers = item.info.participants.find((item) =>
              item.puuid === dataSumonner?.user.puuid)
            const team1 = item.info.participants.filter((item) => item.teamId === 100)
            const team2 = item.info.participants.filter((item) => item.teamId === 200)
            const gameCreation = new Date(item.info.gameCreation).toLocaleDateString()
            const gameDurationMinutes = (item.info.gameDuration / 60).toFixed(0)
            const gameMode = item.info.gameMode
            const date = new Date(item.info.gameCreation);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            return (
              <div key={index} >
                <Match
                  dataPlayer={puiidPlayers}
                  dataPlayers={item.info.participants}
                  team1={team1}
                  team2={team2}
                  gameCreation={gameCreation}
                  gameDurationMinutes={gameDurationMinutes}
                  gameMode={gameMode}
                  gameTimeCreation={formattedDate.toLocaleString('es-CO')}
                />
              </div>
            )
          })
        }
      </main>
    </div>
  )
}

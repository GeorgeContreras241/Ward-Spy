"use client"
import { useSumonnerStore } from "@/app/store/SummonerStore"
import { InfoSumonner } from "@/app/components/summoner/InfoSumonner"
import { Match } from "@/app/components/summoner/Match"
import { RecentGames } from "@/app/components/summoner/RecentGames"

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
          dataSumonner?.matchs.map((item, index) => {
            const puiidPlayers = item.value.info.participants.find((item) =>
              item.puuid === dataSumonner?.user.puuid)
            const team1 = item.value.info.participants.filter((item) => item.teamId === 100)
            const team2 = item.value.info.participants.filter((item) => item.teamId === 200)
            const gameCreation = new Date(item.value.info.gameCreation).toLocaleDateString()
            const gameDurationMinutes = (item.value.info.gameDuration / 60).toFixed(0)
            const gameMode = item.value.info.gameMode
            return (
              <div key={index} >
                <Match 
                dataPlayer={puiidPlayers} 
                dataPlayers={item.value.info.participants}
                team1={team1} 
                team2={team2} 
                gameCreation={gameCreation} 
                gameDurationMinutes={gameDurationMinutes} 
                gameMode={gameMode}/>
              </div>
            )
          })
        }
      </main>
    </div>
  )
}

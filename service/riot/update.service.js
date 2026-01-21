import { mapMatchData } from "@/lib/mapMatchData"
import { riotRepository } from "@/repositories/riot.repository"
import Player from '@/lib/models/players'
import Stat from '@/lib/models/stats'
import { mapUser } from "@/lib/mapUser"
import { mapStats } from "@/lib/mapStats"

export const servicesUpdate = async (dataName, dataTag, RiotApiKey) => {

    const playerPuuid = await riotRepository.getAccountByRiotNameTag(dataName, dataTag, RiotApiKey)
    const summoner = await riotRepository.getSummonerByPuuid(playerPuuid.puuid, RiotApiKey)
    const league = await riotRepository.getLeagueByPuuid(playerPuuid.puuid, RiotApiKey)
    const matchIds = await riotRepository.getMachtsIds(playerPuuid.puuid, RiotApiKey)


    // 5. Process matches with the same structure as match-history
    const resultsMatch = await Promise.all(
        matchIds.map(async (id) => {
            try {
                const match = await riotRepository.getIdsMatchs(id, RiotApiKey)
                return mapMatchData(match)
            } catch (error) {
                return null
            }
        })
    )
    const resultFilter = resultsMatch.filter(Boolean)
    // 6. Prepare player and stats data
    const player = mapUser(playerPuuid, summoner, dataName, dataTag)
    const stats = mapStats(playerPuuid, league)

    await Player.findOneAndUpdate(
        { puuid: player.puuid },
        player,
        { upsert: true, new: true }
    )
    await Stat.findOneAndUpdate(
        { puuid: player.puuid },
        stats,
        { upsert: true, new: true }
    )
    return { response: {
      matchs: resultFilter,
      user: player,
      stats,
    } }
}
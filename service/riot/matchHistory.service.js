import { findUser } from '@/repositories/findUser.repository'
import { saveUser } from '@/repositories/saveUser.repository'
import { findStats } from '@/repositories/findStats.repository'
import { saveStats } from '@/repositories/saveStats.repository'
import { riotRepository } from '@/repositories/riot.repository'
import { mapMatchData } from '../../lib/mapMatchData'

export const servicesMatchHistory = async (nameTag, dataTag, matchs, RiotApiKey) => {
     let user, stats
     try {
          const verifyPlayer = await findUser(nameTag, dataTag)
          if (!verifyPlayer) {
               const playerPuuid = await riotRepository.getAccountByRiotNameTag(nameTag, dataTag, RiotApiKey)
               const summoner = await riotRepository.getSummonerByPuuid(playerPuuid.puuid, RiotApiKey)
               user = {
                    puuid: playerPuuid.puuid,
                    summonerName: nameTag + '#' + dataTag,
                    summonerLevel: summoner.summonerLevel,
                    region: 'la1',
                    profileIconId: summoner.profileIconId,
               }

               await saveUser(user)
          } else {

               user = verifyPlayer
          }
          // Verificar si existen stats en la base de datos
          const verifyStats = await findStats({ puuid: user.puuid })

          if (!verifyStats) {
               const league = await riotRepository.getLeagueByPuuid(user.puuid, RiotApiKey)
               stats = {
                    puuid: user.puuid,
                    flexSolo: {
                         leagueId: league[1]?.leagueId,
                         leaguePoints: league[1]?.leaguePoints,
                         rank: league[1]?.rank,
                         tier: league[1]?.tier,
                         wins: league[1]?.wins,
                         losses: league[1]?.losses,
                    },
                    flexFlex: {
                         leagueId: league[0]?.leagueId,
                         leaguePoints: league[0]?.leaguePoints,
                         rank: league[0]?.rank,
                         tier: league[0]?.tier,
                         wins: league[0]?.wins,
                         losses: league[0]?.losses,
                    },
               }
               await saveStats(stats)
          } else {
               stats = verifyStats
          }


          if (matchs === 'true') {
               const result = await riotRepository.getMachtsIds(user.puuid, RiotApiKey)
               const resultsMatch = await Promise.all(
                    result.map(async (id) => {
                         const info = await riotRepository.getIdsMatchs(id, RiotApiKey)
                         return mapMatchData(info)

                    })
               );
               return {
                    response: {
                         user,
                         stats,
                         matchs: resultsMatch.filter(Boolean),
                    },
                    status: 200,
                    message: 'Se ha encontrado el usuario'
               }
          }

          return {
               response: {
                    user,
                    stats,
                    matchs: null,
               },
               status: 200,
               message: 'No es necesario hacer le fetch de las partidas'
          }



     } catch (error) {
          console.error('Error in servicesMatchHistory:', error);
          return {
               status: error.status || 500,
               error: 'No se pudo encontrar el usuario',
               message: error.message || 'Error desconocido',
               details: process.env.NODE_ENV === 'development' ? error.stack : undefined
          };
     }
}
import NextResponse from 'next/server'
import dbConnect from '@/lib/db'
import Player from '@/lib/models/players'
import Stat from '@/lib/models/stats'

import getDataPuuid from '@/app/utils/setFetchApi'


export async function GET(req) {
  let user, summoner, stats
  const RiotApiKey = process.env.RIOT_API_KEY
  const { searchParams } = new URL(req.url)
  const nameTag = searchParams.get('nameTag');
  const dataTag = searchParams.get('dataTag');
  if (!nameTag || !dataTag) return NextResponse.json({ status: 400, message: 'Riot Id corrupto', data: null })

  try {
    await dbConnect();
    const verifyPlayer = await Player.findOne({ summonerName: nameTag + '#' + dataTag })

    if (!verifyPlayer) {
      console.log("Esto se ejecuta cuando no se encuentra el usuario en mongo y se crea")
      const playerPuuid = await getDataPuuid(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nameTag}/${dataTag}`, RiotApiKey)
      summoner = await getDataPuuid(`https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${playerPuuid.puuid}`, RiotApiKey)
      user = {
        puuid: playerPuuid.puuid,
        summonerName: nameTag + '#' + dataTag,
        summonerLevel: summoner.summonerLevel,
        region: 'la1',
        profileIconId: summoner.profileIconId,
      }
      const newPlayer = new Player(user)
      await newPlayer.save()
    } else {
      console.log("Esto se ejecuta cuando se encuentra el usuario en mongo")
      user = verifyPlayer
    }

    // Verificar si existen stats en la base de datos
    const verifyStats = await Stat.findOne({ puuid: user.puuid })

    if (!verifyStats) {
      console.log("Stats no encontradas en mongo, creando nuevas stats")
      const league = await getDataPuuid(`https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${user.puuid}`, RiotApiKey)
      stats = {
        puuid: user.puuid,
        flexSolo: {
          leagueId : league[1]?.leagueId,
          leaguePoints : league[1]?.leaguePoints,
          rank : league[1]?.rank,
          tier : league[1]?.tier,
          wins : league[1]?.wins,
          losses : league[1]?.losses,
        },
        flexFlex: {
          leagueId : league[0]?.leagueId,
          leaguePoints : league[0]?.leaguePoints,
          rank : league[0]?.rank,
          tier : league[0]?.tier,
          wins : league[0]?.wins,
          losses : league[0]?.losses,
        },
      }
      const newStat = new Stat(stats)
      await newStat.save()
    } else {
      console.log("Stats encontradas en mongo")
      stats = verifyStats
    }
    // Buscar Ids de partidas
    const match = await getDataPuuid(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${user.puuid}/ids?start=0&count=2`, RiotApiKey)

    
    // Buscar id de partidas
    const resultsMatch = await Promise.allSettled(
      match.map(async (id) => {
        const gameRes = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${id}`, {
          headers: {
            'X-Riot-Token': RiotApiKey,
          }
        })
        return gameRes.json()
      })
    );
    const response = {
      matchs: resultsMatch,
      user,
      match,
      stats,
    }

    return new Response(
      JSON.stringify({
        response,
        status: 200,
        message: 'Se ha encontrado el usuario'
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: 'No se pudo encontrar el usuario',
        message: error.message
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}





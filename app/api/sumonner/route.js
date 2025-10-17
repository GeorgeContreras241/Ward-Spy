import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Player from '@/lib/models/players'
import Stat from '@/lib/models/stats'
import getDataPuuid from '@/app/utils/setFetchApi'


export async function GET(req) {
  let user, summoner, stats
  const { searchParams } = new URL(req.url)
  const nameTag = searchParams.get('nameTag');
  const dataTag = searchParams.get('dataTag');
  if (!nameTag || !dataTag) return NextResponse.json({ status: 400, message: 'Riot Id corrupto', data: null })

  let matchs = req.headers.get('Matchs')

  const RiotApiKey = process.env.RIOT_API_KEY;
  if (!RiotApiKey) {
    return NextResponse.json(
      { message: "API key de Riot no encontrada" },
      { status: 500 }
    );
  }

  try {
    await dbConnect();
    let verifyPlayer = await Player.findOne({ summonerName: nameTag + '#' + dataTag })
    if (!verifyPlayer) {
      const {result: playerPuuid, apiRes: playerRes} = await getDataPuuid(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nameTag}/${dataTag}`, RiotApiKey)
      if (!playerRes.ok) {
        return NextResponse.json({
          status: playerRes.status,
          message: playerRes.statusText,
        })
      }
      const {result: summoner, apiRes: summonerRes} = await getDataPuuid(`https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${playerPuuid.puuid}`, RiotApiKey)
      if (!summonerRes.ok) {
        return NextResponse.json({
          status: summonerRes.status,
          message: summonerRes.statusText,
        })
      }
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
      user = verifyPlayer
    }

    // Verificar si existen stats en la base de datos
    const verifyStats = await Stat.findOne({ puuid: user.puuid })

    if (!verifyStats) {
      const {result: league, apiRes: leagueRes} = await getDataPuuid(`https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${user.puuid}`, RiotApiKey)
      if (!leagueRes.ok) {
        return NextResponse.json({
          status: leagueRes.status,
          message: leagueRes.statusText,
        })
      }
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
      const newStat = new Stat(stats)
      await newStat.save()
    } else {
      stats = verifyStats
    }
    // Buscar Ids de partidas
    if (matchs === 'true') { 
      const {result, apiRes} = await getDataPuuid(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${user.puuid}/ids?start=0&count=8`, RiotApiKey)
      if (!apiRes.ok) {
        return NextResponse.json({
          status: apiRes.status,
          message: apiRes.statusText,
        })
      }
      const resultsMatch = await Promise.allSettled(
        result?.map(async (id) => {
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
        stats,
      }
      return new Response(
        JSON.stringify({
          response,
          status: 200,
          message: 'Se ha encontrado el usuario'
        }))
    } else {
      console.log("Esto se qejecuta cuando el matchs es false lo que significa que no se ejecuta el fetch de las partidas")
      console.log(matchs)
      const response = {
        matchs : null,
        user,
        stats,
      }
      console.log(response)
      return new Response(
        JSON.stringify({
          response,
          status: 200,
          message: 'Se ha encontrado el usuario'
        })
      )
    }

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: 'No se pudo encontrar el usuario',
        message: error.message
      })
    )
  }
}





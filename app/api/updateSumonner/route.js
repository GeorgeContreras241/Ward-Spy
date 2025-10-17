import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Player from "@/lib/models/players"
import Stat from "@/lib/models/stats"
import getDataPuuid from "@/app/utils/setFetchApi"

export async function POST(req){
    const { dataName, dataTag } = await req.json()
    console.log(dataName, dataTag)
    if (!dataName || !dataTag) return NextResponse.json(
        { status: 400, message: "Nombre de usuario y tag son obligatorios" }
    )
    console.log(dataName, dataTag)
    const riotApiKey = process.env.RIOT_API_KEY

    if (!riotApiKey) return NextResponse.json(
        { status: 500, message: "API key de Riot no encontrada" }
    )

 try {
    await dbConnect()
    const playerRes = await getPlayerPuuid(dataName, dataTag, riotApiKey)
    const stats = await getStats(playerRes.puuid, riotApiKey)
    const matchs = await getMatchs(playerRes.puuid, riotApiKey)

    await updatePlayer(playerRes, stats)

    return NextResponse.json(
      {
        message: "Perfil actualizado correctamente",
        response: { matchs, playerRes, stats },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error en POST /summoner:", error)
    return NextResponse.json(
      { message: "Error interno del servidor", error: error.message },
      { status: 500 }
    )
  }
}


const getPlayerPuuid = async (nameTag, dataTag, apiKey) => {
  const {result: playerPuuid, apiRes: playerRes} = await getDataPuuid(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nameTag}/${dataTag}`,
    apiKey
  )
  if (!playerRes.ok) {
    return NextResponse.json({
      status: playerRes.status,
      message: playerRes.statusText,
    })
  }
  const {result: summoner, apiRes: summonerRes} = await getDataPuuid(
    `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${playerPuuid.puuid}`,
    apiKey
  )
  if (!summonerRes.ok) {
    return NextResponse.json({
      status: summonerRes.status,
      message: summonerRes.statusText,
    })
  }
  return {
    puuid: playerPuuid.puuid,
    summonerName: `${nameTag}#${dataTag}`,
    summonerLevel: summoner.summonerLevel,
    region: "la1",
    profileIconId: summoner.profileIconId,
  }
}

const getStats = async (puuid, riotApiKey) => {
    const {result: league, apiRes: leagueRes} = await getDataPuuid(`https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`, riotApiKey)
    if (!leagueRes.ok) {
      return NextResponse.json({
        status: leagueRes.status,
        message: leagueRes.statusText,
      })
    }
    let stats = {
        puuid: puuid,
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
    return stats

}

const getMatchs = async (puuid, apiKey) => {
  const {result, apiRes} = await getDataPuuid(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=8`,
    apiKey
  )
  if(!apiRes.ok){
    return NextResponse.json({
      status: apiRes.status,
      message: apiRes.statusText,
    })
  }
  const results = await Promise.allSettled(
    result.map(async (id) => {
      const res = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${id}`,
        { headers: { "X-Riot-Token": apiKey } }
      )
      if (!res.ok) throw new Error(`Error al obtener partida ${id}`)
      return res.json()
    })
  )

  return results
}

const updatePlayer = async (playerRes, stats) => {
    try {
        await Player.findOneAndUpdate({ puuid: playerRes.puuid }, playerRes,
            { upsert: true, new: true } 
        )
        await Stat.findOneAndUpdate({ puuid: playerRes.puuid }, stats,
            { upsert: true, new: true } 
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error al actualizar el perfil", error: error.message },
            { status: 500 }
        )
    }
}
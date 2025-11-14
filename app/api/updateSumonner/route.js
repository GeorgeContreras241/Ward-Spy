import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Player from "@/lib/models/players"
import Stat from "@/lib/models/stats"
import getDataPuuid from "@/app/utils/setFetchApi"


// Timer
const coolDown = new Map()
const COOLDOWN = 2 * 60 * 1000 // 2 Minutos

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || req.socket.remoteAddress
  const now = Date.now() // Timestamp actual
  const last = coolDown.get(ip) // Timestamp ultimo intento

  if (last && now - last < COOLDOWN) {
    const remaning = Math.ceil((COOLDOWN - (now - last)) / 1000)
    return NextResponse.json({
      ok: false,
      status: 429,
      message: remaning,
    })

  }
  coolDown.set(ip, now)
  // Validacion de datos riotTag
  const { dataName, dataTag } = await req.json()
  if (!dataName || !dataTag) return NextResponse.json(
    { ok: false, status: 400, message: "Nombre de usuario y tag son obligatorios" }
  )
  // Validacion de API Key
  const riotApiKey = process.env.RIOT_API_KEY
  if (!riotApiKey) return NextResponse.json(
    { ok: false, status: 500, message: "API key de Riot no encontrada" }
  )

  try {
    console.log("actualizando perfil")
    await dbConnect()
    // Buscar Puuid
    const { result: playerPuuid, apiRes: playerRes } = await getDataPuuid(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${dataName}/${dataTag}`,
      riotApiKey
    )
    if (!playerRes.ok) {
      return NextResponse.json({
        ok: false,
        status: playerRes.status,
        message: playerRes.statusText,
      })
    }
    // Buscar Summoner
    const { result: summoner, apiRes: summonerRes } = await getDataPuuid(
      `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${playerPuuid.puuid}`,
      riotApiKey
    )
    if (!summonerRes.ok) {
      return NextResponse.json({
        ok: false,
        status: summonerRes.status,
        message: summonerRes.statusText,
      })
    }
    // Buscar League
    const { result: league, apiRes: leagueRes } = await getDataPuuid(`https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${playerPuuid.puuid}`, riotApiKey)
    if (!leagueRes.ok) {
      return NextResponse.json({
        ok: false,
        status: leagueRes.status,
        message: leagueRes.statusText,
      })
    }
    // Buscas Match
    const { result, apiRes: matchRes } = await getDataPuuid(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerPuuid.puuid}/ids?start=0&count=8`,
      riotApiKey
    )
    if (!matchRes.ok) {
      return NextResponse.json({
        status: apiRes.status,
        message: apiRes.statusText,
      })
    }
    const results = await Promise.all(
      result.map(async (id) => {
        try {
          const res = await fetch(
            `https://americas.api.riotgames.com/lol/match/v5/matches/${id}`,
            { headers: { "X-Riot-Token": riotApiKey } }
          )
          if (!res.ok) throw new Error(`Error al obtener partida ${id}`)
          return res.json()
        } catch (error) {
          console.error(`Error al obtener partida ${id}:`, error)
          return null
        }
      })
    )
    let player = {
      puuid: playerPuuid.puuid,
      summonerName: dataName + '#' + dataTag,
      summonerLevel: summoner.summonerLevel,
      region: "la1",
      profileIconId: summoner.profileIconId,
    }
    let stats = {
      puuid: playerPuuid.puuid,
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
    
    await updatePlayer(player, stats)

    console.log(results)
    
    return NextResponse.json({
        ok: true,
        message: "Perfil actualizado correctamente",
        response: { matchs: results, player, stats },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "Error interno del servidor", error: error.message },
      { status: 500 }
    )
  }
}


const updatePlayer = async (player, stats) => {
  try {
    await Player.findOneAndUpdate({ puuid: player.puuid }, player,
      { upsert: true, new: true }
    )
    await Stat.findOneAndUpdate({ puuid: player.puuid }, stats,
      { upsert: true, new: true }
    )
  } catch (error) {
    console.log("Error al actializar en MongoDB")
  }
}
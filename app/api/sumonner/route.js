import { notfound } from 'next/navigation'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  if (!searchParams) return notfound()


    const nameTag = searchParams.get('nameTag')
    const dataTag = searchParams.get('dataTag')
  const RiotApiKey = process.env.RIOT_API_KEY
  const RiotApiUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nameTag}/${dataTag}`

  try {
    // Buscar puuid
    const puiddRes = await fetch(RiotApiUrl, {
      headers: {
        'X-Riot-Token': RiotApiKey
      },
      next: {
        revalidate: 86400
      }
    })
  
    if (!puiddRes.ok) {
      return new Response(
        JSON.stringify({
          status: 500,
          error: 'No se pudo encontrar el usuario'
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } 
    
    const user = await puiddRes.json()
    const piuudId = user.puuid

    // Buscar summoner
    const summonerRes = await fetch(
      `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${piuudId}`,
      {
        headers: {
          'X-Riot-Token': RiotApiKey,
          next: {
            revalidate: 86400
          }
        }
      }
    )
    if (!summonerRes.ok) {
      return new Response(
        JSON.stringify({
          status: 500,
          error: 'No se pudo encontrar el usuario'
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    const summoner = await summonerRes.json()

    // Buscar league
    const leagueRes = await fetch(
      `https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${piuudId}`,
      {
        headers: {
          'X-Riot-Token': RiotApiKey,
          next: {
            revalidate: 300
          }
        }
      }
    )
    if (!leagueRes.ok) {
      return new Response(
        JSON.stringify({
          status: 500,
          error: 'No se pudo encontrar el usuario'
        })
      )
    }
    console.log("league")
    const league = await leagueRes.json()

    // Buscar Ids de partidas
    const matchRes = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${piuudId}/ids?start=0&count=8`, {
      headers: {
        'X-Riot-Token': RiotApiKey,
        next: {
          revalidate: 300
        }
      }
    })
    if (!matchRes.ok) {
      return new Response(
        JSON.stringify({
          status: 500,
          error: 'No se pudo encontrar el usuario'
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    const match = await matchRes.json()

    // Buscar id de partidas
    const resultsMatch = await Promise.allSettled(
      match.map(async (id) => {
        const gameRes = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${id}`, {
          headers: {
            'X-Riot-Token': RiotApiKey,
          }
        })
        if (!gameRes.ok) {
          throw new Error('No se pudo encontrar el usuario')
        }
        return gameRes.json()
      })
    );

    return new Response(
      JSON.stringify({
        response: {
          matchs: resultsMatch,
          user,
          summoner,
          league,
          match,
        } ,
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





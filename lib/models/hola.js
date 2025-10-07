
export async function PUT(req) {
    let user, summoner, stats
    const RiotApiKey = process.env.RIOT_API_KEY
    const { searchParams } = new URL(req.url)
    const nameTag = searchParams.get('nameTag');
    const dataTag = searchParams.get('dataTag');
    if (!nameTag || !dataTag) return NextResponse.json({ status: 400, message: 'Riot Id corrupto', data: null })
  
    try {
      await dbConnect();
      console.log("Actualizando información del jugador desde la API de Riot")
      
      // Obtener datos frescos de la API de Riot
      const playerPuuid = await getDataPuuid(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nameTag}/${dataTag}`, RiotApiKey)
      summoner = await getDataPuuid(`https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${playerPuuid.puuid}`, RiotApiKey)
      
      // Actualizar o crear usuario
      user = {
        puuid: playerPuuid.puuid,
        summonerName: nameTag + '#' + dataTag,
        summonerLevel: summoner.summonerLevel,
        region: 'la1',
        profileIconId: summoner.profileIconId,
      }
      
      await Player.findOneAndUpdate(
        { puuid: user.puuid },
        user,
        { upsert: true, new: true }
      )
  
      // Obtener y actualizar stats
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
      
      // Eliminar stats antiguos y crear nuevos (para resetear el TTL)
      await Stat.findOneAndDelete({ puuid: user.puuid })
      const newStat = new Stat(stats)
      await newStat.save()
  
      // Buscar Ids de partidas
      const match = await getDataPuuid(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${user.puuid}/ids?start=0&count=2`, RiotApiKey)
  
      // Buscar detalles de partidas
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
          message: 'Información actualizada exitosamente'
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          status: 500,
          error: 'No se pudo actualizar la información del usuario',
          message: error.message
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
  
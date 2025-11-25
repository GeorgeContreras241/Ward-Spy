

export const GET = async (req) => {
    const puuid = req.headers.get("puuid")
    const RiotApiKey = process.env.RIOT_API_KEY

    if (!puuid) {
        return new Response(JSON.stringify({
            status: 500,
            message: "No se proporciono un puuid"
        }))
    }
    const res = await fetch(`https://la1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`,
        { headers: { 'X-Riot-Token': RiotApiKey } })
    if (!res.ok) {
        return new Response(JSON.stringify({
            data: null,
            status: res.status,
            message: res.statusText,
            inGame: false
        }))
    }
    const data = await res.json()

    const leagueUser = {}

   await Promise.all( data.participants.map(async (player)=> {
    try {
        const resLeague = await fetch(`https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${player.puuid}`,{
            headers: { 'X-Riot-Token': RiotApiKey }
        })
        if(!resLeague.ok){
            return
        }
        const leagueInfo = await resLeague.json()
        const newLeagueUser = data.participants.map((participant) => participant.puuid === player.puuid ? { ...participant, leagueInfo } : participant)
        data.participants = newLeagueUser
       
    } catch (error) {
        console.error(error)
    }
   }))
    

   
    return new Response(JSON.stringify({
        data,
        status: data.status,
        message: data.message,
        inGame: true
    }))
}   
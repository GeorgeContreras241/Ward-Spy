export const mapStats = (playerPuuid, league) => {
    return {
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
}
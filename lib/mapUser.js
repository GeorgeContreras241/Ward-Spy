export const mapUser = (playerPuuid,summoner,dataName,dataTag) => {
    return {
        puuid: playerPuuid.puuid,
        summonerName: `${dataName}#${dataTag}`,
        summonerLevel: summoner.summonerLevel,
        region: 'la1',
        profileIconId: summoner.profileIconId,
    }
}
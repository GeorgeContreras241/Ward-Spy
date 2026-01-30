import getDataPuuid from "@/lib/setFetchApi";

export const riotRepository = {
    getAccountByRiotNameTag: (nameTag, dataTag, key) =>
        getDataPuuid(
            `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nameTag}/${dataTag}`,
            key
        ),
    getSummonerByPuuid: (puuid, key) =>
        getDataPuuid(
            `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
            key
        ),
    getLeagueByPuuid: (puuid, key) =>
        getDataPuuid(
            `https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
            key
        ),
    getMachtsIds: (puuid, key,page = 0) =>
        getDataPuuid(
            `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${page}&count=8`,
            key
        ),
    getIdsMatchs: async (id, key) => {
        const res = await fetch(
            `https://americas.api.riotgames.com/lol/match/v5/matches/${id}`,
            { headers: { "X-Riot-Token": key } }
        );
        const data = await res.json();
        return data.info
    }
}
import { riotRepository } from "@/repositories/riot.repository";
import { mapMatchData } from "@/lib/mapMatchData";
export const newMatchService = async (puuid, page) => {
    const keyRiotApi = process.env.RIOT_API_KEY

    const IdsMatchs = await riotRepository.getMachtsIds(puuid, keyRiotApi, page)
    const resultMatchs = await Promise.all(
        IdsMatchs.map(async (id) => {
            const match = await riotRepository.getIdsMatchs(id, keyRiotApi)
            return mapMatchData(match)
        })
    )


    return resultMatchs
}
import { getIconsSpellChamp } from "@/lib/getIconsSpellChamp"

export const serviceDataDragon = async (lastVersion) => {
    const url1 = `https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/en_US/summoner.json`
    const url2 = `https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/en_US/champion.json`
    try {
        // Obtener lista de hechizos
        const spellData = await getIconsSpellChamp(url1)
        const listSpell = {}
        Object.values(spellData.data).forEach((spell) => {
            listSpell[spell.key] = spell.image.full
        })

        // Obetener lista de campeones
        const champData = await getIconsSpellChamp(url2)
        const listChamp = {}
        Object.values(champData.data).forEach((champ) => {
            listChamp[champ.key] = champ.id
        })
        return {
            dataSpell: listSpell,
            dataChamp: listChamp,
            version: lastVersion,
            status: false,
            message: "Datos obtenidos correctamente"
        }

    } catch (error) {
        return {
            error: "Error interno del servidor",
            status: false
        }
    }
}
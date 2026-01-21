export const servicesPerks = async (lastVersion) => {
    try {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/es_MX/runesReforged.json`)
        if (!res.ok) {
            return {
                error: res.statusText,
                status: false,
            }
        }
        const data = await res.json()


        return {
            info: data,
            version: lastVersion,
            status: false,
        }
    } catch (error) {
        return {
            error: "No se pudo obtener la lista de versiones",
            status: false,
        }
    }
}
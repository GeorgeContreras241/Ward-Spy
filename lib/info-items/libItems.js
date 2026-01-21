
export const servicesItems = async (lastVersion) => {
    try {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/es_MX/item.json`)
        if (!res.ok) {
            throw new Error("No se pudo obtener la lista de versiones")
        }
        const data = await res.json()
        const filteredItems = Object.fromEntries(
            Object.entries(data.data).map(([key, item]) => [
                key, // La clave que tendrá en el nuevo objeto
                {
                    id: key,
                    name: item.name,
                    desp: item.plaintext
                }
            ])
        );

        return {
            info: filteredItems,
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
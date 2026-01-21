export const getVersion = async () => {
    const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    if (!versionRes.ok) {
        throw new Error("No se pudo obtener la lista de versiones")
    }
    const versions = await versionRes.json()
    const lastVersion = versions[0]
    return lastVersion
}
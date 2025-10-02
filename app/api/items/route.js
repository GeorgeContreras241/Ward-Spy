 
 
 export const GET = async (req) => {
    const lang= "es_ES"
    const version = req.headers.get("version")

    if (!version) {
        return new Response(JSON.stringify({
            status: 500,
            message: "No se proporciono una version"
        }))
    }
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${lang}/item.json`)

    if (!res.ok) {
        return new Response(JSON.stringify({
            data: null,
            status: res.status,
            message: res.statusText,
        }))
    }
    const data = await res.json()
    return new Response(JSON.stringify(data.data))
 }
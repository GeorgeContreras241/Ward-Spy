export const setDataLiveGame = async ({ puuid, setLoading }) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/riot/live-game`,{
        method: "GET",
        headers: {
          "puuid": puuid
        }
      })
      if(!res.ok){
        return {
          status: res.status,
          message: res.statusText,
        }
      }
      const data = await res.json()
      return data   
    } catch (error) {
      console.error("Error obteniendo datos del Api", error)
    } finally {
      setLoading(false)
    }
  }
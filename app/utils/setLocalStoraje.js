
export const testingLocalStorage = () => {
  try {
    const timeStoraje = Number(localStorage.getItem("time"))
    const infoSummonerStorage = localStorage.getItem("infoSummoner")

    if (!timeStoraje || !infoSummonerStorage) {
      return { status: 500, infoSummoner: null, message: "No hay datos en localStorage" }
    }

    const timeDiffMinutes = (Date.now() - timeStoraje) / 60000
    if (timeDiffMinutes > 30) {
      return { status: 500, infoSummoner: null, message: "Cache vencida (>30 min)" }
    }
    if (!infoSummonerStorage || infoSummonerStorage === undefined || infoSummonerStorage === null) {
      return { status: 500, infoSummoner: null, message: "No hay datos en localStorage" }
    }
    const infoSummonerJson = JSON.parse(infoSummonerStorage)
    console.log(infoSummonerJson)
    return { status: 200, infoSummoner: infoSummonerJson }
  } catch (error) {
    return { status: 500, infoSummoner: null, message: "Error leyendo localStorage" }
  }
}

//Siento que ya esto god miar denuevo y verificar
export const setDataFetch = async ({ nameTag, dataTag, setLoading }) => {
  setLoading(true)
  try {
    const res = await fetch(`/api/sumonner?nameTag=${nameTag}&dataTag=${dataTag}`)
    if (!res.ok) {
      return {
        results: {
          status: res.status,
          infoSummoner: null,
          message: res.statusText
        }
      }
    }
    const data = await res.json() 
    if(data.status != 200){
      return {
        results: {
          status: data.status,
          infoSummoner: null,
          message: data.message
        }
      }
    }
    const newResponse = {
      results: { 
        status: data.status,
        infoSummoner: data.response,
        message: data.message
      }
    }
    return newResponse

  } catch (error) {
    return { status: 500, infoSummoner: null, message: "Error obteniendo datos del Api" }
  } finally {
    setLoading(false)
  }
}
//funcion siendo revisada

export const setDataLocalStorage = (infoSumonner) => {
  localStorage.setItem('time', Date.now())
  localStorage.setItem('infoSummoner', JSON.stringify(infoSumonner))
}

export const setDataLiveGame = async ({ puuid, setLoading }) => {
  setLoading(true)
  try {
    const res = await fetch(`/api/liveGame`,{
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
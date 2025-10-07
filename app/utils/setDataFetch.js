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
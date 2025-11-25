
const getDataPuuid = async (RiotApiUrl, RiotApiKey) => {

  const apiRes = await fetch(RiotApiUrl, {
    headers: {
      'X-Riot-Token': RiotApiKey
    },
    next: {
      revalidate: 86400
    }
  })
 
  if (!apiRes.ok) {
    return {result: apiRes, apiRes}   
  }
  const result = await apiRes.json()
  return {result, apiRes}
}

export default getDataPuuid

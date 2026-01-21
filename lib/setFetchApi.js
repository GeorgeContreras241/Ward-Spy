export default async function getDataPuuid(url, key) {
  const apiRes = await fetch(url, {
    headers: {
      'X-Riot-Token': key
    }
  })

  if (!apiRes.ok) {
    const error = new Error(`API request failed with status ${apiRes.status}`)
    error.status = apiRes.status
    throw error
  }

  return await apiRes.json()
}

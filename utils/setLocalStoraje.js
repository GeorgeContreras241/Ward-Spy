


export const setDataLocalStorage = (data,puuid,nameTag) => {
  if (data && data.length > 0) {
    localStorage.setItem('time', Date.now())
    localStorage.setItem('MatchHistory', JSON.stringify(data))
    localStorage.setItem('puuid', puuid)
    localStorage.setItem('nameTag', nameTag)
    return true
  }
  return false
}

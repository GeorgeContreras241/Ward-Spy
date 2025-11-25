
export const testingLocalStorage = () => {
  try {
    const matchHistoryStorage = localStorage.getItem("MatchHistory")
    const timeStoraje = Number(localStorage.getItem("time"))
    const puuidStorage = localStorage.getItem("puuid")
    const nameTagStorage = localStorage.getItem("nameTag")

   
    if (!puuidStorage && !nameTagStorage) {
      return false
    }
    if (!timeStoraje && !matchHistoryStorage) {
      return false
    }
    if (timeStoraje === undefined || timeStoraje === null) {
      return false
    }
    if (matchHistoryStorage === undefined || matchHistoryStorage === null) {
      return false
    }
    const timeDiffMinutes = (Date.now() - timeStoraje) / 60000
    if (timeDiffMinutes > 30) {
      return false
    }
    if (!matchHistoryStorage && matchHistoryStorage === undefined && matchHistoryStorage === null) {
      return false
    }
    const matchHistoryJson = JSON.parse(matchHistoryStorage)
    if (matchHistoryJson.length === 0) {
      return false
    }
    if(matchHistoryJson[0].value.status.status_code !== 200){
      return false
    }
    return { matchHistoryJson, puuidStorage, timeStoraje, nameTagStorage }
  } catch (error) {
    return false
  }
}

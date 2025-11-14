export const replaceLocalStorage = () => {
    localStorage.removeItem("MatchHistory")
    localStorage.removeItem("time")
    localStorage.removeItem("puuid")
    localStorage.removeItem("nameTag")
}
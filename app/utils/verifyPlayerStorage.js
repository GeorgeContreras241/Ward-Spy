export const verifyPlayerStorage = (setDataPuuid, nameTag) => {
    const puuidStorage = localStorage.getItem('puuid')

    if(puuidStorage){
        setDataPuuid(puuidStorage)
    }
}

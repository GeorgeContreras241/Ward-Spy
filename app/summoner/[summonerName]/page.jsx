"use client"
import { useEffect, use, useState } from "react"
import { useSumonnerStore } from "@/store/SummonerStore"
import { LoadItemInfo } from "@/components/side-effects/LoadItemInfo"
import { Loader } from "@/components/ui/Loader"
import { setDataFetch } from "@/lib/setDataFetch"
import { testingLocalStorage } from "@/utils/testingLocalStorage"
import { setDataLocalStorage } from "@/utils/setLocalStoraje"
import { verifyPlayerStorage } from "@/utils/verifyPlayerStorage"
import { PagePrimary } from "@/components/summoner/PagePrimary"
import { replaceLocalStorage } from "@/utils/replaceLocalStorage"
import { deleteLocalStorage } from "@/utils/deleteLocalStorage"
import { handleApiError, isClientError } from "@/utils/errorHandler"


const page = ({ params }) => {
  const [routerPath, setRouterPath] = useState(1)
  const itemsInfo = useSumonnerStore(state => state.itemsInfo);

  const { summonerName } = use(params)
  const newDate = summonerName.split('-')

  // Trae estados 
  const setDataSumonner = useSumonnerStore(state => state.setDataSumonner)
  const setDataPuuid = useSumonnerStore(state => state.setDataPuuid)
  const setError = useSumonnerStore(state => state.setError)
  const error = useSumonnerStore(state => state.error)
  const loading = useSumonnerStore(state => state.loading)
  const setLoading = useSumonnerStore(state => state.setLoading)
  const dataSumonner = useSumonnerStore(state => state.dataSumonner)
  const setNewMatchs = useSumonnerStore(state => state.setNewMatchs)

  useEffect(() => {
    deleteLocalStorage()
    verifyPlayerStorage(setDataPuuid)
    getData()
  }, [])
  
  const getData = async () => {
    setError(null)
    setLoading(true)
    setDataSumonner(null)
    const [nameTag, dataTag] = newDate
    const { matchHistoryJson, nameTagStorage, puuidStorage } = testingLocalStorage()
    if (nameTagStorage == summonerName) {
      try {
        const dataFetch = await setDataFetch(nameTag, dataTag, false)
        console.log(dataFetch)
        if (dataFetch.results.status !== 200) {
          replaceLocalStorage()
          const errorMessage = isClientError(dataFetch.results.status) 
            ? handleApiError({ response: dataFetch.results })
            : dataFetch.results.message || 'Error al procesar la solicitud';
          setError(errorMessage);
          setLoading(false);
          return;
        }

        const newPlayer = {
          ...dataFetch.results.infoSummoner,
          matchs: matchHistoryJson
        }  
        console.log(newPlayer)
        setDataPuuid(puuidStorage)
        setDataSumonner({user: newPlayer.user, stats: newPlayer.stats})
        setNewMatchs(newPlayer.matchs)
        setDataLocalStorage(newPlayer.matchs, newPlayer.user.puuid, summonerName)
      } catch (error) {
        const errorMessage = error.response 
          ? handleApiError(error)
          : 'Error de conexión. Por favor, verifica tu conexión a internet.';
        setError(errorMessage);
      } finally {
        setLoading(false)
      }
    } else {
      replaceLocalStorage()
      try {
        const dataFetch = await setDataFetch(nameTag, dataTag, true)
        console.log(dataFetch)
        if (dataFetch.results.status !== 200) {
          const errorMessage = isClientError(dataFetch.results.status) 
            ? handleApiError({ response: dataFetch.results })
            : dataFetch.results.message || 'Error al procesar la solicitud';
          setError(errorMessage);
          setLoading(false);
        } else {
          const newPlayer = dataFetch.results.infoSummoner
          setDataPuuid(newPlayer.user.puuid)
          setDataSumonner({user: newPlayer.user, stats: newPlayer.stats})
          setNewMatchs(newPlayer.matchs)
          setDataLocalStorage(newPlayer.matchs, newPlayer.user.puuid, summonerName)
        }
      } catch (error) {
        const errorMessage = error.response 
          ? handleApiError(error)
          : 'Error de conexión. Por favor, verifica tu conexión a internet.';
        setError(errorMessage);
        setLoading(false);
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading) return <Loader />

  return (
    <main>
      <LoadItemInfo />
      <PagePrimary error={error} dataSumonner={dataSumonner} setRouterPath={setRouterPath} routerPath={routerPath} newDate={newDate} itemsInfo={itemsInfo}/>
    </main>
  )
}

export default page

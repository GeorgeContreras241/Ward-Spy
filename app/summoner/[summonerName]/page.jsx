"use client"
import { useEffect, use, useState } from "react"
import { useSumonnerStore } from "@/store/SummonerStore"
import { Loader } from "@/components/ui/Loader"
import { setDataFetch } from "@/lib/setDataFetch"
import { testingLocalStorage } from "@/utils/testingLocalStorage"
import { setDataLocalStorage } from "@/utils/setLocalStoraje"
import { verifyPlayerStorage } from "@/utils/verifyPlayerStorage"
import { PagePrimary } from "@/components/summoner/PagePrimary"
import { replaceLocalStorage } from "@/utils/replaceLocalStorage"
import { deleteLocalStorage } from "@/utils/deleteLocalStorage"

const page = ({ params }) => {
  const [itemsInfo, setItemsInfo] = useState(null)
  const [routerPath, setRouterPath] = useState(1)
  const { dataSumonner, setDataSumonner, setDataPuuid, setError, error, loading, setLoading } = useSumonnerStore()
  const { summonerName } = use(params)
  const newDate = summonerName.split('-')

  useEffect(() => {
    deleteLocalStorage()
    verifyPlayerStorage(setDataPuuid)
    getData()
  }, [])

  useEffect(() => {
    const Apicall = async (id = 20000) => {
      const res = await fetch(`/api/info-items?id=${id}`)
      const data = await res.json()
      setItemsInfo(data)
    }
    Apicall()
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
        if (dataFetch.results.status != 200) {
          replaceLocalStorage()
          setError(dataFetch.results.message + dataFetch.results.status)
          setLoading(false)
        }
        const newPlayer = {
          ...dataFetch.results.infoSummoner,
          matchs: matchHistoryJson
        }

        setDataPuuid(puuidStorage)
        setDataSumonner(newPlayer)
        setDataLocalStorage(newPlayer.matchs, newPlayer.user.puuid, summonerName)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    } else {
      replaceLocalStorage()
      try {
        const dataFetch = await setDataFetch(nameTag, dataTag, true)
        if (dataFetch.results.status != 200) {
          setError(dataFetch.results.message + dataFetch.results.status)
          setLoading(false)
        } else {
          const newPlayer = dataFetch.results.infoSummoner
          setDataPuuid(newPlayer.user.puuid)
          setDataSumonner(newPlayer)
          setDataLocalStorage(newPlayer.matchs, newPlayer.user.puuid, summonerName)
        }
      } catch (error) {
        setError(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading) return <Loader />

  return (
    <main>
      <PagePrimary error={error} dataSumonner={dataSumonner} setRouterPath={setRouterPath} routerPath={routerPath} newDate={newDate} />
    </main>
  )
}

export default page

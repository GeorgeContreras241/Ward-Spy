"use client"
import { useEffect, use, useState } from "react"
import { useSumonnerStore } from "@/app/store/SummonerStore"
import { MatchHistory } from "@/app/components/summoner/MatchHistory"
import { LiveGame } from "@/app/components/liveGame/LiveGame"
import { Loader } from "@/app/components/ui/Loader"
import { NavbarMatch } from "@/app/components/ui/NavbarMatch"
import { setDataFetch } from "@/app/utils/setLocalStoraje"
import { Clash } from "@/app/components/clash/Clash"

const page = ({ params }) => {
  const [error, setError] = useState(null)
  const [routerPath, setRouterPath] = useState(1)
  const { dataSumonner, setDataSumonner, setLoading, loading, setDataPuuid } = useSumonnerStore()
  const { summonerName } = use(params)
  const newDate = summonerName.split('-')

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    if (newDate.length === 2) {
      const [nameTag, dataTag] = newDate
      const newResponse = await setDataFetch({ nameTag, dataTag, setLoading, setError })
      setDataSumonner(newResponse.results.infoSummoner)
      setDataPuuid(newResponse.results?.infoSummoner?.user?.puuid)
    } else {
      console.log("error ")
    }
  }

  if (loading) return <Loader />

 

  return (
    <main>

      {error &&
        <p className="text-red-500 text-center mt-20">{error}</p>
      }
      {dataSumonner && <>
        <NavbarMatch setRouterPath={setRouterPath} />
        {routerPath === 1 && <MatchHistory />}
        {routerPath === 2 && <LiveGame newDate={newDate} puuid={dataSumonner.user.puuid}/>}
        {routerPath === 3 && <Clash/>}  
      </>
      }
    </main>
  )
}

export default page

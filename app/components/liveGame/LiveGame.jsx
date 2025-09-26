"use client"
import { useState, useEffect } from "react"
import { TableLIveGame } from "./TableLIveGame"
import { Loader } from "@/app/components/ui/Loader"
import { setDataLiveGame } from "@/app/utils/setLocalStoraje"

export const LiveGame = ({ puuid }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const getData = async () => {
        const data = await setDataLiveGame({ puuid, setLoading })
        setData(data) 
    }
    console.log(data)
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="max-w-5xl mx-auto w-full">
            {loading && <Loader />}
            {data?.data && <TableLIveGame data={data?.data} />}
            {data?.inGame === false && <p className="text-center font-semibold text-sm mt-6">Upps No esta en partida</p>}
        </div>
    )
}

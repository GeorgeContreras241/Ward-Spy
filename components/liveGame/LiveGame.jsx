"use client"
import { useState, useEffect } from "react"
import { TableLIveGame } from "./TableLIveGame"
import { Loader } from "@/components/ui/Loader"
import { setDataLiveGame } from "@/app/utils/setDataLiveGame"

export const LiveGame = ({ puuid }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const getData = async () => {
        const data = await setDataLiveGame({ puuid, setLoading })
        setData(data)
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="max-w-5xl mx-auto w-full">
            {loading && <Loader />}
            {data?.data && <TableLIveGame data={data?.data} />}
            {data?.inGame === false && !loading && <div className="h-40 flex justify-center items-center">
                <p className="h-fit text-center font-semibold text-sm">Upps No esta en partida</p></div>}
        </div>
    )
}

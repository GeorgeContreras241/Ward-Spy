"use client"
import { useEffect } from "react"

export const Clash = () => {

    const getData = async () => {
        try {
            const res = await fetch("/api/prueba")
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

  

    return (
        <div>Clash penelope
            <button onClick={getData}>Get Data</button>
        </div>
    )
}

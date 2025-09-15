import { useState, useEffect } from "react"

export const useFetch = ({ stringUrl }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getData()
    }, [stringUrl])

    const getData = async() => {
        try {
            setLoading(true)
            const response = await fetch(stringUrl)
            if (!response.ok) {
                throw new Error("Upps algo salio mal")
            }
            const data = await response.json()
            setData(data)
            console.log(data)
            setLoading(false)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        data,
        loading,
        error
    }
}

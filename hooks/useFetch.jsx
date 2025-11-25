"use client"
import { useState, useEffect } from "react"

export const useFetch = (stringUrl) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = async () => {
    try {
      setLoading(true)
      const response = await fetch(stringUrl  )
      if (!response.ok) throw new Error("Upps, algo salió mal")
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!stringUrl) return
    getData()
  }, [stringUrl])

  return { data, loading, error }
}

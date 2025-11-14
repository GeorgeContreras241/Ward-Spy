"use client"
import { useEffect } from "react"

export const Clash = () => {
    const getData = async () => {
        try {
            const res = await fetch("/api/prueba")
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error.error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center bg-transparent">
            <div className="bg-primary backdrop-blur-sm border-l-4 border-yellow-500 text-yellow-100 p-6 w-full max-w-2xl rounded-lg shadow-xl">
                <p className="font-bold text-xl mb-2">¡Estamos trabajando en esto!</p>
                <p className="text-gray-300">Disculpa las molestias. Esta sección está en desarrollo y estará disponible pronto.</p>
            </div>
        </div>
    )
}

import dbConnect from '@/lib/db'
import Player from '@/lib/models/players'

export const saveUser = async (userData) => {
    try {
        await dbConnect()
        const newPlayer = new Player(userData)
        await newPlayer.save()
    } catch (error) {
        console.warn(error)
    }

}
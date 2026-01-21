import dbConnect from '@/lib/db'
//Models
import Stat from '@/lib/models/stats'

export const saveStats = async (stats) => {
    try {
        await dbConnect()
        const newStat = new Stat(stats)
        await newStat.save()
    } catch (error) {
        console.log(error)
    }
}
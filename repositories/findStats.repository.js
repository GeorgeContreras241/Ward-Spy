import dbConnect from '@/lib/db'
//Models
import Stat from '@/lib/models/stats'

export const findStats = async (puuid) => {
    try {
        await dbConnect()
        const verifyStats = await Stat.findOne(puuid)
        return verifyStats;
    } catch (error) {
        console.log(error)
    }
}
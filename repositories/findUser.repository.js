import dbConnect from '@/lib/db'
//Models
import Player from '@/lib/models/players'


export const findUser = async (nameTag,dataTag) => {
    try {
        await dbConnect();
        // Search Player 
        let verifyPlayer = await Player.findOne({ summonerName: nameTag + '#' + dataTag })
        return verifyPlayer
    } catch (error) {
        throw error
     }

}
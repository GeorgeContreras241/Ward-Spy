import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
    puuid: {
        type: String,
        required: true,
        unique: true,
      },
    flexSolo: {
        leagueId : String,
        leaguePoints : Number,
        rank : String,
        tier : String,
        wins : Number,
        losses : Number,
    },
    flexFlex: {
        leagueId : String,
        leaguePoints : Number,
        rank : String,
        tier : String,
        wins : Number,
        losses : Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 21600, 
    },
})
const Stat = mongoose.models.stats || mongoose.model("stats", statsSchema)
export default Stat
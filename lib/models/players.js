import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
    puuid: String,
    summonerName: String,
    accountId: String,
    summonerId: String,
    region: String,
    profileIconId: Number,
    lastSeen: Date,
  });

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema,"players")

export default Player


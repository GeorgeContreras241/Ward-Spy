import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  puuid: {
    type: String,
    required: true,
    unique: true,
  },
  summonerName: String,
  summonerLevel: String,
  region: String,
  profileIconId: Number,
  lastSeen: Date,
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;

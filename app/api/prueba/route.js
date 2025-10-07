import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Player from "@/lib/models/players";

export async function GET() {
  try {
    await dbConnect();
    const playerModel1 = {
      puuid: "holaaaaaaaaaaaaa",
      summonerName: "ShadowFox#MX1",
      summonerLevel: 247,
      region: "LAN",
      profileIconId: 5379
    };
    const play = new Player(playerModel1)
    await play.save()
    return NextResponse.json({ status: 200 });
  }
  catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

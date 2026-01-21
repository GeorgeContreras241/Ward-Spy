import { NextResponse } from 'next/server'
import { servicesMatchHistory } from "@/service/riot/matchHistory.service"


export async function GET(req) {
  const { searchParams } = new URL(req.url)

  const nameTag = searchParams.get('nameTag');
  const dataTag = searchParams.get('dataTag');

  let matchs = req.headers.get('Matchs')

  if (!nameTag || !dataTag) return NextResponse.json({ status: 400, message: 'Riot Id corrupto', data: null })

  const RiotApiKey = process.env.RIOT_API_KEY;
  if (!RiotApiKey) {
    return NextResponse.json(
      { message: "API key de Riot no encontrada" },
      { status: 500 }
    );
  }

  const result = await servicesMatchHistory(nameTag, dataTag, matchs, RiotApiKey)

  return NextResponse.json(result)
}




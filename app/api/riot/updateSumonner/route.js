import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { servicesUpdate } from '@/service/riot/update.service'

// Timer
const coolDown = new Map()
const COOLDOWN = 2 * 60 * 1000 // 2 Minutos
export async function POST(req) {
  await dbConnect()
  const ip = req.headers.get('x-forwarded-for') || req.socket.remoteAddress
  const now = Date.now()
  const last = coolDown.get(ip)

  if (last && now - last < COOLDOWN) {
    const remaining = Math.ceil((COOLDOWN - (now - last)) / 1000)
    return NextResponse.json({
      ok: false,
      status: 429,
      message: remaining,
    })
  }

  coolDown.set(ip, now)

  const { dataName, dataTag } = await req.json()
  if (!dataName || !dataTag) {
    return NextResponse.json({ 
      status: 400, 
      message: 'Riot Id corrupto', 
      data: null 
    })
  }
  // Validate API key
  const RiotApiKey = process.env.RIOT_API_KEY
  if (!RiotApiKey) {
    return NextResponse.json(
      { message: 'API key de Riot no encontrada' },
      { status: 500 }
    )
  }
  const response = await servicesUpdate(dataName, dataTag, RiotApiKey)
  console.log(response)

    return new Response(
      JSON.stringify({
        response,
        status: 200,
        cooldown: COOLDOWN,
        message: 'Perfil actualizado correctamente'
      })
    )
}
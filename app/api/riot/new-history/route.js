import { NextResponse } from "next/server";
import { newMatchService } from "@/service/riot/newMatch.service";

export async function POST(req) {
    const body = await req.json()
    const { puuid, page } = body

    const resMatchs = await newMatchService(puuid, page)

    return NextResponse.json({
        resMatchs
    })
}
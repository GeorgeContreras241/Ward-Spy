import { NextResponse } from "next/server"
import { serviceDragon } from "@/service/images/data-dragon"


export async function POST(req) {
   const body = await req.json();
   const res = await serviceDragon(body.version)
   return NextResponse.json(res)
}




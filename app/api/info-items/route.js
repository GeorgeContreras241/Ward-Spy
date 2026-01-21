import { itemsInfo } from "@/service/info-items/itemsInfo"  
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const body = await req.json()
    const res = await itemsInfo(body)
    return NextResponse.json(res)
}


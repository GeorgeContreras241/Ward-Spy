import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Player from "@/lib/models/players";

export async function GET() {
  try {
    await dbConnect();
    const players = await Player.find({});
    return NextResponse.json({ success: true, data: players }, { status: 200 });
  } catch (error) {
    console.error("/api/prueba GET error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}

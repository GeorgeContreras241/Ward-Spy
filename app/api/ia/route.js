import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})


export const POST    = async (req) => {


}
/**
 * 
 *  const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "hablas español?"
            }
        ],
        model: "llama-3.1-8b-instant"
    })
    console.log("Estas en el ruta de api")
    return NextResponse.json({
        completion
    })
*/
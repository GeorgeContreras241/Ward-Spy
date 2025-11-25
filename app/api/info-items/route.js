import { NextResponse } from "next/server"

export const GET = async (req) => {
    console.log("Realizando el fetch de Items")
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id')
    if(!id){
        return NextResponse.json({
            status: 400,
            message: 'No se proporciono un id'
        })
    }
    try{
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/15.12.1/data/es_MX/item.json`,
            {
                next: {
                    revalidate: 60 * 60 
                }
            }
        )
        if(!res.ok){
            return NextResponse.json({
                status: res.status,
                message: res.statusText   
            })
        }
        const data = await res.json()
        return NextResponse.json({
            items: data.data
        })

    }catch(error){
        console.log(error)
    }
}
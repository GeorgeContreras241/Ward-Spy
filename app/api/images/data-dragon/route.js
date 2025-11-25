export async function GET(req) {
   try {
      const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      if (!versionRes.ok) {
         return new Response(JSON.stringify({
            error: "No se pudo obtener la lista de versiones"
         }), { status: 500 })
      }
      const versions = await versionRes.json()
      const lastVersion = versions[0]  
      
      
      // Obtener lista de hechizos
      const spellRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/en_US/summoner.json`)
      if(!spellRes.ok) {
         return new Response(JSON.stringify({
            error: "No se pudo obtener la lista de hechizos"
         }), { status: 500 })
      }
      const spellData = await spellRes.json()
      const listSpell = {}
      Object.values(spellData.data).forEach((spell) => {
         listSpell[spell.key] =  spell.image.full
      })

      // Obetener lista de campeones
      const champRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/en_US/champion.json`)
      if(!champRes.ok) {
         return new Response(JSON.stringify({
            error: "No se pudo obtener la lista de campeones"
         }), { status: 500 })
      }
      const champData = await champRes.json()
      const listChamp = {}
      Object.values(champData.data).forEach((champ) => {
         listChamp[champ.key] =  champ.id
      })
      return new Response(JSON.stringify({
         dataSpell: listSpell,
         dataChamp: listChamp,
         version: lastVersion,
         status: 200,
         message: "Datos obtenidos correctamente"
      }))

   } catch (error) {
      console.error("Error en dataDragon:", error)
      return new Response(JSON.stringify({
         error: "Error interno del servidor"
      }), { status: 500 })
   }
}
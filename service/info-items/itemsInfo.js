import { getVersion } from "@/lib/getVersions"
import { servicesItems } from "@/lib/info-items/libItems"
import { servicesPerks } from "@/lib/info-items/libPerks"

export const itemsInfo = async (body) => {
    const version = body.version
    const lastVersion = await getVersion()

    // Si no existe la devuelve 

    if (!version) {
        const res = await servicesItems(lastVersion);
        const resPerks = await servicesPerks(lastVersion);
        console.log(res)
        console.log(resPerks)
        return {
            items: res,
            perks: resPerks,
            status: true,
        }
    }

    // si No coincide
    if (version !== lastVersion) {
        const res = await servicesItems(lastVersion);
        const resPerks = await servicesPerks(lastVersion);
        console.log(resPerks)
        return {
            items: res,
            perks: resPerks,
            status: true,
        }
    }

    return {
        status: true,
    }

}





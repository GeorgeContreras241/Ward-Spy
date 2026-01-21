import { getVersion } from "@/lib/getVersions"
import { serviceDataDragon } from "@/lib/serviceDragon"

export const serviceDragon = async (version) => {
    const lastVersion = await getVersion();
        if (!version) {
            const res = await serviceDataDragon(lastVersion);
            return res
        }
        if (version !== lastVersion) {
            const res = await serviceDataDragon(lastVersion);
            return res
        }
    return {
        status: true,
    }
}


"use client"
import { useEffect, useCallback } from "react"
import { useSumonnerStore } from "@/store/SummonerStore"

export const LoadItemInfo = () => {
    const setItemsInfo = useSumonnerStore(state => state.setItemsInfo)
    const setVersion = useSumonnerStore(state => state.setVersion)
    const setUrlListSpell = useSumonnerStore(state => state.setUrlListSpell)
    const setUrlListChamp = useSumonnerStore(state => state.setUrlListChamp)
    const setPerks = useSumonnerStore(state => state.setPerks)

    const fetchItems = useCallback(async (version) => {
        try {
            const res = await fetch('/api/info-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ version })
            });
            if (!res.ok) throw new Error('Error en la respuesta');
            return await res.json();
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    }, []);

    const loadItemsInfo = useCallback(async () => {
        const cachedItems = localStorage.getItem("itemsInfo");
        const cachedVersion = localStorage.getItem("itemVersion");
        const cachedDataDragon = localStorage.getItem("dataDragon");
        const cachedPerks = localStorage.getItem("perks");

        const data = await fetchItems(cachedVersion);
        const dataDragon = await fetchDataDragon(cachedVersion);

        const { dataChamp, dataSpell } = dataDragon;
        const { perks } = data;

        if (data.status && dataDragon.status) {
            setItemsInfo(JSON.parse(cachedItems));
            setUrlListChamp(JSON.parse(cachedDataDragon).dataChamp);
            setUrlListSpell(JSON.parse(cachedDataDragon).dataSpell);
            setPerks(JSON.parse(cachedPerks));
            setVersion(cachedVersion);

            return;
        }
        // Necesita actualización o primera carga
        localStorage.setItem("dataDragon", JSON.stringify({ dataChamp, dataSpell }));
        localStorage.setItem("itemsInfo", JSON.stringify(data.items.info));
        localStorage.setItem("itemVersion", data.items.version);
        localStorage.setItem("perks", JSON.stringify(perks.info));
        setItemsInfo(data.items.info);
        setUrlListChamp(dataDragon.dataChamp);
        setUrlListSpell(dataDragon.dataSpell);
        setVersion(data.items.version);
        setPerks(perks);
    }, [fetchItems, setItemsInfo, setVersion]);


    const fetchDataDragon = useCallback(async (version) => {
        const res = await fetch("/api/images/data-dragon", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ version })
        })
        if (!res.ok) throw new Error('Error en la respuesta');
        return await res.json();
    }, [])


    useEffect(() => {
        loadItemsInfo();
    }, [loadItemsInfo]);

    return null;
}


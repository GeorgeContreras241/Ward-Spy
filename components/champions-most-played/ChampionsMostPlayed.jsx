"use client"
import { useState, useMemo } from "react";
import { ChampionsHeader } from "./ChampionsHeader";
import { ChampionsTable } from "./ChampionsTable";
import { useSumonnerStore } from "@/store/SummonerStore";

export const ChampionsMostPlayed = () => {
    const [typeQueue, setTypeQueue] = useState("all");
    const [numberGames, setNumberGames] = useState(10);
    const matchs = useSumonnerStore((state) => state.matchs);
    const puuid = useSumonnerStore((state) => state.dataPuuid);
    const [searchQuery, setSearchQuery] = useState("");
    const version = useSumonnerStore(state => state.version)


    const playerFilter = matchs.flatMap((match) =>
        match.p.filter((i) =>
            puuid === i.id
        ).filter(Boolean).filter((i) => i.tq === typeQueue || typeQueue === "all")
    );

    const championsMostPlayed = useMemo(() => {
        const champions = playerFilter.reduce((acc, val) => {
            if(!acc[val.n]){
                acc[val.n] = { k: 0, a: 0, d: 0, ge: [], dc: [], dtk: [], w: 0, l: 0, cs: [], gd: [], gm: "", tq: 0};
            } 

            acc[val.n].k += val.k;
            acc[val.n].a += val.a;
            acc[val.n].d += val.d;
            acc[val.n].ge.push(val.ge);
            acc[val.n].dc.push(val.dc);    
            acc[val.n].dtk.push(val.dtk);
            acc[val.n].w += val.w ? 1 : 0;
            acc[val.n].l += val.w ? 0 : 1;
            acc[val.n].cs.push(val.cs);
            acc[val.n].gd.push(val.gd);
            acc[val.n].gm = val.gm;
            acc[val.n].tq = val.tq; 
            return acc;
        }, {});

        // Filter champions based on search query
        if (!searchQuery.trim()) return champions;
        
        const query = searchQuery.toLowerCase().trim();
        return Object.fromEntries(
            Object.entries(champions).filter(([champName]) => 
                champName.toLowerCase().includes(query)
            )
        );
    }, [playerFilter, searchQuery]);


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTypeQueueChange = (e) => {
        setTypeQueue(e.target.value);
    };
    const handleNumberGames = (e) => {
        setNumberGames(e.target.value);
    }

    return (
        <section className="max-w-5xl m-auto w-full border ">
            <ChampionsHeader 
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                typeQueue={typeQueue}
                onTypeQueueChange={handleTypeQueueChange}
                numberGames={numberGames}
                setNumberGames={setNumberGames}
            />
            <ChampionsTable champions={championsMostPlayed} version={version}/>
        </section>
    );
};
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSumonnerStore } from "@/store/SummonerStore";

export const ChampionsHeader = ({ searchQuery, onSearchChange, typeQueue, onTypeQueueChange, numberGames, setNumberGames }) => {
    const [timeStart, setTimeStart] = useState(null);
    const dataSumonner = useSumonnerStore(state => state.dataSumonner)
    const setMatchs = useSumonnerStore(state => state.setMatchs)

    const handleButton = async () => {
        if (!timeStart) {
            setTimeStart(Date.now());
        }
        const now = Date.now();
        const seconds = (now - timeStart) / 1000 <= 5;
        if (seconds) {
            return;
        } else {
            setTimeStart(now);
            setNumberGames(numberGames + 5);
            const res = await fetch('/api/riot/new-history',
                {
                    method: 'POST',
                    body: JSON.stringify({ puuid: dataSumonner.user.puuid, page: numberGames })
                }
            )
            const data = await res.json()
            setMatchs(data.resMatchs);
        }


    }
    return (
        <div className="flex flex-row gap-2 md:gap-8 px-1 md:px-6 h-13 items-center">
            <span className="font-bold text-xs md:text-md whitespace-nowrap">Champions Most Played</span>
            <input
                type="text"
                placeholder="Search champion..."
                className="w-32 md:w-48 border text-xs md:text-sm px-3 py-1.5 outline-none rounded-lg hover:border-primary focus:border-primary transition-colors text-gray-300 bg-gray-800/50"
                value={searchQuery}
                onChange={onSearchChange}
            />
            <div className="flex items-center gap-5">
                <label htmlFor="region" className="text-xs font-bold">Last Games:</label>
                <Button
                    name="region"
                    id="region"
                    className="text-xs md:text-sm border rounded px-2 py-1 ml-1 cursor-pointer hover:bg-primary-foreground/10"
                    onClick={handleButton}
                >
                    +5
                </Button>
                <span>{numberGames}</span>
            </div>
            <div className="ml-auto">
                <label htmlFor="region" className="text-xs font-bold">Game Mode: </label>
                <select
                    name="region"
                    id="region"
                    className="text-xs md:text-sm bg-gray-800/50 border rounded px-2 py-1 ml-1 focus:outline-none focus:border-primary"
                    value={typeQueue}
                    onChange={onTypeQueueChange}
                >
                    <option value="all">All</option>
                    <option value="Ranked Solo/Duo">Solo/Queue</option>
                    <option value="Ranked Flex">Flex</option>
                </select>
            </div>
        </div>
    );
};
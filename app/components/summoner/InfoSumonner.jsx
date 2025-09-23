import { League  } from "@/app/components/ui/League"

export const InfoSumonner = ({ dataSumonner }) => {
    return (
        <aside className=" w-full h-fit bg-card border border-border rounded-[0.5rem] p-4 space-y-2">
            <article className="bg-secondary p-3 rounded-[var(--radius)] border-l-4 border-purple-600">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/15.16.1/img/profileicon/${dataSumonner?.summoner.profileIconId}.png`}
                            alt="Profile"
                            className="h-14 w-14 rounded-full border-2 border-purple-500"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-[#0f111a] text-xs px-1.5 py-0.5 rounded-full border border-purple-500">
                            {dataSumonner?.summoner.summonerLevel}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-bold text-white truncate">{dataSumonner?.user.gameName}</h2>
                        <p className="text-xs text-purple-300">#{dataSumonner?.user.tagLine}</p>
                    </div>
                </div>
            </article>

            {dataSumonner?.league.length > 0 ? (
                dataSumonner.league.map((item) => {
                    const queueType = item.queueType === 'RANKED_SOLO_5x5'
                        ? 'Ranked Solo/Duo'
                        : item.queueType === 'RANKED_FLEX_SR'
                            ? 'Ranked Flex'
                            : item.queueType;

                    const tier = item.tier ? `${item.tier.charAt(0) + item.tier.slice(1).toLowerCase()}` : 'Unranked';
                    const rank = item.rank || '';
                    const winRate = Math.round((item.wins / (item.wins + item.losses)) * 100) || 0;
                    return (
                        <League
                            key={item.leagueId}
                            item={item}
                            queueType={queueType}
                            tier={tier}
                            rank={rank}
                            winRate={winRate}
                        />
                    );
                })
            ) : (
                <div className="bg-[#1e1a22] p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400">No ranked data available</p>
                </div>
            )}


            
        </aside>
    )
}

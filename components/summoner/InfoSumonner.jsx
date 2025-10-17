import { League  } from "@/components/summoner/League"

export const InfoSumonner = ({ dataSumonner }) => {
    return (
        <aside className=" w-full h-fit bg-card border border-border rounded-[0.5rem] p-4 space-y-2">
            <article className="bg-secondary p-3 rounded-[var(--radius)] border-l-4 border-purple-600">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/15.16.1/img/profileicon/${dataSumonner?.user.profileIconId}.png`}
                            alt="Profile"
                            className="h-14 w-14 rounded-full border-2 border-purple-500"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-[#0f111a] text-xs px-1.5 py-0.5 rounded-full border border-purple-500">
                            {dataSumonner?.user.summonerLevel}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-bold text-white truncate">{dataSumonner?.user.summonerName}</h2>
                        <p className="text-xs text-purple-300">#{dataSumonner?.user.tagLine}</p>
                    </div>
                </div>
            </article>

            {dataSumonner?.stats ? (
                <>
                    {dataSumonner.stats.flexSolo?.tier && (
                        <League
                            key={dataSumonner.stats.flexSolo.leagueId}
                            item={dataSumonner.stats.flexSolo}
                            queueType="Ranked Solo/Duo"
                            tier={dataSumonner.stats.flexSolo.tier ? `${dataSumonner.stats.flexSolo.tier.charAt(0) + dataSumonner.stats.flexSolo.tier.slice(1).toLowerCase()}` : 'Unranked'}
                            rank={dataSumonner.stats.flexSolo.rank || ''}
                            winRate={Math.round((dataSumonner.stats.flexSolo.wins / (dataSumonner.stats.flexSolo.wins + dataSumonner.stats.flexSolo.losses)) * 100) || 0}
                        />
                    )}
                    {dataSumonner.stats.flexFlex?.tier && (
                        <League
                            key={dataSumonner.stats.flexFlex.leagueId}
                            item={dataSumonner.stats.flexFlex}
                            queueType="Ranked Flex"
                            tier={dataSumonner.stats.flexFlex.tier ? `${dataSumonner.stats.flexFlex.tier.charAt(0) + dataSumonner.stats.flexFlex.tier.slice(1).toLowerCase()}` : 'Unranked'}
                            rank={dataSumonner.stats.flexFlex.rank || ''}
                            winRate={Math.round((dataSumonner.stats.flexFlex.wins / (dataSumonner.stats.flexFlex.wins + dataSumonner.stats.flexFlex.losses)) * 100) || 0}
                        />
                    )}
                    {!dataSumonner.stats.flexSolo?.tier && !dataSumonner.stats.flexFlex?.tier && (
                        <div className="bg-[#1e1a22] p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-400">No ranked data available</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-[#1e1a22] p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400">No ranked data available</p>
                </div>
            )}
        </aside>
    )
}

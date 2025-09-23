import { RecentChampions } from "@/app/components/ui/RecentChampions"

export const RecentGames = ({ dataSumonner, version }) => {
    return (
        <section className="bg-card px-4 py-2 border border-border rounded-[var(--radius)] shadow-sm">
            {dataSumonner?.matchs && dataSumonner.matchs.length > 0 && (() => {
                // Calculate statistics
                const matches = dataSumonner.matchs;
                const playerMatches = matches.map(match =>
                    match.value.info.participants.find(p => p.puuid === dataSumonner.user.puuid)
                );

                // Calculate win rate
                const wins = playerMatches.filter(match => match.win).length;
                const totalGames = playerMatches.length;
                const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

                // Calculate KDA
                const totalStats = playerMatches.reduce((acc, match) => ({
                    kills: acc.kills + match.kills,
                    deaths: acc.deaths + match.deaths,
                    assists: acc.assists + match.assists
                }), { kills: 0, deaths: 0, assists: 0 });

                const avgKDA = totalStats.deaths > 0
                    ? ((totalStats.kills + totalStats.assists) / totalStats.deaths).toFixed(2)
                    : totalStats.kills + totalStats.assists;

                // Get recent champions (last 3 unique champions)
                const recentChampions = [];
                const championMap = new Map();

                for (const match of playerMatches) {
                    if (!championMap.has(match.championName)) {
                        championMap.set(match.championName, {
                            name: match.championName,
                            wins: 0,
                            total: 0,
                            kills: 0,
                            deaths: 0,
                            assists: 0
                        });
                    }
                    const champ = championMap.get(match.championName);
                    champ.total++;
                    if (match.win) champ.wins++;
                    champ.kills += match.kills;
                    champ.deaths += match.deaths;
                    champ.assists += match.assists;
                }

                const sortedChampions = Array.from(championMap.values())
                    .sort((a, b) => b.total - a.total)
                    .slice(0, 3);

                return (
                    <div className="flex w-full flex-col md:flex-row gap-3">
                        <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-2 md:pr-4 md:border-r border-border">
                            <p className="text-3xl md:text-4xl font-bold leading-tight text-primary">{winRate}%</p>
                            <p className="text-xs text-muted-foreground">Win Rate</p>
                            <div className="w-full max-w-[140px] bg-muted h-1 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${winRate}%` }}></div>
                            </div>
                            <div className="flex flex-col  items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded-full bg-accent text-foreground text-[11px]">KDA {avgKDA}:1</span>
                                <span className="px-2 py-0.5 rounded-full bg-accent text-[11px]"><span className="text-foreground">{wins}W</span> <span className="text-muted-foreground">/</span> <span className="text-destructive">{totalGames - wins}L</span></span>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col gap-2">
                            {sortedChampions.map((champ, index) => {
                                const champKDA = champ.deaths > 0
                                    ? ((champ.kills + champ.assists) / champ.deaths).toFixed(1)
                                    : (champ.kills + champ.assists).toFixed(1);
                                const champWinRate = Math.round((champ.wins / champ.total) * 100);

                                return (
                                    <RecentChampions
                                        key={index}
                                        champ={champ}
                                        champWinRate={champWinRate}
                                        champKDA={champKDA}
                                        version={version}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })()}
        </section>
    )
}

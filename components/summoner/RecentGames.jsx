import { RecentChampions } from "@/components/ui/RecentChampions"

export const RecentGames = ({ dataSumonner, matchs, version }) => {
    if (!matchs?.length) return <p>Uphhs Error</p>;

    // Get player matches with the new data structure
    const playerMatches = matchs
        .map(match => match.p.find(p => p.id === dataSumonner.user.puuid))
        .filter(Boolean);

    // Calculate win rate
    const wins = playerMatches.filter(match => match.w).length;
    const totalGames = playerMatches.length;
    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

    // Process champion statistics
    const championMap = new Map();
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;

    playerMatches.forEach(match => {
        // Update champion stats
        if (!championMap.has(match.n)) {
            championMap.set(match.n, {
                name: match.n,
                wins: 0,
                total: 0,
                kills: 0,
                deaths: 0,
                assists: 0
            });
        }
        const champ = championMap.get(match.n);
        champ.total++;
        if (match.w) champ.wins++;
        champ.kills += match.k;
        champ.deaths += match.d;
        champ.assists += match.a;

        // Update overall stats
        totalKills += match.k;
        totalDeaths += match.d;
        totalAssists += match.a;
    });

    // Get top 3 champions by games played
    const sortedChampions = Array.from(championMap.values())
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

    // Calculate overall KDA
    const avgKDA = totalDeaths > 0
        ? ((totalKills + totalAssists) / totalDeaths).toFixed(1)
        : (totalKills + totalAssists).toFixed(1);

    return (
        <section className="bg-card px-4 py-2 border border-border rounded-[var(--radius)] shadow-sm">
            <div className="flex w-full h-full flex-col p-2 gap-3">
                {/* Win Rate Section */}
                <div className="w-full flex flex-row md:flex-col gap-2 md:border-r border-border">
                    <section className="flex flex-col p-2 gap-2 w-full">
                        <p className="text-xs font-bold text-muted-foreground">Win Rate</p>
                        <p className="text-3xl md:text-4xl font-bold leading-tight text-chart-4">
                            {winRate}%
                        </p>
                        <div className="w-2/3 bg-muted h-1 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-chart-2 transition-all duration-500"
                                style={{ width: `${winRate}%` }}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap gap-2 mt-1">
                            <span className="px-2 py-0.5 w-fit rounded-full bg-accent text-foreground text-[11px]">
                                KDA {avgKDA}:1
                            </span>
                            <span className="px-2 py-0.5 w-fit rounded-full bg-accent text-[11px]">
                                <span className="text-chart-4">{wins}W</span>{' '}
                                <span className="text-muted-foreground">/</span>{' '}
                                <span className="text-red-400">{totalGames - wins}L</span>
                            </span>
                        </div>
                    </section>
                </div>

                {/* Recent Champions Section */}
                <div className="w-full flex flex-col">
                    <p className="text-xs font-bold text-muted-foreground p-2">
                        Recent Champions
                    </p>
                    <div className="flex flex-row gap-2">
                        {sortedChampions.map((champ, index) => {
                            const champKDA = champ.deaths > 0
                                ? ((champ.kills + champ.assists) / champ.deaths).toFixed(1)
                                : (champ.kills + champ.assists).toFixed(1);

                            return (
                                <RecentChampions
                                    key={index}
                                    championName={champ.name}
                                    wins={champ.wins}
                                    losses={champ.total - champ.wins}
                                    kda={champKDA}
                                    version={version}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

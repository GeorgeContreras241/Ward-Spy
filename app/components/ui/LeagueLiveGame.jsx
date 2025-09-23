export const LeagueLiveGame = ({ leagueInfo, compact = false }) => {
    if (!leagueInfo) return null;

    const queueType = leagueInfo.queueType === 'RANKED_SOLO_5x5' ? 'Solo' :
        leagueInfo.queueType === 'RANKED_FLEX_SR' ? 'Flex' :
            leagueInfo.queueType.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');

    const tier = leagueInfo.tier ? `${leagueInfo.tier.charAt(0) + leagueInfo.tier.slice(1).toLowerCase()}` : 'Unranked';
    const rank = leagueInfo.rank || '';
    const winRate = Math.round((leagueInfo.wins / (leagueInfo.wins + leagueInfo.losses)) * 100) || 0;
    const totalGames = leagueInfo.wins + leagueInfo.losses;

    if (compact) {
        return (
            <div className="bg-card border border-border rounded-[var(--radius)] p-1.5 shadow-xs w-full">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 shrink-0">
                            <img 
                                src={`https://raw.communitydragon.org/14.20/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier.toLowerCase()}.png`}
                                alt={tier} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1 leading-none">
                                <span className="text-[10px] text-muted-foreground">{queueType}</span>
                                <span className="text-muted-foreground text-[10px]">•</span>
                                <span className="text-xs font-medium text-foreground">{leagueInfo.leaguePoints} <span className="text-muted-foreground">LP</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="bg-blue-900 text-blue-100 px-1 py-0.5 rounded text-[10px] inline-block">
                            {tier} {rank}
                        </div>
                    </div>

                    <div className="flex-1 text-right">
                        <div className="text-xs text-foreground font-medium leading-none">
                            {winRate}% WR
                        </div>
                        <div className="flex justify-end space-x-1 text-[10px] leading-none">
                            <span className="text-green-400">{leagueInfo.wins}W</span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-red-400">{leagueInfo.losses}L</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card border border-border rounded-[var(--radius)] p-2 shadow-sm max-w-sm mx-auto text-xs ">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-primary">{queueType}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-base font-semibold text-foreground">{leagueInfo.leaguePoints} <span className="text-muted-foreground">LP</span></span>
                    </div>
                </div>

                <div className="flex-1 text-center px-1">
                    <div className="bg-blue-900 text-blue-100 px-1.5 py-0.5 rounded inline-block">
                        {tier} {rank}
                    </div>
                    <div className="text-muted-foreground">
                        {totalGames} G
                    </div>
                </div>

                <div className="flex-1 text-right">
                    <div className="flex justify-end space-x-1">
                        <span className="text-green-400">{leagueInfo.wins}W</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-red-400">{leagueInfo.losses}L</span>
                    </div>
                    <div className="text-foreground font-medium">
                        {winRate}% WR
                    </div>
                </div>
            </div>

            <div className="w-full bg-muted rounded-full h-1 mt-1">
                <div
                    className="bg-primary h-1 rounded-full"
                    style={{ width: `${(leagueInfo.wins / totalGames) * 100}%` }}
                ></div>
            </div>
        </div>
    )
}

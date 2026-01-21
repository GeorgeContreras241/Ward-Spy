export const League = ({ item, queueType, tier, rank, winRate }) => {
    const queueName = queueType
        .replace('RANKED_', '')
        .replace('_', ' ')
        .replace(/\w+/g, w => w[0] + w.slice(1).toLowerCase());
        
    return (
        <div key={item.leagueId} className="bg-card rounded-[var(--radius)] p-2 border-l-2  border-amber-500/70 flex items-center h-full gap-2">
            <div className="bg-[#292233] p-1 rounded-lg">
                <img
                    src={`https://raw.communitydragon.org/14.20/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${item.tier.toLowerCase()}.png`}
                    alt={tier}
                    className="h-8 w-8 object-cover scale-300"
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-chart-1  max-w-[120px]">{queueName}</span>
                    <span className="text-xs font-semibold text-primary-foreground">{item.leaguePoints} LP</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-0.5">
                    <span className="text-white font-medium">{tier} {rank}</span>
                    <div className="flex items-center gap-1">
                        <span className="text-green-400">{item.wins}W</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-red-500">{item.losses}L</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-blue-400">{winRate}%</span>
                    </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div 
                        className={`h-full rounded-full ${winRate >= 50 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${winRate}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

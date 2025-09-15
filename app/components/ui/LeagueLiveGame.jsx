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
            <div className="bg-gray-800 rounded p-2 shadow md:w-72 w-full">
                <div className="flex items-center md:justify-between">
                    <div className="flex-1 flex items-center gap-2">
                        <div className="w-8 h-8">
                            <img 
                                src={`https://raw.communitydragon.org/14.20/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier.toLowerCase()}.png`}
                                alt={tier} 
                                className="w-full h-full object-cover scale-250"
                            />
                        </div>
                        <div>
                            <div className="text-blue-300 text-xs">{queueType}</div>
                            <div className="text-sm font-medium text-white">
                                {leagueInfo.leaguePoints} <span className="text-gray-400">LP</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 text-center hidden md:block">
                        <div className="bg-blue-900 text-blue-100 px-1.5 py-0.5 rounded text-xs inline-block">
                            {tier} {rank}
                        </div>
                    </div>

                    <div className="flex-1 text-right">
                        <div className="text-white font-medium">
                            {winRate}% WR
                        </div>
                        <div className="flex justify-end space-x-1 text-xs">
                            <span className="text-green-400">{leagueInfo.wins}W</span>
                            <span className="text-gray-400">/</span>
                            <span className="text-red-400">{leagueInfo.losses}L</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded p-2 shadow border border-gray-700   max-w-sm mx-auto text-xs ">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="text-blue-300">{queueType}</div>
                    <div className="text-lg font-bold text-white">
                        {leagueInfo.leaguePoints} <span className="text-gray-400">LP</span>
                    </div>
                </div>

                <div className="flex-1 text-center px-1">
                    <div className="bg-blue-900 text-blue-100 px-1.5 py-0.5 rounded inline-block">
                        {tier} {rank}
                    </div>
                    <div className="text-gray-300">
                        {totalGames} G
                    </div>
                </div>

                <div className="flex-1 text-right">
                    <div className="flex justify-end space-x-1">
                        <span className="text-green-400">{leagueInfo.wins}W</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-red-400">{leagueInfo.losses}L</span>
                    </div>
                    <div className="text-white font-medium">
                        {winRate}% WR
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full"
                    style={{ width: `${(leagueInfo.wins / totalGames) * 100}%` }}
                ></div>
            </div>
        </div>
    )
}

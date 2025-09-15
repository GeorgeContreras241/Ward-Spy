
export const PlayerList = ({ player }) => {
    const items = [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5]

    const calculateKDA = (kills, deaths, assists) => {
        if (deaths === 0) return 'Perfect';
        const kda = ((kills + assists) / deaths).toFixed(2);
        return `${kills}/${deaths}/${assists} (${kda})`;
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };
    return (
        <div
            className={`flex flex-nowrap items-center p-1 transition-colors ${player.win
                ? 'bg-green-900/30 hover:bg-green-900/40'
                : 'bg-red-900/20 hover:bg-red-900/30'
                }`}
        >
            {/* Champion Image */}
            <div className="w-8 h-8 relative mr-1.5">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/champion/${player.championName || 'Aatrox'}.png`}
                    alt={player.championName}
                    className="w-full h-full rounded-full border-2 border-yellow-500"
                />
                <span className="absolute -bottom-0.5 -right-0.5 bg-blue-600 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {player.championLevel || '1'}
                </span>
            </div>

            {/* Summoner Spells */}
            <div className="flex flex-col space-y-0.5 mr-1.5">
                <div className="w-4 h-4 bg-gray-700 rounded">
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/spell/${player.summonerSpell1 || 'SummonerFlash'}.png`}
                        alt="Summoner Spell 1"
                        className="w-full h-full rounded"
                    />
                </div>
                <div className="w-4 h-4 bg-gray-700 rounded">
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/spell/${player.summonerSpell2 || 'SummonerHeal'}.png`}
                        alt="Summoner Spell 2"
                        className="w-full h-full rounded"
                    />
                </div>
            </div>

            {/* Runes */}
            <div className="flex flex-col space-y-0.5 mr-1.5">
                <div className="w-5 h-5 bg-gray-700 rounded-full overflow-hidden">
                    <img
                        src={`/img/runes/${player.primaryRune || 'Precision'}.png`}
                        alt="Primary Rune"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-5 h-5 bg-gray-700 rounded-full overflow-hidden">
                    <img
                        src={`/img/runes/${player.secondaryRune || 'Domination'}.png`}
                        alt="Secondary Rune"
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* Player Info */}
            <div className="flex-1 min-w-[70px] mr-1">
                <p className="text-[11px] md:text-xs font-medium text-white truncate px-0.5">{player.riotIdGameName || 'Summoner'}</p>
                <p className="text-[9px] md:text-[10px] text-gray-400">{player.rank || 'Unranked'}</p>
            </div>

            {/* KDA */}
            <div className="w-12 text-center mr-1">
                <p className="text-[11px] md:text-xs font-medium">
                    {calculateKDA(player.kills || 0, player.deaths || 0, player.assists || 0)}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-400">
                    {player.kda || '0.00'} KDA
                </p>
            </div>

            {/* Damage */}
            <div className="w-10 text-center mr-1">
                <p className="text-[11px] md:text-xs font-medium">
                    {formatNumber(player.totalDamageDealtToChampions || 0)}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-400">Daño</p>
            </div>

            {/* Damage Taken */}
            <div className="w-14 text-center mr-1">
                <p className="text-[11px] md:text-xs font-medium">
                    {formatNumber(player.totalDamageTaken || 0)}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-400">Daño recibido</p>
            </div>

            {/* CS */}
            <div className="w-10 text-center mr-1">
                <p className="text-[11px] md:text-xs font-medium">
                    {player.totalMinionsKilled || '0'}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-400">CS ({player.cspm || '0.0'})</p>
            </div>

            {/* Items */}
            <div className="grid md:grid-cols-3 grid-cols-7 gap-0.5 ml-1">
                {items.map((item, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-700 rounded-sm overflow-hidden">
                        {item && (
                            <img
                                src={`http://ddragon.leagueoflegends.com/cdn/15.15.1/img/item/${item}.png`}
                                alt={`Item ${i + 1}`}
                                className="w-full h-full"
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <div className="w-5 h-5 bg-gray-700 rounded-sm overflow-hidden">
                    <img
                        src={`http://ddragon.leagueoflegends.com/cdn/15.15.1/img/item/${player.item6}.png`}
                        alt={`Item ${player.item6}`}
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}

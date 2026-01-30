
export const PlayerList = ({ player, version, urlListSpell, perks = [] }) => {
    // Extract items array with null checks
    const items = [
        player?.it0,
        player?.it1,
        player?.it2,
        player?.it3,
        player?.it4,
        player?.it5
    ].filter(Boolean);

    // Calculate KDA with proper formatting
    const calculateKDA = (kills = 0, deaths = 0, assists = 0) => {
        if (deaths === 0) return 'Perfect';
        const kda = ((kills + assists) / deaths).toFixed(2);
        return `${kills}/${deaths}/${assists} (${kda})`;
    };

    // Format large numbers with K/M suffixes
    const formatNumber = (num = 0) => {
        if (!num && num !== 0) return '0';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toLocaleString();
    };

    // Calculate CS per minute
    const calculateCSPerMin = (cs, gameDuration) => {
        if (!cs || !gameDuration) return '0.0';
        return (cs / (gameDuration / 60)).toFixed(1);
    };
    return (
        <div
            className={`flex flex-nowrap items-center p-1 transition-colors ${player.w
                    ? 'bg-green-900/30 hover:bg-green-900/40'
                    : 'bg-red-900/20 hover:bg-red-900/30'
                }`}
        >
            {/* Champion Image */}
            <div className="w-8 h-8 relative mr-1.5">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.n}.png`}
                    alt={player.n}
                    className="w-full h-full rounded-full border-2 border-yellow-500"
                    loading="lazy"
                    width={24}
                    height={24}
                    decoding="async"
                    fetchPriority="low"
                />
                <span className="absolute -bottom-0.5 -right-0.5 bg-blue-600 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {player.lvl || '1'}
                </span>
            </div>

            {/* Summoner Spells */}
            <div className="flex flex-col space-y-0.5 mr-1.5">
                {[player.sm, player.sm2].map((spell, index) => (
                    <div key={index} className="w-4 h-4 bg-gray-700 rounded">
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[spell]}`}
                            alt={`Summoner Spell ${index + 1}`}
                            className="w-full h-full rounded"

                        />
                    </div>
                ))}
            </div>

            {/* Runes */}
            <div className="flex flex-col space-y-0.5 mr-1.5">
                {player.pk?.styles?.slice(0, 2).map((style, index) => {
                    const rune = perks?.find(p => p.id === style.style);
                    if (!rune) return null;
                    return (
                        <div key={index} className="w-4 h-4 rounded overflow-hidden">
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                                alt={rune.name || `Rune ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                width={20}
                                height={20}
                                decoding="async"
                                fetchPriority="low"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Player Info */}
            <div className="flex-1 min-w-[70px] mr-1">
                <p
                    className="text-[11px] md:text-xs font-medium text-white truncate px-0.5 hover:text-blue-400 cursor-pointer"
                    onClick={() => player.rid && player.rit && window.open(`/summoner/${player.rid}-${player.rit}`, '_blank')}
                >
                    {player.rid || 'Summoner'}
                </p>
            </div>

            {/* KDA */}
            <div className="w-12 text-center mr-1">
                <p className="text-[11px] md:text-xs font-medium">
                    {calculateKDA(player.k, player.d, player.a)}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-400">
                    {player.kda || '0.00'} KDA
                </p>
            </div>

            {/* Damage */}
            <div className="w-10 text-center mr-1" title={`${player.dc?.toLocaleString() || 0} total damage`}>
                <p className="text-[11px] md:text-xs font-medium">
                    {formatNumber(player.dc)}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-400">Daño</p>
            </div>

            {/* Damage Taken */}
            <div className="w-14 text-center mr-1" title={`${player.dtk?.toLocaleString() || 0} damage taken`}>
                <p className="text-[11px] md:text-xs font-medium">
                    {formatNumber(player.dtk)}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-400">Daño recibido</p>
            </div>

            {/* CS */}
            <div className="w-10 text-center mr-1">
                <p className="text-[11px] md:text-xs font-medium">
                    {player.cs || '0'}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-400">
                    CS ({calculateCSPerMin(player.cs, player.gd)})
                </p>
            </div>

            {/* Items */}
            <div className="grid md:grid-cols-3 grid-cols-7 gap-0.5 ml-1">
                {items.map((item, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-700 rounded-sm overflow-hidden">
                        {item ? (
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`}
                                alt={`Item ${i + 1}`}
                                className="w-full h-full"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading.png';
                                }}
                            />
                        ) : (
                            <div className='w-full h-full bg-gray-900 border border-gray-700' />
                        )}
                    </div>
                ))}
            </div>

            {/* Trinket */}
            <div className="w-5 h-5 bg-gray-700 rounded-sm overflow-hidden ml-0.5">
                {player.it6 ? (
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.it6}.png`}
                        alt="Trinket"
                        className="w-full h-full"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading.png';
                        }}
                    />
                ) : (
                    <div className='w-full h-full bg-gray-900 border border-gray-700' />
                )}
            </div>
        </div>
    )
}

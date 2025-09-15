import React from 'react';

export const RecentChampions = ({ champ, champWinRate, champKDA, version, index }) => {
    const winRateColor = champWinRate >= 60 ? 'text-green-400' : champWinRate >= 50 ? 'text-yellow-400' : 'text-red-400';
    const kdaColor = parseFloat(champKDA) >= 3.5 ? 'text-green-400' : parseFloat(champKDA) >= 2.5 ? 'text-yellow-400' : 'text-red-400';

    const wins = Math.round((champWinRate / 100) * champ.total);
    const losses = champ.total - wins;

    return (
        <div key={index} className="flex w-full items-center gap-2 hover:bg-gray-800/50 rounded-lg transition-colors">
            <div className="relative">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.name}.png`}
                    alt={champ.name}
                    className="w-12 h-12 rounded-lg border border-yellow-500/30"
                    onError={(e) => {
                        if (e.target.src.endsWith('default-champ.png')) return;
                        e.target.src = '/default-champ.png';
                    }}
                />
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-bold px-1 rounded-full">
                    {champ.total}
                </span>
            </div>

            <div className="flex-1 ">
                <p className="font-medium text-xs text-neutral-300 font-semibold truncate">{champ.name}</p>

                <div className="flex items-center justify-between text-xs mt-1">
                    <div className="flex items-center gap-2">
                        <span className={`font-bold ${winRateColor}`}>
                            {champWinRate}% <span className="text-gray-400">WR</span>
                        </span>
                        <span className="text-gray-500">|</span>
                        <span className={kdaColor}>
                            <span className="font-bold">{champKDA}</span> <span className="text-gray-400">KDA</span>
                        </span>
                    </div>
                </div>

                <div className="w-full bg-gray-700 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div
                        className="h-full bg-green-500"
                        style={{ width: `${champWinRate}%` }}
                    ></div>
                </div>

                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                    <div className="flex items-center gap-2">
                        <span>{wins}W</span>
                        <span>{losses}L</span>
                    </div>
                    <span>{champ.total} games</span>
                </div>
            </div>
        </div>
    );
};

"use client"
export const ChampionsRowTable = ({ champion, data,version }) => {
    const wins = data.w;
    const losses = data.l;
    const winRate = wins > 0 ? ((wins / (wins + losses)) * 100).toFixed(0) : 0;

    const kda = ((data.k + data.a) / Math.max(1, data.d)).toFixed(2);
    const totalGames = data.w + data.l;

    const portWin = ((data.w / totalGames) * 100).toFixed(0);
    const portLoss = ((data.l / totalGames) * 100).toFixed(0);


    const goldAverage = data.ge.reduce((a, b) => a + b, 0) / data.ge.length;
    const csAverage = (data.cs.reduce((a, b) => (a + b) / data.cs.length)).toFixed(1) || 0;
    const tdAverage = data.dc.reduce((a, b) => a + b, 0) / data.dc.length || 0;
    const dtkAverage = data.dtk.reduce((a, b) => a + b, 0) / data.dtk.length || 0;

    return (
        <tr className="border-b border-gray-700 hover:bg-gray-800/50 text-sm text-center">
            {/* Champion */}
            <td className="px-2 py-1.5 text-white">
                <div className="flex items-center space-x-1">
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}.png`}
                        alt={champion}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        loading="lazy"
                    />
                    <span className="hidden sm:inline text-xs sm:text-sm">{champion}</span>
                </div>
            </td>

            {/* Win Rate */}
            <td className="px-1 py-1.5 r">
                <div className="grid grid-cols-[1fr_45px] items-center justify-cente">
                    <div className="flex flex-row max-w-[90px] h-5 text-xs">
                        {portWin > 0 && (
                            <div
                                className={`bg-green-900 text-green-400 h-full flex items-center justify-center min-w-[20px]`}
                                style={{ width: `${portWin}%` }}
                            >
                                {data.w}
                            </div>
                        )}
                        {portLoss > 0 && (
                            <div
                                className="bg-red-900 text-red-400 h-full flex items-center justify-center min-w-[20px]"
                                style={{ width: `${portLoss}%` }}
                            >
                                {data.l}
                            </div>
                        )}
                    </div>
                    <span className={`text-xs font-bold ${winRate >= 50 ? 'text-green-400' : 'text-red-400'}`}>{winRate}%</span>
                </div>
            </td>

            {/* CS */}
            <td className="px-1 py-1.5 text-gray-300 font-medium text-xs sm:text-sm">
                {csAverage}
            </td>

            {/* Gold */}
            <td className="px-1 py-1.5 text-gray-300 font-medium text-xs sm:text-sm whitespace-nowrap">
                {(goldAverage / 1000).toFixed(1)}k
            </td>

            {/* Games */}
            <td className="px-1 py-1.5 text-gray-300 font-medium">
                {kda}
            </td>

            {/* K/D/A */}
            <td className="px-1 py-1.5 text-gray-300 font-medium text-xs sm:text-sm ">
                <span className="text-gray-200">{data.k}</span>/
                <span className="text-red-400">{data.d}</span>/
                <span className="text-neutral-300">{data.a}</span>
            </td>

            {/* Total Damage */}
            <td className="px-1 py-1.5 text-gray-300 text-xs sm:text-sm whitespace-nowrap">
                {(tdAverage / 1000).toFixed(1)}k
            </td>

            {/* Damage Taken */}
            <td className="px-1 py-1.5 text-gray-300 text-xs sm:text-sm whitespace-nowrap">
                {(dtkAverage / 1000).toFixed(1)}k
            </td>
        </tr>
    );
};

"use client";

export const RecentChampions = ({ championName, wins, losses, kda, version }) => {
    const totalGames = wins + losses;
    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    const winRateColor = winRate >= 60 ? 'text-win' : winRate >= 50 ? 'text-lose' : 'text-lose';
    const kdaColor = parseFloat(kda) >= 3.5 ? 'text-win' : parseFloat(kda) >= 2.5 ? 'text-chart-5' : 'text-lose';

    return (
        <div className="flex w-full items-center gap-2 p-1.5 border border-border hover:bg-accent/50 rounded-[var(--radius)] transition-colors overflow-hidden">
            <div className="relative shrink-0">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`}
                    alt={championName}
                    className="w-10 h-10 rounded-[var(--radius)] border border-border"
                    onError={(e) => {
                        if (e.target.src.endsWith('default-champ.png')) return;
                        e.target.src = '/default-champ.png';
                    }}
                />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1 rounded-full">
                    {totalGames}
                </span>
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-medium text-xs text-foreground font-semibold truncate">
                    {championName}
                </p>

                <div className="flex items-center text-xs mt-0.5 gap-2">
                    <div className="flex items-center gap-2">
                        <span className={`font-bold ${winRateColor}`}>
                            {winRate}% <span className="text-foreground">WR</span>
                        </span>
                        <span className="text-muted-foreground">|</span>
                        <span className={kdaColor}>
                            <span className="font-bold">{kda}</span> <span className="text-muted-foreground">KDA</span>
                        </span>
                    </div>
                </div>

                <div className="w-full bg-lose h-1 rounded-full mt-0.5 overflow-hidden">
                    <div
                        className="h-full bg-chart-4"
                        style={{ width: `${winRate}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
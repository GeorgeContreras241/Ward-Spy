import React from 'react';

export const RecentChampions = ({ champ, champWinRate, champKDA, version, index }) => {
    const winRateColor = champWinRate >= 60 ? 'text-primary' : champWinRate >= 50 ? 'text-foreground' : 'text-destructive';
    const kdaColor = parseFloat(champKDA) >= 3.5 ? 'text-primary' : parseFloat(champKDA) >= 2.5 ? 'text-foreground' : 'text-destructive';

    const wins = Math.round((champWinRate / 100) * champ.total);
    const losses = champ.total - wins;

    return (
        <div key={index} className="flex w-full items-center gap-2 p-1.5 border border-border hover:bg-accent/50 rounded-[var(--radius)] transition-colors overflow-hidden">
            <div className="relative shrink-0">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.name}.png`}
                    alt={champ.name}
                    className="w-10 h-10 rounded-[var(--radius)] border border-border"
                    onError={(e) => {
                        if (e.target.src.endsWith('default-champ.png')) return;
                        e.target.src = '/default-champ.png';
                    }}
                />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1 rounded-full">
                    {champ.total}
                </span>
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-medium text-xs text-foreground font-semibold truncate">{champ.name}</p>

                <div className="flex items-center text-xs mt-0.5 gap-2">
                    <div className="flex items-center gap-2">
                        <span className={`font-bold ${winRateColor}`}>
                            {champWinRate}% <span className="text-muted-foreground">WR</span>
                        </span>
                        <span className="text-muted-foreground">|</span>
                        <span className={kdaColor}>
                            <span className="font-bold">{champKDA}</span> <span className="text-muted-foreground">KDA</span>
                        </span>
                    </div>
                </div>

                <div className="w-full bg-muted h-1 rounded-full mt-0.5 overflow-hidden">
                    <div
                        className="h-full bg-primary"
                        style={{ width: `${champWinRate}%` }}
                    ></div>
                </div>

                <div className="flex justify-between text-[10px] text-muted-foreground mt-0">
                    <div className="flex items-center gap-2">
                        <span className="text-foreground">{wins}W</span>
                        <span className="text-destructive">{losses}L</span>
                    </div>
                    <span>{champ.total} games</span>
                </div>
            </div>
        </div>
    );
};

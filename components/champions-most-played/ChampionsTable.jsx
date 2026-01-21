"use client"
import { useState, useMemo } from "react";
import { ChampionsRowTable } from "@/components/champions-most-played/ChampionsRowTable";

const sortFunctions = {
  champion: (a, b, order) => 
    order === 'asc' 
      ? a.champion.localeCompare(b.champion)
      : b.champion.localeCompare(a.champion),
  winRate: (a, b, order) => {
    const aWinRate = (a.w / (a.w + a.l)) * 100;
    const bWinRate = (b.w / (b.w + b.l)) * 100;
    return order === 'asc' ? aWinRate - bWinRate : bWinRate - aWinRate;
  },
  kda: (a, b, order) => {
    const aKda = (a.k + a.a) / Math.max(1, a.d);
    const bKda = (b.k + b.a) / Math.max(1, b.d);
    return order === 'asc' ? aKda - bKda : bKda - aKda;
  },
  cs: (a, b, order) => {
    const aCs = a.cs.reduce((sum, val) => sum + val, 0) / a.cs.length;
    const bCs = b.cs.reduce((sum, val) => sum + val, 0) / b.cs.length;
    return order === 'asc' ? aCs - bCs : bCs - aCs;
  },
  gold: (a, b, order) => {
    const aGold = a.ge.reduce((sum, val) => sum + val, 0) / a.ge.length;
    const bGold = b.ge.reduce((sum, val) => sum + val, 0) / b.ge.length;
    return order === 'asc' ? aGold - bGold : bGold - aGold;
  },
  games: (a, b, order) => {
    const aGames = a.w + a.l;
    const bGames = b.w + b.l;
    return order === 'asc' ? aGames + bGames : bGames + aGames;
  },
  kills: (a, b, order) => order === 'asc' ? a.k - b.k : b.k - a.k,
  deaths: (a, b, order) => order === 'asc' ? a.d - b.d : b.d - a.d,
  assists: (a, b, order) => order === 'asc' ? a.a - b.a : b.a - a.a,
  damage: (a, b, order) => {
    const aDmg = a.dc.reduce((sum, val) => sum + val, 0) / a.dc.length;
    const bDmg = b.dc.reduce((sum, val) => sum + val, 0) / b.dc.length;
    return order === 'asc' ? aDmg - bDmg : bDmg - aDmg;
  },
  damageTaken: (a, b, order) => {
    const aDmg = a.dtk.reduce((sum, val) => sum + val, 0) / a.dtk.length;
    const bDmg = b.dtk.reduce((sum, val) => sum + val, 0) / b.dtk.length;
    return order === 'asc' ? aDmg - bDmg : bDmg - aDmg;
  }
};

export const ChampionsTable = ({ champions,version }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'games', direction: 'desc' });

  const championsArray = useMemo(() => {
    const champs = Object.entries(champions).map(([champion, data]) => ({
      champion,
      ...data,
    }));

    if (!sortConfig.key) return champs;
    
    return [...champs].sort((a, b) => {
      return sortFunctions[sortConfig.key](a, b, sortConfig.direction);
    });
  }, [champions, sortConfig]);


  // Funcion para manejar el ordenamiento
  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    } else if (sortConfig.key === key) {
      return setSortConfig({ key: null, direction: 'desc' });
    }
    setSortConfig({ key, direction });
  };


  //Funcion para modificar el icono de ordenamiento
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[800px] w-full">
        <thead>
          <tr className="text-xs">
            <th 
              className="px-4 py-2 text-left cursor-pointer hover:bg-gray-800/50"
              onClick={() => requestSort('champion')}
            >
              Champion {getSortIcon('champion')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-800/50"
              onClick={() => requestSort('winRate')}
            >
              Win Rate {getSortIcon('winRate')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-800/50"
              onClick={() => requestSort('cs')}
            >
              CS {getSortIcon('cs')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-800/50"
              onClick={() => requestSort('gold')}
            >
              GOLD {getSortIcon('gold')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-800/50"
              onClick={() => requestSort('games')}
            >
              KDA {getSortIcon('games')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-800/50"
              onClick={() => requestSort('kills')}
            >
              K/D/A {getSortIcon('kills')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-800/50"
              onClick={() => requestSort('damage')}
            >
              TOTAL DAMAGE {getSortIcon('damage')}
            </th>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-800/50"
              onClick={() => requestSort('damageTaken')}
            >
              DAMAGE TAKEN {getSortIcon('damageTaken')}
            </th>
          </tr>
        </thead>
        <tbody className="text-xs md:text-sm">
          {championsArray.map((champ) => (
            <ChampionsRowTable 
              key={champ.champion} 
              champion={champ.champion} 
              data={champ} 
              version={version}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
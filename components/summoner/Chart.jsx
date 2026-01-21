"use client"
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, LabelList } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const Chart = ({ dataPlayers, stat, version }) => {
  // Format champion names for image URLs
  const formatChampionName = (name) => {
    if (!name) return '';
    // Handle special cases for champion names with special characters
    const specialCases = {
      'Wukong': 'MonkeyKing',
      'Renata Glasc': 'Renata',
      'Kai\'Sa': 'Kaisa',
      'Kha\'Zix': 'Khazix',
      'Cho\'Gath': 'Chogath',
      'Vel\'Koz': 'Velkoz',
      'Kog\'Maw': 'KogMaw',
      'Rek\'Sai': 'RekSai',
    };
    
    if (specialCases[name]) {
      return specialCases[name];
    }
    
    // Remove all non-alphabetic characters and spaces
    return name.replace(/[^a-zA-Z]/g, '');
  };

  const chartData = dataPlayers.map((player) => ({
    name: player.n, // Champion name from player data
    [stat.name]: player[stat.name] || 0, // Ensure we have a number value
    championId: player.n ? formatChampionName(player.n) : ''
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{stat.label|| 'Estadística'}</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart 
          width={400}
          height={250}
          data={chartData}
          margin={{ bottom: 12, top: 12 }}
        >
          <CartesianGrid vertical={false} className="border-none"/>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            interval={0}
            tick={({ x, y, payload }) => {
              const championName = chartData.find(item => item.name === payload.value)?.championId;
              if (!championName) return null;
              
              return (
                <image
                  href={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`}
                  x={x - 14}
                  y={y - 5}
                  height={32}
                  width={32}
                  className="rounded-full"
                />
              );
            }}
          />
          <Tooltip cursor={false} />
          <Bar 
            dataKey={stat.name} 
            fill="#3b4c63ff" 
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
            activeBar={true}
          >
            <LabelList 
              dataKey={stat.name} 
              position="top" 
              fill="#fff" 
              style={{ 
                fontSize: '10px', 
                fontWeight: 'bold',

              }}
            />
          </Bar>
        </BarChart>
      </CardContent>
    </Card>
  )
}

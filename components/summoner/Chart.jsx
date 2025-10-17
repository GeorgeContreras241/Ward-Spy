"use client"
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, LabelList } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const Chart = ({ dataPlayers, stat }) => {

  const chartData = dataPlayers.map((player) => ({
    name: player.championName,
    [stat.name]: stat.id === 0 ? player.kills : 
            stat.id === 1 ? player.totalMinionsKilled : 
            stat.id === 2 ? player.goldEarned : 
            stat.id === 3 ? player.totalHeal : 
            stat.id === 4 ? player.totalDamageTaken : 
            stat.id === 5 ? player.goldEarned : 
            stat.id === 6 ? player.goldSpent : 0
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daño total por jugador</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart 
          width={400}
          height={250}
          data={chartData}
          margin={{ bottom: 12, top: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            interval={0}
            tick={({ x, y, payload }) => (
              <image
                href={`https://ddragon.leagueoflegends.com/cdn/15.15.1/img/champion/${payload.value}.png`}
                x={x - 12}
                y={y + 5}
                height={28}
                width={28}
              />
            )}
          />
          <Tooltip />
          <Bar dataKey={stat.name} fill="#3b82f6" radius={[4, 4, 0, 0]} >
            <LabelList dataKey={stat.name} position="top" />
          </Bar>
        </BarChart>
      </CardContent>
    </Card>
  )
}

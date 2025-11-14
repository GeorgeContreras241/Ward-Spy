"use client"
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, LabelList } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const Chart = ({ dataPlayers, stat }) => {

  const chartData = dataPlayers.map((player) => ({
    name: player.championName,
    [stat.name]: player[stat.name],
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

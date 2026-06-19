"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"
import { HugeiconsIcon } from "@hugeicons/react"
import { CellularNetworkIcon, } from "@hugeicons/core-free-icons"
import { Item, ItemDescription, ItemHeader, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"

export const description = "An area chart with gradient fill"

const chartData = [
  { day: "1", currentMonth: 150, lastMonth: 120 },
  { day: "2", currentMonth: 180, lastMonth: 140 },
  { day: "3", currentMonth: 160, lastMonth: 130 },
  { day: "4", currentMonth: 200, lastMonth: 170 },
  { day: "5", currentMonth: 190, lastMonth: 160 },
  { day: "6", currentMonth: 220, lastMonth: 180 },
  { day: "7", currentMonth: 210, lastMonth: 190 },
  { day: "8", currentMonth: 170, lastMonth: 150 },
  { day: "9", currentMonth: 190, lastMonth: 170 },
  { day: "10", currentMonth: 230, lastMonth: 200 },
  { day: "11", currentMonth: 200, lastMonth: 180 },
  { day: "12", currentMonth: 240, lastMonth: 210 },
  { day: "13", currentMonth: 210, lastMonth: 190 },
  { day: "14", currentMonth: 250, lastMonth: 220 },
  { day: "15", currentMonth: 220, lastMonth: 200 },
  { day: "16", currentMonth: 180, lastMonth: 160 },
  { day: "17", currentMonth: 200, lastMonth: 180 },
  { day: "18", currentMonth: 230, lastMonth: 210 },
  { day: "19", currentMonth: 210, lastMonth: 190 },
  { day: "20", currentMonth: 240, lastMonth: 220 },
  { day: "21", currentMonth: 260, lastMonth: 230 },
  { day: "22", currentMonth: 220, lastMonth: 200 },
  { day: "23", currentMonth: 250, lastMonth: 220 },
  { day: "24", currentMonth: 200, lastMonth: 180 },
  { day: "25", currentMonth: 230, lastMonth: 210 },
  { day: "26", currentMonth: 190, lastMonth: 170 },
  { day: "27", currentMonth: 210, lastMonth: 190 },
  { day: "28", currentMonth: 240, lastMonth: 220 },
  { day: "29", currentMonth: 220, lastMonth: 200 },
  { day: "30", currentMonth: 270, lastMonth: 250 },
]

const chartConfig = {
  currentMonth: {
    label: "Current Month",
    color: "var(--chart-1)",
  },
  lastMonth: {
    label: "Last Month",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const day = payload[0].payload.day
    const currentMonth = payload.find((p: any) => p.dataKey === 'currentMonth')?.value || 0
    const lastMonth = payload.find((p: any) => p.dataKey === 'lastMonth')?.value || 0
    const total = currentMonth + lastMonth
    
    return (
      <div className="rounded-lg border bg-black/10 backdrop-blur-lg p-3 shadow-sm">
        <div className="space-y-1">
          <div className="text-sm font-medium text-muted-foreground">
            Day - {day}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Current Month: </span>
            <span className="font-medium">${currentMonth}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Last Month: </span>
            <span className="font-medium">${lastMonth}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Total: </span>
            <span className="font-medium">${total}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function SpendingChart() {
  return (
    <Card className="border-none shadow-none ring-0 bg-white/1 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-orange-500 flex items-center gap-2">
            <HugeiconsIcon icon={CellularNetworkIcon} />
            Spending
        </CardTitle>
        <CardDescription>
          Compare daily spending between current month and last month over 30 days
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center gap-2 pb-4">
        <Item className="w-fit">
            <ItemHeader className="flex-col gap-1 items-start">
            <ItemDescription>
                Total Revenue
            </ItemDescription>
            <ItemTitle className="text-2xl">$100,000</ItemTitle>
            </ItemHeader>
        </Item>
        <Separator orientation="vertical" />

        <Item className="w-fit">
            <ItemHeader className="flex-col gap-1 items-start">
            <ItemDescription>
                Vs Last Month
            </ItemDescription>
            <ItemTitle className="text-2xl">$100,000</ItemTitle>
            </ItemHeader>
        </Item>

        </div>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={3}
            />
            <ChartTooltip cursor={true} content={<CustomTooltip />} />
            <defs>
              <linearGradient id="fillCurrentMonth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-currentMonth)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-currentMonth)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLastMonth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-lastMonth)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-lastMonth)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="lastMonth"
              type='linear'
              fill="url(#fillLastMonth)"
              fillOpacity={0.4}
              stroke="var(--color-lastMonth)"
              stackId="a"
              activeDot={{ r: 8, fill: "var(--color-lastMonth)" }}
            />
            <Area
              dataKey="currentMonth"
              type='linear'
              fill="url(#fillCurrentMonth)"
              fillOpacity={0.4}
              stroke="var(--color-currentMonth)"
              stackId="a"
              activeDot={{ r: 8, fill: "var(--color-currentMonth)" }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

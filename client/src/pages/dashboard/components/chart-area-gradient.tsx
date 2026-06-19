"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"

export const description = "An area chart with gradient fill"

const chartData = [
  {
    month: "January",
    desktop: 180,
    mobile: 120,
    tablet: 90,
    iphone: 80,
  },
  {
    month: "February",
    desktop: 400,
    mobile: 190,
    tablet: 140,
    iphone: 130,
  },
  {
    month: "March",
    desktop: 220,
    mobile: 135,
    tablet: 150,
    iphone: 145,
  },
  {
    month: "April",
    desktop: 130,
    mobile: 95,
    tablet: 100,
    iphone: 90,
  },

  // Rise
  {
    month: "May",
    desktop: 290,
    mobile: 230,
    tablet: 210,
    iphone: 205,
  },
  {
    month: "June",
    desktop: 310,
    mobile: 210,
    tablet: 190,
    iphone: 185,
  },

  // Consolidation / sideways
  {
    month: "July",
    desktop: 250,
    mobile: 170,
    tablet: 160,
    iphone: 158,
  },
  {
    month: "August",
    desktop: 340,
    mobile: 260,
    tablet: 240,
    iphone: 235,
  },

  // Fall
  {
    month: "September",
    desktop: 210,
    mobile: 150,
    tablet: 135,
    iphone: 130,
  },
  {
    month: "October",
    desktop: 280,
    mobile: 220,
    tablet: 200,
    iphone: 198,
  },
  {
    month: "November",
    desktop: 160,
    mobile: 110,
    tablet: 100,
    iphone: 95,
  },
  {
    month: "December",
    desktop: 240,
    mobile: 180,
    tablet: 165,
    iphone: 160,
  },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
  iphone: {
    label: "iPhone",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const ChartAreaGradient = () => {
  return (
    <Item variant="muted">
      <ItemContent>
        <div className="p-4 space-y-1">
          <ItemTitle className="font-semibold text-lg">Traffic overview</ItemTitle>
          <ItemDescription className="text-sm text-muted-foreground ">
            See how your app performs across requests, hits, errors, and response times. Switch between daily, weekly, or monthly views to spot trends fast.
          </ItemDescription>
        </div>
      </ItemContent>

      <ChartContainer className="h-[400px] w-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            minTickGap={32}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Area
            dataKey="mobile"
            type='linear'
            dot={{ r: 4 }}
            fill="url(#fillMobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            strokeWidth={2}
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type='linear'
            dot={{ r: 4 }}
            fill="url(#fillDesktop)"
            fillOpacity={0.4}
            strokeWidth={2}
            stroke="var(--color-desktop)"
            stackId="a"
          />
          <Area
            dataKey="tablet"
            type='linear'
            dot={{ r: 4 }}
            fill="url(#fillTablet)"
            fillOpacity={0.4}
            strokeWidth={2}
            stroke="var(--color-tablet)"
            stackId="a"
          />
          <Area
            dataKey="iphone"
            type='linear'
            dot={{ r: 4 }}
            fill="url(#fillIphone)"
            fillOpacity={0.4}
            strokeWidth={2}
            stroke="var(--color-iphone)"
            stackId="a"
          />
          <ChartLegend className="float-right" content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
      <ItemContent>
      </ItemContent>
    </Item>
  )
}

export default ChartAreaGradient
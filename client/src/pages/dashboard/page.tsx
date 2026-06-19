import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { DashboardTable, DashboardStats } from "./components"
import { SpendingChart } from "./components/areachart-spending"

export default function DashboardPage() {
  return (
    <div className="px-8 pb-4 pt-2 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <SpendingChart />
        <SpendingChart />
        <SpendingChart />
        <SpendingChart />
      </div>
    </div>
  )
}

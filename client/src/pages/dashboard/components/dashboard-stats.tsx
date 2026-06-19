import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"

const stats = [
  { label: "Active campaigns", value: "12" },
  { label: "Active triggers", value: "8" },
  {
    label: "Total 30d events",
    value: "184.9k",
  },
  {
    label: "Campaign With Metrics",
    value: "123",
  }
] as const

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((item) => (
        <Item key={item.label} className="" variant="outline">
          <ItemContent>
            <ItemTitle>{item.label}</ItemTitle>
            <ItemDescription className="leading-7 text-3xl font-medium">{item.value}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const METRICS = [
  "Active users",
  "Event volume",
  "Campaign sends",
  "Journey completions",
  "API error rate",
  "Monthly recurring revenue",
  "Signup conversion",
  // "Email deliverability",
  // "Push opt-in rate",
  // "Segment sync lag",
  // "Webhook success",
  // "Support tickets opened",
  // "Feature adoption (new UI)",
  // "Churn rate",
  // "Avg session duration",
  // "Pages per session",
  // "Return visitors",
  // "Trial-to-paid",
  // "Invoice collection time",
  // "Data pipeline latency",
] as const

const rows = METRICS.map((metric, i) => ({
  id: `dash-${i + 1}`,
  metric,
  value: ["24.8k", "1.92M", "312k", "18.4k", "0.12%", "$842k", "3.4%", "98.2%", "41%", "12s", "99.4%", "142", "62%", "2.1%", "4m 12s", "6.8", "38%", "11%", "18d", "890ms"][i],
  change: ["+4.2%", "+1.1%", "-2.0%", "+8.7%", "-0.03%", "+2.4%", "-0.3%", "+0.4%", "+1.8%", "-4s", "+0.1%", "-6%", "+5pts", "-0.2%", "+12s", "+0.2", "+2.1%", "+0.8%", "-1d", "-40ms"][i],
  period: (["7d", "24h", "7d", "7d", "24h", "30d", "7d", "24h", "30d", "1h", "24h", "7d", "14d", "30d", "7d", "7d", "30d", "90d", "30d", "1h"] as const)[i % 10],
  owner: (["Product", "Data", "Marketing", "Lifecycle", "Platform", "Finance", "Growth", "Comms", "Mobile", "Data", "Platform", "Support", "Product", "CS", "Web", "Analytics", "Marketing", "Sales", "Finance", "Data"] as const)[i % 10],
  status: (["On track", "Stable", "Watch", "On track", "Healthy", "On track", "Watch", "Stable", "On track", "Stable", "Healthy", "Watch", "On track", "Watch", "Stable", "On track", "Stable", "Watch", "On track", "Stable"] as const)[i % 10],
  category: (["Engagement", "Pipeline", "Outbound", "Automation", "Reliability", "Revenue", "Acquisition", "Deliverability", "Mobile", "Data", "Integrations", "Support", "Product", "Retention", "Web", "Analytics", "Marketing", "Sales", "Finance", "Infra"] as const)[i % 10],
  notes: [
    "vs prior week",
    "ingestion healthy",
    "holiday dip",
    "onboarding up",
    "p99 latency ok",
    "vs forecast",
    "funnel A/B",
    "bounce stable",
    "iOS +2.1%",
    "Snowflake sync",
    "retry queue low",
    "priority mix",
    "rollout 50%",
    "enterprise cohort",
    "SPAs only",
    "logged-in only",
    "paid search mix",
    "SMB segment",
    "net-30 terms",
    "streaming lag",
  ][i],
}))

export default function DashboardTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border mask-b-from-5% mask-b-to-95%">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Metric</TableHead>
              <TableHead className="h-9 py-2">Value</TableHead>
              <TableHead className="h-9 py-2">Change</TableHead>
              <TableHead className="h-9 py-2">Period</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Category</TableHead>
              <TableHead className="h-9 py-2">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.metric}</TableCell>
                <TableCell className="py-2">{row.value}</TableCell>
                <TableCell className="py-2">{row.change}</TableCell>
                <TableCell className="py-2">{row.period}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.category}</TableCell>
                <TableCell className="py-2">{row.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

import { useCallback, useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { authClient } from "@/lib/auth"

type ApiKeyRow = {
  id: string
  name?: string | null
  start?: string | null
  prefix?: string | null
  enabled?: boolean | null
  createdAt?: Date | string
  lastRequest?: Date | string | null
  metadata?: {
    environment?: string
    scopes?: string
  } | null
}

type ApiKeyTableProps = {
  refreshKey?: number
}

function formatDate(value: Date | string | null | undefined) {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function formatLastUsed(value: Date | string | null | undefined) {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleString()
}

function formatEnvironment(metadata: ApiKeyRow["metadata"]) {
  const environment = metadata?.environment
  if (!environment) return "—"
  if (environment === "prod") return "Prod"
  if (environment === "staging") return "Staging"
  if (environment === "sandbox") return "Sandbox"
  return environment
}

export function ApiKeyTable({ refreshKey = 0 }: ApiKeyTableProps) {
  const [rows, setRows] = useState<ApiKeyRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadKeys = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authClient.apiKey.list({})

      if (result.error) {
        setError(result.error.message ?? "Failed to load API keys")
        setRows([])
        return
      }

      setRows(result.data?.apiKeys ?? [])
    } catch {
      setError("Failed to load API keys")
      setRows([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadKeys()
  }, [loadKeys, refreshKey])

  if (isLoading) {
    return (
      <p className="text-muted-foreground text-sm">Loading API keys…</p>
    )
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>
  }

  if (rows.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No API keys yet. Create one to get started.
      </p>
    )
  }

  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Key</TableHead>
              <TableHead className="h-9 py-2">Scopes</TableHead>
              <TableHead className="h-9 py-2">Environment</TableHead>
              <TableHead className="h-9 py-2">Created</TableHead>
              <TableHead className="h-9 py-2">Last used</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">
                  {row.name || "Untitled key"}
                </TableCell>
                <TableCell className="py-2 font-mono text-xs">
                  {row.start ? `${row.start}…` : row.prefix || "—"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate py-2 text-xs">
                  {row.metadata?.scopes || "—"}
                </TableCell>
                <TableCell className="py-2">
                  {formatEnvironment(row.metadata)}
                </TableCell>
                <TableCell className="py-2">
                  {formatDate(row.createdAt)}
                </TableCell>
                <TableCell className="py-2">
                  {formatLastUsed(row.lastRequest)}
                </TableCell>
                <TableCell className="py-2">
                  {row.enabled === false ? "Disabled" : "Active"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

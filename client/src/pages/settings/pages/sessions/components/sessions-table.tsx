import { useCallback, useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { authClient, useSession } from "@/lib/auth"

type DeviceSession = {
  session: {
    id: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }
  user: {
    id: string
    name: string
    email: string
  }
}

type SessionsTableProps = {
  refreshKey?: number
}

function formatDate(value: Date | string | null | undefined) {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatDevice(userAgent: string | null | undefined) {
  if (!userAgent) return "Unknown device"

  if (userAgent.includes("Chrome")) return "Chrome"
  if (userAgent.includes("Firefox")) return "Firefox"
  if (userAgent.includes("Safari")) return "Safari"
  if (userAgent.includes("Edg")) return "Edge"

  return userAgent.length > 48 ? `${userAgent.slice(0, 48)}…` : userAgent
}

export function SessionsTable({ refreshKey = 0 }: SessionsTableProps) {
  const { data: currentSession, refetch: refetchSession } = useSession()
  const currentToken = currentSession?.session?.token

  const [rows, setRows] = useState<DeviceSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [revokingToken, setRevokingToken] = useState<string | null>(null)

  const loadSessions = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authClient.multiSession.listDeviceSessions()

      if (result.error) {
        setError(result.error.message ?? "Failed to load sessions")
        setRows([])
        return
      }

      setRows(result.data ?? [])
    } catch {
      setError("Failed to load sessions")
      setRows([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSessions()
  }, [loadSessions, refreshKey])

  const handleRevoke = async (sessionToken: string) => {
    setRevokingToken(sessionToken)
    setError(null)

    try {
      const result = await authClient.multiSession.revoke({ sessionToken })

      if (result.error) {
        setError(result.error.message ?? "Failed to revoke session")
        return
      }

      await refetchSession()
      await loadSessions()
    } catch {
      setError("Failed to revoke session")
    } finally {
      setRevokingToken(null)
    }
  }

  if (isLoading) {
    return (
      <p className="text-muted-foreground text-sm">Loading sessions…</p>
    )
  }

  if (error && rows.length === 0) {
    return <p className="text-sm text-red-500">{error}</p>
  }

  if (rows.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">No active sessions found.</p>
    )
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">Account</TableHead>
              <TableHead className="h-9 py-2">Device</TableHead>
              <TableHead className="h-9 py-2">IP address</TableHead>
              <TableHead className="h-9 py-2">Created</TableHead>
              <TableHead className="h-9 py-2">Expires</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const { session, user } = row
              const isCurrent = session.token === currentToken

              return (
                <TableRow key={session.id}>
                  <TableCell className="py-2">
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-muted-foreground text-xs">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {formatDevice(session.userAgent)}
                      </p>
                      <p className="text-muted-foreground max-w-[220px] truncate text-xs">
                        {session.userAgent || "—"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 font-mono text-xs">
                    {session.ipAddress || "—"}
                  </TableCell>
                  <TableCell className="py-2">
                    {formatDate(session.createdAt)}
                  </TableCell>
                  <TableCell className="py-2">
                    {formatDate(session.expiresAt)}
                  </TableCell>
                  <TableCell className="py-2">
                    {isCurrent ? (
                      <Badge variant="secondary">Current</Badge>
                    ) : (
                      <Badge variant="outline">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell className="py-2 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isCurrent || revokingToken === session.token}
                      onClick={() => handleRevoke(session.token)}
                    >
                      {revokingToken === session.token ? "Revoking..." : "Revoke"}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

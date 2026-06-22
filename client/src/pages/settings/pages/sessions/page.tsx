import { useState } from "react"

import { Button } from "@/components/ui/button"
import { authClient, useSession } from "@/lib/auth"
import { SessionsTable } from "./components"

export default function SessionsSettingsPage() {
  const { data: currentSession } = useSession()
  const [refreshKey, setRefreshKey] = useState(0)
  const [isRevokingOthers, setIsRevokingOthers] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRevokeOthers = async () => {
    setIsRevokingOthers(true)
    setError(null)

    const currentToken = currentSession?.session?.token

    try {
      const sessionsResult = await authClient.multiSession.listDeviceSessions()

      if (sessionsResult.error) {
        setError(sessionsResult.error.message ?? "Failed to load sessions")
        return
      }

      const otherSessions = (sessionsResult.data ?? []).filter(
        (item) => item.session.token !== currentToken
      )

      for (const item of otherSessions) {
        const result = await authClient.multiSession.revoke({
          sessionToken: item.session.token,
        })

        if (result.error) {
          setError(result.error.message ?? "Failed to revoke other sessions")
          return
        }
      }

      setRefreshKey((value) => value + 1)
    } catch {
      setError("Failed to revoke other sessions")
    } finally {
      setIsRevokingOthers(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl p-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Sessions</h2>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            View devices where you are signed in and revoke access you no
            longer recognize.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={isRevokingOthers}
          onClick={handleRevokeOthers}
        >
          {isRevokingOthers ? "Revoking..." : "Revoke other sessions"}
        </Button>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <SessionsTable refreshKey={refreshKey} />
    </div>
  )
}

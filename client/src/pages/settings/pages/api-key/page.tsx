import { useState } from "react"

import { ApiKeyDialog, ApiKeyTable } from "./components"

export default function ApiKeySettingsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="space-y-6 max-w-2xl p-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">API keys</h2>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Create and rotate keys for server-side access. Restrict each key by
            scope and environment, and prefer IP allowlists for production
            traffic.
          </p>
        </div>
        <ApiKeyDialog onCreated={() => setRefreshKey((value) => value + 1)} />
      </div>
      <ApiKeyTable refreshKey={refreshKey} />
    </div>
  )
}

import { useState } from "react"

import { InviteMemberDialog, MembersTable } from "./components"

export default function MembersSettingsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="space-y-6 max-w-2xl p-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Members</h2>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            View workspace members and invite teammates by email.
          </p>
        </div>
        <InviteMemberDialog
          onInvited={() => setRefreshKey((value) => value + 1)}
        />
      </div>
      <MembersTable refreshKey={refreshKey} />
    </div>
  )
}

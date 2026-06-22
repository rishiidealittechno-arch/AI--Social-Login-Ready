import { useEffect, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { authClient } from "@/lib/auth"

type MembersTableProps = {
  refreshKey?: number
}

function formatDate(value: Date | string | undefined) {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function getInitials(name: string | undefined, email: string) {
  const source = name?.trim() || email
  return source
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function MembersTable({ refreshKey = 0 }: MembersTableProps) {
  const [search, setSearch] = useState("")
  const {
    data: activeWorkspace,
    isPending,
    refetch,
  } = authClient.useActiveOrganization()

  useEffect(() => {
    void refetch()
  }, [refreshKey, refetch])

  const members = activeWorkspace?.members ?? []
  const invitations =
    activeWorkspace?.invitations?.filter(
      (invitation) => invitation.status === "pending"
    ) ?? []

  const filteredMembers = members.filter((member) => {
    const query = search.trim().toLowerCase()
    if (!query) return true

    const name = member.user?.name?.toLowerCase() ?? ""
    const email = member.user?.email?.toLowerCase() ?? ""
    const role = member.role.toLowerCase()

    return (
      name.includes(query) || email.includes(query) || role.includes(query)
    )
  })

  if (isPending) {
    return (
      <p className="text-muted-foreground text-sm">Loading members…</p>
    )
  }

  if (!activeWorkspace) {
    return (
      <p className="text-muted-foreground text-sm">
        No active workspace. Create one to manage members.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search members..."
          aria-label="Search members"
        />

        <div className="bg-background overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="h-9 py-2">Member</TableHead>
                <TableHead className="h-9 py-2">Email</TableHead>
                <TableHead className="h-9 py-2">Role</TableHead>
                <TableHead className="h-9 py-2">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-muted-foreground py-6 text-center text-sm"
                  >
                    No members found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          {member.user?.image ? (
                            <AvatarImage
                              src={member.user.image}
                              alt=""
                            />
                          ) : null}
                          <AvatarFallback>
                            {getInitials(
                              member.user?.name,
                              member.user?.email ?? ""
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {member.user?.name || "Unknown"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      {member.user?.email || "—"}
                    </TableCell>
                    <TableCell className="py-2 capitalize">
                      {member.role}
                    </TableCell>
                    <TableCell className="py-2">
                      {formatDate(member.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {invitations.length > 0 ? (
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Pending invitations</h3>
            <p className="text-muted-foreground text-sm">
              Invites waiting to be accepted.
            </p>
          </div>
          <div className="space-y-2">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {invitation.email}
                  </p>
                  <p className="text-muted-foreground text-xs capitalize">
                    {invitation.role}
                  </p>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

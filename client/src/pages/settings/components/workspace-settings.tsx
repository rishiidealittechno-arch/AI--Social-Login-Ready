import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { authClient, useSession } from "@/lib/auth"

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function FieldHeading({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-medium">{title}</h2>
      {description ? (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function formatDate(value: Date | string | undefined) {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function WorkspaceSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { isPending: isSessionPending } = useSession()
  const {
    data: activeWorkspace,
    isPending: isWorkspacePending,
    refetch: refetchActiveWorkspace,
  } = authClient.useActiveOrganization()
  const {
    data: workspaces,
    isPending: isWorkspacesPending,
    refetch: refetchWorkspaces,
  } = authClient.useListOrganizations()
  const { data: activeMember, refetch: refetchActiveMember } =
    authClient.useActiveMember()

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [logoDialogOpen, setLogoDialogOpen] = useState(false)
  const [draftLogoUrl, setDraftLogoUrl] = useState("")

  useEffect(() => {
    if (!activeWorkspace) return
    setName(activeWorkspace.name ?? "")
    setSlug(activeWorkspace.slug ?? "")
    setLogoUrl(activeWorkspace.logo ?? "")
  }, [activeWorkspace])

  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const memberCount = activeWorkspace?.members?.length ?? 0
  const currentRole = activeMember?.role ?? "—"

  const openLogoDialog = useCallback(() => {
    setDraftLogoUrl(logoUrl)
    setLogoDialogOpen(true)
  }, [logoUrl])

  const saveLogoUrl = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      setLogoUrl(draftLogoUrl.trim())
      setLogoDialogOpen(false)
    },
    [draftLogoUrl]
  )

  const removeLogo = useCallback(() => {
    setLogoUrl("")
  }, [])

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      setLogoUrl(url)
      event.target.value = ""
    },
    []
  )

  const handleSave = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      if (!activeWorkspace) return

      setError(null)
      setSuccess(null)
      setIsSaving(true)

      try {
        const result = await authClient.organization.update({
          data: {
            name: name.trim(),
            slug: slug.trim() || toSlug(name),
            logo: logoUrl || null,
          },
        })

        if (result.error) {
          setError(result.error.message ?? "Failed to update workspace")
          return
        }

        await Promise.all([
          refetchActiveWorkspace(),
          refetchWorkspaces(),
          refetchActiveMember(),
        ])
        setSuccess("Workspace updated")
      } catch {
        setError("Something went wrong. Please try again.")
      } finally {
        setIsSaving(false)
      }
    },
    [
      activeWorkspace,
      logoUrl,
      name,
      refetchActiveMember,
      refetchActiveWorkspace,
      refetchWorkspaces,
      slug,
    ]
  )

  const handleSwitchWorkspace = useCallback(
    async (organizationId: string) => {
      setError(null)
      setSuccess(null)

      const result = await authClient.organization.setActive({ organizationId })
      if (result.error) {
        setError(result.error.message ?? "Failed to switch workspace")
        return
      }

      await Promise.all([refetchActiveWorkspace(), refetchWorkspaces()])
      setSuccess("Active workspace updated")
    },
    [refetchActiveMember, refetchActiveWorkspace, refetchWorkspaces]
  )

  const isLoading = isSessionPending || isWorkspacePending || isWorkspacesPending

  if (isLoading) {
    return (
      <div className="mx-0 max-w-xl space-y-0 p-4 py-8">
        <p className="text-muted-foreground text-sm">Loading workspace…</p>
      </div>
    )
  }

  if (!activeWorkspace) {
    return (
      <div className="mx-0 max-w-xl space-y-0 p-4 py-8">
        <div className="space-y-4">
          <FieldHeading
            title="No active workspace"
            description="Create a workspace to manage your team settings here."
          />
          <Button asChild variant="outline" size="sm">
            <Link to="/create-workspace">Create workspace</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form className="mx-0 max-w-xl space-y-0 p-4 py-8" onSubmit={handleSave}>
      <div className="space-y-10">
        <section className="space-y-4">
          <FieldHeading title="Logo" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Avatar className="size-20 shrink-0 rounded-md after:rounded-md">
              {logoUrl ? (
                <AvatarImage
                  src={logoUrl}
                  alt=""
                  className="rounded-md object-cover"
                />
              ) : null}
              <AvatarFallback className="rounded-md text-lg font-medium">
                {initials || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  className="sr-only"
                  onChange={onFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={removeLogo}
                  disabled={!logoUrl}
                >
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="text-muted-foreground h-auto px-2"
                  onClick={openLogoDialog}
                >
                  Paste URL
                </Button>
              </div>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                Square PNGs, JPGs and GIFs under 10MB.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <FieldHeading
            title="Workspace name"
            description="The name shown across your workspace"
          />
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="organization"
            required
          />
        </section>

        <section className="space-y-4">
          <FieldHeading
            title="Workspace URL"
            description="Used in links and workspace identification"
          />
          <Input
            value={slug}
            onChange={(event) => setSlug(toSlug(event.target.value))}
            autoComplete="off"
            required
          />
          <p className="text-muted-foreground text-sm">
            openclaw.app/{slug || "your-workspace"}
          </p>
        </section>

        <section className="space-y-4">
          <FieldHeading
            title="Workspace details"
            description="Current workspace information"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Members</p>
              <Input readOnly value={String(memberCount)} className="cursor-default" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Your role</p>
              <Input readOnly value={currentRole} className="cursor-default capitalize" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <p className="text-sm font-medium">Created</p>
              <Input
                readOnly
                value={formatDate(activeWorkspace.createdAt)}
                className="cursor-default"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <FieldHeading
            title="Your workspaces"
            description="Switch between workspaces you belong to"
          />
          <div className="space-y-2">
            {(workspaces ?? []).length === 0 ? (
              <p className="text-muted-foreground text-sm">No workspaces found.</p>
            ) : (
              (workspaces ?? []).map((workspace) => {
                const isActive = workspace.id === activeWorkspace.id
                return (
                  <div
                    key={workspace.id}
                    className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{workspace.name}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {workspace.slug}
                      </p>
                    </div>
                    {isActive ? (
                      <span className="text-muted-foreground shrink-0 text-xs">
                        Active
                      </span>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleSwitchWorkspace(workspace.id)}
                      >
                        Switch
                      </Button>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </section>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}

        <section className="space-y-4">
          <Button type="submit" variant="outline" size="sm" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </section>
      </div>

      <Dialog open={logoDialogOpen} onOpenChange={setLogoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={saveLogoUrl}>
            <DialogHeader>
              <DialogTitle>Workspace logo URL</DialogTitle>
              <DialogDescription>
                Paste a direct link to an image. For file uploads, use Upload on
                the main form.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-2">
              <label htmlFor="workspace-logo-url" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="workspace-logo-url"
                value={draftLogoUrl}
                onChange={(event) => setDraftLogoUrl(event.target.value)}
                placeholder="https://"
                type="url"
                autoComplete="off"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setLogoDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </form>
  )
}

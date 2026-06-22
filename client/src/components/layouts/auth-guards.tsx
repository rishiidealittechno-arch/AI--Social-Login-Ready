import { Navigate, Outlet, useLocation } from "react-router-dom"

import { authClient, useSession } from "@/lib/auth"

function AuthLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function useWorkspaceState() {
  const { data: session, isPending: isSessionPending } = useSession()
  const {
    data: organizations,
    isPending: isOrganizationsPending,
    isRefetching: isOrganizationsRefetching,
  } = authClient.useListOrganizations()

  const isOrganizationsLoading =
    isOrganizationsPending ||
    (organizations === undefined && isOrganizationsRefetching)

  const isPending =
    isSessionPending || (Boolean(session) && isOrganizationsLoading)

  const hasWorkspace =
    Array.isArray(organizations) && organizations.length > 0

  return {
    hasWorkspace,
    isPending,
  }
}

export function GuestGuard() {
  const { data: session, isPending: isSessionPending } = useSession()
  const { hasWorkspace, isPending: isWorkspacePending } = useWorkspaceState()
  const location = useLocation()

  if (isSessionPending || (session && isWorkspacePending)) {
    return <AuthLoading />
  }

  if (session) {
    const redirectTo = hasWorkspace ? "/" : "/create-workspace"
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  return <Outlet />
}

export function AuthGuard() {
  const { data: session, isPending } = useSession()
  const location = useLocation()

  if (isPending) {
    return <AuthLoading />
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export function CreateWorkspaceGuard() {
  const { hasWorkspace, isPending } = useWorkspaceState()

  if (isPending) {
    return <AuthLoading />
  }

  console.log(hasWorkspace,'hasWorkspace')

  if (hasWorkspace) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export function WorkspaceGuard() {
  const { hasWorkspace, isPending } = useWorkspaceState()

  if (isPending) {
    return <AuthLoading />
  }

  if (!hasWorkspace) {
    return <Navigate to="/create-workspace" replace />
  }

  return <Outlet />
}

export async function getPostLoginPath() {
  const organizations = await authClient.organization.list({})

  if (organizations.error) {
    return "/create-workspace"
  }

  return (organizations.data?.length ?? 0) > 0 ? "/" : "/create-workspace"
}

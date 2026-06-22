import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient, useSession } from "@/lib/auth"

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function CreateWorkspacePage() {
  const navigate = useNavigate()
  const { refetch: refetchSession } = useSession()
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [slugEdited, setSlugEdited] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugEdited) {
      setSlug(toSlug(value))
    }
  }

  const handleCreateWorkspace = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const workspaceSlug = slug || toSlug(name)

      if (!workspaceSlug) {
        setError("Enter a workspace name or slug")
        return
      }

      const result = await authClient.organization.create({
        name: name.trim(),
        slug: workspaceSlug,
      })

      if (result.error) {
        setError(result.error.message ?? "Failed to create workspace")
        return
      }

      if (!result.data) {
        setError("Failed to create workspace")
        return
      }

      const setActiveResult = await authClient.organization.setActive({
        organizationId: result.data.id,
      })

      if (setActiveResult.error) {
        setError(
          setActiveResult.error.message ?? "Failed to set active workspace"
        )
        return
      }

      await refetchSession()

      navigate("/")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-5">
        <div className="relative col-span-3 hidden bg-[#171717] p-10 md:block" />

        <div className="relative col-span-2 flex items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Create a workspace
              </h1>
              <p className="text-sm text-muted-foreground">
                Set up your team space to get started
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleCreateWorkspace}>
              <Input
                type="text"
                placeholder="Acme Inc."
                value={name}
                onChange={(event) => handleNameChange(event.target.value)}
                required
                className="h-11 border-white/10 bg-[#171717] text-white placeholder:text-zinc-500"
              />

              <Input
                type="text"
                placeholder="acme-inc"
                value={slug}
                onChange={(event) => {
                  setSlugEdited(true)
                  setSlug(toSlug(event.target.value))
                }}
                required
                className="h-11 border-white/10 bg-[#171717] text-white placeholder:text-zinc-500"
              />

              <p className="text-xs text-muted-foreground">
                Workspace URL: {slug || "your-workspace"}
              </p>

              {error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : null}

              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full bg-white text-black hover:bg-zinc-200"
              >
                {isLoading ? "Creating..." : "Create workspace"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { authClient } from "@/lib/auth"

const envOptions = [
  { value: "prod", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "sandbox", label: "Sandbox" },
] as const

type ApiKeyDialogProps = {
  onCreated?: () => void
}

export function ApiKeyDialog({ onCreated }: ApiKeyDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [scopes, setScopes] = useState("events:read")
  const [environment, setEnvironment] =
    useState<(typeof envOptions)[number]["value"]>("prod")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdKey, setCreatedKey] = useState<string | null>(null)

  function resetForm() {
    setName("")
    setScopes("events:read")
    setEnvironment("prod")
    setError(null)
    setCreatedKey(null)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await authClient.apiKey.create({
        name: name.trim(),
        prefix: "oc_",
        metadata: {
          environment,
          scopes,
        },
      })

      if (result.error) {
        setError(result.error.message ?? "Failed to create API key")
        return
      }

      if (!result.data?.key) {
        setError("API key was not returned")
        return
      }

      setCreatedKey(result.data.key)
      onCreated?.()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      resetForm()
    }
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Create API key
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          {createdKey ? (
            <>
              <DialogHeader>
                <DialogTitle>API key created</DialogTitle>
                <DialogDescription>
                  Copy this key now. You will not be able to see it again.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <label htmlFor="created-api-key" className="text-sm font-medium">
                  Secret key
                </label>
                <Input
                  id="created-api-key"
                  readOnly
                  value={createdKey}
                  className="font-mono text-xs"
                />
              </div>
              <DialogFooter>
                <Button type="button" onClick={() => handleOpenChange(false)}>
                  Done
                </Button>
              </DialogFooter>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create API key</DialogTitle>
                <DialogDescription>
                  After creation you will see the secret once. Store it
                  securely.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <label htmlFor="api-key-name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="api-key-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. Production — write"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="api-key-environment"
                    className="text-sm font-medium"
                  >
                    Environment
                  </label>
                  <Select
                    value={environment}
                    onValueChange={(value) =>
                      setEnvironment(
                        value as (typeof envOptions)[number]["value"]
                      )
                    }
                  >
                    <SelectTrigger id="api-key-environment">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      {envOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="api-key-scopes" className="text-sm font-medium">
                    Scopes
                  </label>
                  <Input
                    id="api-key-scopes"
                    value={scopes}
                    onChange={(event) => setScopes(event.target.value)}
                    placeholder="events:read, profiles:read"
                    required
                    autoComplete="off"
                  />
                </div>
                {error ? (
                  <p className="text-sm text-red-500">{error}</p>
                ) : null}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create key"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

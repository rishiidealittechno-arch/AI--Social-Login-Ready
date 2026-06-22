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

const roleOptions = [
  { value: "member", label: "Member" },
  { value: "admin", label: "Admin" },
] as const

type InviteMemberDialogProps = {
  onInvited?: () => void
}

export function InviteMemberDialog({ onInvited }: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] =
    useState<(typeof roleOptions)[number]["value"]>("member")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function resetForm() {
    setEmail("")
    setRole("member")
    setError(null)
    setSuccess(null)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const result = await authClient.organization.inviteMember({
        email: email.trim(),
        role,
        resend: true,
      })

      if (result.error) {
        setError(result.error.message ?? "Failed to send invitation")
        return
      }

      setSuccess(`Invitation sent to ${email.trim()}`)
      onInvited?.()
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
        Invite member
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Invite member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your active workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label htmlFor="invite-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="invite-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="invite-role" className="text-sm font-medium">
                  Role
                </label>
                <Select
                  value={role}
                  onValueChange={(value) =>
                    setRole(value as (typeof roleOptions)[number]["value"])
                  }
                >
                  <SelectTrigger id="invite-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              {success ? (
                <p className="text-sm text-green-600">{success}</p>
              ) : null}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                {success ? "Close" : "Cancel"}
              </Button>
              {!success ? (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send invite"}
                </Button>
              ) : null}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

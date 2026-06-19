"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string
    name: string
    email: string
    role: string
    status: string
    lastActive: string
    workspace: string
    mfa: string
    created: string
  }
}

export function UserDetailSheet({ open, onOpenChange, user }: UserDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={`/avatars/${user.name.toLowerCase().split(' ')[0]}.png`} alt={user.name} />
              <AvatarFallback className="text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Role</span>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={user.status === 'Active' ? 'default' : user.status === 'Invited' ? 'outline' : user.status === 'Suspended' ? 'destructive' : 'secondary'}>
                {user.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Workspace</span>
              <span className="text-sm">{user.workspace}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">MFA</span>
              <span className="text-sm">{user.mfa}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Active</span>
              <span className="text-sm">{user.lastActive}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{user.created}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

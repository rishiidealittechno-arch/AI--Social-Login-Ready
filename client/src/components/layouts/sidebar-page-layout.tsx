import { AvatarGroup } from "@/components/ui/avatar"
import { useEffect, type CSSProperties } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { sidebarFooterMenus, sidebarMenus } from "@/components/layouts/sidebar-menus"
import {
  CancelIcon,
  Menu03Icon,
} from "@hugeicons/core-free-icons"
import { settingsSidebarMenu } from "./setting-sidebar-menus"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { AskMimo } from "../ask-mimo/ask-mimo"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item"
import { useSession } from "@/lib/auth"

export function PlanBanner() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <AvatarGroup className="mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </AvatarGroup>
        <div className="flex items-center gap-2">
          <CardTitle>Growth Plan</CardTitle>
          <Badge variant="outline">Free Plan</Badge>
        </div>
        <CardDescription>You are on the Growth plan. Renews automatically unless cancelled.</CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button className="w-full" variant="outline">What's new?</Button>
      </CardFooter>
    </Card>
  )
}

export function LayoutSidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { data: session, isPending } = useSession()
  const user = session?.user

  // go to /new-chat if pathname is /settings on escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && pathname.includes("/settings")) {
        navigate("/new-chat")
      }
    }
    window.addEventListener("keydown", handleEscapeKey)
    return () => window.removeEventListener("keydown", handleEscapeKey)
  }, [navigate])

  const isSettings = pathname.startsWith("/settings")
  const layoutColumns = isSettings
    ? "minmax(0, 2fr) minmax(0, 4fr)"
    : "minmax(0, 1fr) minmax(0, 5fr)"

  return (
    <div
      className={cn(
        "grid h-screen w-full grid-cols-1 items-stretch bg-neutral-50/40 p-2   dark:bg-neutral-900/40 md:items-center md:[grid-template-columns:var(--layout-cols)] md:transition-[grid-template-columns] md:duration-300 md:ease-out"
      )}
      style={{ "--layout-cols": layoutColumns } as CSSProperties}
    >
      <div className="hidden w-full md:col-span-1 md:flex md:h-full">
        <div className="relative h-full w-full">
          <div
            className={cn(
              "absolute inset-0 flex h-full w-full flex-col justify-between p-4 transition-all duration-300 ease-out",
              isSettings
                ? "pointer-events-none translate-x-4 opacity-0"
                : "pointer-events-auto translate-x-0 opacity-100"
            )}
          >
            <div className="w-full space-y-8">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="max-w-10 overflow-hidden opacity-100">
                  <svg fill="none" height="35" viewBox="0 0 30 48" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m0 41.2222c0 1.5341 1.24365 2.7778 2.77778 2.7778h24.44442c1.5341 0 2.7778-1.2437 2.7778-2.7778v-7.2222c0-8.2843-6.7157-15-15-15-8.28427 0-15 6.7157-15 15z" fill="#2563eb" /><path d="m0 6.77778c0-1.53413 1.24365-2.77778 2.77778-2.77778h24.44442c1.5341 0 2.7778 1.24365 2.7778 2.77778v7.22222c0 8.2843-6.7157 15-15 15-8.28427 0-15-6.7157-15-15z" fill="#60a5fa" opacity=".5" /></svg>                </div>
                {/* <div className="flex items-center gap-2">
                  <div className=" overflow-hidden opacity-100 flex items-center gap-2">
                    <Button variant={"secondary"} size={"icon-lg"} className="rounded-full">
                      <HugeiconsIcon icon={PanelLeft} strokeWidth={2} />
                    </Button>
                    <Button variant={"secondary"} size={"icon-lg"} className="rounded-full">
                      <HugeiconsIcon icon={AddIcon} strokeWidth={2} />
                    </Button>
                  </div>
                </div> */}
              </div>
              <nav className="space-y-4">
                {sidebarMenus.map((menu) => (
                  <NavLink
                    key={menu.path}
                    to={menu.path}
                    className={({ isActive }) =>
                      cn(
                        "flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-0 duration-0",
                        isActive ||
                          (menu.path === "/settings" &&
                            pathname.startsWith("/settings"))
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-100"
                      )
                    }
                  >
                    <HugeiconsIcon strokeWidth={1.5} icon={menu.icon} />
                    <div className="max-w-36 overflow-hidden opacity-100">
                      <CardTitle className="scroll-m-20 text-md font-semibold tracking-tight">
                        {menu.title}
                      </CardTitle>
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex gap-4 flex-col">
              <nav className="space-y-3">
                {sidebarFooterMenus.map((menu) => (
                  <NavLink
                    key={menu.path}
                    to={menu.path}
                    className={({ isActive }) =>
                      cn(
                        "flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-0 duration-0",
                        isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                      )
                    }
                  >
                    <HugeiconsIcon strokeWidth={1.5} size={20} icon={menu.icon} />
                    <div className="max-w-36 overflow-hidden opacity-100">
                      <CardTitle className="scroll-m-20 text-md font-semibold tracking-tight">
                        {menu.title}
                      </CardTitle>
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          <div
            className={cn(
              "bg-muted/30 absolute inset-0 flex h-full w-full flex-col items-end justify-between px-4 py-6 transition-all duration-300 ease-out dark:bg-muted/10",
              isSettings
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-4 opacity-0"
            )}
          >
            <div className="ms-auto flex h-full w-max min-w-0 max-w-full flex-col justify-between">
              <div className="space-y-8">
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                  onClick={() => navigate('/new-chat')}
                >
                  <HugeiconsIcon icon={CancelIcon} strokeWidth={2} />
                  Exit settings
                </Button>
                <nav className="space-y-3" aria-label="Settings sections">
                  {isSettings && settingsSidebarMenu.map((menu) => (
                    <NavLink
                      key={menu.path}
                      to={menu.path}
                      className={({ isActive }) =>
                        cn(
                          "flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-0 duration-0",
                          isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                        )
                      }
                    >
                      <HugeiconsIcon strokeWidth={1.5} size={20} icon={menu.icon} />
                      <CardTitle className="scroll-m-20 text-sm font-semibold tracking-tight">
                        {menu.title}
                      </CardTitle>
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-2 self-end">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "col-span-1 flex h-full min-h-0 w-full flex-col overflow-hidden bg-white dark:bg-neutral-900 md:col-span-1 md:rounded md:shadow"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-auto">
          <div className="p-4 block lg:hidden">
            <HugeiconsIcon icon={Menu03Icon} strokeWidth={2} />
          </div>          
          <Outlet />
        </div>
        <AskMimo />
      </div>
    </div>
  )
}

export default LayoutSidebar

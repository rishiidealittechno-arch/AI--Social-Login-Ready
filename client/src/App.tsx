import type { ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import {
  AuthGuard,
  CreateWorkspaceGuard,
  GuestGuard,
  WorkspaceGuard,
} from "@/components/layouts/auth-guards"
import LayoutSidebar from "@/components/layouts/sidebar-page-layout"
import { sidebarFooterMenus, sidebarMenus } from "@/components/layouts/sidebar-menus"
import {
  settingsSidebarMenu,
  type SettingsSidebarPath,
} from "@/components/layouts/setting-sidebar-menus"
import NotFoundPage from "@/pages/not-found/page"
import SettingsLayout from "@/pages/settings/settings-layout"
import SettingsProfilePage from "@/pages/settings/pages/profile/page"
import SettingsWorkspacePage from "@/pages/settings/pages/workspace/page"
import AppearanceSettingsPage from "@/pages/settings/pages/appearance/page"
import ApiKeySettingsPage from "@/pages/settings/pages/api-key/page"
import MembersSettingsPage from "@/pages/settings/pages/members/page"
import SessionsSettingsPage from "@/pages/settings/pages/sessions/page"
import LoginPage from "@/pages/login/page"
import CreateWorkspacePage from "@/pages/create-workspace/page"
import SignupPage from "@/pages/signup/page"
import OnboardingPage from "./pages/onboarding/page"
import ApiUsagePage from "@/pages/api-usage/page"
import NewChatPage from "@/pages/new-chat/page"
import SchedulingPage from "@/pages/schedules/Page"
import MeetingsPage from "@/pages/meetings/page"

function PageTitle({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
    </div>
  )
}

const routeElements: Partial<Record<string, ReactNode>> = {
  "/api-usage": <ApiUsagePage />,
  "/ask-mimo": <NewChatPage />,
  "/scheduling": <SchedulingPage />,
  "/meetings": <MeetingsPage />,
}

const routableFooterMenus = sidebarFooterMenus.filter((menu) =>
  menu.path.startsWith("/")
)

const settingsRouteElements = {
  "/settings/profile": <SettingsProfilePage />,
  "/settings/workspace": <SettingsWorkspacePage />,
  "/settings/appearance": <AppearanceSettingsPage />,
  "/settings/api-key": <ApiKeySettingsPage />,
  "/settings/members": <MembersSettingsPage />,
  "/settings/sessions": <SessionsSettingsPage />,
} satisfies Record<SettingsSidebarPath, ReactNode>

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestGuard />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="create-workspace" element={<CreateWorkspaceGuard />}>
            <Route index element={<CreateWorkspacePage />} />
          </Route>

          <Route element={<WorkspaceGuard />}>
            <Route path="/" element={<LayoutSidebar />}>
              <Route index element={<Navigate to="/ask-mimo" replace />} />
              {sidebarMenus
                .filter((menu) => menu.path !== "/settings")
                .map((menu) => (
                  <Route
                    key={menu.path}
                    path={menu.path.replace(/^\//, "")}
                    element={
                      routeElements[menu.path] ?? (
                        <PageTitle title={menu.title} />
                      )
                    }
                  />
                ))}
              {routableFooterMenus.map((menu) => (
                <Route
                  key={menu.path}
                  path={menu.path.replace(/^\//, "")}
                  element={
                    routeElements[menu.path] ?? (
                      <PageTitle title={menu.title} />
                    )
                  }
                />
              ))}
              <Route path="settings" element={<SettingsLayout />}>
                <Route index element={<Navigate to="profile" replace />} />
                {settingsSidebarMenu.map((menu) => (
                  <Route
                    key={menu.path}
                    path={menu.path.replace("/settings/", "")}
                    element={settingsRouteElements[menu.path]}
                  />
                ))}
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="onboarding" element={<OnboardingPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

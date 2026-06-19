# Routing & Page Structure Skill

## Overview

This project uses **React Router DOM v7** for client-side routing with a sidebar-based navigation system.

## Routing Architecture

### Main Router Configuration

The router is configured in `src/App.tsx` with the following structure:

```tsx
<BrowserRouter>
  <Routes>
    {/* Authenticated routes with sidebar */}
    <Route path="/" element={<LayoutSidebar />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      {/* Main menu routes */}
      {/* Settings routes (nested) */}
      {/* Special pages */}
    </Route>
    
    {/* Public routes (no sidebar) */}
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
    <Route path="onboarding" element={<OnboardingPage />} />
  </Routes>
</BrowserRouter>
```

### Navigation Menus

#### Main Sidebar Menu

Defined in `src/components/layouts/sidebar-menus.ts`:

```typescript
export const sidebarMenus = [
  {
    title: "Dashboard",
    icon: House,
    path: "/dashboard",
    heading: "Dashboard",
    description: "Overview of activity and key metrics",
  },
  {
    title: "Analytics",
    icon: BarChart,
    path: "/analytics",
    heading: "Analytics",
    description: "Review performance, trends, and reports",
  },
  // ... more menu items
] as const
```

Each menu item has:
- `title`: Display text in navigation
- `icon`: Icon component from Hugeicons
- `path`: URL path (must match route path)
- `heading`: Page title (displayed in header)
- `description`: Page description (displayed in header)

#### Settings Menu

Defined in `src/components/layouts/setting-sidebar-menus.ts`:

```typescript
export const settingsSidebarMenu = [
  {
    title: "Profile",
    icon: UserIcon,
    path: "/settings/profile",
    heading: "Profile",
    description: "Manage your profile settings",
  },
  // ... more settings items
] as const
```

### Route Element Mapping

Routes are mapped to components in `App.tsx`:

```typescript
const routeElements = {
  "/dashboard": <DashboardPage />,
  "/analytics": <AnalyticsPage />,
  "/users": <UsersPage />,
  "/players": <PlayerPage />,
  "/segments": <SegmentationPage />,
  "/events": <EventsPage />,
  "/campaigns": <CampaignPage />,
  "/journeys": <JourneysPage />,
  "/triggers": <TriggersPage />,
  "/templates": <TemplatesPage />,
}
```

## Page Structure

### Page Folder Structure

```
src/pages/
├── feature-name/
│   ├── page.tsx          # Main page component
│   ├── components/
│   │   ├── table.tsx     # Data table component
│   │   ├── dialog.tsx    # Modal dialogs
│   │   └── index.ts      # Barrel exports
│   └── index.ts          # Optional page barrel export
└── ...
```

### Page Component Template

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function FeaturePage() {
  return (
    <div className="p-8 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feature Name</h1>
          <p className="text-muted-foreground">Feature description</p>
        </div>
        <Button>Add New</Button>
      </div>
      
      {/* Page content */}
      <Card>
        <CardHeader>
          <CardTitle>Section Title</CardTitle>
          <CardDescription>Section description</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content */}
        </CardContent>
      </Card>
    </div>
  )
}
```

### Page with Table Example

```tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/pages/feature-name/components/table'
import { CreateDialog } from '@/pages/feature-name/components/create-dialog'

export default function FeaturePage() {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Items</h1>
          <p className="text-muted-foreground">Manage your items</p>
        </div>
        <Button onClick={() => setOpen(true)}>Create New</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Items</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable />
        </CardContent>
      </Card>
      
      <CreateDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
```

## Adding New Pages

### Step 1: Create Page Component

```bash
mkdir -p src/pages/new-feature/components
```

Create `src/pages/new-feature/page.tsx`:

```tsx
export default function NewFeaturePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">New Feature</h1>
      <p className="text-muted-foreground">This is a new feature page</p>
    </div>
  )
}
```

### Step 2: Add to Menu

Add to `src/components/layouts/sidebar-menus.ts`:

```typescript
{
  title: "New Feature",
  icon: NewIcon, // Import from @hugeicons/core-free-icons
  path: "/new-feature",
  heading: "New Feature",
  description: "Description of new feature",
}
```

### Step 3: Add Route

Add to `src/App.tsx`:

```tsx
// Import the page
import NewFeaturePage from '@/pages/new-feature/page'

// Add to routeElements
const routeElements = {
  ...existingRoutes,
  "/new-feature": <NewFeaturePage />,
}
```

### Step 4: Add Icon Import

Import the icon in `sidebar-menus.ts`:

```typescript
import { NewIcon } from "@hugeicons/core-free-icons"
```

## Special Pages

### Pages Without Sidebar

Some pages don't use the sidebar layout:
- `/login`
- `/signup`
- `/onboarding`

These are defined as top-level routes in `App.tsx`:

```tsx
<Route path="login" element={<LoginPage />} />
<Route path="signup" element={<SignupPage />} />
<Route path="onboarding" element={<OnboardingPage />} />
```

### Nested Routes

Settings pages use nested routing:

```tsx
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
```

## Navigation Components

### Sidebar Layout

The `LayoutSidebar` component (`src/components/layouts/sidebar-page-layout.tsx`) provides:
- Left sidebar with main navigation
- Right sidebar for settings navigation
- Responsive design (collapses on mobile)
- Header with breadcrumbs and actions
- Footer with user avatar

### Page Metadata

Page titles and descriptions are automatically extracted from the menu configuration:

```typescript
// In sidebar-page-layout.tsx
const pageMeta = useMemo(() => {
  const item = sidebarMenus.find((m) => m.path === pathname)
  if (item) {
    return { heading: item.heading, description: item.description }
  }
  return { heading: "Page", description: "" }
}, [pathname])
```

## Route Parameters

For pages with dynamic segments:

```tsx
// In App.tsx
<Route path="player-details" element={<PlayerDetailsPage />} />

// In PlayerDetailsPage.tsx
import { useSearchParams } from 'react-router-dom'

export default function PlayerDetailsPage() {
  const [searchParams] = useSearchParams()
  const playerId = searchParams.get('id')
  
  // Fetch player data using playerId
  
  return (
    <div>Player Details: {playerId}</div>
  )
}
```

### Using useParams

```tsx
// In App.tsx
<Route path="campaigns/:id" element={<CampaignDetailsPage />} />

// In CampaignDetailsPage.tsx
import { useParams } from 'react-router-dom'

export default function CampaignDetailsPage() {
  const { id } = useParams<{ id: string }>()
  
  // Fetch campaign data using id
  
  return (
    <div>Campaign Details: {id}</div>
  )
}
```

## Navigation Helpers

### NavLink Component

Use `NavLink` from react-router-dom for active link styling:

```tsx
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

<NavLink
  to="/dashboard"
  className={({ isActive }) => 
    cn(
      "flex items-center gap-2",
      isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
    )
  }
>
  <Icon />
  Dashboard
</NavLink>
```

### Programmatic Navigation

```tsx
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/dashboard')
    // or navigate('/dashboard', { replace: true })
  }
  
  return (
    <Button onClick={handleClick}>Go to Dashboard</Button>
  )
}
```

## Route Protection

Currently, there's no authentication protection. To add:

### Option 1: Protected Route Component

```tsx
// components/protected-route.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return <>{children}</>
}
```

Use in routes:

```tsx
<Route path="/" element={<ProtectedRoute><LayoutSidebar /></ProtectedRoute>}>
  {/* ... */}
</Route>
```

### Option 2: Public Route Component

```tsx
// components/public-route.tsx
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }
  
  return <>{children}</>
}
```

Use for public pages:

```tsx
<Route path="login" element={<PublicRoute><LoginPage /></PublicRoute>} />
```

## Best Practices

1. **Keep routes flat** when possible - avoid deep nesting
2. **Use meaningful path names** that describe the resource
3. **Consistent naming**: Use plural nouns for collections (`/players`, `/campaigns`)
4. **Use search params** for filtering/sorting: `/players?status=active&sort=name`
5. **Use route params** for individual resources: `/players/:id`
6. **Add loading states** for async data fetching
7. **Handle 404** with the `NotFoundPage` component
8. **Test navigation** on mobile and desktop

## Common Route Patterns

### CRUD Routes

```tsx
// List page
<Route path="/items" element={<ItemsPage />} />

// Create page
<Route path="/items/new" element={<CreateItemPage />} />

// Edit page
<Route path="/items/:id/edit" element={<EditItemPage />} />

// Detail page
<Route path="/items/:id" element={<ItemDetailsPage />} />
```

### Nested Routes Example

```tsx
<Route path="/settings" element={<SettingsLayout />}>
  <Route index element={<Navigate to="profile" replace />} />
  <Route path="profile" element={<ProfileSettingsPage />} />
  <Route path="appearance" element={<AppearanceSettingsPage />} />
  <Route path="notifications" element={<NotificationSettingsPage />} />
</Route>
```

## Troubleshooting

### Route Not Found

1. Check the path in the route configuration
2. Check the menu path matches the route path
3. Ensure the component is imported correctly
4. Check for typos in path names

### Navigation Not Working

1. Check that `BrowserRouter` wraps the entire app
2. Verify links use `Link` or `NavLink` from react-router-dom
3. Check for `.preventDefault()` blocking navigation
4. Ensure there are no JavaScript errors

### Active Link Styling Not Working

1. Use `NavLink` instead of `Link`
2. Check the `className` function receives `isActive` parameter
3. Ensure the path matches exactly (including trailing slashes)

### 404 on Refresh

This is a Vite/React Router issue. Solutions:
1. Configure Vite's `base` in `vite.config.ts`
2. Configure your server to serve `index.html` for all routes
3. Use `HashRouter` instead of `BrowserRouter` (not recommended)

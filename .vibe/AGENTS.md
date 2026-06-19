# Project Guidelines for Layout Designing

## Project Overview

This is a React-based frontend application using:
- **React 19** with TypeScript
- **Vite 7** as the build tool
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library (Radix Nova style)
- **OKLCH color space** for theme colors
- **React Router DOM** for navigation

## Folder Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn UI components (Button, Input, Card, etc.)
│   │   ├── layouts/     # Layout components (sidebar, navigation)
│   │   └── *.tsx        # Custom components (login-form, signup-form)
│   ├── pages/           # Page components organized by feature
│   │   ├── analytics/
│   │   ├── campaign/
│   │   ├── dashboard/
│   │   ├── settings/
│   │   │   ├── pages/   # Nested settings pages
│   │   │   └── settings-layout.tsx
│   │   └── ...
│   ├── lib/             # Utility functions and theme colors
│   │   ├── theme-colors.ts  # Primary/secondary color management
│   │   └── utils.ts         # cn() function for Tailwind class merging
│   ├── hooks/           # Custom React hooks
│   │   └── use-mobile.ts
│   ├── App.tsx          # Main router and layout wrapper
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles with Tailwind + custom theme
├── components.json     # shadcn/ui configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts  # Tailwind configuration
```

## Design System

### Theme System
- Uses `ThemeProvider` from `@/components/theme-provider`
- Supports dark/light/system modes with localStorage persistence
- Custom primary and secondary colors stored in localStorage:
  - `theme-primary-color` key
  - `theme-secondary-color` key
- Default colors use OKLCH color space

### Color Variables
- CSS custom properties defined in `index.css`
- Root (light mode) and `.dark` (dark mode) variants
- Primary color: `--primary`
- Secondary color: `--secondary`
- Background: `--background`
- Foreground: `--foreground`
- Card, popover, muted, accent, destructive, border, input, ring colors
- Sidebar-specific colors
- Chart colors (5 variants)

### Component Patterns

#### UI Components (shadcn-based)
- Located in `src/components/ui/`
- Use `cva()` from class-variance-authority for variants
- Export both component and variant config (e.g., `Button`, `buttonVariants`)
- Use `cn()` utility from `@/lib/utils` for class merging
- Follow Radix Nova style conventions

Example button component structure:
```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva("base classes", { variants: {...} })

function Button({ className, variant, size, asChild, ...props }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
```

#### Page Structure
- Pages are in `src/pages/*/`
- Each page typically has:
  - `page.tsx` - Main page component
  - `components/` - Page-specific components
- Pages are wrapped in `LayoutSidebar` for authenticated routes

#### Layout Components
- `sidebar-page-layout.tsx` - Main sidebar layout with navigation
- `sidebar-menus.ts` - Navigation menu configuration
- `setting-sidebar-menus.ts` - Settings navigation menu

### Routing
- Uses React Router DOM v7
- Main routes defined in `App.tsx`
- Sidebar navigation managed by `sidebarMenus` and `settingsSidebarMenu`
- Authenticated routes wrap in `LayoutSidebar`
- Public routes: `/login`, `/signup`, `/onboarding`

## Development Rules

### 1. Component Creation
- **New UI components**: Use shadcn CLI or follow existing patterns in `src/components/ui/`
- **Page-specific components**: Place in `src/pages/*/components/`
- **Reusable layout components**: Place in `src/components/layouts/`
- Always use `cn()` for class merging

### 2. Styling
- Use Tailwind CSS classes directly
- For conditional classes, use `cn()` utility
- For component variants, use `cva()`
- Custom colors via CSS variables (--primary, --secondary, etc.)
- Use OKLCH color format for new colors

### 3. Theming
- Import `ThemeProvider` from `@/components/theme-provider`
- Wrap app with `ThemeProvider` in `main.tsx`
- Access theme with `useTheme()` hook
- Theme colors are automatically applied from localStorage

### 4. Icons
- Primary: Hugeicons (`@hugeicons/core-free-icons`)
- Secondary: Tabler icons (`@tabler/icons-react`)
- Import: `import { IconName } from "@hugeicons/core-free-icons"`
- Usage: `<HugeiconsIcon icon={IconName} strokeWidth={2} />`

### 5. State Management
- Currently uses React context and local state
- No Redux or Zustand configured yet
- For new state: Prefer React context or local state for simplicity

### 6. File Organization
- Keep related components and utilities together
- Use barrel exports (`index.ts`) for component groups
- Follow existing naming conventions (kebab-case for files, PascalCase for components)

### 7. TypeScript
- Strict mode enabled
- Use type-safe props and hooks
- Export types alongside components when needed

## Import Aliases

Configured in `components.json` and TypeScript:
- `@/*` → `src/*`
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`
- `@/ui` → `src/components/ui`

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `lint` - Run ESLint
- `format` - Format code with Prettier
- `typecheck` - TypeScript type checking
- `preview` - Preview production build

## Key Dependencies

- **UI**: shadcn, radix-ui, class-variance-authority, tailwind-merge, clsx
- **Icons**: @hugeicons/core-free-icons, @hugeicons/react, @tabler/icons-react, lucide-react
- **Routing**: react-router-dom
- **Styling**: tailwindcss, @tailwindcss/vite, tw-animate-css
- **Charts**: recharts
- **Flow**: @xyflow/react (for journey/workflow builder)
- **Email**: react-email-editor
- **Fonts**: @fontsource-variable/geist, @fontsource-variable/manrope

## Adding New Pages

1. Create folder in `src/pages/feature-name/`
2. Add `page.tsx` with main component
3. Add to route configuration in `App.tsx`
4. Add to `sidebarMenus.ts` if needs navigation
5. Import and use existing UI components from `@/components/ui`

## Modifying Theme Colors

1. Update color definitions in `src/lib/theme-colors.ts`
2. Add new color options to `PRIMARY_COLOR_OPTIONS` or `SECONDARY_COLOR_OPTIONS`
3. Update CSS variables in `src/index.css` if needed
4. Test dark/light mode variants

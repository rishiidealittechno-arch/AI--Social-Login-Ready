# Theming Rules

## Theme System Overview

The application uses a custom theme system with:
- **Dark/Light/System** mode switching
- **Custom primary and secondary colors** (OKLCH color space)
- **CSS custom properties** for all theme values
- **localStorage persistence** for user preferences

## Theme Provider

The `ThemeProvider` component (`@/components/theme-provider.tsx`) manages:
1. Color mode (dark/light/system)
2. Primary and secondary color persistence

### Usage

```tsx
// In main.tsx
import { ThemeProvider } from '@/components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
```

### Accessing Theme

```tsx
import { useTheme } from '@/components/theme-provider'

function MyComponent() {
  const { theme, setTheme } = useTheme()
  
  // theme: 'dark' | 'light' | 'system'
  // setTheme: (theme: 'dark' | 'light' | 'system') => void
  
  return (
    <button onClick={() => setTheme('dark')}>Dark Mode</button>
  )
}
```

## Custom Colors

### Primary and Secondary Colors

Custom primary and secondary colors are managed separately from the dark/light mode:

- **Storage keys**:
  - `theme-primary-color` - Stores the primary color value
  - `theme-secondary-color` - Stores the secondary color value

- **Functions** (from `@/lib/theme-colors.ts`):
  - `applyThemeColors(options)` - Apply colors to CSS variables
  - `initThemeColorsFromStorage()` - Initialize from localStorage

### Available Color Options

#### Primary Colors
```typescript
// From src/lib/theme-colors.ts
PRIMARY_COLOR_OPTIONS = [
  "oklch(62% 0.22 264)",  // blue
  "oklch(65% 0.24 200)",  // cyan
  "oklch(68% 0.22 145)",  // green
  "oklch(72% 0.19 85)",   // yellow
  "oklch(64% 0.25 25)",   // orange
  "oklch(60% 0.26 15)",   // red
  "oklch(63% 0.24 320)",  // pink
  "oklch(58% 0.22 295)",  // purple
] as const
```

#### Secondary Colors
```typescript
SECONDARY_COLOR_OPTIONS = [
  "oklch(96% 0.003 264)",   // light gray
  "oklch(92% 0.005 264)",   // muted gray
  "oklch(88% 0.008 264)",   // medium gray
  "oklch(84% 0.01 264)",    // darker muted
  "oklch(90% 0.02 240)",    // cool gray
  "oklch(90% 0.02 160)",    // soft green gray
  "oklch(90% 0.02 80)",     // warm gray
  "oklch(86% 0.015 20)",    // beige gray
] as const
```

### Using Theme Colors

```tsx
// In components, use CSS variables
<div className="bg-primary text-primary-foreground">
  Primary colored element
</div>

<div className="bg-secondary text-secondary-foreground">
  Secondary colored element
</div>
```

## CSS Custom Properties

### Theme Variables

All theme colors are defined as CSS custom properties in `src/index.css`:

```css
/* Light mode (root) */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  /* ... more colors */
}

/* Dark mode */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.424 0.199 265.638);
  /* ... more colors */
}
```

### Full Color Palette

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--background` | oklch(1 0 0) | oklch(0.145 0 0) | Page background |
| `--foreground` | oklch(0.145 0 0) | oklch(0.985 0 0) | Text color |
| `--card` | oklch(1 0 0) | oklch(0.205 0 0) | Card background |
| `--card-foreground` | oklch(0.145 0 0) | oklch(0.985 0 0) | Card text |
| `--primary` | oklch(0.488 0.243 264.376) | oklch(0.424 0.199 265.638) | Primary brand color |
| `--primary-foreground` | oklch(0.97 0.014 254.604) | oklch(0.97 0.014 254.604) | Text on primary |
| `--secondary` | oklch(0.967 0.001 286.375) | oklch(0.274 0.006 286.033) | Secondary background |
| `--muted` | oklch(0.97 0 0) | oklch(0.269 0 0) | Muted background |
| `--accent` | oklch(0.97 0 0) | oklch(0.269 0 0) | Accent elements |
| `--destructive` | oklch(0.577 0.245 27.325) | oklch(0.704 0.191 22.216) | Error states |
| `--border` | oklch(0.922 0 0) | oklch(1 0 0 / 10%) | Borders |
| `--input` | oklch(0.922 0 0) | oklch(1 0 0 / 15%) | Input backgrounds |
| `--ring` | oklch(0.708 0 0) | oklch(0.556 0 0) | Focus rings |

### Sidebar-Specific Colors

Additional colors for sidebar styling:
- `--sidebar` - Sidebar background
- `--sidebar-foreground` - Sidebar text
- `--sidebar-primary` - Sidebar active items
- `--sidebar-accent` - Sidebar accents
- `--sidebar-border` - Sidebar borders
- `--sidebar-ring` - Sidebar focus rings

### Chart Colors

Five chart color variants:
- `--chart-1` to `--chart-5`

## Adding New Theme Colors

### Step 1: Define in CSS

Add to both `:root` and `.dark` selectors in `src/index.css`:

```css
:root {
  --my-color: oklch(...);
  --my-color-foreground: oklch(...);
}

.dark {
  --my-color: oklch(...);
  --my-color-foreground: oklch(...);
}
```

### Step 2: Add to Type Definitions (Optional)

If using TypeScript, extend the theme types in a `.d.ts` file or in your component props.

### Step 3: Use OKLCH Color Format

All colors use OKLCH format: `oklch(L C H)`
- L: Lightness (0-1)
- C: Chroma (0-0.4 typically)
- H: Hue (0-360)

Use online color pickers that support OKLCH for consistency.

## Color Management

### Setting Theme Colors

```typescript
import { applyThemeColors } from '@/lib/theme-colors'

// Apply colors programmatically
applyThemeColors({
  primary: "oklch(62% 0.22 264)",
  secondary: "oklch(96% 0.003 264)",
})

// Colors are automatically persisted to localStorage
```

### Initializing Theme

Called automatically in `ThemeProvider`:

```typescript
import { initThemeColorsFromStorage } from '@/lib/theme-colors'

// Initialize from localStorage
initThemeColorsFromStorage()
```

## Customizing Theme

### For User Preferences

1. Create a color picker component
2. Store selected colors in localStorage
3. Call `applyThemeColors()` when colors change

### Example: Color Picker

```tsx
import { PRIMARY_COLOR_OPTIONS, applyThemeColors } from '@/lib/theme-colors'

function ColorPicker() {
  const [primary, setPrimary] = useState(
    localStorage.getItem('theme-primary-color') || PRIMARY_COLOR_OPTIONS[0]
  )

  const handleColorChange = (color: string) => {
    setPrimary(color)
    localStorage.setItem('theme-primary-color', color)
    applyThemeColors({ primary: color })
  }

  return (
    <div className="flex gap-2">
      {PRIMARY_COLOR_OPTIONS.map((color) => (
        <button
          key={color}
          onClick={() => handleColorChange(color)}
          style={{ backgroundColor: color }}
          className={`size-6 rounded-full ${primary === color ? 'ring-2 ring-ring' : ''}`}
        />
      ))}
    </div>
  )
}
```

## Dark Mode Implementation

The theme system uses:
1. CSS class `.dark` on `<html>` element
2. Tailwind's dark variant
3. Custom dark mode colors in CSS

### Manual Dark Mode Check

```typescript
function getSystemTheme(): 'dark' | 'light' {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}
```

### Toggling Theme

```tsx
import { useTheme } from '@/components/theme-provider'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }
  
  return (
    <button onClick={toggle}>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
```

## Best Practices

1. **Always use CSS variables** for colors, not hardcoded values
2. **Test in both modes** - light and dark
3. **Use semantic names** for custom colors (--success, --warning, etc.)
4. **Document new colors** in the theme documentation
5. **Maintain contrast ratios** for accessibility (minimum 4.5:1)
6. **Use OKLCH format** for all new colors for consistency

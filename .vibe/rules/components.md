# Component Development Rules

## UI Components (shadcn-based)

### Creating New UI Components

1. **Use shadcn CLI first**: Check if component exists in shadcn registry
   ```bash
   npx shadcn@latest add button
   ```

2. **Manual creation**: Follow existing patterns in `src/components/ui/`

### Component Structure

```tsx
// 1. Imports
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

// 2. Variant definitions
const myComponentVariants = cva(
  "base classes here",
  {
    variants: {
      variant: {
        default: "default styles",
        outline: "outline styles",
        // ...
      },
      size: {
        default: "default size",
        sm: "small size",
        lg: "large size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 3. Component definition
interface MyComponentProps 
  extends React.ComponentProps<"div">,
    VariantProps<typeof myComponentVariants> {
  asChild?: boolean
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "div"
    return (
      <Comp
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"

// 4. Exports
export { MyComponent, myComponentVariants }
```

## Page Components

### Page Structure

```
src/pages/feature-name/
├── page.tsx          # Main page component
├── components/
│   ├── table.tsx     # Data table
│   ├── dialog.tsx    # Modal dialogs
│   └── index.ts      # Barrel export
└── index.ts          # Optional barrel export
```

### Page Component Template

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function FeaturePage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feature Name</h1>
          <p className="text-muted-foreground">Feature description</p>
        </div>
        <Button>Add New</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Section Title</CardTitle>
          <CardDescription>Section description</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content here */}
        </CardContent>
      </Card>
    </div>
  )
}
```

## Layout Components

### Adding to Sidebar Navigation

1. Add menu item to `src/components/layouts/sidebar-menus.ts`:

```typescript
{
  title: "New Feature",
  icon: NewIcon,
  path: "/new-feature",
  heading: "New Feature",
  description: "Description of new feature",
}
```

2. Add route in `App.tsx`:

```tsx
<Route path="new-feature" element={<NewFeaturePage />} />
```

## Component Props

### Common Props Pattern

```tsx
interface CommonProps {
  className?: string
  children?: React.ReactNode
}

// For components that extend native elements
interface MyComponentProps 
  extends React.ComponentProps<"button">,
    CommonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}
```

### Boolean Props

Use explicit boolean types:
```tsx
interface Props {
  isActive: boolean
  isDisabled: boolean
  hasError: boolean
}
```

## Accessibility

1. **Button**: Use proper `type` attribute
   - `type="submit"` for form submissions
   - `type="button"` for regular buttons

2. **Labels**: Always associate labels with inputs
   - Use `Field` component from `@/components/ui/field`
   - Or use `htmlFor` and `id` attributes

3. **ARIA**: Use ARIA attributes when needed
   - `aria-label` for icon buttons
   - `aria-describedby` for help text
   - `aria-invalid` for validation errors

4. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
   - Use proper focus states
   - Handle Enter/Space key presses

## Styling Rules

1. **Always use cn()**: For merging Tailwind classes
   ```tsx
   import { cn } from '@/lib/utils'
   
   className={cn("base-classes", variantClasses, className)}
   ```

2. **Custom colors**: Use CSS variables
   ```tsx
   // Good
   className="bg-primary text-primary-foreground"
   
   // Bad (hardcoded colors)
   className="bg-blue-500 text-white"
   ```

3. **Responsive classes**: Use Tailwind's responsive prefixes
   ```tsx
   className="w-full md:w-1/2 lg:w-1/3"
   ```

4. **Dark mode**: Use `.dark` variant or Tailwind's dark: prefix
   ```tsx
   // In CSS
   .dark { ... }
   
   // In components
   className="bg-background dark:bg-background-dark"
   ```

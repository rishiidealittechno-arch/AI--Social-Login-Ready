# shadcn/ui Skill

## Overview

shadcn/ui is a collection of copy-paste components built with Radix UI and Tailwind CSS. This project uses shadcn/ui with the Radix Nova style configuration.

## Configuration

The project is configured with:
- **Style**: Radix Nova (from `components.json`)
- **Tailwind CSS v4** with custom configuration
- **OKLCH color space** for theme colors

## Adding New Components

### Using shadcn CLI

```bash
# Navigate to client directory
cd client

# Add a component from the registry
npx shadcn@latest add [component-name]

# Examples
npx shadcn@latest add alert-dialog
npx shadcn@latest add data-table
npx shadcn@latest add combobox
```

### Component Registry

Available components include:
- **Layout**: card, dialog, sheet, popover, accordion, tabs, separator
- **Forms**: button, input, label, select, checkbox, radio-group, switch, textarea, field
- **Data Display**: badge, avatar, table, skeleton, chart
- **Navigation**: dropdown-menu, command, sidebar
- **Overlays**: alert-dialog, toast
- **Grouping**: button-group, input-group

### Manual Component Creation

If a component doesn't exist in the registry, create it manually in `src/components/ui/` following the existing patterns.

## Component Structure

All shadcn components follow this pattern:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

// 1. Define variants
const componentVariants = cva(
  "base classes",
  {
    variants: {
      variant: { default: "...", outline: "...", ... },
      size: { default: "...", sm: "...", lg: "..." },
    },
    defaultVariants: { ... },
  }
)

// 2. Define props
interface ComponentProps 
  extends React.ComponentProps<"element">,
    VariantProps<typeof componentVariants> {
  asChild?: boolean
}

// 3. Create component
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "div"
    return (
      <Comp
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

// 4. Export
export { Component, componentVariants }
```

## Customizing Components

### Extending Existing Components

```tsx
// Create a custom button that extends the base Button
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Option 1: Use asChild prop
<Button asChild variant="outline">
  <Link to="/somewhere">Click me</Link>
</Button>

// Option 2: Extend with custom classes
<Button className={cn(buttonVariants(), "custom-classes")}>
  Custom Button
</Button>
```

### Adding New Variants

To add variants to existing components:

1. **Fork the component**: Copy to a new file in your project
2. **Modify variants**: Add new variant options to `cva()`
3. **Use the forked component** instead of the original

## Available Components

### Currently Added to Project

Based on the file structure, these components are already added:

- **Layout**: accordion, card, dialog, dropdown-menu, popover, select, sheet, sidebar, skeleton, separator, tabs, tooltip
- **Forms**: button, button-group, checkbox, field, input, input-group, label, radio-group, switch, textarea
- **Data Display**: avatar, badge, chart, command, item, table
- **Navigation**: collapsible

### Common Props

Most shadcn components accept:
- `className` - Additional CSS classes
- `variant` - Style variant (default, outline, secondary, ghost, destructive, link)
- `size` - Size variant (default, sm, lg, icon)
- `asChild` - Render as child component (for Radix Slot pattern)

## Styling

### Using Theme Colors

All shadcn components automatically use the project's theme colors:

```tsx
<Button variant="default">
  {/* Uses --primary and --primary-foreground */}
  Primary Button
</Button>

<Button variant="secondary">
  {/* Uses --secondary and --secondary-foreground */}
  Secondary Button
</Button>

<Card>
  {/* Uses --card, --card-foreground, --border, etc. */}
  Card Content
</Card>
```

### Custom Styling

```tsx
// Good: Use Tailwind classes
<Button className="w-full">Full Width</Button>

// Good: Use theme variables
<Button className="bg-primary">Primary</Button>

// Bad: Hardcoded colors
<Button className="bg-blue-500">Blue Button</Button>
```

## Best Practices

1. **Use existing components first** before creating new ones
2. **Follow the established patterns** for consistency
3. **Use the `cn()` utility** for merging classes
4. **Keep component props type-safe** with TypeScript
5. **Document custom components** with JSDoc comments
6. **Test in dark mode** to ensure colors work correctly

## Troubleshooting

### Component Not Found

If `npx shadcn@latest add` doesn't work:
1. Ensure you're in the `client` directory
2. Check if component exists in the registry: https://ui.shadcn.com/registry
3. Manually create the component following existing patterns

### Style Issues

1. **Classes not applying**: Check Tailwind config and class names
2. **Theme colors not working**: Ensure ThemeProvider is wrapping the app
3. **Dark mode issues**: Check that `.dark` class is applied to `<html>`

### TypeScript Errors

1. Ensure TypeScript is properly configured
2. Check import paths use aliases (`@/components/ui/button`)
3. Verify type definitions are imported correctly

# General Development Rules

## Code Quality

1. **TypeScript**: Always use TypeScript. No `.js` or `.jsx` files.
2. **ESLint**: Run `npm run lint` before commits. Fix all warnings.
3. **Prettier**: Run `npm run format` for consistent formatting.
4. **No console.log**: Use proper logging or remove before commits.

## Import Order

```typescript
// 1. React imports
import React from 'react'

// 2. External library imports
import { useNavigate } from 'react-router-dom'

// 3. Internal imports (use aliases)
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 4. Local imports
import { MyComponent } from './my-component'
```

## Component Structure

1. **Props**: Use TypeScript interfaces or types
2. **Memo**: Use `React.memo` for performance-critical components
3. **Forward refs**: Use when components need ref access
4. **Display names**: Set `displayName` for debugging

```tsx
interface MyComponentProps {
  className?: string
  children?: React.ReactNode
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, children }, ref) => {
    return <div ref={ref} className={cn(className)}>{children}</div>
  }
)

MyComponent.displayName = 'MyComponent'

export { MyComponent }
```

## File Naming

- Components: `kebab-case.tsx` (e.g., `my-component.tsx`)
- Pages: `kebab-case.tsx` or folder with `page.tsx`
- Utilities: `kebab-case.ts`
- Types: `kebab-case.ts` or `types.ts`
- Constants: `UPPER_SNAKE_CASE.ts` or `constants.ts`

## Testing

- Currently no testing framework configured
- For new features, consider adding Vitest or Jest
- Test files: `*.test.ts` or `*.spec.ts`
- Place in `__tests__` folders or alongside source files

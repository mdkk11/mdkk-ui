# Sidebar Usage

This guide documents the recommended Sidebar composition pattern.

## Recommended Composition (Provider-first)

```tsx
import { Sidebar } from 'mdkk-ui';

function Page() {
  return (
    <Sidebar.Provider defaultWidth={280} minWidth={220}>
      <Sidebar.Root>
        <Sidebar.Panel>
          <Sidebar.Header />
          <Sidebar.Content />
          <Sidebar.Footer />
          <Sidebar.ResizeHandle />
        </Sidebar.Panel>

        <main>...</main>
      </Sidebar.Root>

      <Sidebar.Trigger>toggle</Sidebar.Trigger>
    </Sidebar.Provider>
  );
}
```

## Why Provider-first

- Shared sidebar state is owned at a layout boundary.
- `Sidebar.Trigger` can be rendered outside `Sidebar.Root`.
- Works well with app-shell style architecture.

## Public APIs

### `Sidebar.Provider`

State-related props:

- `isCollapsed?`
- `defaultIsCollapsed?`
- `onCollapsedChange?`
- `defaultWidth?`
- `collapsedWidth?`
- `minWidth?`
- `maxWidth?`
- `isResizable?`
- `onWidthChange?`
- `mobileBreakpoint?`
- `defaultMobileOpen?`
- `onMobileOpenChange?`

### `Sidebar.Root`

Structure-related props:

- `side?: 'left' | 'right'`
- `className?`
- `style?`

### `Sidebar.Trigger`

- Accepts arbitrary children (`ReactNode`)
- Supports `onPress?`
- Toggles collapsed/mobile-open state

### `Sidebar.Panel`

- `tone?: 'subtle' | 'solid'`

### `useSidebar`

Use inside `Sidebar.Provider` subtree:

- `isCollapsed`
- `isMobile`
- `isMobileOpen`
- `toggle()`
- width controls

## Notes

- Mobile behavior includes backdrop + escape close.
- Resize handle is hidden on mobile.
- For global header trigger, keep it under the same `Sidebar.Provider`.

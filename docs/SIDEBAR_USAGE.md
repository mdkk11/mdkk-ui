# Sidebar Component Guide

This document explains how to use the `Sidebar` component set in this design system.

## Goals

- Provide an extensible navigation shell similar to modern app sidebars.
- Keep API ergonomic via Compound Components.
- Keep implementation details encapsulated behind Public API.

## Basic Usage

```tsx
import { Sidebar } from '@/components/Sidebar';

export function Page() {
  return (
    <Sidebar.Root defaultWidth={280}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <h2>Workspace</h2>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Nav>
            <Sidebar.List>
              <Sidebar.Item>
                <Sidebar.ItemButton isActive>Home</Sidebar.ItemButton>
              </Sidebar.Item>
              <Sidebar.Item>
                <Sidebar.ItemButton>Settings</Sidebar.ItemButton>
              </Sidebar.Item>
            </Sidebar.List>
          </Sidebar.Nav>
        </Sidebar.Content>
        <Sidebar.ResizeHandle />
      </Sidebar.Panel>

      <main>
        <Sidebar.Trigger />
      </main>
    </Sidebar.Root>
  );
}
```

## Public API

### `Sidebar.Root`

- `isCollapsed?: boolean`
- `defaultIsCollapsed?: boolean`
- `onCollapsedChange?: (isCollapsed: boolean) => void`
- `defaultWidth?: number`
- `collapsedWidth?: number`
- `minWidth?: number`
- `maxWidth?: number`
- `isResizable?: boolean`
- `onWidthChange?: (width: number) => void`
- `mobileBreakpoint?: number`
- `defaultMobileOpen?: boolean`
- `onMobileOpenChange?: (isOpen: boolean) => void`

### `Sidebar.Panel`

- `tone?: 'subtle' | 'solid'`
- Renders the actual `<aside>` container.

### `Sidebar.Trigger`

- `onPress?: () => void`
- Toggles collapse state.
- Accepts arbitrary children (`ReactNode`), for example icons or custom labels.

### `useSidebar`

- Read sidebar state inside `Sidebar.Root` subtree.
- Useful when trigger label/icon needs to react to state (`isCollapsed`, `isMobileOpen`).

Example:

```tsx
import { Sidebar, SidebarTrigger, useSidebar } from '@/components/Sidebar';

const SidebarToggleButton = () => {
  const { isCollapsed, isMobile, isMobileOpen } = useSidebar();
  const label = isMobile
    ? isMobileOpen
      ? 'とじる'
      : 'ひらく'
    : isCollapsed
      ? 'ひらく'
      : 'とじる';

  return <SidebarTrigger>{label}</SidebarTrigger>;
};
```

### `Sidebar.ResizeHandle`

- Displays the drag handle and updates width internally.

### `Sidebar.Nav` / `Sidebar.List` / `Sidebar.Item` / `Sidebar.ItemButton`

- Navigation primitives for list-based sidebars.
- `Sidebar.ItemButton` supports:
  - `isActive?: boolean`
  - `onPress?: () => void`

## Migration from `Navigation`

- `Navigation` remains as a compatibility wrapper.
- New implementations should use `Sidebar` directly.

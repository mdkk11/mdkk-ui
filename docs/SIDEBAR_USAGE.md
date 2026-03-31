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

### `Sidebar.Panel`

- `tone?: 'subtle' | 'solid'`
- Renders the actual `<aside>` container.

### `Sidebar.Trigger`

- `onPress?: () => void`
- Toggles collapse state.

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

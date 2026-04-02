# Component Catalog

This catalog lists the currently exported component surface from `src/index.ts`.

## Core Inputs

- `Button`
- `Input`
- `TextArea`
- `TextField`
- `Checkbox`
- `CheckboxGroup`
- `Label`
- `FieldError`

## Layout and Surfaces

- `Card`
- `AspectRatio`
- `Sidebar` (compound)

## Feedback and Display

- `Badge`
- `ProgressCircle`
- `Text`

## Story-like Media

- `Story` (compound)
- `StoryList`

## Sidebar API Highlights

`Sidebar` exports a compound namespace and compatibility named exports.
Preferred usage:

- `Sidebar.Provider`
- `Sidebar.Root`
- `Sidebar.Panel`, `Sidebar.Header`, `Sidebar.Content`, `Sidebar.Footer`
- `Sidebar.Trigger`, `Sidebar.ResizeHandle`
- `Sidebar.Nav`, `Sidebar.List`, `Sidebar.Item`, `Sidebar.ItemButton`
- `Sidebar.Group`, `Sidebar.GroupLabel`, `Sidebar.GroupContent`
- `Sidebar.useSidebar`

See `docs/SIDEBAR_USAGE.md` for details.

## Tailwind Integration

- `mdkkPlugin` is exported from `mdkk-ui/tailwind-plugin`.

## Planned Candidates (not yet in export surface)

Commonly needed for application-scale use:

- `Dialog`
- `Toast`
- `Tabs`
- `Select` / `Combobox`
- `DropdownMenu`
- `Table`
- `Pagination`
- `Skeleton`

# Component Catalog

This catalog lists the currently exported component surface from `src/index.ts`.

## Core Inputs

- `Button`
- `Input`
- `TextArea`
- `TextField`
- `Checkbox`
- `CheckboxGroup`
- `Select` (compound)
- `Combobox` (compound)
- `Label`
- `FieldError`

## Layout and Surfaces

- `Card`
- `AspectRatio`
- `Sidebar` (compound)
- `Dialog` (compound)
- `Drawer` (compound)
- `Tabs` (compound)

## Feedback and Display

- `Badge`
- `Icon`
- `ProgressCircle`
- `Text`
- `DropdownMenu` (compound)
- `Tooltip` (compound)
- `Toast` (`ToastProvider`, `Toast.useToast`)
- `Skeleton`

## Story-like Media

- `Story` (compound)
- `StoryList`

## Implementation Base

`react-aria-components` backed primitives:

- `Button`
- `Checkbox`
- `Combobox`
- `Dialog`
- `Drawer`
- `DropdownMenu`
- `FieldError`
- `Input`
- `Label`
- `ProgressCircle`
- `Select`
- `Tabs`
- `Text`
- `TextArea`
- `TextField`
- `Toast`
- `Tooltip`

Custom DOM-backed primitives:

- `AspectRatio`
- `Badge`
- `Card`
- `Icon`
- `Sidebar`
- `Skeleton`

Architecture exception (not full 3-tier split yet):

- `Story`

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

`Sidebar.Provider` / `Sidebar.Root` accept mobile behavior props such as
`mobileDetection` and `isMobileAutoCloseOnItemPress`.

## Tailwind Integration

- `mdkkPlugin` is exported from `mdkk-ui/tailwind-plugin`.
- For app-side state variants (`pressed:`, `focused:`, etc.), install and enable `tailwindcss-react-aria-components`.

# Component Public API Standards

To ensure the long-term maintainability and consistency of the UI library, all components must adhere to these Public API standards.
These rules exist to prevent implementation details (like `react-aria-components`) from leaking into the consumer's code and to ensure a unified developer experience.

## 1. The Golden Rule: Encapsulation

**❌ NEVER** extend or re-export types from the underlying library directly in the Public API.

```tsx
// ❌ BAD: Leaks react-aria internals. Changing the library later breaks the API.
import { TextFieldProps as RACTextFieldProps } from 'react-aria-components';
export interface TextFieldProps extends RACTextFieldProps {}
```

**✅ GOOD**: Explicitly define the interface. This is your contract with the user.

```tsx
// ✅ GOOD: You own this interface.
export interface TextFieldProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
}
```

## 2. Categorization of Public Props

When designing a component, categorize props into these four buckets. If a prop doesn't fit, think twice before exposing it.

### A. Core Data & Content
Things the component *displays*.
- `children`: (ReactNode)
- `label`: (string) - For form controls.
- `description`: (string) - Helper text.
- `errorMessage`: (string) - Validation feedback.

### B. State (Booleans)
Use the `isXxxx` naming convention (Booleans should ask a question).
- **✅ Supported**:
  - `isDisabled` (not `disabled`)
  - `isSelected` (not `selected` or `checked`)
  - `isLoading` / `isPending`
  - `isReadOnly`
  - `isInvalid` (often derived from `errorMessage`, but explicit prop is allowed)
  - `isOpen` (for overlays)

### C. Events (Simplified)
Abstract away raw DOM events when possible.
- **✅ Value Change**: `onChange?: (value: T) => void`
  - Prefer passing the *value* directly, not the `ChangeEvent`.
- **✅ Actions**: `onPress?: () => void` (or `onPress?: (e: PressEvent) => void` if precise coords needed)
- **❌ Avoid**: `onMouseDown`, `onTouchStart` (unless building a low-level primitive)

### D. HTML Attributes (Whitelist)
Do not blind-spread `React.HTMLAttributes<HTMLDivElement>`. Explicitly pick what makes sense for the component.
- **Commonly Safe**: `id`, `className`, `style`, `role`, `tabIndex`.
- **For Inputs**: `name`, `type`, `placeholder`, `autoFocus`, `autoComplete`, `maxLength`.

## 3. Styling Hooks
- exposing `className` is required for layout composition.
- exposing `style` is acceptable for dynamic values (coordinates, colors).
- `variant`, `size`, `tone` should be used for design system variations.

## 4. Ref Forwarding
Always forward refs to the most meaningful underlying DOM element.
- `Button` -> `<button>`
- `TextField` -> `<input>`
- `Card` -> `<div>`

## Checklist for New Components
Before calling a component "Done", verify:
1. [ ] Is strict `interface` defined without `extends LibraryProps`?
2. [ ] Are all boolean states named `isXxxx`?
3. [ ] Is `onChange` simplified (if applicable)?
4. [ ] Are internal sub-components (like `Input`, `Label` wrappers) hidden from the export?

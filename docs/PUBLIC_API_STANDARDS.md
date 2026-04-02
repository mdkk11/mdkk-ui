# Public API Standards

This document defines how component APIs should be designed in `mdkk-ui`.

## 1. API Ownership

Public API is a product contract.
Do not expose dependency-internal prop models as-is.

Bad:

```tsx
import { TextFieldProps as RACTextFieldProps } from 'react-aria-components';
export interface TextFieldProps extends RACTextFieldProps {}
```

Preferred:

```tsx
export interface TextFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
}
```

## 2. Prop Naming Conventions

### Boolean State

Use `isXxx` naming.

- `isDisabled`
- `isInvalid`
- `isSelected`
- `isOpen`
- `isPending`

### Events

Prefer intent-level events over low-level DOM events.

- `onChange(value)`
- `onPress(event?)`

Avoid exposing low-level handlers unless the component is explicitly low-level.

### Variants

Use controlled design intent props:

- `variant`
- `size`
- `tone`

## 3. Styling Hooks

- `className`: should generally be available for composition.
- `style`: allow only when dynamic runtime style is necessary.
- Avoid uncontrolled style-prop proliferation.

## 4. Ref Forwarding

Forward refs to the most meaningful DOM target.

Examples:

- `Button` -> button element
- `TextField.Input` -> input element
- `Card` -> root div

## 5. Compound Component Rules

For complex structures (`Sidebar`, `Story`, future `Tabs`):

- provide namespaced slots
- keep shared state/context internal
- keep slot API declarative

Example:

```tsx
<Sidebar.Provider>
  <Sidebar.Root>
    <Sidebar.Panel>
      <Sidebar.Header />
      <Sidebar.Content />
      <Sidebar.Footer />
    </Sidebar.Panel>
  </Sidebar.Root>
</Sidebar.Provider>
```

Decision rule:

- choose compound namespace when slots share internal state or strict structural semantics
- choose flat exports when slots are mostly visual and independent

`Card` guidance:

- `Card`, `CardHeader`, `CardContent`, `CardFooter` as flat exports is valid
- forcing `Card.Provider/Card.Root` adds complexity with little benefit unless state orchestration appears later

## 6. Backward Compatibility

If a breaking change is unavoidable:

1. add migration notes
2. provide compatibility exports when possible
3. defer removal to a major version

## 7. New Component Checklist

- [ ] Public interface is explicitly defined
- [ ] No direct `extends` from dependency-heavy prop types in Public layer
- [ ] Boolean props use `isXxx`
- [ ] Events are intent-level
- [ ] `variant/size/tone` model is coherent
- [ ] Storybook examples and tests are added where behavior risk exists

import * as React from 'react';
import {
  ComboboxDescriptionAdapter,
  ComboboxErrorAdapter,
  ComboboxFieldAdapter,
  ComboboxInputAdapter,
  ComboboxItemAdapter,
  ComboboxLabelAdapter,
  ComboboxListAdapter,
  ComboboxPopoverAdapter,
  ComboboxRootAdapter,
  ComboboxTriggerAdapter,
} from './ComboboxAdapter';

type CollectionRenderer = (item: unknown) => React.ReactNode;
type CollectionChildren = React.ReactNode | CollectionRenderer;
type ComboboxKey = string | number;

export interface ComboboxRootProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  selectedKey?: ComboboxKey | null;
  defaultSelectedKey?: ComboboxKey;
  onSelectionChange?: (key: ComboboxKey | null) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
  items?: Iterable<unknown>;
  defaultItems?: Iterable<unknown>;
  validationBehavior?: 'aria' | 'native';
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

export interface ComboboxLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_labelProps?: Record<string, unknown>;
}

export interface ComboboxFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

type ComboboxInputDOMProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'defaultValue' | 'disabled' | 'onChange' | 'readOnly' | 'value'
>;

export interface ComboboxInputProps extends ComboboxInputDOMProps {
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  isReadOnly?: boolean;
  /**
   * @deprecated Use `isReadOnly` instead.
   */
  readOnly?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_inputProps?: Record<string, unknown>;
}

export interface ComboboxTriggerProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'className'
  > {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_triggerProps?: Record<string, unknown>;
}

export interface ComboboxPopoverProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_popoverProps?: Record<string, unknown>;
}

export interface ComboboxListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: CollectionChildren;
  className?: string;
  items?: Iterable<unknown>;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_listProps?: Record<string, unknown>;
}

export interface ComboboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  children?: React.ReactNode;
  className?: string;
  id?: ComboboxKey;
  textValue?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_itemProps?: Record<string, unknown>;
}

export interface ComboboxDescriptionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_descriptionProps?: Record<string, unknown>;
}

export interface ComboboxErrorProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_errorProps?: Record<string, unknown>;
}

const ComboboxRoot = React.forwardRef<HTMLDivElement, ComboboxRootProps>(
  ({ UNSAFE_rootProps, ...props }, ref) => (
    <ComboboxRootAdapter
      {...UNSAFE_rootProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
ComboboxRoot.displayName = 'Combobox.Root';

const ComboboxLabel = React.forwardRef<HTMLLabelElement, ComboboxLabelProps>(
  ({ UNSAFE_labelProps, ...props }, ref) => (
    <ComboboxLabelAdapter
      {...UNSAFE_labelProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
ComboboxLabel.displayName = 'Combobox.Label';

const ComboboxField = React.forwardRef<HTMLDivElement, ComboboxFieldProps>(
  (props, ref) => <ComboboxFieldAdapter {...props} ref={ref} />,
);
ComboboxField.displayName = 'Combobox.Field';

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  (
    { isDisabled, disabled, isReadOnly, readOnly, UNSAFE_inputProps, ...props },
    ref,
  ) => (
    <ComboboxInputAdapter
      {...UNSAFE_inputProps}
      {...(props as Record<string, unknown>)}
      disabled={isDisabled ?? disabled}
      readOnly={isReadOnly ?? readOnly}
      ref={ref}
    />
  ),
);
ComboboxInput.displayName = 'Combobox.Input';

const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(({ isDisabled, disabled, UNSAFE_triggerProps, ...props }, ref) => (
  <ComboboxTriggerAdapter
    {...UNSAFE_triggerProps}
    {...(props as Record<string, unknown>)}
    isDisabled={isDisabled ?? disabled}
    ref={ref}
  />
));
ComboboxTrigger.displayName = 'Combobox.Trigger';

const ComboboxPopover = React.forwardRef<HTMLElement, ComboboxPopoverProps>(
  ({ UNSAFE_popoverProps, ...props }, ref) => (
    <ComboboxPopoverAdapter
      {...UNSAFE_popoverProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
ComboboxPopover.displayName = 'Combobox.Popover';

const ComboboxList = React.forwardRef<HTMLDivElement, ComboboxListProps>(
  ({ UNSAFE_listProps, ...props }, ref) => (
    <ComboboxListAdapter
      {...UNSAFE_listProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
ComboboxList.displayName = 'Combobox.List';

const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ UNSAFE_itemProps, ...props }, ref) => (
    <ComboboxItemAdapter
      {...UNSAFE_itemProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
ComboboxItem.displayName = 'Combobox.Item';

const ComboboxDescription = React.forwardRef<
  HTMLElement,
  ComboboxDescriptionProps
>(({ UNSAFE_descriptionProps, ...props }, ref) => (
  <ComboboxDescriptionAdapter
    {...UNSAFE_descriptionProps}
    {...(props as Record<string, unknown>)}
    ref={ref}
  />
));
ComboboxDescription.displayName = 'Combobox.Description';

const ComboboxError = React.forwardRef<HTMLElement, ComboboxErrorProps>(
  ({ UNSAFE_errorProps, ...props }, ref) => (
    <ComboboxErrorAdapter
      {...UNSAFE_errorProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
ComboboxError.displayName = 'Combobox.Error';

export const Combobox = {
  Root: ComboboxRoot,
  Label: ComboboxLabel,
  Field: ComboboxField,
  Input: ComboboxInput,
  Trigger: ComboboxTrigger,
  Popover: ComboboxPopover,
  List: ComboboxList,
  Item: ComboboxItem,
  Description: ComboboxDescription,
  Error: ComboboxError,
};

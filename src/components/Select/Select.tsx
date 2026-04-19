import * as React from 'react';
import {
  SelectDescriptionAdapter,
  SelectErrorAdapter,
  SelectItemAdapter,
  SelectLabelAdapter,
  SelectListAdapter,
  SelectPopoverAdapter,
  SelectRootAdapter,
  SelectTriggerAdapter,
  SelectValueAdapter,
} from './SelectAdapter';

type CollectionRenderer = (item: unknown) => React.ReactNode;
type CollectionChildren = React.ReactNode | CollectionRenderer;
type SelectKey = string | number;

export interface SelectRootProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  selectedKey?: SelectKey | null;
  defaultSelectedKey?: SelectKey;
  onSelectionChange?: (key: SelectKey | null) => void;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  validationBehavior?: 'aria' | 'native';
  items?: Iterable<unknown>;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

export interface SelectLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_labelProps?: Record<string, unknown>;
}

export interface SelectTriggerProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'className'
  > {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  isDisabled?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_triggerProps?: Record<string, unknown>;
}

export interface SelectValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_valueProps?: Record<string, unknown>;
}

export interface SelectPopoverProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_popoverProps?: Record<string, unknown>;
}

export interface SelectListProps
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

export interface SelectItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  children?: React.ReactNode;
  className?: string;
  id?: SelectKey;
  textValue?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_itemProps?: Record<string, unknown>;
}

export interface SelectDescriptionProps
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_descriptionProps?: Record<string, unknown>;
}

export interface SelectErrorProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_errorProps?: Record<string, unknown>;
}

const SelectRoot = React.forwardRef<HTMLDivElement, SelectRootProps>(
  ({ UNSAFE_rootProps, ...props }, ref) => (
    <SelectRootAdapter
      {...UNSAFE_rootProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
SelectRoot.displayName = 'Select.Root';

const SelectLabel = React.forwardRef<HTMLLabelElement, SelectLabelProps>(
  ({ UNSAFE_labelProps, ...props }, ref) => (
    <SelectLabelAdapter {...UNSAFE_labelProps} {...props} ref={ref} />
  ),
);
SelectLabel.displayName = 'Select.Label';

const SelectTriggerIndicator = () => (
  <svg
    data-slot='select-indicator'
    viewBox='0 0 24 24'
    width='16'
    height='16'
    aria-hidden='true'
    className='shrink-0 text-muted-foreground transition-transform duration-150 ease-out group-aria-[expanded=true]:rotate-180'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='m6 9 6 6 6-6' />
  </svg>
);

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, isDisabled, disabled, UNSAFE_triggerProps, ...props }, ref) => (
    <SelectTriggerAdapter
      {...UNSAFE_triggerProps}
      {...(props as Record<string, unknown>)}
      isDisabled={isDisabled ?? disabled}
      ref={ref}
    >
      {children ?? (
        <>
          <SelectValueAdapter />
          <SelectTriggerIndicator />
        </>
      )}
    </SelectTriggerAdapter>
  ),
);
SelectTrigger.displayName = 'Select.Trigger';

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ UNSAFE_valueProps, ...props }, ref) => (
    <SelectValueAdapter
      {...UNSAFE_valueProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
SelectValue.displayName = 'Select.Value';

const SelectPopover = React.forwardRef<HTMLElement, SelectPopoverProps>(
  ({ UNSAFE_popoverProps, ...props }, ref) => (
    <SelectPopoverAdapter
      {...UNSAFE_popoverProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
SelectPopover.displayName = 'Select.Popover';

const SelectList = React.forwardRef<HTMLDivElement, SelectListProps>(
  ({ UNSAFE_listProps, ...props }, ref) => (
    <SelectListAdapter
      {...UNSAFE_listProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
SelectList.displayName = 'Select.List';

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ UNSAFE_itemProps, ...props }, ref) => (
    <SelectItemAdapter
      {...UNSAFE_itemProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
SelectItem.displayName = 'Select.Item';

const SelectDescription = React.forwardRef<HTMLElement, SelectDescriptionProps>(
  ({ UNSAFE_descriptionProps, ...props }, ref) => (
    <SelectDescriptionAdapter
      {...UNSAFE_descriptionProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
SelectDescription.displayName = 'Select.Description';

const SelectError = React.forwardRef<HTMLElement, SelectErrorProps>(
  ({ UNSAFE_errorProps, ...props }, ref) => (
    <SelectErrorAdapter
      {...UNSAFE_errorProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
SelectError.displayName = 'Select.Error';

export const Select = {
  Root: SelectRoot,
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Popover: SelectPopover,
  List: SelectList,
  Item: SelectItem,
  Description: SelectDescription,
  Error: SelectError,
};

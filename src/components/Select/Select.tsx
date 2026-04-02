import * as React from 'react';
import {
  SelectDescriptionAdapter,
  type SelectDescriptionAdapterProps,
  SelectErrorAdapter,
  type SelectErrorAdapterProps,
  SelectItemAdapter,
  type SelectItemAdapterProps,
  SelectLabelAdapter,
  type SelectLabelAdapterProps,
  SelectListAdapter,
  type SelectListAdapterProps,
  SelectPopoverAdapter,
  type SelectPopoverAdapterProps,
  SelectRootAdapter,
  type SelectRootAdapterProps,
  SelectTriggerAdapter,
  type SelectTriggerAdapterProps,
  SelectValueAdapter,
  type SelectValueAdapterProps,
} from './SelectAdapter';

export interface SelectRootProps extends SelectRootAdapterProps {}
export interface SelectLabelProps extends SelectLabelAdapterProps {}
export interface SelectTriggerProps extends SelectTriggerAdapterProps {}
export interface SelectValueProps extends SelectValueAdapterProps {}
export interface SelectPopoverProps extends SelectPopoverAdapterProps {}
export interface SelectListProps extends SelectListAdapterProps {}
export interface SelectItemProps extends SelectItemAdapterProps {}
export interface SelectDescriptionProps extends SelectDescriptionAdapterProps {}
export interface SelectErrorProps extends SelectErrorAdapterProps {}

const SelectRoot = React.forwardRef<HTMLDivElement, SelectRootProps>(
  (props, ref) => <SelectRootAdapter {...props} ref={ref} />,
);
SelectRoot.displayName = 'Select.Root';

const SelectLabel = React.forwardRef<HTMLLabelElement, SelectLabelProps>(
  (props, ref) => <SelectLabelAdapter {...props} ref={ref} />,
);
SelectLabel.displayName = 'Select.Label';

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (props, ref) => <SelectTriggerAdapter {...props} ref={ref} />,
);
SelectTrigger.displayName = 'Select.Trigger';

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  (props, ref) => <SelectValueAdapter {...props} ref={ref} />,
);
SelectValue.displayName = 'Select.Value';

const SelectPopover = React.forwardRef<HTMLElement, SelectPopoverProps>(
  (props, ref) => <SelectPopoverAdapter {...props} ref={ref} />,
);
SelectPopover.displayName = 'Select.Popover';

const SelectList = React.forwardRef<HTMLDivElement, SelectListProps>(
  (props, ref) => <SelectListAdapter {...props} ref={ref} />,
);
SelectList.displayName = 'Select.List';

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  (props, ref) => <SelectItemAdapter {...props} ref={ref} />,
);
SelectItem.displayName = 'Select.Item';

const SelectDescription = React.forwardRef<HTMLElement, SelectDescriptionProps>(
  (props, ref) => <SelectDescriptionAdapter {...props} ref={ref} />,
);
SelectDescription.displayName = 'Select.Description';

const SelectError = React.forwardRef<HTMLElement, SelectErrorProps>(
  (props, ref) => <SelectErrorAdapter {...props} ref={ref} />,
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

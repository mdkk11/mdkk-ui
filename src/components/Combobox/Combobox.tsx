import * as React from 'react';
import {
  ComboboxDescriptionAdapter,
  type ComboboxDescriptionAdapterProps,
  ComboboxErrorAdapter,
  type ComboboxErrorAdapterProps,
  ComboboxFieldAdapter,
  type ComboboxFieldAdapterProps,
  ComboboxInputAdapter,
  type ComboboxInputAdapterProps,
  ComboboxItemAdapter,
  type ComboboxItemAdapterProps,
  ComboboxLabelAdapter,
  type ComboboxLabelAdapterProps,
  ComboboxListAdapter,
  type ComboboxListAdapterProps,
  ComboboxPopoverAdapter,
  type ComboboxPopoverAdapterProps,
  ComboboxRootAdapter,
  type ComboboxRootAdapterProps,
  ComboboxTriggerAdapter,
  type ComboboxTriggerAdapterProps,
} from './ComboboxAdapter';

export interface ComboboxRootProps extends ComboboxRootAdapterProps {}
export interface ComboboxLabelProps extends ComboboxLabelAdapterProps {}
export interface ComboboxFieldProps extends ComboboxFieldAdapterProps {}
export interface ComboboxInputProps extends ComboboxInputAdapterProps {}
export interface ComboboxTriggerProps extends ComboboxTriggerAdapterProps {}
export interface ComboboxPopoverProps extends ComboboxPopoverAdapterProps {}
export interface ComboboxListProps extends ComboboxListAdapterProps {}
export interface ComboboxItemProps extends ComboboxItemAdapterProps {}
export interface ComboboxDescriptionProps
  extends ComboboxDescriptionAdapterProps {}
export interface ComboboxErrorProps extends ComboboxErrorAdapterProps {}

const ComboboxRoot = React.forwardRef<HTMLDivElement, ComboboxRootProps>(
  (props, ref) => <ComboboxRootAdapter {...props} ref={ref} />,
);
ComboboxRoot.displayName = 'Combobox.Root';

const ComboboxLabel = React.forwardRef<HTMLLabelElement, ComboboxLabelProps>(
  (props, ref) => <ComboboxLabelAdapter {...props} ref={ref} />,
);
ComboboxLabel.displayName = 'Combobox.Label';

const ComboboxField = React.forwardRef<HTMLDivElement, ComboboxFieldProps>(
  (props, ref) => <ComboboxFieldAdapter {...props} ref={ref} />,
);
ComboboxField.displayName = 'Combobox.Field';

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  (props, ref) => <ComboboxInputAdapter {...props} ref={ref} />,
);
ComboboxInput.displayName = 'Combobox.Input';

const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>((props, ref) => <ComboboxTriggerAdapter {...props} ref={ref} />);
ComboboxTrigger.displayName = 'Combobox.Trigger';

const ComboboxPopover = React.forwardRef<HTMLElement, ComboboxPopoverProps>(
  (props, ref) => <ComboboxPopoverAdapter {...props} ref={ref} />,
);
ComboboxPopover.displayName = 'Combobox.Popover';

const ComboboxList = React.forwardRef<HTMLDivElement, ComboboxListProps>(
  (props, ref) => <ComboboxListAdapter {...props} ref={ref} />,
);
ComboboxList.displayName = 'Combobox.List';

const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  (props, ref) => <ComboboxItemAdapter {...props} ref={ref} />,
);
ComboboxItem.displayName = 'Combobox.Item';

const ComboboxDescription = React.forwardRef<
  HTMLElement,
  ComboboxDescriptionProps
>((props, ref) => <ComboboxDescriptionAdapter {...props} ref={ref} />);
ComboboxDescription.displayName = 'Combobox.Description';

const ComboboxError = React.forwardRef<HTMLElement, ComboboxErrorProps>(
  (props, ref) => <ComboboxErrorAdapter {...props} ref={ref} />,
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

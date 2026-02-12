import React from 'react';
import type { FieldErrorAdapterProps } from '../FieldError/FieldErrorAdapter';
import type { LabelAdapterProps } from '../Label/LabelAdapter';
import type { TextAdapterProps } from '../Text/TextAdapter';
import {
  CheckboxGroupDescriptionAdapter,
  CheckboxGroupErrorAdapter,
  CheckboxGroupLabelAdapter,
  CheckboxGroupRootAdapter,
  type CheckboxGroupRootAdapterProps,
} from './CheckboxGroupAdapter';

export interface CheckboxGroupRootProps
  extends Omit<
    CheckboxGroupRootAdapterProps,
    'className' | 'style' | 'children'
  > {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  onChange?: (value: string[]) => void;
  name?: string;
  value?: string[];
  defaultValue?: string[];
}

export type CheckboxGroupLabelProps = LabelAdapterProps;
export type CheckboxGroupDescriptionProps = TextAdapterProps;
export type CheckboxGroupErrorProps = FieldErrorAdapterProps;

// --- Component Exports ---

const CheckboxGroupRoot = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupRootProps
>((props, ref) => <CheckboxGroupRootAdapter {...props} ref={ref} />);
CheckboxGroupRoot.displayName = 'CheckboxGroup.Root';

const CheckboxGroupLabel = React.forwardRef<
  HTMLLabelElement,
  CheckboxGroupLabelProps
>((props, ref) => <CheckboxGroupLabelAdapter {...props} ref={ref} />);
CheckboxGroupLabel.displayName = 'CheckboxGroup.Label';

const CheckboxGroupDescription = (props: CheckboxGroupDescriptionProps) => (
  <CheckboxGroupDescriptionAdapter {...props} />
);
CheckboxGroupDescription.displayName = 'CheckboxGroup.Description';

const CheckboxGroupError = React.forwardRef<
  HTMLParagraphElement,
  CheckboxGroupErrorProps
>((props, ref) => <CheckboxGroupErrorAdapter {...props} ref={ref} />);
CheckboxGroupError.displayName = 'CheckboxGroup.Error';

export const CheckboxGroup = {
  Root: CheckboxGroupRoot,
  Label: CheckboxGroupLabel,
  Description: CheckboxGroupDescription,
  Error: CheckboxGroupError,
};

import React from 'react';
import type { FieldErrorProps } from '../FieldError';
import type { LabelProps } from '../Label';
import type { TextProps } from '../Text';
import {
  CheckboxGroupDescriptionAdapter,
  CheckboxGroupErrorAdapter,
  CheckboxGroupLabelAdapter,
  CheckboxGroupRootAdapter,
} from './CheckboxGroupAdapter';

export interface CheckboxGroupRootProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'children' | 'defaultValue' | 'onChange'
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
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

export type CheckboxGroupLabelProps = Omit<LabelProps, 'UNSAFE_rootProps'> & {
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_labelProps?: Record<string, unknown>;
};

export type CheckboxGroupDescriptionProps = Omit<
  TextProps,
  'slot' | 'UNSAFE_rootProps'
> & {
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_descriptionProps?: Record<string, unknown>;
};

export type CheckboxGroupErrorProps = Omit<
  FieldErrorProps,
  'UNSAFE_rootProps'
> & {
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_errorProps?: Record<string, unknown>;
};

// --- Component Exports ---

const CheckboxGroupRoot = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupRootProps
>(({ UNSAFE_rootProps, ...props }, ref) => (
  <CheckboxGroupRootAdapter
    {...UNSAFE_rootProps}
    {...(props as Record<string, unknown>)}
    ref={ref}
  />
));
CheckboxGroupRoot.displayName = 'CheckboxGroup.Root';

const CheckboxGroupLabel = React.forwardRef<
  HTMLLabelElement,
  CheckboxGroupLabelProps
>(({ UNSAFE_labelProps, ...props }, ref) => (
  <CheckboxGroupLabelAdapter
    {...UNSAFE_labelProps}
    {...(props as Record<string, unknown>)}
    ref={ref}
  />
));
CheckboxGroupLabel.displayName = 'CheckboxGroup.Label';

const CheckboxGroupDescription = ({
  UNSAFE_descriptionProps,
  ...props
}: CheckboxGroupDescriptionProps) => (
  <CheckboxGroupDescriptionAdapter
    {...UNSAFE_descriptionProps}
    {...(props as Record<string, unknown>)}
  />
);
CheckboxGroupDescription.displayName = 'CheckboxGroup.Description';

const CheckboxGroupError = React.forwardRef<
  HTMLParagraphElement,
  CheckboxGroupErrorProps
>(({ UNSAFE_errorProps, ...props }, ref) => (
  <CheckboxGroupErrorAdapter
    {...UNSAFE_errorProps}
    {...(props as Record<string, unknown>)}
    ref={ref}
  />
));
CheckboxGroupError.displayName = 'CheckboxGroup.Error';

export const CheckboxGroup = {
  Root: CheckboxGroupRoot,
  Label: CheckboxGroupLabel,
  Description: CheckboxGroupDescription,
  Error: CheckboxGroupError,
};

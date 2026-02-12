import { cva } from 'cva';
import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import { FieldErrorAdapter } from '../FieldError/FieldErrorAdapter';
import { LabelAdapter } from '../Label/LabelAdapter';
import { TextAdapter } from '../Text/TextAdapter';
import {
  CheckboxGroupPrimitive,
  type CheckboxGroupPrimitiveProps,
} from './CheckboxGroupPrimitive';

const containerStyles = cva({
  base: 'flex flex-col gap-1.5 w-full',
});

export interface CheckboxGroupRootAdapterProps
  extends Omit<CheckboxGroupPrimitiveProps, 'children'> {
  className?: string;
  children?: React.ReactNode;
}

export const CheckboxGroupRootAdapter = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupRootAdapterProps
>(({ className, children, ...props }, ref) => {
  return (
    <CheckboxGroupPrimitive
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(containerStyles({ ...renderProps, className })),
      )}
      ref={ref}
    >
      {children}
    </CheckboxGroupPrimitive>
  );
});
CheckboxGroupRootAdapter.displayName = 'CheckboxGroupRootAdapter';

export const CheckboxGroupLabelAdapter = LabelAdapter;

export const CheckboxGroupDescriptionAdapter = (
  props: React.ComponentProps<typeof TextAdapter>,
) => <TextAdapter slot='description' {...props} />;
CheckboxGroupDescriptionAdapter.displayName = 'CheckboxGroupDescriptionAdapter';

export const CheckboxGroupErrorAdapter = FieldErrorAdapter;

import { cva } from 'cva';
import React from 'react';
import { composeRenderProps } from 'react-aria-components';
import { cn } from '@/design-system/utils';
import { FieldErrorAdapter } from '../FieldError/FieldErrorAdapter';
import { InputAdapter } from '../Input/InputAdapter';
import { LabelAdapter } from '../Label/LabelAdapter';
import { TextAdapter } from '../Text/TextAdapter';
import { TextFieldContext } from './TextFieldContext';
import {
  TextFieldPrimitive,
  type TextFieldPrimitiveProps,
} from './TextFieldPrimitive';

const containerStyles = cva({
  base: 'flex flex-col gap-1.5 w-full',
});

export interface TextFieldRootAdapterProps
  extends Omit<TextFieldPrimitiveProps, 'children'> {
  className?: string; // Explicitly allowed for layout
  children?: React.ReactNode;
}

export const TextFieldRootAdapter = React.forwardRef<
  HTMLInputElement,
  TextFieldRootAdapterProps
>(({ className, isInvalid, children, ...props }, ref) => {
  return (
    <TextFieldPrimitive
      {...props}
      isInvalid={isInvalid}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(containerStyles({ ...renderProps, className })),
      )}
      ref={ref}
    >
      <TextFieldContext.Provider value={Object.freeze({})}>
        {children}
      </TextFieldContext.Provider>
    </TextFieldPrimitive>
  );
});
TextFieldRootAdapter.displayName = 'TextFieldRootAdapter';

import { TextAreaInputAdapter } from '../TextArea/TextAreaAdapter';

export const TextFieldInputAdapter = InputAdapter;

export const TextFieldTextAreaAdapter = TextAreaInputAdapter;

export const TextFieldLabelAdapter = LabelAdapter;

export const TextFieldDescriptionAdapter = (
  props: React.ComponentProps<typeof TextAdapter>,
) => <TextAdapter slot='description' {...props} />;
TextFieldDescriptionAdapter.displayName = 'TextFieldDescriptionAdapter';

export const TextFieldErrorAdapter = FieldErrorAdapter;

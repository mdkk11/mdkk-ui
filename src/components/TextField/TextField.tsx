import React from 'react';
import type { FieldErrorAdapterProps } from '../FieldError/FieldErrorAdapter';
import type { InputAdapterProps } from '../Input/InputAdapter';
import type { LabelAdapterProps } from '../Label/LabelAdapter';
import type { TextAdapterProps } from '../Text/TextAdapter';
import type { TextAreaInputAdapterProps } from '../TextArea/TextAreaAdapter';
import {
  TextFieldDescriptionAdapter,
  TextFieldErrorAdapter,
  TextFieldInputAdapter,
  TextFieldLabelAdapter,
  TextFieldRootAdapter,
  type TextFieldRootAdapterProps,
  TextFieldTextAreaAdapter,
} from './TextFieldAdapter';

export interface TextFieldRootProps
  extends Omit<TextFieldRootAdapterProps, 'className' | 'style' | 'children'> {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  value?: string;
  defaultValue?: string;
}

export type TextFieldInputProps = InputAdapterProps;
export type TextFieldTextAreaProps = TextAreaInputAdapterProps;
export type TextFieldLabelProps = LabelAdapterProps;
export type TextFieldDescriptionProps = TextAdapterProps;
export type TextFieldErrorProps = FieldErrorAdapterProps;

// --- Component Exports ---

const TextFieldRoot = React.forwardRef<HTMLInputElement, TextFieldRootProps>(
  (props, ref) => <TextFieldRootAdapter {...props} ref={ref} />,
);
TextFieldRoot.displayName = 'TextField.Root';

const TextFieldInput = React.forwardRef<HTMLInputElement, TextFieldInputProps>(
  (props, ref) => <TextFieldInputAdapter {...props} ref={ref} />,
);
TextFieldInput.displayName = 'TextField.Input';

const TextFieldTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextFieldTextAreaProps
>((props, ref) => <TextFieldTextAreaAdapter {...props} ref={ref} />);
TextFieldTextArea.displayName = 'TextField.TextArea';

const TextFieldLabel = React.forwardRef<HTMLLabelElement, TextFieldLabelProps>(
  (props, ref) => <TextFieldLabelAdapter {...props} ref={ref} />,
);
TextFieldLabel.displayName = 'TextField.Label';

const TextFieldDescription = (props: TextFieldDescriptionProps) => (
  <TextFieldDescriptionAdapter {...props} />
);
TextFieldDescription.displayName = 'TextField.Description';

const TextFieldError = React.forwardRef<
  HTMLParagraphElement,
  TextFieldErrorProps
>((props, ref) => <TextFieldErrorAdapter {...props} ref={ref} />);
TextFieldError.displayName = 'TextField.Error';

export const TextField = {
  Root: TextFieldRoot,
  Label: TextFieldLabel,
  Input: TextFieldInput,
  TextArea: TextFieldTextArea,
  Description: TextFieldDescription,
  Error: TextFieldError,
};

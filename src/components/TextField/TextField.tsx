import React from 'react';
import {
  TextFieldDescriptionAdapter,
  TextFieldErrorAdapter,
  TextFieldInputAdapter,
  TextFieldLabelAdapter,
  TextFieldRootAdapter,
  TextFieldTextAreaAdapter,
} from './TextFieldAdapter';

export interface TextFieldRootProps {
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  /**
   * @deprecated Use `isReadOnly` instead.
   */
  readOnly?: boolean;
  isRequired?: boolean;
  /**
   * @deprecated Use `isRequired` instead.
   */
  required?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  value?: string;
  defaultValue?: string;
  validationBehavior?: 'aria' | 'native';
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

type TextFieldInputDOMProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'className'
  | 'defaultValue'
  | 'disabled'
  | 'onChange'
  | 'readOnly'
  | 'required'
  | 'value'
>;

export interface TextFieldInputProps extends TextFieldInputDOMProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  /**
   * @deprecated Use `isReadOnly` instead.
   */
  readOnly?: boolean;
  isRequired?: boolean;
  /**
   * @deprecated Use `isRequired` instead.
   */
  required?: boolean;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_inputProps?: Record<string, unknown>;
}

type TextFieldTextAreaDOMProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'className'
  | 'defaultValue'
  | 'disabled'
  | 'onChange'
  | 'readOnly'
  | 'required'
  | 'value'
>;

export interface TextFieldTextAreaProps extends TextFieldTextAreaDOMProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  /**
   * @deprecated Use `isDisabled` instead.
   */
  disabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  /**
   * @deprecated Use `isReadOnly` instead.
   */
  readOnly?: boolean;
  isRequired?: boolean;
  /**
   * @deprecated Use `isRequired` instead.
   */
  required?: boolean;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_textAreaProps?: Record<string, unknown>;
}

export interface TextFieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children?: React.ReactNode;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_labelProps?: Record<string, unknown>;
}

export interface TextFieldDescriptionProps
  extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_descriptionProps?: Record<string, unknown>;
}

export interface TextFieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
  /**
   * @deprecated Migration-only escape hatch for legacy react-aria props.
   * Will be removed in the next major release.
   */
  UNSAFE_errorProps?: Record<string, unknown>;
}

// --- Component Exports ---

const TextFieldRoot = React.forwardRef<HTMLInputElement, TextFieldRootProps>(
  (
    {
      isDisabled,
      disabled,
      isReadOnly,
      readOnly,
      isRequired,
      required,
      UNSAFE_rootProps,
      ...props
    },
    ref,
  ) => (
    <TextFieldRootAdapter
      {...UNSAFE_rootProps}
      {...props}
      isDisabled={isDisabled ?? disabled}
      isReadOnly={isReadOnly ?? readOnly}
      isRequired={isRequired ?? required}
      ref={ref}
    />
  ),
);
TextFieldRoot.displayName = 'TextField.Root';

const TextFieldInput = React.forwardRef<HTMLInputElement, TextFieldInputProps>(
  (
    {
      isDisabled,
      disabled,
      isReadOnly,
      readOnly,
      isRequired,
      required,
      UNSAFE_inputProps,
      ...props
    },
    ref,
  ) => (
    <TextFieldInputAdapter
      {...UNSAFE_inputProps}
      {...props}
      disabled={isDisabled ?? disabled}
      readOnly={isReadOnly ?? readOnly}
      required={isRequired ?? required}
      ref={ref}
    />
  ),
);
TextFieldInput.displayName = 'TextField.Input';

const TextFieldTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextFieldTextAreaProps
>(
  (
    {
      isDisabled,
      disabled,
      isReadOnly,
      readOnly,
      isRequired,
      required,
      UNSAFE_textAreaProps,
      ...props
    },
    ref,
  ) => (
    <TextFieldTextAreaAdapter
      {...UNSAFE_textAreaProps}
      {...props}
      disabled={isDisabled ?? disabled}
      readOnly={isReadOnly ?? readOnly}
      required={isRequired ?? required}
      ref={ref}
    />
  ),
);
TextFieldTextArea.displayName = 'TextField.TextArea';

const TextFieldLabel = React.forwardRef<HTMLLabelElement, TextFieldLabelProps>(
  ({ UNSAFE_labelProps, ...props }, ref) => (
    <TextFieldLabelAdapter {...UNSAFE_labelProps} {...props} ref={ref} />
  ),
);
TextFieldLabel.displayName = 'TextField.Label';

const TextFieldDescription = ({
  UNSAFE_descriptionProps,
  ...props
}: TextFieldDescriptionProps) => (
  <TextFieldDescriptionAdapter {...UNSAFE_descriptionProps} {...props} />
);
TextFieldDescription.displayName = 'TextField.Description';

const TextFieldError = React.forwardRef<
  HTMLParagraphElement,
  TextFieldErrorProps
>(({ UNSAFE_errorProps, ...props }, ref) => (
  <TextFieldErrorAdapter {...UNSAFE_errorProps} {...props} ref={ref} />
));
TextFieldError.displayName = 'TextField.Error';

export const TextField = {
  Root: TextFieldRoot,
  Label: TextFieldLabel,
  Input: TextFieldInput,
  TextArea: TextFieldTextArea,
  Description: TextFieldDescription,
  Error: TextFieldError,
};

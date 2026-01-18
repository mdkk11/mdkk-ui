import { cva } from 'cva';
import { composeRenderProps } from 'react-aria-components';
import {
  CheckboxPrimitive,
  type CheckboxPrimitiveProps,
} from './CheckboxPrimitive';
import { CheckIcon, MinusIcon } from './icons';

const checkboxStyles = cva({
  base: 'flex gap-2 items-center group font-medium text-sm transition relative [-webkit-tap-highlight-color:transparent] text-foreground',
  variants: {
    isDisabled: {
      false: '',
      true: 'opacity-50 cursor-not-allowed',
    },
  },
});

const boxStyles = cva({
  base: 'peer size-5 shrink-0 rounded-none border-2 border-black transition-all duration-100 flex items-center justify-center text-current',
  variants: {
    isSelected: {
      true: 'bg-primary text-primary-foreground',
    },
    isIndeterminate: {
      true: 'bg-primary text-primary-foreground',
    },
    isFocusVisible: {
      true: 'outline-2 outline-offset-2 outline-black',
    },
    isInvalid: {
      true: 'border-destructive bg-destructive/10',
    },
    isDisabled: {
      true: 'cursor-not-allowed opacity-50',
    },
  },
});

const iconStyles = 'size-4';

export const CheckboxAdapter = (props: CheckboxPrimitiveProps) => {
  return (
    <CheckboxPrimitive
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { isSelected, isIndeterminate, ...renderProps }) => (
          <>
            <div
              data-slot='checkbox'
              className={boxStyles({
                isSelected: isSelected || isIndeterminate,
                isIndeterminate,
                ...renderProps,
              })}
            >
              {isIndeterminate ? (
                <MinusIcon aria-hidden className={iconStyles} />
              ) : isSelected ? (
                <CheckIcon aria-hidden className={iconStyles} />
              ) : null}
            </div>
            {children}
          </>
        ),
      )}
    </CheckboxPrimitive>
  );
};

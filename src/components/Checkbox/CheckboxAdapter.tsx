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
  base: 'peer border-input dark:bg-input/30 size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none flex items-center justify-center text-current',
  variants: {
    isSelected: {
      true: 'bg-primary text-primary-foreground border-primary',
    },
    isIndeterminate: {
      true: 'bg-primary text-primary-foreground border-primary',
    },
    isFocusVisible: {
      true: 'border-ring ring-ring/50 ring-[3px]',
    },
    isInvalid: {
      true: 'ring-destructive/20 dark:ring-destructive/40 border-destructive',
    },
    isDisabled: {
      true: 'cursor-not-allowed opacity-50',
    },
  },
});

const iconStyles = 'size-3.5';

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

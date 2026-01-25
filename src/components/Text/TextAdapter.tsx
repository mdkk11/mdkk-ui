import { cva } from 'cva';
import { cn } from '@/design-system/utils';
import { TextPrimitive, type TextPrimitiveProps } from './TextPrimitive';

const textStyles = cva({
  base: 'text-xs text-muted-foreground',
});

export interface TextAdapterProps extends TextPrimitiveProps {
  className?: string;
}

export const TextAdapter = ({ className, ...props }: TextAdapterProps) => {
  return <TextPrimitive {...props} className={cn(textStyles(), className)} />;
};

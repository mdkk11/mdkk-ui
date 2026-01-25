import { createContext, useContext } from 'react';

type TextFieldContextValue = Record<string, never>;

const TextFieldContext = createContext<TextFieldContextValue | null>(null);

export function useTextFieldContext() {
  const ctx = useContext(TextFieldContext);
  if (!ctx) {
    throw new Error(
      'TextField components must be used within <TextField.Root>.',
    );
  }
  return ctx;
}

export { TextFieldContext };

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('handles interactions', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(<Button onPress={onPress}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onPress={onPress}>
        Click me
      </Button>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
    await user.click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, waitFor } from 'storybook/test';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  subcomponents: {
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top start',
        'top end',
        'bottom start',
        'bottom end',
        'left top',
        'left bottom',
        'right top',
        'right bottom',
      ],
    },
  },
  args: {
    delay: 1500,
    closeDelay: 500,
    offset: 8,
    placement: 'top',
  },
} satisfies Meta<typeof Tooltip.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    delay: 0,
    closeDelay: 0,
  },
  render: ({ ...args }) => (
    <div className='flex items-center gap-3'>
      <Tooltip.Root {...args}>
        <Tooltip.Trigger aria-label='Info'>i</Tooltip.Trigger>
        <Tooltip.Content>Additional details</Tooltip.Content>
      </Tooltip.Root>
      <button type='button'>Next focus</button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Info' });
    const nextFocus = canvas.getByRole('button', { name: 'Next focus' });

    await userEvent.click(nextFocus);
    await userEvent.hover(trigger);
    await expect(
      await screen.findByText('Additional details'),
    ).toBeInTheDocument();

    await userEvent.unhover(trigger);
    await waitFor(() =>
      expect(screen.queryByText('Additional details')).not.toBeInTheDocument(),
    );

    await userEvent.tab({ shift: true });
    await expect(trigger).toHaveFocus();
    await expect(
      await screen.findByText('Additional details'),
    ).toBeInTheDocument();

    await userEvent.tab();
    await expect(nextFocus).toHaveFocus();
    await waitFor(() =>
      expect(screen.queryByText('Additional details')).not.toBeInTheDocument(),
    );
  },
};

export const FocusOnly: Story = {
  args: {
    delay: 0,
    closeDelay: 0,
    trigger: 'focus',
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Help' });
    const nextFocus = canvas.getByRole('button', { name: 'Next focus' });
    const text = 'Keyboard shortcut: Cmd + K';

    await userEvent.click(nextFocus);
    await userEvent.hover(trigger);
    await waitFor(() =>
      expect(screen.queryByText(text)).not.toBeInTheDocument(),
    );

    await userEvent.tab({ shift: true });
    await expect(trigger).toHaveFocus();
    await expect(await screen.findByText(text)).toBeInTheDocument();

    await userEvent.tab();
    await waitFor(() =>
      expect(screen.queryByText(text)).not.toBeInTheDocument(),
    );
  },
  render: ({ ...args }) => (
    <div className='flex items-center gap-3'>
      <Tooltip.Root {...args}>
        <Tooltip.Trigger aria-label='Help'>?</Tooltip.Trigger>
        <Tooltip.Content>Keyboard shortcut: Cmd + K</Tooltip.Content>
      </Tooltip.Root>
      <button type='button'>Next focus</button>
    </div>
  ),
};

export const ControlledOpen: Story = {
  args: {
    isOpen: true,
  },
  render: ({ ...args }) => (
    <Tooltip.Root {...args}>
      <Tooltip.Trigger aria-label='Pinned info'>i</Tooltip.Trigger>
      <Tooltip.Content>Always visible while controlled.</Tooltip.Content>
    </Tooltip.Root>
  ),
};

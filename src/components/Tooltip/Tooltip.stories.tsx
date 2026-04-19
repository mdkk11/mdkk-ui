import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
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
  args: {
    delay: 0,
    closeDelay: 0,
  },
} satisfies Meta<typeof Tooltip.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => (
    <Tooltip.Root {...args}>
      <Tooltip.Trigger aria-label='Info'>i</Tooltip.Trigger>
      <Tooltip.Content>Additional details</Tooltip.Content>
    </Tooltip.Root>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole('button', { name: 'Info' }));
    await expect(await canvas.findByText('Additional details')).toBeVisible();
  },
};

export const Delay: Story = {
  render: () => (
    <Tooltip.Root delay={500} closeDelay={100}>
      <Tooltip.Trigger aria-label='Help'>?</Tooltip.Trigger>
      <Tooltip.Content>Keyboard shortcut: Cmd + K</Tooltip.Content>
    </Tooltip.Root>
  ),
};

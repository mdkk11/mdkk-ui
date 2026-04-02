import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger aria-label='Info'>i</Tooltip.Trigger>
      <Tooltip.Content>Additional details</Tooltip.Content>
    </Tooltip.Root>
  ),
};

export const Delay: Story = {
  render: () => (
    <Tooltip.Root delay={500} closeDelay={100}>
      <Tooltip.Trigger aria-label='Help'>?</Tooltip.Trigger>
      <Tooltip.Content>Keyboard shortcut: Cmd + K</Tooltip.Content>
    </Tooltip.Root>
  ),
};

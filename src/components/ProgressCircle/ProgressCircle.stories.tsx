import type { Meta, StoryObj } from '@storybook/react';
import { ProgressCircle } from './ProgressCircle';

const meta = {
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    isIndeterminate: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isIndeterminate: true,
    'aria-label': 'Loading...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <ProgressCircle size='sm' isIndeterminate aria-label='Small' />
      <ProgressCircle size='md' isIndeterminate aria-label='Medium' />
      <ProgressCircle size='lg' isIndeterminate aria-label='Large' />
    </div>
  ),
};

export const Determinate: Story = {
  args: {
    value: 75,
    'aria-label': 'Loading...',
  },
};

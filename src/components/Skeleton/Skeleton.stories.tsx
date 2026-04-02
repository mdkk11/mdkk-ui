import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    shape: 'line',
    isAnimated: true,
  },
  argTypes: {
    shape: {
      control: 'select',
      options: ['line', 'circle', 'rectangle'],
      description: 'Skeleton shape',
    },
    isAnimated: {
      control: 'boolean',
      description: 'Enable pulse animation',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const TextBlock: Story = {
  render: () => (
    <div className='w-80 space-y-2'>
      <Skeleton className='h-5 w-2/5' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-[90%]' />
      <Skeleton className='h-4 w-[70%]' />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className='w-80 space-y-3 border p-4'>
      <Skeleton shape='rectangle' className='h-36' />
      <Skeleton className='h-5 w-1/2' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-3/4' />
    </div>
  ),
};

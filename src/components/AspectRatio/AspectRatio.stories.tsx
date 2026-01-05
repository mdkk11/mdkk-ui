import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';

const meta = {
  component: AspectRatio,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number' },
      description: 'The aspect ratio (width / height)',
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
    children: (
      <img
        src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'
        alt='Abstract Gradient'
        className='h-full w-full object-cover'
      />
    ),
  },
};

export const Square: Story = {
  args: {
    ratio: 1,
    children: (
      <div className='grid h-full w-full place-items-center rounded-md bg-blue-500 text-2xl font-bold text-white'>
        1:1
      </div>
    ),
  },
};

export const Portrait: Story = {
  args: {
    ratio: 9 / 16,
    className: 'w-64',
    children: (
      <img
        src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'
        alt='Abstract Gradient'
        className='h-full w-full object-cover'
      />
    ),
  },
};

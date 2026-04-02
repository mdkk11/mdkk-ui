import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Badge',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'accent', 'destructive', 'outline'],
      description: 'Visual style of the badge',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

// 1. Core variants

/** Default badge */
export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

/** Secondary badge */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/** Accent badge */
export const Accent: Story = {
  args: {
    children: 'Accent',
    variant: 'accent',
  },
};

/** Destructive badge */
export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

/** Outline badge */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

// 2. Variant comparison

/** Compare all variants side by side */
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-3 p-4'>
      <Badge variant='default'>Default</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='accent'>Accent</Badge>
      <Badge variant='destructive'>Destructive</Badge>
      <Badge variant='outline'>Outline</Badge>
    </div>
  ),
};

// 3. Size scale

/** Compare all sizes */
export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-3 p-4'>
      <Badge size='sm'>Small</Badge>
      <Badge size='md'>Medium</Badge>
      <Badge size='lg'>Large</Badge>
    </div>
  ),
};

// 4. Common compositions

/** Status labels */
export const StatusLabels: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-3 p-4'>
      <Badge variant='accent'>NEW</Badge>
      <Badge variant='default'>Published</Badge>
      <Badge variant='outline'>Draft</Badge>
      <Badge variant='destructive'>Private</Badge>
      <Badge variant='secondary'>Archived</Badge>
    </div>
  ),
};

/** Notification/count badges */
export const Counts: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-4 p-4'>
      <div className='flex items-center gap-1.5'>
        <span className='text-sm font-mono'>Alerts</span>
        <Badge size='sm' variant='accent'>
          3
        </Badge>
      </div>
      <div className='flex items-center gap-1.5'>
        <span className='text-sm font-mono'>Messages</span>
        <Badge size='sm' variant='default'>
          12
        </Badge>
      </div>
      <div className='flex items-center gap-1.5'>
        <span className='text-sm font-mono'>Tasks</span>
        <Badge size='sm' variant='outline'>
          99+
        </Badge>
      </div>
    </div>
  ),
};

/** Tag-like usage */
export const Tags: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2 p-4'>
      <Badge variant='outline' size='sm'>
        React
      </Badge>
      <Badge variant='outline' size='sm'>
        TypeScript
      </Badge>
      <Badge variant='outline' size='sm'>
        Tailwind CSS
      </Badge>
      <Badge variant='outline' size='sm'>
        Storybook
      </Badge>
    </div>
  ),
};

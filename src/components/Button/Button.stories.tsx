import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'destructive',
        'ghost',
        'outline',
      ],
      description: 'Visual style of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Core variants

/** Default button maps to `primary` variant */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

/** Primary: high-emphasis action */
export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

/** Secondary: low-emphasis secondary action */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/** Accent: brand-highlight action */
export const Accent: Story = {
  args: {
    children: 'Accent',
    variant: 'accent',
  },
};

/** Destructive: irreversible or dangerous action */
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

/** Outline: subtle bordered action */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

/** Ghost: minimal visual emphasis */
export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

// 2. Variant comparison

/** Compare all variants side by side */
export const ColorPalette: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-8'>
      <section>
        <h3 className='text-lg font-bold mb-2 font-mono'>Variant Hierarchy</h3>
        <p className='text-sm text-muted-foreground mb-4 font-mono'>
          Higher emphasis variants should be reserved for key actions.
        </p>
        <div className='flex flex-wrap items-center gap-4'>
          <Button variant='accent'>Accent (CTA)</Button>
          <Button variant='primary'>Primary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
        </div>
      </section>
    </div>
  ),
};

// 3. Size scale

/** Compare all sizes */
export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-end gap-4 p-4'>
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
      <Button size='xl'>Extra Large</Button>
    </div>
  ),
};

// 4. Shadow presets

/** Brutalist shadow offsets (right) */
export const ShadowRight: Story = {
  render: () => (
    <div className='flex flex-wrap gap-6 p-4'>
      <Button variant='primary' shadow='right-sm'>
        Shadow SM
      </Button>
      <Button variant='primary' shadow='right-md'>
        Shadow MD
      </Button>
      <Button variant='primary' shadow='right-lg'>
        Shadow LG
      </Button>
    </div>
  ),
};

/** Brutalist shadow offsets (left) */
export const ShadowLeft: Story = {
  render: () => (
    <div className='flex flex-wrap gap-6 p-4'>
      <Button variant='primary' shadow='left-sm'>
        Left SM
      </Button>
      <Button variant='primary' shadow='left-md'>
        Left MD
      </Button>
      <Button variant='primary' shadow='left-lg'>
        Left LG
      </Button>
    </div>
  ),
};

/** Light shadow variants for dark surfaces */
export const ShadowLight: Story = {
  render: () => (
    <div className='bg-black p-6 rounded-lg flex flex-wrap gap-6'>
      <Button variant='accent' shadow='light-sm'>
        Light SM
      </Button>
      <Button variant='accent' shadow='light-md'>
        Light MD
      </Button>
      <Button variant='accent' shadow='light-lg'>
        Light LG
      </Button>
    </div>
  ),
};

// 5. Interaction modes

/** Press: offset collapses while pressed */
export const InteractionPress: Story = {
  args: {
    children: 'Press me',
    variant: 'primary',
    shadow: 'right-lg',
    interactive: 'press',
    size: 'lg',
  },
};

/** Hover: offset collapses on hover */
export const InteractionHover: Story = {
  args: {
    children: 'Hover me',
    variant: 'accent',
    shadow: 'right-lg',
    interactive: 'hover',
    size: 'lg',
  },
};

// 6. Component states

/** Disabled states */
export const Disabled: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 p-4'>
      <Button isDisabled>Primary</Button>
      <Button variant='secondary' isDisabled>
        Secondary
      </Button>
      <Button variant='accent' isDisabled>
        Accent
      </Button>
      <Button variant='outline' isDisabled>
        Outline
      </Button>
      <Button variant='ghost' isDisabled>
        Ghost
      </Button>
    </div>
  ),
};

/** Pending/loading states */
export const Loading: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 p-4'>
      <Button isPending>Primary</Button>
      <Button variant='secondary' isPending>
        Secondary
      </Button>
      <Button variant='accent' isPending>
        Accent
      </Button>
    </div>
  ),
};

// 7. Layout pattern

/** Full-width action buttons */
export const FullWidth: Story = {
  render: () => (
    <div className='w-80 space-y-3'>
      <Button fullWidth>Full Width Primary</Button>
      <Button variant='accent' fullWidth>
        Full Width Accent
      </Button>
      <Button variant='outline' fullWidth>
        Full Width Outline
      </Button>
    </div>
  ),
};

// 8. Common compositions

/** Typical form actions */
export const FormActions: Story = {
  render: () => (
    <div className='flex gap-3 p-4'>
      <Button variant='primary'>Save</Button>
      <Button variant='outline'>Cancel</Button>
    </div>
  ),
};

/** Confirming destructive actions */
export const DangerZone: Story = {
  render: () => (
    <div className='flex gap-3 p-4 border-2 border-destructive rounded-md'>
      <div className='flex-1'>
        <p className='font-bold text-sm'>Delete account</p>
        <p className='text-xs text-muted-foreground'>
          This action cannot be undone.
        </p>
      </div>
      <Button variant='destructive'>Delete</Button>
    </div>
  ),
};

/** Hero-style call-to-action section */
export const CTASection: Story = {
  render: () => (
    <div className='flex flex-col items-center gap-4 p-8'>
      <Button variant='accent' size='xl' shadow='right-lg' interactive='press'>
        Get Started
      </Button>
      <Button variant='ghost' size='sm'>
        Learn more →
      </Button>
    </div>
  ),
};

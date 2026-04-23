import type { Meta, StoryObj } from '@storybook/react';
import { iconNames } from './generated';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Icons',
  component: Icon,
  args: {
    type: 'circleUser',
    size: 'md',
    'aria-label': 'User icon',
  },
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      options: [...iconNames],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'inline-radio' },
    },
    isDecorative: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false (derived)' } },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Decorative: Story = {
  args: {
    type: 'loader',
    isDecorative: true,
    'aria-label': undefined,
  },
};

export const AllIcons: Story = {
  render: (args) => (
    <div className='grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8'>
      {iconNames.map((name) => (
        <div key={name} className='flex flex-col items-center gap-2'>
          <Icon {...args} type={name} aria-label={name} />
          <span className='text-xs text-muted-foreground'>{name}</span>
        </div>
      ))}
    </div>
  ),
};

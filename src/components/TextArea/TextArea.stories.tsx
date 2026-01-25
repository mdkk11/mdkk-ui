import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../TextField/TextField';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TextField.Root className='flex flex-col gap-1.5 w-full'>
      <TextField.Label>Bio</TextField.Label>
      <TextArea {...args} />
    </TextField.Root>
  ),
  args: {
    placeholder: 'Tell us about yourself...',
  },
};

export const WithDescription: Story = {
  render: (args) => (
    <TextField.Root className='flex flex-col gap-1.5 w-full'>
      <TextField.Label>Feedback</TextField.Label>
      <TextArea {...args} />
      <TextField.Description>
        Please provide as much detail as possible.
      </TextField.Description>
    </TextField.Root>
  ),
  args: {
    placeholder: 'Your feedback here...',
  },
};

export const WithError: Story = {
  render: (args) => (
    <TextField.Root isInvalid className='flex flex-col gap-1.5 w-full'>
      <TextField.Label>Comment</TextField.Label>
      <TextArea {...args} />
      <TextField.Error>Comment cannot be empty.</TextField.Error>
    </TextField.Root>
  ),
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <TextField.Root isDisabled className='flex flex-col gap-1.5 w-full'>
      <TextField.Label>Disabled Note</TextField.Label>
      <TextArea {...args} />
    </TextField.Root>
  ),
  args: {
    defaultValue: 'This note cannot be edited.',
  },
};

export const Readonly: Story = {
  render: (args) => (
    <TextField.Root isReadOnly className='flex flex-col gap-1.5 w-full'>
      <TextField.Label>Readonly Note</TextField.Label>
      <TextArea {...args} />
    </TextField.Root>
  ),
  args: {
    defaultValue: 'This note is read-only.',
  },
};

// Composition story is now redundant given all stories use composition, but keeping for compatibility if needed or removing.
// Replacing with a customized one.
export const CustomComposition: Story = {
  render: (args) => (
    <TextField.Root className='flex flex-col gap-1.5 w-full'>
      <TextField.Label className='text-blue-500'>Custom Label</TextField.Label>
      <TextArea {...args} className='border-blue-500' />
      <TextField.Description className='italic'>
        Custom description style.
      </TextField.Description>
    </TextField.Root>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField.Root> = {
  title: 'Components/TextField',
  component: TextField.Root,
  subcomponents: {
    'TextField.Label': TextField.Label,
    'TextField.Input': TextField.Input,
    'TextField.TextArea': TextField.TextArea,
    'TextField.Description': TextField.Description,
    'TextField.Error': TextField.Error,
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  render: ({ ...args }) => (
    <TextField.Root {...args} className='flex flex-col gap-2 w-[300px]'>
      <div className='flex justify-between items-baseline'>
        <TextField.Label>Email Address</TextField.Label>
        <span className='text-xs text-gray-500'>Optional</span>
      </div>
      <TextField.Input placeholder='custom@example.com' />
      <TextField.Description className='text-xs'>
        We'll never share your email.
      </TextField.Description>
      <TextField.Error />
    </TextField.Root>
  ),
  args: {
    isInvalid: false,
  },
};

export const WithTextArea: Story = {
  render: ({ ...args }) => (
    <TextField.Root {...args}>
      <TextField.Label>Bio</TextField.Label>
      <TextField.TextArea placeholder='Tell us about yourself' />
      <TextField.Description>Max 500 characters</TextField.Description>
      <TextField.Error />
    </TextField.Root>
  ),
};

export const WithError: Story = {
  render: ({ ...args }) => (
    <TextField.Root {...args} className='flex flex-col gap-2 w-[300px]'>
      <TextField.Label>Password</TextField.Label>
      <TextField.Input type='password' />
      <TextField.Error>Password is too short</TextField.Error>
    </TextField.Root>
  ),
  args: {
    isInvalid: true,
  },
};

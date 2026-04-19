import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { Button } from '../Button';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  subcomponents: {
    'Dialog.Trigger': Dialog.Trigger,
    'Dialog.Overlay': Dialog.Overlay,
    'Dialog.Content': Dialog.Content,
    'Dialog.Header': Dialog.Header,
    'Dialog.Title': Dialog.Title,
    'Dialog.Description': Dialog.Description,
    'Dialog.Body': Dialog.Body,
    'Dialog.Footer': Dialog.Footer,
    'Dialog.Close': Dialog.Close,
  },
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
  },
} satisfies Meta<typeof Dialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Overlay isDismissable>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Delete project</Dialog.Title>
            <Dialog.Description>
              This action permanently removes project data.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <p className='text-sm text-muted-foreground'>
              Please confirm before continuing.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close>Cancel</Dialog.Close>
            <Button type='button'>Delete</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
    await expect(canvas.getByText('Delete project')).toBeInTheDocument();
  },
};

export const EditModal: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>Edit profile</Dialog.Trigger>
      <Dialog.Overlay isDismissable>
        <Dialog.Content size='lg'>
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>
              Update your profile details and save changes.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <div className='grid gap-3'>
              <label className='grid gap-1'>
                <span className='text-xs font-medium'>Display name</span>
                <input
                  className='h-9 border bg-background px-3 text-sm'
                  defaultValue='Koki Maeda'
                />
              </label>
              <label className='grid gap-1'>
                <span className='text-xs font-medium'>Role</span>
                <input
                  className='h-9 border bg-background px-3 text-sm'
                  defaultValue='Design Engineer'
                />
              </label>
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close>Cancel</Dialog.Close>
            <Button type='button'>Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  ),
};

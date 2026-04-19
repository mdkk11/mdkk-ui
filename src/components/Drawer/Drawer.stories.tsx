import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { Button } from '../Button';
import { Drawer } from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer.Root,
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
  },
  subcomponents: {
    'Drawer.Trigger': Drawer.Trigger,
    'Drawer.Overlay': Drawer.Overlay,
    'Drawer.Content': Drawer.Content,
    'Drawer.Header': Drawer.Header,
    'Drawer.Title': Drawer.Title,
    'Drawer.Close': Drawer.Close,
    'Drawer.Body': Drawer.Body,
    'Drawer.Footer': Drawer.Footer,
  },
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
  },
} satisfies Meta<typeof Drawer.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => (
    <div className='min-h-screen p-6'>
      <Drawer.Root {...args}>
        <Drawer.Trigger>Open drawer</Drawer.Trigger>
        <Drawer.Overlay isDismissable>
          <Drawer.Content side='right'>
            <Drawer.Header>
              <Drawer.Title>Notifications</Drawer.Title>
              <Drawer.Close>Close</Drawer.Close>
            </Drawer.Header>
            <Drawer.Body>
              <div className='space-y-3 text-sm'>
                <p>You have 3 pending reviews.</p>
                <p>Your deployment finished successfully.</p>
                <p>A new comment was posted on Issue #214.</p>
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button type='button'>Mark all as read</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Overlay>
      </Drawer.Root>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
    await expect(canvas.getByText('Notifications')).toBeInTheDocument();
  },
};

export const MobileMenu: Story = {
  render: () => (
    <div className='min-h-screen p-6'>
      <Drawer.Root>
        <Drawer.Trigger>Open menu</Drawer.Trigger>
        <Drawer.Overlay isDismissable>
          <Drawer.Content side='left'>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
              <Drawer.Close>Close</Drawer.Close>
            </Drawer.Header>
            <Drawer.Body>
              <nav className='grid gap-2 text-sm'>
                <a className='border p-2' href='/dashboard'>
                  Dashboard
                </a>
                <a className='border p-2' href='/projects'>
                  Projects
                </a>
                <a className='border p-2' href='/billing'>
                  Billing
                </a>
              </nav>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Overlay>
      </Drawer.Root>
    </div>
  ),
};

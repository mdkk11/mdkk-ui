import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { expect, screen } from 'storybook/test';
import { Button } from '../Button';
import { Toast, ToastProvider } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  args: {
    maxVisibleToasts: 4,
    defaultTimeout: 4000,
  },
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    maxVisibleToasts: {
      control: { type: 'number', min: 1, max: 8 },
      table: { defaultValue: { summary: '4' } },
    },
    defaultTimeout: {
      control: { type: 'number', min: 500, max: 15000 },
      table: { defaultValue: { summary: '4000' } },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoButtons = () => {
  const toast = Toast.useToast();

  return (
    <div className='flex items-center gap-2'>
      <Button
        type='button'
        onPress={() => toast.success('Saved', 'Your changes were stored.')}
      >
        Show success
      </Button>
      <Button
        type='button'
        variant='outline'
        onPress={() =>
          toast.error('Failed', 'Could not save due to network error.')
        }
      >
        Show error
      </Button>
      <Button
        type='button'
        variant='secondary'
        onPress={() => toast.info('Heads up', 'Session expires in 5 minutes.')}
      >
        Show info
      </Button>
    </div>
  );
};

const TonePreview = () => {
  const toast = Toast.useToast();
  const hasShownRef = React.useRef(false);

  React.useEffect(() => {
    if (hasShownRef.current) return;
    hasShownRef.current = true;

    toast.info('Heads up', 'Session expires in 5 minutes.', {
      timeout: 12000,
    });
    toast.success('Saved', 'Your changes were stored.', { timeout: 12000 });
    toast.error('Failed', 'Could not save due to network error.', {
      timeout: 12000,
    });
  }, [toast]);

  return (
    <p className='text-sm text-muted-foreground'>
      Toasts are auto-fired once to preview info/success/error styling.
    </p>
  );
};

const QueueLimitButtons = () => {
  const toast = Toast.useToast();

  return (
    <div className='flex items-center gap-2'>
      <Button
        type='button'
        onPress={() => {
          toast.info('Queued #1', 'First toast');
          toast.success('Queued #2', 'Second toast');
          toast.error('Queued #3', 'Third toast');
        }}
      >
        Enqueue 3 toasts
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <DemoButtons />
    </ToastProvider>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Show success' }));
    await expect(await screen.findByText('Saved')).toBeInTheDocument();
  },
};

export const ToneStylingPreview: Story = {
  args: {
    defaultTimeout: 12000,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <TonePreview />
    </ToastProvider>
  ),
};

export const QueueLimit: Story = {
  args: {
    maxVisibleToasts: 2,
    defaultTimeout: 12000,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <QueueLimitButtons />
    </ToastProvider>
  ),
};

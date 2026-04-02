import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Toast, ToastProvider } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
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

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <DemoButtons />
    </ToastProvider>
  ),
};

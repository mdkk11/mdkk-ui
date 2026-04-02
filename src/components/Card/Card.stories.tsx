import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className='w-[380px] rotate-[-0.3deg]'>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm'>
          This card follows the shadcn layout API and can be combined with your
          existing form primitives.
        </p>
      </CardContent>
      <CardFooter className='justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className='w-[380px] rotate-[0.3deg]'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>API Usage</CardTitle>
          <Badge variant='accent'>NEW</Badge>
        </div>
        <CardDescription>
          Monitor request volume and errors in real time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-sm'>Requests: 1,842 / day</div>
      </CardContent>
      <CardFooter>
        <Button variant='outline' className='w-full'>
          View details
        </Button>
      </CardFooter>
    </Card>
  ),
};

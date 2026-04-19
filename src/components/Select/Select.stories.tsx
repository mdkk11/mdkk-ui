import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, waitFor } from 'storybook/test';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select.Root,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  subcomponents: {
    'Select.Label': Select.Label,
    'Select.Trigger': Select.Trigger,
    'Select.Value': Select.Value,
    'Select.Description': Select.Description,
    'Select.Popover': Select.Popover,
    'Select.List': Select.List,
    'Select.Item': Select.Item,
    'Select.Error': Select.Error,
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Select status',
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
  },
} satisfies Meta<typeof Select.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => (
    <Select.Root {...args}>
      <Select.Label>Status</Select.Label>
      <Select.Trigger />
      <Select.Description>Used for task workflow.</Select.Description>
      <Select.Popover>
        <Select.List>
          <Select.Item id='todo'>To do</Select.Item>
          <Select.Item id='in-progress'>In progress</Select.Item>
          <Select.Item id='done'>Done</Select.Item>
        </Select.List>
      </Select.Popover>
      <Select.Error />
    </Select.Root>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole('option', { name: 'Done' }));
    await waitFor(() => expect(trigger).toHaveTextContent('Done'));
  },
};

export const Invalid: Story = {
  render: () => (
    <Select.Root placeholder='Pick one' isInvalid isRequired>
      <Select.Label>Priority</Select.Label>
      <Select.Trigger />
      <Select.Popover>
        <Select.List>
          <Select.Item id='low'>Low</Select.Item>
          <Select.Item id='medium'>Medium</Select.Item>
          <Select.Item id='high'>High</Select.Item>
        </Select.List>
      </Select.Popover>
      <Select.Error>Please select a priority.</Select.Error>
    </Select.Root>
  ),
};

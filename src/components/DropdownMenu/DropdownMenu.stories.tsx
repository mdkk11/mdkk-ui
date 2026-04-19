import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Root,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  subcomponents: {
    'DropdownMenu.Trigger': DropdownMenu.Trigger,
    'DropdownMenu.Content': DropdownMenu.Content,
    'DropdownMenu.Section': DropdownMenu.Section,
    'DropdownMenu.Item': DropdownMenu.Item,
    'DropdownMenu.Separator': DropdownMenu.Separator,
  },
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
  },
} satisfies Meta<typeof DropdownMenu.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => (
    <DropdownMenu.Root {...args}>
      <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item id='edit'>Edit</DropdownMenu.Item>
        <DropdownMenu.Item id='duplicate'>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item id='archive'>Archive</DropdownMenu.Item>
        <DropdownMenu.Item id='delete' isDestructive>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Actions' }));
    await expect(canvas.getByText('Delete')).toBeInTheDocument();
  },
};

export const WithSections: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>Row menu</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Section>
          <DropdownMenu.Item id='open'>Open details</DropdownMenu.Item>
          <DropdownMenu.Item id='share'>Share</DropdownMenu.Item>
        </DropdownMenu.Section>
        <DropdownMenu.Separator />
        <DropdownMenu.Section>
          <DropdownMenu.Item id='remove' isDestructive>
            Remove row
          </DropdownMenu.Item>
        </DropdownMenu.Section>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

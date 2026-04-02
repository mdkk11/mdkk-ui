import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu.Root>
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

import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  subcomponents: {
    'Tabs.List': Tabs.List,
    'Tabs.Tab': Tabs.Tab,
    'Tabs.Panel': Tabs.Panel,
  },
  tags: ['autodocs'],
  args: {
    defaultSelectedKey: 'overview',
    isDisabled: false,
  },
} satisfies Meta<typeof Tabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => (
    <div className='w-[520px]'>
      <Tabs.Root {...args}>
        <Tabs.List aria-label='Project sections'>
          <Tabs.Tab id='overview'>Overview</Tabs.Tab>
          <Tabs.Tab id='members'>Members</Tabs.Tab>
          <Tabs.Tab id='settings'>Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel id='overview'>
          Track project metrics, milestones, and recent updates.
        </Tabs.Panel>
        <Tabs.Panel id='members'>
          Invite teammates, assign roles, and manage permissions.
        </Tabs.Panel>
        <Tabs.Panel id='settings'>
          Configure automation, integrations, and notification rules.
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('tab', { name: 'Members' }));
    await expect(
      canvas.getByText(
        'Invite teammates, assign roles, and manage permissions.',
      ),
    ).toBeInTheDocument();
  },
};

export const DisabledTab: Story = {
  render: () => (
    <div className='w-[520px]'>
      <Tabs.Root defaultSelectedKey='active'>
        <Tabs.List aria-label='Environment tabs'>
          <Tabs.Tab id='active'>Active</Tabs.Tab>
          <Tabs.Tab id='staging' isDisabled>
            Staging
          </Tabs.Tab>
          <Tabs.Tab id='archived'>Archived</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel id='active'>This environment is active.</Tabs.Panel>
        <Tabs.Panel id='archived'>Archived environment data.</Tabs.Panel>
      </Tabs.Root>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  parameters: {
    layout: 'centered',
  },
  subcomponents: {
    'Tabs.List': Tabs.List,
    'Tabs.Tab': Tabs.Tab,
    'Tabs.Panel': Tabs.Panel,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='w-[520px]'>
      <Tabs.Root defaultSelectedKey='overview'>
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

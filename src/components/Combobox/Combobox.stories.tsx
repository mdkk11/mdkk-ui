import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';

const meta = {
  title: 'Components/Combobox',
  component: Combobox.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'solid', label: 'SolidJS' },
];

export const Default: Story = {
  render: () => (
    <Combobox.Root defaultItems={items} defaultInputValue='React'>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Field>
        <Combobox.Input placeholder='Search framework' />
        <Combobox.Trigger aria-label='Toggle options'>▾</Combobox.Trigger>
      </Combobox.Field>
      <Combobox.Description>
        Search and select a framework.
      </Combobox.Description>
      <Combobox.Popover>
        <Combobox.List>
          {(item) => <Combobox.Item id={item.id}>{item.label}</Combobox.Item>}
        </Combobox.List>
      </Combobox.Popover>
      <Combobox.Error />
    </Combobox.Root>
  ),
};

export const Required: Story = {
  render: () => (
    <Combobox.Root defaultItems={items} isRequired isInvalid>
      <Combobox.Label>Runtime</Combobox.Label>
      <Combobox.Field>
        <Combobox.Input placeholder='Select runtime' />
        <Combobox.Trigger aria-label='Toggle options'>▾</Combobox.Trigger>
      </Combobox.Field>
      <Combobox.Popover>
        <Combobox.List>
          {(item) => <Combobox.Item id={item.id}>{item.label}</Combobox.Item>}
        </Combobox.List>
      </Combobox.Popover>
      <Combobox.Error>Please choose one option.</Combobox.Error>
    </Combobox.Root>
  ),
};

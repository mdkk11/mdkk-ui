import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, waitFor } from 'storybook/test';
import { Combobox } from './Combobox';

const meta = {
  title: 'Components/Combobox',
  component: Combobox.Root,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  subcomponents: {
    'Combobox.Label': Combobox.Label,
    'Combobox.Field': Combobox.Field,
    'Combobox.Input': Combobox.Input,
    'Combobox.Trigger': Combobox.Trigger,
    'Combobox.Description': Combobox.Description,
    'Combobox.Popover': Combobox.Popover,
    'Combobox.List': Combobox.List,
    'Combobox.Item': Combobox.Item,
    'Combobox.Error': Combobox.Error,
  },
  tags: ['autodocs'],
  args: {
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    defaultInputValue: '',
  },
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
  render: ({ ...args }) => (
    <Combobox.Root defaultItems={items} {...args}>
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
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('combobox', { name: 'Framework' });
    await userEvent.click(
      canvas.getByRole('button', { name: /Toggle options/i }),
    );
    await userEvent.click(await screen.findByRole('option', { name: 'Vue' }));
    await waitFor(() =>
      expect(input).toHaveAttribute('aria-expanded', 'false'),
    );
    await expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  },
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

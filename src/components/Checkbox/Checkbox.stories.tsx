import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Subscribe to newsletter',
  },
};

export const Selected: Story = {
  args: {
    children: 'I agree to the terms',
    isSelected: true,
  },
};

export const Indeterminate: Story = {
  args: {
    children: 'Select all items',
    isIndeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Cannot interact',
    isDisabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    children: 'Locked selection',
    isDisabled: true,
    isSelected: true,
  },
};

export const AllStates = {
  render: () => (
    <div className='flex flex-col gap-6 p-8'>
      {/* Default States */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Default States</h3>
        <div className='flex flex-col gap-3'>
          <Checkbox>Unchecked</Checkbox>
          <Checkbox defaultIsSelected>Checked (defaultSelected)</Checkbox>
          <Checkbox isIndeterminate>Indeterminate</Checkbox>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Disabled States</h3>
        <div className='flex flex-col gap-3'>
          <Checkbox isDisabled>Disabled unchecked</Checkbox>
          <Checkbox isDisabled isSelected>
            Disabled checked
          </Checkbox>
          <Checkbox isDisabled isIndeterminate>
            Disabled indeterminate
          </Checkbox>
        </div>
      </section>
    </div>
  ),
};

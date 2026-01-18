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
    selected: true,
  },
};

export const Indeterminate: Story = {
  args: {
    children: 'Select all items',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Cannot interact',
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    children: 'Locked selection',
    disabled: true,
    selected: true,
  },
};

export const Invalid: Story = {
  args: {
    children: 'Agree to terms (required)',
    invalid: true,
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
          <Checkbox defaultSelected>Checked (defaultSelected)</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Disabled States</h3>
        <div className='flex flex-col gap-3'>
          <Checkbox disabled>Disabled unchecked</Checkbox>
          <Checkbox disabled selected>
            Disabled checked
          </Checkbox>
          <Checkbox disabled indeterminate>
            Disabled indeterminate
          </Checkbox>
        </div>
      </section>

      {/* Invalid States */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Invalid States</h3>
        <div className='flex flex-col gap-3'>
          <Checkbox invalid>Invalid unchecked</Checkbox>
          <Checkbox invalid selected>
            Invalid checked
          </Checkbox>
        </div>
      </section>
    </div>
  ),
};

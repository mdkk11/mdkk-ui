import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup.Root,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  subcomponents: {
    'CheckboxGroup.Label': CheckboxGroup.Label,
    'CheckboxGroup.Description': CheckboxGroup.Description,
    'CheckboxGroup.Error': CheckboxGroup.Error,
  },
  tags: ['autodocs'],
  args: {
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    isInvalid: false,
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
} satisfies Meta<typeof CheckboxGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => (
    <CheckboxGroup.Root {...args}>
      <CheckboxGroup.Label>Favorite sports</CheckboxGroup.Label>
      <Checkbox value='soccer'>Soccer</Checkbox>
      <Checkbox value='baseball'>Baseball</Checkbox>
      <Checkbox value='basketball'>Basketball</Checkbox>
      <CheckboxGroup.Description>
        Select one or more sports you enjoy.
      </CheckboxGroup.Description>
    </CheckboxGroup.Root>
  ),
  play: async ({ canvas, userEvent }) => {
    const soccer = canvas.getByRole('checkbox', { name: 'Soccer' });
    await userEvent.click(soccer);
    await expect(soccer).toBeChecked();
  },
};

export const Disabled: Story = {
  render: ({ ...args }) => (
    <CheckboxGroup.Root {...args}>
      <CheckboxGroup.Label>Notifications</CheckboxGroup.Label>
      <Checkbox value='email'>Email</Checkbox>
      <Checkbox value='sms'>SMS</Checkbox>
      <Checkbox value='push'>Push</Checkbox>
    </CheckboxGroup.Root>
  ),
  args: {
    isDisabled: true,
  },
};

export const WithError: Story = {
  render: ({ ...args }) => (
    <CheckboxGroup.Root {...args}>
      <CheckboxGroup.Label>Terms</CheckboxGroup.Label>
      <Checkbox value='terms'>Terms and conditions</Checkbox>
      <Checkbox value='privacy'>Privacy policy</Checkbox>
      <CheckboxGroup.Error>You must agree to all terms.</CheckboxGroup.Error>
    </CheckboxGroup.Root>
  ),
  args: {
    isInvalid: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-8'>
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Default</h3>
        <CheckboxGroup.Root>
          <CheckboxGroup.Label>Favorite fruits</CheckboxGroup.Label>
          <Checkbox value='apple'>Apple</Checkbox>
          <Checkbox value='banana'>Banana</Checkbox>
          <Checkbox value='cherry'>Cherry</Checkbox>
          <CheckboxGroup.Description>
            Pick your favorites.
          </CheckboxGroup.Description>
        </CheckboxGroup.Root>
      </section>

      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Disabled</h3>
        <CheckboxGroup.Root isDisabled>
          <CheckboxGroup.Label>Disabled group</CheckboxGroup.Label>
          <Checkbox value='a'>Option A</Checkbox>
          <Checkbox value='b'>Option B</Checkbox>
        </CheckboxGroup.Root>
      </section>

      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>With Error</h3>
        <CheckboxGroup.Root isInvalid>
          <CheckboxGroup.Label>Required selection</CheckboxGroup.Label>
          <Checkbox value='x'>Option X</Checkbox>
          <Checkbox value='y'>Option Y</Checkbox>
          <CheckboxGroup.Error>
            At least one option is required.
          </CheckboxGroup.Error>
        </CheckboxGroup.Root>
      </section>
    </div>
  ),
};

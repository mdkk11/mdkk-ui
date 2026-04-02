import type { Meta, StoryObj } from '@storybook/react';
import { UserRegisterForm } from './UserRegisterForm';

const meta: Meta<typeof UserRegisterForm> = {
  title: 'Examples/Form/UserRegisterForm',
  component: UserRegisterForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'Reference implementation of a user registration form aligned with FORM_GUIDE.md.',
          '',
          '**FORM_GUIDE alignment points:**',
          '- Single full-name field (no first/last split)',
          '- No email re-entry field (verified through confirmation email)',
          '- Password visibility toggle near the password label',
          '- No password confirmation field',
          '- Single phone field (hyphens normalized in post-processing)',
          '- Postal code in one field, supporting both hyphen/no-hyphen formats',
          '- Address is not split; resolved from postal code with yubinbango',
          '- Real-time validation with `onBlur` mode',
          '- Error messages include concrete correction guidance',
          '- Correct `type` and `autoComplete` attributes',
          '- Browser native validation disabled with `noValidate`; zod handles validation',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='p-8'>
      <h2 className='text-xl font-bold mb-2'>Create Account</h2>
      <p className='text-sm text-gray-600 mb-6'>
        Enter the required information to create your account.
      </p>
      <UserRegisterForm />
    </div>
  ),
};

export const WithCustomSubmit: Story = {
  name: 'Custom Submit Handler',
  render: () => (
    <div className='p-8'>
      <h2 className='text-xl font-bold mb-2'>Create Account</h2>
      <p className='text-sm text-gray-600 mb-6'>
        Example with a custom handler executed on submit.
      </p>
      <UserRegisterForm
        onSubmit={async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          alert(
            `Registration completed!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nAddress: ${data.address}`,
          );
        }}
      />
    </div>
  ),
};

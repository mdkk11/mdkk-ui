import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { CheckboxGroup } from '../components/Checkbox/CheckboxGroup';
import { TextField } from '../components/TextField';

// --- Zod Schema ---

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be 50 characters or fewer'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  bio: z
    .string()
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be 500 characters or fewer'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  agreeToTerms: z.literal(true, {
    error: 'Please agree to the terms',
  }),
});

type FormValues = z.infer<typeof formSchema>;

// --- Form Component ---

function ContactForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      interests: [],
      agreeToTerms: false as boolean as true,
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Simulate a network request.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    alert(`Submitted!\n\n${JSON.stringify(data, null, 2)}`);
  };

  if (isSubmitSuccessful) {
    return (
      <div className='flex flex-col items-center gap-4 p-8 text-center'>
        <p className='text-lg font-semibold'>Submission completed.</p>
        <Button variant='outline' onPress={() => reset()}>
          Submit another response
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='flex flex-col gap-6 w-full max-w-md'
    >
      {/* Name */}
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.name}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>Name</TextField.Label>
            <TextField.Input
              placeholder='Jane Doe'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            {errors.name && (
              <TextField.Error>{errors.name.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* Email */}
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.email}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>Email Address</TextField.Label>
            <TextField.Input
              placeholder='jane@example.com'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <TextField.Description>
              This will be used as your contact email.
            </TextField.Description>
            {errors.email && (
              <TextField.Error>{errors.email.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* Bio (TextArea) */}
      <Controller
        name='bio'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.bio}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>Bio</TextField.Label>
            <TextField.TextArea
              placeholder='Tell us about yourself...'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <TextField.Description>
              Please enter between 10 and 500 characters.
            </TextField.Description>
            {errors.bio && (
              <TextField.Error>{errors.bio.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* Interests (CheckboxGroup) */}
      <Controller
        name='interests'
        control={control}
        render={({ field }) => (
          <CheckboxGroup.Root
            isInvalid={!!errors.interests}
            isRequired
            value={field.value}
            onChange={field.onChange}
          >
            <CheckboxGroup.Label>Areas of Interest</CheckboxGroup.Label>
            <div className='flex flex-col gap-2 mt-1'>
              <Checkbox value='frontend'>Frontend</Checkbox>
              <Checkbox value='backend'>Backend</Checkbox>
              <Checkbox value='design'>Design</Checkbox>
              <Checkbox value='devops'>DevOps</Checkbox>
            </div>
            <CheckboxGroup.Description>
              Select one or more.
            </CheckboxGroup.Description>
            {errors.interests && (
              <CheckboxGroup.Error>
                {errors.interests.message}
              </CheckboxGroup.Error>
            )}
          </CheckboxGroup.Root>
        )}
      />

      {/* Terms agreement (Checkbox) */}
      <Controller
        name='agreeToTerms'
        control={control}
        render={({ field }) => (
          <div className='flex flex-col gap-1'>
            <Checkbox
              isSelected={field.value}
              onChange={field.onChange}
              name={field.name}
            >
              I agree to the terms of service
            </Checkbox>
            {errors.agreeToTerms && (
              <p className='text-sm text-red-600'>
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Submit button */}
      <Button type='submit' variant='primary' isPending={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

// --- Storybook Meta ---

const meta: Meta = {
  title: 'Examples/Form Sample',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sample contact form built with mdkk-ui primitives and react-hook-form + zod. Demonstrates TextField, TextArea, CheckboxGroup, Checkbox, and Button integration.',
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
      <h2 className='text-xl font-bold mb-6'>Contact Form</h2>
      <ContactForm />
    </div>
  ),
};

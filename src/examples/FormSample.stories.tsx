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
    .min(1, '名前は必須です')
    .max(50, '50文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください'),
  bio: z
    .string()
    .min(10, '自己紹介は10文字以上必要です')
    .max(500, '500文字以内で入力してください'),
  interests: z.array(z.string()).min(1, '少なくとも1つ選択してください'),
  agreeToTerms: z.literal(true, {
    error: '利用規約に同意してください',
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
    // 送信シミュレーション
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('✅ Form submitted:', data);
    alert(`送信完了！\n\n${JSON.stringify(data, null, 2)}`);
  };

  if (isSubmitSuccessful) {
    return (
      <div className='flex flex-col items-center gap-4 p-8 text-center'>
        <p className='text-2xl'>🎉</p>
        <p className='text-lg font-semibold'>送信が完了しました！</p>
        <Button variant='outline' onPress={() => reset()}>
          もう一度入力する
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
      {/* 名前 */}
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.name}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>名前</TextField.Label>
            <TextField.Input
              placeholder='山田 太郎'
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

      {/* メールアドレス */}
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.email}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>メールアドレス</TextField.Label>
            <TextField.Input
              placeholder='taro@example.com'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <TextField.Description>
              連絡先として使用します
            </TextField.Description>
            {errors.email && (
              <TextField.Error>{errors.email.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* 自己紹介 (TextArea) */}
      <Controller
        name='bio'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.bio}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>自己紹介</TextField.Label>
            <TextField.TextArea
              placeholder='あなたについて教えてください...'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <TextField.Description>
              10〜500文字で入力してください
            </TextField.Description>
            {errors.bio && (
              <TextField.Error>{errors.bio.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* 興味のある分野 (CheckboxGroup) */}
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
            <CheckboxGroup.Label>興味のある分野</CheckboxGroup.Label>
            <div className='flex flex-col gap-2 mt-1'>
              <Checkbox value='frontend'>フロントエンド</Checkbox>
              <Checkbox value='backend'>バックエンド</Checkbox>
              <Checkbox value='design'>デザイン</Checkbox>
              <Checkbox value='devops'>DevOps</Checkbox>
            </div>
            <CheckboxGroup.Description>
              1つ以上選択してください
            </CheckboxGroup.Description>
            {errors.interests && (
              <CheckboxGroup.Error>
                {errors.interests.message}
              </CheckboxGroup.Error>
            )}
          </CheckboxGroup.Root>
        )}
      />

      {/* 利用規約の同意 (Checkbox) */}
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
              利用規約に同意する
            </Checkbox>
            {errors.agreeToTerms && (
              <p className='text-sm text-red-600'>
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>
        )}
      />

      {/* 送信ボタン */}
      <Button type='submit' variant='primary' isPending={isSubmitting}>
        送信する
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
          'react-hook-form + zod バリデーションを使用した、mdkk-ui コンポーネントのフォームサンプル。TextField, TextArea, CheckboxGroup, Checkbox, Button を組み合わせたお問い合わせフォームの例。',
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
      <h2 className='text-xl font-bold mb-6'>お問い合わせフォーム</h2>
      <ContactForm />
    </div>
  ),
};

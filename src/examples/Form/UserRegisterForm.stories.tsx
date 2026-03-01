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
          'FORM_GUIDE.md に準拠したユーザー登録フォームの実装例。',
          '',
          '**FORM_GUIDE 準拠ポイント:**',
          '- 氏名は1フィールド（姓・名を分けない）',
          '- メールアドレスの再入力なし（確認メールで検証）',
          '- パスワード表示/非表示トグル付き（ラベル横に配置）',
          '- パスワード再入力なし',
          '- 電話番号は1フィールド（ハイフンは後処理）',
          '- 郵便番号は分割せず、ハイフン有無に両対応',
          '- 住所は分割しない（郵便番号から yubinbango で自動入力）',
          '- `onBlur` モードでリアルタイムバリデーション',
          '- エラーメッセージは具体的な修正方法を提示',
          '- 適切な `type` / `autoComplete` 属性',
          '- `noValidate` でブラウザネイティブバリデーションを無効化し zod に委譲',
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
      <h2 className='text-xl font-bold mb-2'>アカウント作成</h2>
      <p className='text-sm text-gray-600 mb-6'>
        必要な情報を入力して、アカウントを作成してください。
      </p>
      <UserRegisterForm />
    </div>
  ),
};

export const WithCustomSubmit: Story = {
  name: 'カスタム送信ハンドラ',
  render: () => (
    <div className='p-8'>
      <h2 className='text-xl font-bold mb-2'>アカウント作成</h2>
      <p className='text-sm text-gray-600 mb-6'>
        送信時にカスタムハンドラを実行する例です。
      </p>
      <UserRegisterForm
        onSubmit={async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          alert(
            `登録完了！\n\n氏名: ${data.name}\nメール: ${data.email}\n電話: ${data.phone}\n住所: ${data.address}`,
          );
        }}
      />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'destructive',
        'ghost',
        'outline',
      ],
      description: 'ボタンの視覚スタイル',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'ボタンのサイズ',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// ============================================
// 1. 基本 Variants
// ============================================

/** Primary — メインCTA。黒bg + 白text */
export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

/** Secondary — サブアクション。白bg + 黒text、border なし */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/** Accent — 強調CTA。赤bg + 白text */
export const Accent: Story = {
  args: {
    children: 'Accent',
    variant: 'accent',
  },
};

/** Destructive — 削除・危険なアクション。赤bg + 白text */
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

/** Outline — 控えめなアクション。白bg + 黒border */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

/** Ghost — 最も控えめ。透明bg、border なし */
export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

// ============================================
// 2. カラーパレット一覧
// ============================================

/** 全 Variant を横並びで比較 */
export const ColorPalette: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-8'>
      <section>
        <h3 className='text-lg font-bold mb-2 font-mono'>Variant Hierarchy</h3>
        <p className='text-sm text-muted-foreground mb-4 font-mono'>
          上位ほど目立つ。用途に応じて使い分ける。
        </p>
        <div className='flex flex-wrap items-center gap-4'>
          <Button variant='accent'>Accent (CTA)</Button>
          <Button variant='primary'>Primary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
        </div>
      </section>
    </div>
  ),
};

// ============================================
// 3. サイズ
// ============================================

/** 全サイズの比較 */
export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-end gap-4 p-4'>
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
      <Button size='xl'>Extra Large</Button>
    </div>
  ),
};

// ============================================
// 4. シャドウ
// ============================================

/** Brutalist Shadow — 右方向 */
export const ShadowRight: Story = {
  render: () => (
    <div className='flex flex-wrap gap-6 p-4'>
      <Button variant='primary' shadow='right-sm'>
        Shadow SM
      </Button>
      <Button variant='primary' shadow='right-md'>
        Shadow MD
      </Button>
      <Button variant='primary' shadow='right-lg'>
        Shadow LG
      </Button>
    </div>
  ),
};

/** Brutalist Shadow — 左方向 */
export const ShadowLeft: Story = {
  render: () => (
    <div className='flex flex-wrap gap-6 p-4'>
      <Button variant='primary' shadow='left-sm'>
        Left SM
      </Button>
      <Button variant='primary' shadow='left-md'>
        Left MD
      </Button>
      <Button variant='primary' shadow='left-lg'>
        Left LG
      </Button>
    </div>
  ),
};

/** Light Shadow — 暗い背景で使う白シャドウ */
export const ShadowLight: Story = {
  render: () => (
    <div className='bg-black p-6 rounded-lg flex flex-wrap gap-6'>
      <Button variant='accent' shadow='light-sm'>
        Light SM
      </Button>
      <Button variant='accent' shadow='light-md'>
        Light MD
      </Button>
      <Button variant='accent' shadow='light-lg'>
        Light LG
      </Button>
    </div>
  ),
};

// ============================================
// 5. インタラクション
// ============================================

/** Press — クリック時にシャドウが消えて押し込まれる */
export const InteractionPress: Story = {
  args: {
    children: 'Press me',
    variant: 'primary',
    shadow: 'right-lg',
    interactive: 'press',
    size: 'lg',
  },
};

/** Hover — ホバー時にシャドウが消えて押し込まれる */
export const InteractionHover: Story = {
  args: {
    children: 'Hover me',
    variant: 'accent',
    shadow: 'right-lg',
    interactive: 'hover',
    size: 'lg',
  },
};

// ============================================
// 6. 状態
// ============================================

/** Disabled — 操作不可状態 */
export const Disabled: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 p-4'>
      <Button isDisabled>Primary</Button>
      <Button variant='secondary' isDisabled>
        Secondary
      </Button>
      <Button variant='accent' isDisabled>
        Accent
      </Button>
      <Button variant='outline' isDisabled>
        Outline
      </Button>
      <Button variant='ghost' isDisabled>
        Ghost
      </Button>
    </div>
  ),
};

/** Loading — 処理中状態 */
export const Loading: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 p-4'>
      <Button isPending>Primary</Button>
      <Button variant='secondary' isPending>
        Secondary
      </Button>
      <Button variant='accent' isPending>
        Accent
      </Button>
    </div>
  ),
};

// ============================================
// 7. レイアウト
// ============================================

/** Full Width — 親幅いっぱいに広がるボタン */
export const FullWidth: Story = {
  render: () => (
    <div className='w-80 space-y-3'>
      <Button fullWidth>Full Width Primary</Button>
      <Button variant='accent' fullWidth>
        Full Width Accent
      </Button>
      <Button variant='outline' fullWidth>
        Full Width Outline
      </Button>
    </div>
  ),
};

// ============================================
// 8. 実用パターン
// ============================================

/** 典型的なフォームアクション */
export const FormActions: Story = {
  render: () => (
    <div className='flex gap-3 p-4'>
      <Button variant='primary'>保存</Button>
      <Button variant='outline'>キャンセル</Button>
    </div>
  ),
};

/** 危険なアクションの確認 */
export const DangerZone: Story = {
  render: () => (
    <div className='flex gap-3 p-4 border-2 border-destructive rounded-md'>
      <div className='flex-1'>
        <p className='font-bold text-sm'>アカウント削除</p>
        <p className='text-xs text-muted-foreground'>
          この操作は取り消せません
        </p>
      </div>
      <Button variant='destructive'>削除する</Button>
    </div>
  ),
};

/** CTA セクション */
export const CTASection: Story = {
  render: () => (
    <div className='flex flex-col items-center gap-4 p-8'>
      <Button variant='accent' size='xl' shadow='right-lg' interactive='press'>
        今すぐ始める
      </Button>
      <Button variant='ghost' size='sm'>
        詳しく見る →
      </Button>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Badge',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'accent', 'destructive', 'outline'],
      description: 'バッジの視覚スタイル',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'バッジのサイズ',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

// ============================================
// 1. 基本 Variants
// ============================================

/** Default — 黒bg + 白text */
export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

/** Secondary — 白bg + 黒text、border なし */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/** Accent — 赤bg + 白text */
export const Accent: Story = {
  args: {
    children: 'Accent',
    variant: 'accent',
  },
};

/** Destructive — 赤bg + 白text */
export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

/** Outline — 白bg + 黒border */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

// ============================================
// 2. バリアント一覧
// ============================================

/** 全 Variant を横並びで比較 */
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-3 p-4'>
      <Badge variant='default'>Default</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='accent'>Accent</Badge>
      <Badge variant='destructive'>Destructive</Badge>
      <Badge variant='outline'>Outline</Badge>
    </div>
  ),
};

// ============================================
// 3. サイズ
// ============================================

/** 全サイズの比較 */
export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-3 p-4'>
      <Badge size='sm'>Small</Badge>
      <Badge size='md'>Medium</Badge>
      <Badge size='lg'>Large</Badge>
    </div>
  ),
};

// ============================================
// 4. 実用パターン
// ============================================

/** ステータス表示 */
export const StatusLabels: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-3 p-4'>
      <Badge variant='accent'>NEW</Badge>
      <Badge variant='default'>公開中</Badge>
      <Badge variant='outline'>下書き</Badge>
      <Badge variant='destructive'>非公開</Badge>
      <Badge variant='secondary'>アーカイブ</Badge>
    </div>
  ),
};

/** カウント表示 */
export const Counts: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-4 p-4'>
      <div className='flex items-center gap-1.5'>
        <span className='text-sm font-mono'>通知</span>
        <Badge size='sm' variant='accent'>
          3
        </Badge>
      </div>
      <div className='flex items-center gap-1.5'>
        <span className='text-sm font-mono'>メッセージ</span>
        <Badge size='sm' variant='default'>
          12
        </Badge>
      </div>
      <div className='flex items-center gap-1.5'>
        <span className='text-sm font-mono'>タスク</span>
        <Badge size='sm' variant='outline'>
          99+
        </Badge>
      </div>
    </div>
  ),
};

/** タグ表示 */
export const Tags: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2 p-4'>
      <Badge variant='outline' size='sm'>
        React
      </Badge>
      <Badge variant='outline' size='sm'>
        TypeScript
      </Badge>
      <Badge variant='outline' size='sm'>
        Tailwind CSS
      </Badge>
      <Badge variant='outline' size='sm'>
        Storybook
      </Badge>
    </div>
  ),
};

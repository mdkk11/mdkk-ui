import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '@/components/AspectRatio';
import { Button } from '../Button';
import { Story, type StorySet } from './index';

// モックデータ: StorySet
const mockStorySet: StorySet = {
  id: 'story-set-1',
  title: '開発ログ: 2024-01-01',
  thumbnail:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  stories: [
    {
      id: 'story-1',
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
      duration: 3000,
    },
    {
      id: 'story-2',
      type: 'markdown',
      content: '# コーディング中\n\n今日は新機能の実装をしています。',
      backgroundColor: '#1a202c',
      duration: 5000,
    },
    {
      id: 'story-3',
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
      duration: 3000,
    },
  ],
};

const meta: Meta<typeof Story> = {
  component: Story,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type StoryObjType = StoryObj<typeof Story>;

/**
 * 基本的な使用方法（フルスクリーンモード）
 * デフォルトではサムネイルが表示され、クリックするとフルスクリーンでストーリーが開きます。
 */
export const Default: StoryObjType = {
  render: (args) => (
    <div className='w-[300px]'>
      <Story {...args}>
        <AspectRatio ratio={9 / 16}>
          <Story.Trigger />
          <Story.Overlay />
          <Story.Content>
            <Story.Header />
            <Story.ProgressBar />
            <Story.Body />
            <Story.Navigation />
          </Story.Content>
        </AspectRatio>
      </Story>
    </div>
  ),
  args: {
    storySet: mockStorySet,
    options: {
      displayMode: 'fullscreen',
    },
  },
};

/**
 * インライン表示モード
 * 親要素の中に埋め込んで再生します。
 * `options.displayMode: 'inline'` を指定します。
 */
export const Inline: StoryObjType = {
  render: (args) => (
    <div className='w-[300px]'>
      <Story {...args}>
        <AspectRatio ratio={9 / 16}>
          <Story.Trigger />
          <Story.Content>
            <Story.Header />
            <Story.ProgressBar />
            <Story.Body />
            <Story.Navigation />
          </Story.Content>
        </AspectRatio>
      </Story>
    </div>
  ),
  args: {
    storySet: mockStorySet,
    options: {
      displayMode: 'inline',
    },
  },
};

/**
 * カスタムトリガー
 * `<Story.Trigger>` の中に要素を配置することで、任意のボタンなどをトリガーにできます。
 */
export const CustomTrigger: StoryObjType = {
  render: (args) => (
    <Story {...args}>
      <Story.Trigger>
        <Button type='button'>ストーリーを見る</Button>
      </Story.Trigger>

      <Story.Overlay />

      {/* 
        Triggerがサムネイルを持たない場合、アスペクト比を維持するラッパーの外に書くか、
        Content側でアスペクト比を持つように構成します。
        ここではフルスクリーンモードなので Content 内でスタイルが当たります。
      */}
      <Story.Content>
        <Story.Header />
        <Story.ProgressBar />
        <Story.Body />
        <Story.Navigation />
      </Story.Content>
    </Story>
  ),
  args: {
    storySet: mockStorySet,
  },
};

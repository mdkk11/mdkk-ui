import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '@/components/AspectRatio';
import { Button } from '../Button';
import { Story, type StorySet } from './index';

// Mock StorySet data for visual preview.
const mockStorySet: StorySet = {
  id: 'story-set-1',
  title: 'Dev Log: 2024-01-01',
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
      content: '# Coding Session\n\nToday we are implementing a new feature.',
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
  title: 'Components/Story',
  component: Story,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type StoryObjType = StoryObj<typeof Story>;

/**
 * Basic usage in fullscreen mode.
 * A thumbnail is shown by default, and clicking opens the story viewer.
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
 * Inline mode for embedded playback in the parent layout.
 * Set `options.displayMode: 'inline'`.
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
 * Custom trigger composition.
 * You can place any element inside `<Story.Trigger>`.
 */
export const CustomTrigger: StoryObjType = {
  render: (args) => (
    <Story {...args}>
      <Story.Trigger>
        <Button type='button'>Open story</Button>
      </Story.Trigger>

      <Story.Overlay />

      {/*
        If Trigger does not render a thumbnail, keep aspect ratio either:
        1) in a wrapper around trigger/content, or
        2) inside content itself.
        This example uses fullscreen mode, so content controls its layout.
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

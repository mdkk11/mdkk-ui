import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen } from 'storybook/test';
import { AspectRatio } from '@/components/AspectRatio';
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

const meta = {
  title: 'Components/Story',
  component: Story,
  parameters: {
    layout: 'centered',
    a11y: {
      test: 'error',
      options: {
        rules: {
          'image-redundant-alt': { enabled: false },
        },
      },
    },
  },
  tags: ['autodocs'],
  args: {
    storySet: mockStorySet,
    options: {
      displayMode: 'fullscreen',
    },
  },
} satisfies Meta<typeof Story>;

export default meta;
type StoryType = StoryObj<typeof meta>;

/**
 * Basic usage in fullscreen mode.
 * A thumbnail is shown by default, and clicking opens the story viewer.
 */
export const Default: StoryType = {
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
};

/**
 * Inline mode for embedded playback in the parent layout.
 * Set `options.displayMode: 'inline'`.
 */
export const Inline: StoryType = {
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
    options: {
      displayMode: 'inline',
    },
  },
};

/**
 * Custom trigger composition.
 * You can place any element inside `<Story.Trigger>`.
 */
export const CustomTrigger: StoryType = {
  render: (args) => (
    <Story {...args}>
      <Story.Trigger>
        <span className='inline-flex rounded-none border-[var(--brutal-border-subtle)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'>
          Open story
        </span>
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
    options: {
      displayMode: 'fullscreen',
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open story' }));
    await expect(screen.getByRole('button', { name: 'Close' })).toBeVisible();
  },
};

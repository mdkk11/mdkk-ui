export type StoryType = 'image' | 'markdown';

export interface Story {
  id: string;
  type: StoryType;
  content: string;
  backgroundColor?: string;
  duration?: number; // ミリ秒
  createdAt?: Date;
}

export interface StorySet {
  id: string;
  title: string;
  thumbnail?: string;
  stories: Story[];
}

export interface StoryViewerOptions {
  autoPlay: boolean;
  defaultImageDuration: number;
  defaultMarkdownDuration: number;
  loop: boolean;
  enableKeyboardNavigation: boolean;
  displayMode: 'fullscreen' | 'inline';
  aspectRatio: number;
}

export const defaultOptions: StoryViewerOptions = {
  autoPlay: true,
  defaultImageDuration: 3000,
  defaultMarkdownDuration: 5000,
  loop: false,
  enableKeyboardNavigation: true,
  displayMode: 'fullscreen',
  aspectRatio: 9 / 16,
};

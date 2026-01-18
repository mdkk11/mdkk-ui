'use client';

import { StoryBody } from './StoryBody';

import { StoryContent } from './StoryContent';
import { StoryHeader } from './StoryHeader';
import { StoryNavigation } from './StoryNavigation';
import { StoryOverlay } from './StoryOverlay';
import { StoryProgressBar } from './StoryProgressBar';
import { StoryRoot } from './StoryRoot';
import { StoryTrigger } from './StoryTrigger';

export const Story = Object.assign(StoryRoot, {
  Trigger: StoryTrigger,
  Content: StoryContent,
  Overlay: StoryOverlay,
  Header: StoryHeader,
  Body: StoryBody,
  ProgressBar: StoryProgressBar,
  Navigation: StoryNavigation,
});

export { defaultOptions } from './StoryRoot';
export type { StorySet, StoryViewerOptions } from './types';

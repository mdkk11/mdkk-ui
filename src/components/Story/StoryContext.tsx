'use client';

import { createContext, useContext } from 'react';
import type { StorySet, StoryViewerOptions } from './types';

export type StoryView = 'thumbnail' | 'inlinePlayer' | 'fullscreenPlayer';

interface StoryContextType {
  storySet: StorySet;
  options: StoryViewerOptions;
  currentStoryIndex: number;
  progress: number;
  isPaused: boolean;
  view: StoryView;
  isOpen: boolean;

  // Actions
  onOpen: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onTogglePause: () => void;
  onJumpTo: (index: number) => void;
}

export const StoryContext = createContext<StoryContextType | null>(null);

export const useStoryContext = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStoryContext must be used within a StoryProvider');
  }
  return context;
};

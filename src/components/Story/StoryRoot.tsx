'use client';

import { useState } from 'react';
import { useStoryPlayback } from './hooks/useStoryPlayback';
import { StoryContext, type StoryView } from './StoryContext';
import type { StorySet, StoryViewerOptions } from './types';

export const defaultOptions: StoryViewerOptions = {
  autoPlay: true,
  defaultImageDuration: 3000,
  defaultMarkdownDuration: 5000,
  loop: false,
  enableKeyboardNavigation: true,
  displayMode: 'fullscreen',
  aspectRatio: 9 / 16,
};

interface StoryProps {
  storySet: StorySet;
  options?: Partial<StoryViewerOptions>;
  children: React.ReactNode;
}

export const StoryRoot = ({
  storySet,
  options: userOptions,
  children,
}: StoryProps) => {
  const options = { ...defaultOptions, ...userOptions };
  const [view, setView] = useState<StoryView>('thumbnail');

  const handleOpen = () => {
    setView(
      options.displayMode === 'inline' ? 'inlinePlayer' : 'fullscreenPlayer',
    );
  };

  const handleClose = () => {
    setView('thumbnail');
  };

  const {
    currentStoryIndex,
    progress,
    isPaused,
    next,
    prev,
    togglePause,
    jumpTo,
  } = useStoryPlayback(storySet, options, view !== 'thumbnail', handleClose);

  return (
    <StoryContext.Provider
      value={{
        storySet,
        options,
        currentStoryIndex,
        progress,
        isPaused,
        view,
        isOpen: view !== 'thumbnail',
        onOpen: handleOpen,
        onClose: handleClose,
        onNext: next,
        onPrev: prev,
        onTogglePause: togglePause,
        onJumpTo: jumpTo,
      }}
    >
      <div className='relative w-full'>{children}</div>
    </StoryContext.Provider>
  );
};

'use client';

import type React from 'react';
import { useState } from 'react';
import { cn } from '@/design-system/utils';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useStoryPlayback } from './hooks/useStoryPlayback';
import { StoryContext, type StoryView, useStoryContext } from './StoryContext';
import { StoryHeaderPrimitive } from './StoryHeaderPrimitive';
import { StoryItemPrimitive } from './StoryItemPrimitive';
import { StoryListItem } from './StoryListItem';
import { StoryNavigationPrimitive } from './StoryNavigationPrimitive';
import { StoryProgressBarPrimitive } from './StoryProgressBarPrimitive';
import {
  defaultOptions,
  type StorySet,
  type StoryViewerOptions,
} from './types';

interface StoryProps {
  storySet: StorySet;
  options?: Partial<StoryViewerOptions>;
  children: React.ReactNode;
}

interface StoryTriggerProps {
  children?: React.ReactNode;
}

interface StoryContentProps {
  children: React.ReactNode;
  className?: string;
}

const StoryRoot = ({
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

const StoryTrigger = ({ children }: StoryTriggerProps) => {
  const { storySet, onOpen, isOpen } = useStoryContext();

  if (children) {
    return (
      <button
        type='button'
        onClick={onOpen}
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        aria-haspopup='dialog'
        className='inline-block cursor-pointer border-0 bg-transparent p-0 text-inherit'
      >
        <div style={{ pointerEvents: 'none' }}>{children}</div>
      </button>
    );
  }

  return <StoryListItem storySet={storySet} index={0} onSelect={onOpen} />;
};

const StoryContent = ({ children, className }: StoryContentProps) => {
  const { view, onClose, options, onNext, onPrev, onTogglePause } =
    useStoryContext();

  useKeyboardControls(
    options.enableKeyboardNavigation && view !== 'thumbnail',
    onNext,
    onPrev,
    onClose,
    onTogglePause,
  );

  if (view === 'thumbnail') return null;

  const isFullscreen = view === 'fullscreenPlayer';

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 flex items-center justify-center pointer-events-none'
    : 'absolute inset-0 z-20 overflow-hidden rounded-lg bg-black';

  const contentClasses = cn(
    'relative h-full w-full overflow-hidden bg-black pointer-events-auto',
    isFullscreen && 'md:max-w-md md:h-[90vh] md:rounded-lg',
    className,
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: handling background click custom
    // biome-ignore lint/a11y/useKeyWithClickEvents: handled by keyboard hook
    <div
      className={containerClasses}
      onClick={isFullscreen ? onClose : undefined}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: stop propagation for inner panel */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: interaction handled on wrapper/buttons */}
      <div
        className={contentClasses}
        onClick={(event) => event.stopPropagation()}
        style={
          isFullscreen ? { aspectRatio: `${options.aspectRatio}` } : undefined
        }
      >
        {children}
      </div>
    </div>
  );
};

const StoryOverlay = () => {
  const { view, onClose } = useStoryContext();

  if (view !== 'fullscreenPlayer') return null;

  return (
    <div
      className='fixed inset-0 z-50 animate-in fade-in bg-black/90 backdrop-blur-sm duration-200'
      onClick={onClose}
      aria-hidden='true'
    />
  );
};

const StoryHeader = () => {
  const {
    storySet,
    currentStoryIndex,
    options,
    isPaused,
    onTogglePause,
    onClose,
  } = useStoryContext();

  return (
    <StoryHeaderPrimitive
      title={storySet.title}
      currentIndex={currentStoryIndex}
      totalCount={storySet.stories.length}
      autoPlay={options.autoPlay}
      isPaused={isPaused}
      onTogglePause={onTogglePause}
      onClose={onClose}
    />
  );
};

const StoryBody = () => {
  const { storySet, currentStoryIndex } = useStoryContext();
  const currentStory = storySet.stories[currentStoryIndex];

  return <StoryItemPrimitive story={currentStory} />;
};

const StoryProgressBar = () => {
  const { storySet, currentStoryIndex, progress, onJumpTo } = useStoryContext();

  return (
    <StoryProgressBarPrimitive
      count={storySet.stories.length}
      currentIndex={currentStoryIndex}
      progress={progress}
      onJump={onJumpTo}
    />
  );
};

const StoryNavigation = () => {
  const { onNext, onPrev } = useStoryContext();

  return <StoryNavigationPrimitive onNext={onNext} onPrev={onPrev} />;
};

export const Story = Object.assign(StoryRoot, {
  Trigger: StoryTrigger,
  Content: StoryContent,
  Overlay: StoryOverlay,
  Header: StoryHeader,
  Body: StoryBody,
  ProgressBar: StoryProgressBar,
  Navigation: StoryNavigation,
});

export type { StorySet, StoryViewerOptions } from './types';
export { defaultOptions } from './types';

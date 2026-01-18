'use client';

import { useStoryContext } from './StoryContext';
import { StoryHeaderPrimitive } from './StoryHeaderPrimitive';

export const StoryHeader = () => {
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

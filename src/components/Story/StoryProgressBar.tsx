'use client';

import { useStoryContext } from './StoryContext';
import { StoryProgressBarPrimitive } from './StoryProgressBarPrimitive';

export const StoryProgressBar = () => {
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

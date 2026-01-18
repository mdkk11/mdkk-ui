'use client';

import { useStoryContext } from './StoryContext';
import { StoryItemPrimitive } from './StoryItemPrimitive';

export const StoryBody = () => {
  const { storySet, currentStoryIndex } = useStoryContext();
  const currentStory = storySet.stories[currentStoryIndex];

  return <StoryItemPrimitive story={currentStory} />;
};

'use client';

import { useStoryContext } from './StoryContext';
import { StoryNavigationPrimitive } from './StoryNavigationPrimitive';

export const StoryNavigation = () => {
  const { onNext, onPrev } = useStoryContext();

  return <StoryNavigationPrimitive onNext={onNext} onPrev={onPrev} />;
};

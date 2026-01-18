'use client';

import { useStoryContext } from './StoryContext';

export const StoryOverlay = () => {
  const { view, onClose } = useStoryContext();

  if (view !== 'fullscreenPlayer') return null;

  return (
    <div
      className='fixed inset-0 z-50 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200'
      onClick={onClose}
      aria-hidden='true'
    />
  );
};

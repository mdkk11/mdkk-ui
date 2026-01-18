'use client';

import type React from 'react';
import { useRef } from 'react';
import { usePress } from 'react-aria';
import { useStoryContext } from './StoryContext';
import { StoryListItemPrimitive } from './StoryListItemPrimitive';

interface StoryTriggerProps {
  children?: React.ReactNode;
}

export const StoryTrigger = ({ children }: StoryTriggerProps) => {
  const { storySet, onOpen, isOpen } = useStoryContext();
  const ref = useRef(null);

  const { pressProps } = usePress({
    onPress: onOpen,
  });

  if (children) {
    return (
      // biome-ignore lint/a11y/useSemanticElements: React Aria pattern - usePress requires wrapper element. role="button" provides proper ARIA semantics, matching React Aria Components' useButton behavior
      <div
        {...pressProps}
        ref={ref}
        role='button'
        tabIndex={0}
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        aria-haspopup='dialog'
        style={{
          display: 'inline-block',
          cursor: 'pointer',
        }}
      >
        <div style={{ pointerEvents: 'none' }}>{children}</div>
      </div>
    );
  }

  return (
    <StoryListItemPrimitive storySet={storySet} index={0} onSelect={onOpen} />
  );
};

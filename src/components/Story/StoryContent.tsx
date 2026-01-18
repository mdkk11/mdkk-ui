'use client';

import type React from 'react';
import { cn } from '@/design-system/utils';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useStoryContext } from './StoryContext';

interface StoryContentProps {
  children: React.ReactNode;
  className?: string;
}

export const StoryContent = ({ children, className }: StoryContentProps) => {
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
    ? 'fixed inset-0 z-50 flex items-center justify-center pointer-events-none' // pointer-events-none to let click pass to overlay
    : 'absolute inset-0 z-20 bg-black rounded-lg overflow-hidden';

  const contentClasses = cn(
    'relative w-full h-full bg-black overflow-hidden pointer-events-auto', // re-enable pointer events
    isFullscreen && 'md:max-w-md md:h-[90vh] md:rounded-lg md:shadow-2xl',
    className,
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: handling background click custom
    // biome-ignore lint/a11y/useKeyWithClickEvents: handled by hook or button
    <div
      className={containerClasses}
      onClick={isFullscreen ? onClose : undefined}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: stop propagation */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: logic */}
      <div
        className={contentClasses}
        onClick={(e) => e.stopPropagation()}
        style={
          isFullscreen ? { aspectRatio: `${options.aspectRatio}` } : undefined
        }
      >
        {children}
      </div>
    </div>
  );
};

import { useCallback, useEffect, useRef, useState } from 'react';
import type { StorySet, StoryViewerOptions } from '../types';

export const useStoryPlayback = (
  storySet: StorySet,
  options: StoryViewerOptions,
  isOpen: boolean,
  onClose: () => void,
) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);

  // Sync ref
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Duration helper
  const getCurrentDuration = useCallback(() => {
    const story = storySet.stories[currentStoryIndex];
    if (!story) return options.defaultImageDuration;
    return (
      story.duration ??
      (story.type === 'markdown'
        ? options.defaultMarkdownDuration
        : options.defaultImageDuration)
    );
  }, [currentStoryIndex, storySet, options]);

  // Navigation
  const next = useCallback(() => {
    if (currentStoryIndex < storySet.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose(); // Close at end
    }
  }, [currentStoryIndex, storySet.stories.length, onClose]);

  const prev = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0); // Reset at start
    }
  }, [currentStoryIndex]);

  const jumpTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < storySet.stories.length) {
        setCurrentStoryIndex(index);
        setProgress(0);
        setIsPaused(false);
      }
    },
    [storySet.stories.length],
  );

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStoryIndex(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen]);

  // Timer
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const intervalTime = 100;
    const timer = setInterval(() => {
      if (isPausedRef.current) return;

      const duration = getCurrentDuration();

      setProgress((prev) => {
        if (prev >= 100) {
          // Verify completion in next tick to avoid render loops or strict mode double-invocations causing skips
          return 100;
        }
        return prev + (intervalTime / duration) * 100;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, getCurrentDuration]);

  // Auto-advance when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && isOpen && !isPaused) {
      next();
    }
  }, [progress, isOpen, isPaused, next]);

  return {
    currentStoryIndex,
    progress,
    isPaused,
    next,
    prev,
    togglePause,
    jumpTo,
  };
};

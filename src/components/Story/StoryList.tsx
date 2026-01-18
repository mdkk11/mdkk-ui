'use client';

import type React from 'react';
import { StoryListPrimitive } from './StoryListPrimitive';

interface StoryListProps {
  children: React.ReactNode;
  className?: string;
}

export const StoryList = ({ children, className }: StoryListProps) => {
  return (
    <StoryListPrimitive className={className}>{children}</StoryListPrimitive>
  );
};

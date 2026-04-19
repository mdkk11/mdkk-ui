import { StoryListItemPrimitive as StoryListItemPrimitiveInternal } from './StoryListItemPrimitive';
import type { StorySet } from './types';

export interface StoryListItemProps {
  storySet: StorySet;
  index: number;
  onSelect?: (index: number) => void;
}

export const StoryListItem = (props: StoryListItemProps) => {
  return <StoryListItemPrimitiveInternal {...props} />;
};

/**
 * @deprecated Use `StoryListItem` instead.
 * Will be removed in the next major release.
 */
export const StoryListItemPrimitive = StoryListItem;

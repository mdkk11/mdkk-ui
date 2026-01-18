import { memo } from 'react';
import type { StorySet } from './types';

interface StoryListItemPrimitiveProps {
  storySet: StorySet;
  index: number;
  onSelect?: (index: number) => void;
}

export const StoryListItemPrimitive = memo(
  ({ storySet, index, onSelect }: StoryListItemPrimitiveProps) => {
    const getThumbnail = (set: StorySet): string => {
      // 画角のズレを防ぐため、最初のストーリーが画像ならそれを優先採用する
      const firstImageStory = set.stories.find((s) => s.type === 'image');
      if (firstImageStory) return firstImageStory.content;

      // 画像ストーリーがない場合のフォールバック
      if (set.thumbnail) return set.thumbnail;
      return '';
    };

    const thumbnailUrl = getThumbnail(storySet);
    const hasImageThumbnail = thumbnailUrl !== '';

    return (
      <button
        type='button'
        className='group relative bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer w-full h-full text-left p-0 border-none appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        onClick={() => onSelect?.(index)}
      >
        <div className='relative w-full h-full'>
          {hasImageThumbnail ? (
            <img
              width={500}
              height={500}
              src={thumbnailUrl}
              alt={storySet.title}
              className='w-full h-full object-cover'
              loading='lazy'
            />
          ) : (
            <div
              className='w-full h-full flex items-center justify-center p-4'
              style={{
                background:
                  storySet.stories[0]?.backgroundColor ||
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <span className='text-white font-black font-heading text-xl text-center uppercase leading-tight drop-shadow-md'>
                {storySet.title}
              </span>
            </div>
          )}
          <div className='absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors' />

          {/* Overlay Text */}
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12'>
            <span className='text-white font-bold font-mono text-sm uppercase tracking-wide'>
              {storySet.title}
            </span>
          </div>
        </div>
      </button>
    );
  },
);

StoryListItemPrimitive.displayName = 'StoryListItemPrimitive';

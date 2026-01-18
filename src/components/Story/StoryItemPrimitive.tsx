import { StoryMarkdownPrimitive } from './StoryMarkdownPrimitive';
import type { Story } from './types';

interface StoryItemPrimitiveProps {
  story: Story;
}

export const StoryItemPrimitive = ({ story }: StoryItemPrimitiveProps) => {
  return (
    <div className='relative w-full h-full'>
      {story.type === 'image' ? (
        <img
          width={500}
          height={500}
          src={story.content}
          alt='story'
          className='w-full h-full object-cover'
        />
      ) : (
        <div
          className='w-full h-full flex items-center justify-center overflow-y-auto'
          style={{
            background: story.backgroundColor || '#1a202c',
          }}
        >
          <StoryMarkdownPrimitive content={story.content} />
        </div>
      )}
    </div>
  );
};

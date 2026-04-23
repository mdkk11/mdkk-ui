import { Icon } from '../Icons';

interface StoryHeaderPrimitiveProps {
  title: string;
  currentIndex: number;
  totalCount: number;
  autoPlay: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  onClose: () => void;
}

export const StoryHeaderPrimitive = ({
  title,
  currentIndex,
  totalCount,
  autoPlay,
  isPaused,
  onTogglePause,
  onClose,
}: StoryHeaderPrimitiveProps) => {
  return (
    <div className='absolute top-4 left-3 right-3 flex items-center justify-between z-20 pointer-events-none'>
      <div className='flex items-center gap-2 pointer-events-auto'>
        <span className='text-white font-bold text-sm'>{title}</span>
        <span className='text-white/60 text-xs ml-1 font-mono'>
          {currentIndex + 1}/{totalCount}
        </span>
      </div>
      <div className='flex items-center gap-4 pointer-events-auto'>
        {autoPlay && (
          <button
            type='button'
            aria-label={isPaused ? 'Play' : 'Pause'}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePause();
            }}
            className='text-white hover:opacity-70 transition p-1'
          >
            {isPaused ? (
              <Icon type='play' isDecorative size='sm' />
            ) : (
              <Icon type='pause' isDecorative size='sm' />
            )}
          </button>
        )}
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className='text-white hover:opacity-70 transition p-1'
          aria-label='Close'
        >
          <Icon type='x' isDecorative size='md' />
        </button>
      </div>
    </div>
  );
};

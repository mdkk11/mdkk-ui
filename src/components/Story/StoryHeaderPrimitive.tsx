import { CloseIcon, PauseIcon, PlayIcon } from './icons';

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
        <span className='text-white font-bold text-sm drop-shadow-md'>
          {title}
        </span>
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
            {isPaused ? <PlayIcon /> : <PauseIcon />}
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
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

interface StoryNavigationPrimitiveProps {
  onNext: () => void;
  onPrev: () => void;
}

export const StoryNavigationPrimitive = ({
  onNext,
  onPrev,
}: StoryNavigationPrimitiveProps) => {
  return (
    <div className='absolute inset-0 z-10 flex'>
      <button
        type='button'
        className='flex-1 h-full cursor-pointer outline-none transition-colors'
        onClick={onPrev}
        aria-label='Previous story'
        title='Previous'
        style={{ WebkitTapHighlightColor: 'transparent' }}
      />
      <button
        type='button'
        className='flex-[2] h-full cursor-pointer outline-none transition-colors'
        onClick={onNext}
        aria-label='Next story'
        title='Next'
        style={{ WebkitTapHighlightColor: 'transparent' }}
      />
    </div>
  );
};

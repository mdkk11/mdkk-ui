import { useEffect } from 'react';

export const useKeyboardControls = (
  isEnabled: boolean,
  onNext: () => void,
  onPrev: () => void,
  onClose: () => void,
  onTogglePause: () => void,
) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'Escape':
          onClose();
          break;
        case ' ':
          e.preventDefault();
          onTogglePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled, onNext, onPrev, onClose, onTogglePause]);
};

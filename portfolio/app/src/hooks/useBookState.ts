import { useState, useCallback } from 'react';
import type { BookState, DeviceType, Orientation } from '@/types';

export function useBookState(device: DeviceType, orientation: Orientation) {
  const [state, setState] = useState<BookState>({
    currentPage: 0,
    totalPages: 6,
    isFlipping: false,
    isOpen: false,
    soundEnabled: false,
    device,
    orientation,
  });

  const setCurrentPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const setFlipping = useCallback((flipping: boolean) => {
    setState((prev) => ({ ...prev, isFlipping: flipping }));
  }, []);

  const setOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, isOpen: open }));
  }, []);

  const toggleSound = useCallback(() => {
    setState((prev) => {
      const newEnabled = !prev.soundEnabled;
      localStorage.setItem('portfolioSoundEnabled', String(newEnabled));
      return { ...prev, soundEnabled: newEnabled };
    });
  }, []);

  const initSound = useCallback(() => {
    const saved = localStorage.getItem('portfolioSoundEnabled');
    const enabled = saved === null ? true : saved === 'true';
    setState((prev) => ({ ...prev, soundEnabled: enabled }));
  }, []);

  return {
    state,
    setCurrentPage,
    setFlipping,
    setOpen,
    toggleSound,
    initSound,
  };
}

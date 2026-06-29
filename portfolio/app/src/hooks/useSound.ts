import { useRef, useCallback } from 'react';

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initialized = useRef(false);

  const init = useCallback(() => {
    if (!initialized.current) {
      audioRef.current = new Audio('/sounds/page-flip.mp3');
      audioRef.current.volume = 0.15;
      initialized.current = true;
    }
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  return { init, play };
}

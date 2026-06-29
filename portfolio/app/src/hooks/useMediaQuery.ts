import { useState, useEffect } from 'react';
import type { DeviceType, Orientation } from '@/types';

export function useMediaQuery(): { device: DeviceType; orientation: Orientation } {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [orientation, setOrientation] = useState<Orientation>('landscape');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice('mobile');
        setOrientation('portrait');
      } else if (width < 1024) {
        setDevice('tablet');
        setOrientation('portrait');
      } else {
        setDevice('desktop');
        setOrientation('landscape');
      }
    };

    checkDevice();
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(checkDevice, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return { device, orientation };
}

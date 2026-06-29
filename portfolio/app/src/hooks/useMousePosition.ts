import { useRef, useEffect, useCallback } from 'react';

interface MousePos {
  x: number;
  y: number;
}

export function useMousePosition(lerpFactor: number = 0.15) {
  const target = useRef<MousePos>({ x: 0, y: 0 });
  const current = useRef<MousePos>({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const listeners = useRef<((pos: MousePos) => void)[]>([]);

  const subscribe = useCallback((callback: (pos: MousePos) => void) => {
    listeners.current.push(callback);
    return () => {
      listeners.current = listeners.current.filter((l) => l !== callback);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * lerpFactor;
      current.current.y += (target.current.y - current.current.y) * lerpFactor;

      listeners.current.forEach((cb) => cb(current.current));
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerpFactor]);

  return { subscribe, current, target };
}

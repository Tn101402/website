import { useEffect, useRef, memo } from 'react';

const CustomCursor = memo(function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('button, a, [role="button"], input, textarea, select, .clickable')) {
        isHovering.current = true;
      }
    };

    const handleOut = () => {
      isHovering.current = false;
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (outerRef.current && innerRef.current) {
        const outerSize = isHovering.current ? 48 : 32;
        const innerSize = isHovering.current ? 10 : 6;
        const outerColor = isHovering.current ? 'rgba(114, 240, 209, 0.8)' : 'rgba(59, 183, 255, 0.6)';

        outerRef.current.style.transform = `translate(${pos.current.x - outerSize / 2}px, ${pos.current.y - outerSize / 2}px)`;
        outerRef.current.style.width = `${outerSize}px`;
        outerRef.current.style.height = `${outerSize}px`;
        outerRef.current.style.borderColor = outerColor;

        innerRef.current.style.transform = `translate(${pos.current.x - innerSize / 2}px, ${pos.current.y - innerSize / 2}px)`;
        innerRef.current.style.width = `${innerSize}px`;
        innerRef.current.style.height = `${innerSize}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(59, 183, 255, 0.6)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          mixBlendMode: isHovering.current ? 'difference' : 'normal',
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'rgba(59, 183, 255, 0.8)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  );
});

export default CustomCursor;

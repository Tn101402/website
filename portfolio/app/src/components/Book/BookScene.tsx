import { type ReactNode } from 'react';

interface BookSceneProps {
  children: ReactNode;
  bookRef: React.RefObject<HTMLDivElement | null>;
}

export default function BookScene({ children, bookRef }: BookSceneProps) {
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{
        perspective: '2000px',
        perspectiveOrigin: 'center center',
      }}
    >
      <div
        ref={bookRef}
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(59, 183, 255, 0.08))',
        }}
      >
        {/* Ground shadow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: -40,
            width: '90%',
            height: 40,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
        />
        {children}
      </div>
    </div>
  );
}

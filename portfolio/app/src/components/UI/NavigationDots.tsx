import { memo } from 'react';

interface NavigationDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

const NavigationDots = memo(function NavigationDots({ total, current, onDotClick }: NavigationDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none"
          style={{
            background: i === current ? '#3BB7FF' : 'rgba(32, 32, 32, 0.25)',
            border: i === current ? 'none' : '1px solid rgba(32, 32, 32, 0.15)',
            boxShadow: i === current ? '0 0 8px rgba(59, 183, 255, 0.5)' : 'none',
            transform: i === current ? 'scale(1.3)' : 'scale(1)',
          }}
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  );
});

export default NavigationDots;

import { useRef, useEffect, useState } from 'react';

interface TimelineItemProps {
  title: string;
  period: string;
  description: string;
  isLast?: boolean;
  delay?: number;
}

export default function TimelineItem({ title, period, description, isLast = false, delay = 0 }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div ref={itemRef} className="flex gap-4 relative">
      {/* Line and dot */}
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #3BB7FF, #72F0D1)',
            boxShadow: '0 0 8px rgba(59, 183, 255, 0.4)',
            animation: visible ? 'dotPulse 0.6s ease-out forwards' : 'none',
            opacity: visible ? 1 : 0,
          }}
        />
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-[40px]"
            style={{
              background: 'linear-gradient(to bottom, #3BB7FF, #72F0D1)',
              opacity: visible ? 1 : 0,
              transition: `opacity 0.5s ${delay + 200}ms ease`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className="pb-5"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-20px)',
          transition: `all 0.45s ${delay}ms ease`,
        }}
      >
        <h4 className="font-semibold text-base" style={{ color: '#202020', fontFamily: "'Inter', sans-serif" }}>
          {title}
        </h4>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(32,32,32,0.6)', letterSpacing: '0.02em' }}>
          {period}
        </p>
        <p className="text-sm mt-1" style={{ color: 'rgba(32,32,32,0.65)', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

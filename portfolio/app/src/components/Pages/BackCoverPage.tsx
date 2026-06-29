import { useState, useEffect, memo } from 'react';

const BackCoverPage = memo(function BackCoverPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full h-full leather-texture relative overflow-hidden flex flex-col items-center justify-center px-10 py-16 text-center"
      style={{
        borderRadius: '12px 3px 3px 12px',
        boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.3)',
      }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Opening quote mark */}
      <span
        className="pointer-events-none select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 72,
          color: 'rgba(212, 175, 55, 0.15)',
          lineHeight: 1,
          marginBottom: -16,
          opacity: visible ? 0.15 : 0,
          transform: visible ? 'scale(1)' : 'scale(0)',
          transition: 'all 0.5s ease-out',
        }}
      >
        &ldquo;
      </span>

      {/* Quote */}
      <p
        className="italic relative z-10 max-w-xs"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 400,
          color: 'rgba(212, 175, 55, 0.8)',
          lineHeight: 1.6,
          letterSpacing: '0.03em',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s 0.15s ease-out',
        }}
      >
        Design is not just what it looks like.
        <br />
        Design is how it communicates.
      </p>

      {/* Attribution */}
      <p
        className="mt-8 relative z-10"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(16px, 1.5vw, 20px)',
          fontWeight: 500,
          color: 'rgba(212, 175, 55, 0.6)',
          letterSpacing: '0.1em',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.5s 0.5s ease-out',
        }}
      >
        — LÊ ANH KIỆT
      </p>
    </div>
  );
});

export default BackCoverPage;

import { useRef, useEffect, useState, memo } from 'react';

interface CoverPageProps {
  showLightSweep?: boolean;
}

const CoverPage = memo(function CoverPage({ showLightSweep = false }: CoverPageProps) {
  const coverRef = useRef<HTMLDivElement>(null);
  const [lightDone, setLightDone] = useState(false);

  useEffect(() => {
    if (showLightSweep) {
      const timer = setTimeout(() => setLightDone(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showLightSweep]);

  return (
    <div
      ref={coverRef}
      className="w-full h-full leather-texture relative overflow-hidden"
      style={{
        borderRadius: '3px 12px 12px 3px',
        boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)',
      }}
    >
      {/* Spine */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: 20,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(30,24,36,0.8) 30%, rgba(40,32,48,0.4) 70%, transparent 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Light sweep effect */}
      {showLightSweep && !lightDone && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)',
            backgroundSize: '300% 100%',
            animation: 'lightSweep 800ms ease-out forwards',
          }}
        />
      )}

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full px-12 py-20 text-center relative z-10">
        <h1
          className="embossed-gold uppercase"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          PORTFOLIO
        </h1>

        <h2
          className="embossed-gold uppercase"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 600,
            letterSpacing: '0.12em',
            lineHeight: 1.2,
          }}
        >
          LÊ ANH KIỆT
        </h2>
      </div>
    </div>
  );
});

export default CoverPage;

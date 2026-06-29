import { memo } from 'react';

const GlassOverlay = memo(function GlassOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(59, 183, 255, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(114, 240, 209, 0.03) 0%, transparent 60%)
        `,
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
});

export default GlassOverlay;

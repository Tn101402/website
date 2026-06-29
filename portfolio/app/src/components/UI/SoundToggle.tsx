import { memo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const SoundToggle = memo(function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed z-50 top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none"
      style={{
        background: 'rgba(8, 18, 31, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(59, 183, 255, 0.2)',
        color: '#3BB7FF',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(59, 183, 255, 0.2)';
        e.currentTarget.style.boxShadow = '0 0 12px rgba(59, 183, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(8, 18, 31, 0.8)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      aria-label={enabled ? 'Mute sound' : 'Enable sound'}
    >
      {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
});

export default SoundToggle;

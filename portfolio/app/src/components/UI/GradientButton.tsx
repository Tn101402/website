import { type ReactNode, useCallback } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'default' | 'small';
}

export default function GradientButton({ children, onClick, className = '', size = 'default' }: GradientButtonProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: translate(-50%, -50%);
      animation: rippleExpand 600ms ease-out forwards;
      pointer-events: none;
    `;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.();
  }, [onClick]);

  const sizeClasses = size === 'small' ? 'px-4 py-2 text-xs' : 'px-7 py-3 text-sm';

  return (
    <button
      onClick={handleClick}
      className={`gradient-btn ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
}

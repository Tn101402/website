import { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/UI/GradientButton';
import NavigationDots from '@/components/UI/NavigationDots';

interface AboutPageProps {
  onNext: () => void;
  currentPage: number;
  onDotClick: (index: number) => void;
}

export default function AboutPage({ onNext, currentPage, onDotClick }: AboutPageProps) {
  const [visible, setVisible] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAvatarMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  }, []);

  const handleAvatarLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const contactInfo = [
    { label: 'Phone', value: '0363240235', href: 'tel:0363240235' },
    { label: 'Email', value: 'anhkietx500@gmail.com', href: 'mailto:anhkietx500@gmail.com' },
    { label: 'Year', value: '2002', href: undefined },
  ];

  return (
    <div className="w-full h-full paper-texture flex flex-col items-center px-6 py-8 md:px-10 md:py-10 overflow-y-auto">
      {/* Avatar */}
      <div
        ref={avatarRef}
        className="relative mb-6"
        onMouseMove={handleAvatarMove}
        onMouseLeave={handleAvatarLeave}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
          transition: 'all 0.5s ease-out',
        }}
      >
        {/* Glow */}
        <div
          className="absolute -inset-1 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #3BB7FF, #72F0D1, #8B5CF6)',
            filter: 'blur(8px)',
            opacity: 0.6,
            animation: 'avatarGlow 3s ease-in-out infinite',
          }}
        />
        {/* Image */}
        <img
          src="/images/avatar.jpg"
          alt="Lê Anh Kiệt"
          className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
          style={{
            border: '3px solid transparent',
            background: 'linear-gradient(135deg, #3BB7FF, #72F0D1) border-box',
            transform: `perspective(400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      </div>

      {/* Name */}
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(22px, 3vw, 32px)',
          fontWeight: 600,
          color: '#202020',
          letterSpacing: '0.08em',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.5s 0.1s ease-out',
        }}
      >
        LÊ ANH KIỆT
      </h2>

      {/* Title */}
      <p
        className="uppercase mt-1"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          color: 'rgba(32, 32, 32, 0.6)',
          letterSpacing: '0.1em',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.5s 0.15s ease-out',
        }}
      >
        Graphic Designer
      </p>

      {/* Contact Info */}
      <div
        className="w-full max-w-xs mt-6 flex flex-col gap-2"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.5s 0.2s ease-out',
        }}
      >
        {contactInfo.map((item, i) => (
          <div
            key={item.label}
            className="flex justify-between items-center py-1.5 border-b"
            style={{
              borderColor: 'rgba(32,32,32,0.08)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: `all 0.4s ${0.2 + i * 0.05}s ease-out`,
            }}
          >
            <span
              className="uppercase text-xs"
              style={{ color: 'rgba(32,32,32,0.5)', letterSpacing: '0.05em', fontFamily: "'Inter', sans-serif" }}
            >
              {item.label}
            </span>
            {item.href ? (
              <a
                href={item.href}
                className="text-sm hover:underline transition-colors"
                style={{ color: '#202020', fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#3BB7FF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#202020'; }}
              >
                {item.value}
              </a>
            ) : (
              <span className="text-sm" style={{ color: '#202020', fontFamily: "'Inter', sans-serif" }}>
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Bio */}
      <p
        className="mt-6 text-center max-w-xs italic"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: 'rgba(32, 32, 32, 0.75)',
          lineHeight: 1.7,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.5s 0.3s ease-out',
        }}
      >
        "Là một Graphic Designer yêu màu sắc, bố cục và những ý tưởng thú vị. Sau khoảng một thờ gian làm nghề, tôi đã quen với việc sáng tạo, nhận feedback và đôi khi chỉnh sửa đến vài chục phiên bản. Tôi vẫn đang học hỏi mỗi ngày để tạo ra những thiết kế vừa đẹp vừa hiệu quả."
      </p>

      <div className="flex-1 min-h-4" />

      {/* Navigation */}
      <div className="flex items-center justify-between w-full mt-4">
        <NavigationDots total={4} current={currentPage} onDotClick={onDotClick} />
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.4s 0.45s ease-out',
          }}
        >
          <GradientButton onClick={onNext} size="small">
            Next <ArrowRight size={14} />
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Mail, Phone, Facebook, Palette, Github } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import GradientButton from '@/components/UI/GradientButton';
import NavigationDots from '@/components/UI/NavigationDots';
import portfolioData from '@/data/portfolio.json';

interface ThankYouPageProps {
  onPrev: () => void;
  currentPage: number;
  onDotClick: (index: number) => void;
}

export default function ThankYouPage({ onPrev, currentPage, onDotClick }: ThankYouPageProps) {
  const [visible, setVisible] = useState(false);
  const contacts = portfolioData.contacts;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    Mail: <Mail size={18} style={{ color: '#3BB7FF' }} />,
    Phone: <Phone size={18} style={{ color: '#3BB7FF' }} />,
    Facebook: <Facebook size={18} style={{ color: '#3BB7FF' }} />,
    Palette: <Palette size={18} style={{ color: '#3BB7FF' }} />,
    Github: <Github size={18} style={{ color: '#3BB7FF' }} />,
  };

  const thankYouLetters = useMemo(() => 'THANK YOU'.split(''), []);

  return (
    <div className="w-full h-full paper-texture flex flex-col items-center justify-center px-5 py-6 md:px-8 md:py-8 text-center">
      {/* THANK YOU with letter wave */}
      <h2
        className="uppercase flex justify-center flex-wrap"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          color: '#202020',
          letterSpacing: '0.1em',
          marginBottom: 24,
        }}
      >
        {thankYouLetters.map((letter, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ${i * 0.03}s ease-out`,
              marginRight: letter === ' ' ? '0.3em' : '0.02em',
            }}
          >
            {letter}
          </span>
        ))}
      </h2>

      {/* Contact Links */}
      <div className="flex flex-col items-center gap-2.5 mb-6 w-full max-w-xs">
        {contacts.map((contact, i) => (
          <a
            key={contact.label}
            href={contact.url}
            target={contact.url.startsWith('http') ? '_blank' : undefined}
            rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-3 py-1 w-full justify-center transition-colors"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-15px)',
              transition: `all 0.35s ${0.3 + i * 0.07}s ease-out`,
              color: '#202020',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#3BB7FF'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#202020'; }}
          >
            {iconMap[contact.icon]}
            <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              {contact.value}
            </span>
          </a>
        ))}
      </div>

      {/* QR Code */}
      <div
        className="p-2 rounded-lg bg-white mb-5 transition-transform hover:scale-105"
        style={{
          border: '1px solid rgba(32,32,32,0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.4s 0.7s ease-out',
        }}
      >
        <QRCodeSVG
          value="https://anhkietx500.github.io/portfolio"
          size={80}
          level="M"
          bgColor="#ffffff"
          fgColor="#202020"
        />
      </div>

      {/* Signature */}
      <div
        style={{
          opacity: visible ? 0.7 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.5s 0.85s ease-out',
          marginBottom: 12,
        }}
      >
        <img
          src="/images/signature.png"
          alt="Signature"
          className="h-10 object-contain"
          style={{ filter: 'invert(0.2)' }}
        />
      </div>

      {/* Closing quote */}
      <p
        className="italic"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: 14,
          color: 'rgba(32, 32, 32, 0.45)',
          letterSpacing: '0.05em',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s 1s ease-out',
        }}
      >
        Thank you for reading my story.
      </p>

      <div className="flex-1 min-h-2" />

      {/* Navigation */}
      <div className="flex items-center justify-between w-full mt-3">
        <GradientButton onClick={onPrev} size="small">
          <ArrowLeft size={14} /> Prev
        </GradientButton>
        <NavigationDots total={4} current={currentPage} onDotClick={onDotClick} />
        <div className="w-20" />
      </div>
    </div>
  );
}

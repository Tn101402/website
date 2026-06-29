import { useRef, useEffect, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import type { HTMLFlipBookHandle } from 'react-pageflip';
import ParticleCanvas from '@/components/Effects/ParticleCanvas';
import GlassOverlay from '@/components/Effects/GlassOverlay';
import BookScene from '@/components/Book/BookScene';
import SoundToggle from '@/components/UI/SoundToggle';
import CoverPage from '@/components/Pages/CoverPage';
import AboutPage from '@/components/Pages/AboutPage';
import ProjectsPage from '@/components/Pages/ProjectsPage';
import AchievementsPage from '@/components/Pages/AchievementsPage';
import ThankYouPage from '@/components/Pages/ThankYouPage';
import BackCoverPage from '@/components/Pages/BackCoverPage';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useBookState } from '@/hooks/useBookState';
import { useSound } from '@/hooks/useSound';

function App() {
  const { device, orientation } = useMediaQuery();
  const { state, setCurrentPage, setOpen, toggleSound, initSound } = useBookState(device, orientation);
  const { init: initSoundEffect, play: playFlipSound } = useSound();

  const flipBookRef = useRef<HTMLFlipBookHandle>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [interactionInitiated, setInteractionInitiated] = useState(false);

  // Initialize sound on first interaction
  const handleInteraction = useCallback(() => {
    if (!interactionInitiated) {
      setInteractionInitiated(true);
      initSoundEffect();
      initSound();
    }
  }, [interactionInitiated, initSoundEffect, initSound]);

  // Book dimensions based on device
  const bookDims = {
    desktop: { width: 400, height: 560 },
    tablet: { width: 300, height: 420 },
    mobile: { width: 340, height: 480 },
  };
  const dims = bookDims[device] || bookDims.desktop;

  // Page flip handlers
  const handleFlip = useCallback((e: { data: number }) => {
    const pageIndex = e.data;
    setCurrentPage(pageIndex);
    if (state.soundEnabled) {
      playFlipSound();
    }
  }, [setCurrentPage, state.soundEnabled, playFlipSound]);

  const flipNext = useCallback(() => {
    handleInteraction();
    flipBookRef.current?.pageFlip().flipNext();
  }, [handleInteraction]);

  const flipPrev = useCallback(() => {
    handleInteraction();
    flipBookRef.current?.pageFlip().flipPrev();
  }, [handleInteraction]);

  const goToPage = useCallback((index: number) => {
    handleInteraction();
    flipBookRef.current?.pageFlip().flip(index);
  }, [handleInteraction]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleInteraction();
        flipBookRef.current?.pageFlip().flipNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handleInteraction();
        flipBookRef.current?.pageFlip().flipPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]);

  // Set book open immediately on mount
  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  // Particle count based on device
  const particleCount = device === 'desktop' ? 60 : device === 'tablet' ? 30 : 15;

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ background: '#08121F' }}
      onClick={handleInteraction}
    >
      {/* Background layers */}
      <ParticleCanvas count={particleCount} />
      <GlassOverlay />

      {/* Sound Toggle */}
      <SoundToggle enabled={state.soundEnabled} onToggle={toggleSound} />

      {/* Book Scene - Book already open */}
      <div className="relative z-10">
        <BookScene bookRef={bookRef}>
          <HTMLFlipBook
            ref={flipBookRef as React.RefObject<HTMLFlipBookHandle>}
            width={dims.width}
            height={dims.height}
            size="fixed"
            minCoverOpacity={0.3}
            drawShadow={true}
            flippingTime={800}
            startPage={1}
            usePortrait={device !== 'desktop'}
            startZIndex={10}
            autoSize={false}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={50}
            showPageCorners={true}
            onFlip={handleFlip}
            className="shadow-2xl"
            style={{ borderRadius: 8 }}
          >
            {/* Cover */}
            <div className="w-full h-full" style={{ borderRadius: '3px 12px 12px 3px', overflow: 'hidden' }}>
              <CoverPage />
            </div>

            {/* Page 1: About */}
            <div className="w-full h-full" style={{ borderRadius: '3px 0 0 3px', overflow: 'hidden', boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.1)' }}>
              <AboutPage
                onNext={flipNext}
                currentPage={state.currentPage}
                onDotClick={goToPage}
              />
            </div>

            {/* Page 2: Projects */}
            <div className="w-full h-full" style={{ borderRadius: '0 3px 3px 0', overflow: 'hidden', boxShadow: 'inset 3px 0 10px rgba(0,0,0,0.1)' }}>
              <ProjectsPage
                onNext={flipNext}
                onPrev={flipPrev}
                currentPage={state.currentPage}
                onDotClick={goToPage}
              />
            </div>

            {/* Page 3: Achievements */}
            <div className="w-full h-full" style={{ borderRadius: '3px 0 0 3px', overflow: 'hidden', boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.1)' }}>
              <AchievementsPage
                onNext={flipNext}
                onPrev={flipPrev}
                currentPage={state.currentPage}
                onDotClick={goToPage}
              />
            </div>

            {/* Page 4: Thank You */}
            <div className="w-full h-full" style={{ borderRadius: '0 3px 3px 0', overflow: 'hidden', boxShadow: 'inset 3px 0 10px rgba(0,0,0,0.1)' }}>
              <ThankYouPage
                onPrev={flipPrev}
                currentPage={state.currentPage}
                onDotClick={goToPage}
              />
            </div>

            {/* Back Cover */}
            <div className="w-full h-full" style={{ borderRadius: '12px 3px 3px 12px', overflow: 'hidden' }}>
              <BackCoverPage />
            </div>
          </HTMLFlipBook>
        </BookScene>
      </div>
    </div>
  );
}

export default App;

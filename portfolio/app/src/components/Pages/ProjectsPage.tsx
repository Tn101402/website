import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/UI/GlassCard';
import GradientButton from '@/components/UI/GradientButton';
import NavigationDots from '@/components/UI/NavigationDots';
import portfolioData from '@/data/portfolio.json';

interface ProjectsPageProps {
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  onDotClick: (index: number) => void;
}

const projectGalleries: Record<string, string[]> = {
  p1: [
    '/images/aeon/hamper.jpg',
    '/images/aeon/delica.jpg',
    '/images/aeon/confect.jpg',
    '/images/aeon/home-coordy.jpg',
  ],
  p2: [
    '/images/viva/combo-qua.png',
    '/images/viva/poster-01.jpg',
    '/images/viva/poster-02.jpg',
    '/images/viva/poster-03.jpg',
    '/images/viva/poster-04.jpg',
    '/images/viva/poster-05.jpg',
    '/images/viva/banner.png',
    '/images/viva/nen-thom.png',
    '/images/viva/logo-viva-fanix.jpg',
    '/images/viva/logo-viva-teach.jpg',
    '/images/viva/mockup-bit-mat.png',
  ],
  p3: [
    '/images/glam/GB-Senka.jpg',
    '/images/glam/GB-AN.jpg',
    '/images/glam/GB-DP.jpg',
    '/images/glam/MN-0211-01P16P.jpg',
    '/images/glam/MN-0211-02P3P.jpg',
    '/images/glam/MN-0211-04P05P.jpg',
    '/images/glam/MN-0211-06P07P.jpg',
    '/images/glam/MN-0211-08P09P.jpg',
    '/images/glam/MN-0211-10P11P.jpg',
    '/images/glam/MN-0211-12P13P.jpg',
    '/images/glam/MN-0211-14P15P.jpg',
  ],
};

export default function ProjectsPage({ onNext, onPrev, currentPage, onDotClick }: ProjectsPageProps) {
  const [visible, setVisible] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryTitle, setGalleryTitle] = useState('');
  const projects = portfolioData.projects;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const openGallery = (projectId: string, title: string) => {
    const images = projectGalleries[projectId] || [];
    if (images.length > 0) {
      setGalleryImages(images);
      setGalleryTitle(title);
      setGalleryIndex(0);
      setGalleryOpen(true);
    }
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  return (
    <>
      <div className="w-full h-full paper-texture flex flex-col px-5 py-6 md:px-8 md:py-8 overflow-y-auto">
        {/* Title */}
        <h2
          className="uppercase mb-5"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 600,
            color: '#202020',
            letterSpacing: '0.08em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.4s ease-out',
          }}
        >
          PROJECTS
        </h2>

        {/* Project Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 content-start">
          {projects.map((project, i) => (
            <GlassCard key={project.id} enableTilt={true} className="overflow-hidden p-0">
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transition: `all 0.5s ${0.1 + i * 0.1}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                }}
              >
                {/* Thumbnail */}
                <div
                  className="overflow-hidden cursor-pointer"
                  onClick={() => openGallery(project.id, project.name)}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    loading="lazy"
                    className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    className="font-semibold text-base"
                    style={{ color: '#202020', fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-xs mt-1 line-clamp-2"
                    style={{ color: 'rgba(32,32,32,0.65)', lineHeight: 1.5 }}
                  >
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[11px]"
                        style={{
                          background: 'rgba(59,183,255,0.08)',
                          color: 'rgba(32,32,32,0.6)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* View button */}
                  <button
                    onClick={() => openGallery(project.id, project.name)}
                    className="w-full mt-3 py-2 rounded-full text-xs font-medium transition-all hover:opacity-80"
                    style={{
                      background: 'linear-gradient(135deg, #3BB7FF 0%, #72F0D1 100%)',
                      color: '#08121F',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    View Gallery ({projectGalleries[project.id]?.length || 0} images)
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="flex-1 min-h-2" />

        {/* Navigation */}
        <div className="flex items-center justify-between w-full mt-3">
          <GradientButton onClick={onPrev} size="small">
            <ArrowLeft size={14} /> Prev
          </GradientButton>
          <NavigationDots total={4} current={currentPage} onDotClick={onDotClick} />
          <GradientButton onClick={onNext} size="small">
            Next <ArrowRight size={14} />
          </GradientButton>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'rgba(8, 18, 31, 0.95)', backdropFilter: 'blur(12px)' }}
          onClick={closeGallery}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18,
                color: '#F6F2E8',
                fontWeight: 600,
              }}
            >
              {galleryTitle}
            </h3>
            <button
              onClick={closeGallery}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#F6F2E8' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Image */}
          <div
            className="flex-1 flex items-center justify-center px-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.length > 1 && (
              <button
                onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#F6F2E8' }}
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <img
              src={galleryImages[galleryIndex]}
              alt={`${galleryTitle} - ${galleryIndex + 1}`}
              className="max-w-full max-h-[65vh] object-contain rounded-lg"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
            />

            {galleryImages.length > 1 && (
              <button
                onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#F6F2E8' }}
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Counter */}
          <div className="text-center py-2" style={{ color: 'rgba(246,242,232,0.5)', fontSize: 13 }}>
            {galleryIndex + 1} / {galleryImages.length}
          </div>

          {/* Thumbnail strip */}
          <div
            className="flex gap-2 px-6 pb-6 overflow-x-auto justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className="flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all"
                style={{
                  border: i === galleryIndex ? '2px solid #3BB7FF' : '2px solid transparent',
                  opacity: i === galleryIndex ? 1 : 0.5,
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

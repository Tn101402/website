import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Award, Briefcase, GraduationCap } from 'lucide-react';
import GradientButton from '@/components/UI/GradientButton';
import NavigationDots from '@/components/UI/NavigationDots';
import SkillBadge from '@/components/UI/SkillBadge';
import portfolioData from '@/data/portfolio.json';

interface AchievementsPageProps {
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  onDotClick: (index: number) => void;
}

export default function AchievementsPage({ onNext, onPrev, currentPage, onDotClick }: AchievementsPageProps) {
  const [visible, setVisible] = useState(false);
  const education = portfolioData.education;
  const workExperience = portfolioData.workExperience;
  const achievements = portfolioData.achievements;
  const skills = portfolioData.skills;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full paper-texture flex flex-col px-5 py-5 md:px-8 md:py-6 overflow-y-auto">
      {/* Title */}
      <h2
        className="uppercase mb-4 text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(18px, 2.2vw, 28px)',
          fontWeight: 600,
          color: '#202020',
          letterSpacing: '0.08em',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-15px)',
          transition: 'all 0.4s ease-out',
        }}
      >
        Education & Experience
      </h2>

      {/* Timeline Container */}
      <div className="flex-1 relative">
        {/* Central Timeline Line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
          style={{
            background: 'linear-gradient(to bottom, #3BB7FF, #72F0D1, #8B5CF6)',
            opacity: visible ? 0.4 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />

        {/* Timeline Items */}
        <div className="relative space-y-3">
          {/* Education */}
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="relative flex flex-col md:flex-row md:items-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ${0.1 + i * 0.1}s ease-out`,
              }}
            >
              {/* Left side (empty for education) */}
              <div className="hidden md:block md:w-1/2 md:pr-6" />

              {/* Center Dot */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #3BB7FF, #72F0D1)',
                    boxShadow: '0 0 12px rgba(59, 183, 255, 0.4)',
                  }}
                >
                  <GraduationCap size={14} color="white" />
                </div>
              </div>

              {/* Right side - Education card */}
              <div className="pl-10 md:pl-6 md:w-1/2">
                <div
                  className="rounded-xl p-3.5"
                  style={{
                    background: 'rgba(246, 242, 232, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(59, 183, 255, 0.12)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(59, 183, 255, 0.1)',
                        color: '#3BB7FF',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      Education
                    </span>
                    <span className="text-[10px]" style={{ color: 'rgba(32,32,32,0.45)' }}>
                      {edu.period}
                    </span>
                  </div>
                  <h4
                    className="font-semibold text-sm"
                    style={{ color: '#202020', fontFamily: "'Inter', sans-serif" }}
                  >
                    {edu.title}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(32,32,32,0.6)', lineHeight: 1.5 }}>
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Work Experience */}
          {workExperience.map((work, i) => (
            <div
              key={work.id}
              className="relative flex flex-col md:flex-row md:items-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ${0.3 + i * 0.12}s ease-out`,
              }}
            >
              {/* Left side - Work card */}
              <div className="hidden md:block md:w-1/2 md:pr-6 md:text-right">
                <div
                  className="rounded-xl p-3.5 inline-block text-left w-full"
                  style={{
                    background: 'rgba(246, 242, 232, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: work.period === 'Current role'
                      ? '1px solid rgba(114, 240, 209, 0.3)'
                      : '1px solid rgba(139, 92, 246, 0.12)',
                    boxShadow: work.period === 'Current role'
                      ? '0 4px 20px rgba(114, 240, 209, 0.1)'
                      : '0 4px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1 md:justify-end">
                    <span className="text-[10px]" style={{ color: 'rgba(32,32,32,0.45)' }}>
                      {work.period === 'Current role' ? 'Present' : 'Previous'}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: work.period === 'Current role'
                          ? 'rgba(114, 240, 209, 0.12)'
                          : 'rgba(139, 92, 246, 0.08)',
                        color: work.period === 'Current role' ? '#10B981' : '#8B5CF6',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {work.period === 'Current role' ? 'Current' : 'Past'}
                    </span>
                  </div>
                  <h4
                    className="font-semibold text-sm"
                    style={{ color: '#202020', fontFamily: "'Inter', sans-serif" }}
                  >
                    {work.company}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(32,32,32,0.65)' }}>
                    {work.position}
                  </p>
                  <p className="text-[11px] mt-1.5" style={{ color: 'rgba(32,32,32,0.55)', lineHeight: 1.5 }}>
                    {work.description}
                  </p>
                </div>
              </div>

              {/* Mobile: show card on right */}
              <div className="md:hidden pl-10">
                <div
                  className="rounded-xl p-3.5"
                  style={{
                    background: 'rgba(246, 242, 232, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: work.period === 'Current role'
                      ? '1px solid rgba(114, 240, 209, 0.3)'
                      : '1px solid rgba(139, 92, 246, 0.12)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase size={14} style={{ color: work.period === 'Current role' ? '#10B981' : '#8B5CF6' }} />
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: work.period === 'Current role'
                          ? 'rgba(114, 240, 209, 0.12)'
                          : 'rgba(139, 92, 246, 0.08)',
                        color: work.period === 'Current role' ? '#10B981' : '#8B5CF6',
                        fontWeight: 500,
                      }}
                    >
                      {work.period === 'Current role' ? 'Current' : 'Past'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm" style={{ color: '#202020' }}>
                    {work.company}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(32,32,32,0.65)' }}>
                    {work.position}
                  </p>
                  <p className="text-[11px] mt-1.5" style={{ color: 'rgba(32,32,32,0.55)', lineHeight: 1.5 }}>
                    {work.description}
                  </p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: work.period === 'Current role'
                      ? 'linear-gradient(135deg, #72F0D1, #10B981)'
                      : 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
                    boxShadow: work.period === 'Current role'
                      ? '0 0 12px rgba(114, 240, 209, 0.4)'
                      : '0 0 12px rgba(139, 92, 246, 0.3)',
                  }}
                >
                  <Briefcase size={14} color="white" />
                </div>
              </div>

              {/* Right side (empty for work) */}
              <div className="hidden md:block md:w-1/2 md:pl-6" />
            </div>
          ))}

          {/* Achievement */}
          <div
            className="relative flex flex-col md:flex-row md:items-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s 0.55s ease-out`,
            }}
          >
            {/* Left side (empty) */}
            <div className="hidden md:block md:w-1/2 md:pr-6" />

            {/* Center Dot */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.4)',
                }}
              >
                <Award size={14} color="white" />
              </div>
            </div>

            {/* Right side - Achievement */}
            <div className="pl-10 md:pl-6 md:w-1/2">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="rounded-xl p-3.5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(246, 242, 232, 0.9))',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 4px 16px rgba(212, 175, 55, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={14} style={{ color: '#D4AF37' }} />
                    <span
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(212, 175, 55, 0.12)',
                        color: '#D4AF37',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      Certification
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm" style={{ color: '#202020' }}>
                    {ach.title}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(32,32,32,0.6)' }}>
                    {ach.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div
          className="mt-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.5s 0.7s ease-out',
          }}
        >
          <p
            className="uppercase mb-2.5 text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              color: 'rgba(32,32,32,0.5)',
              letterSpacing: '0.12em',
            }}
          >
            Skills & Software
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill, i) => (
              <SkillBadge
                key={skill.name}
                name={skill.name}
                color={skill.color}
                delay={700 + i * 60}
              />
            ))}
          </div>
        </div>
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
  );
}

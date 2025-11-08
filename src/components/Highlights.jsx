import React from 'react';
import LogoLoop from './LogoLoop';
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";

const Highlights = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();
  const highlights = [
    {
      title: 'Engineering',
      description: 'Where innovation meets impact through technology, design, and real-world problem-solving.',
      bgColor: 'bg-[#4D84F7]',
      svg: '/engineering-bg.svg',
    },
    {
      title: 'Medical',
      description: 'Showcasing breakthroughs that blend compassion with cutting-edge healthcare innovation.',
      bgColor: 'bg-[#E371E3]',
      svg: '/medical-bg.svg',
    },
    {
      title: 'Arts & Science',
      description: 'Celebrating creativity, research, and interdisciplinary thinking that shape tomorrow\'s ideas.',
      bgColor: 'bg-[#4D84F7]',
      svg: '/arts-science-bg.svg',
    },
    {
      title: 'Management',
      description: 'Empowering future leaders to drive change, innovation, and entrepreneurial growth.',
      bgColor: 'bg-[#3E80BF]',
      svg: '/management-bg.svg',
    },
  ];

  const HighlightCard = ({ item, position }) => {
    return (
      <div className={`${item.bgColor} p-4 md:p-6 lg:p-8 w-full aspect-square flex flex-col justify-start items-start relative overflow-hidden`}>
        {/* Background SVG */}
        {position === 'engineering' && (
          <img 
            src={item.svg} 
            alt="" 
            className="absolute bottom-0 left-0 w-full h-auto"
          />
        )}
        {position === 'arts' && (
          <img 
            src={item.svg} 
            alt="" 
            className="absolute top-0 right-0 w-auto h-full"
          />
        )}
        {position === 'medical' && (
          <img 
            src={item.svg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {position === 'management' && (
          <img 
            src={item.svg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-base md:text-xl lg:text-2xl font-semibold font-clash-display text-white mb-1 md:mb-3 lg:mb-4 text-left drop-shadow-lg">
            {item.title}
          </h3>
          <p className="text-[10px] md:text-sm text-white font-clash-display leading-snug text-left drop-shadow-lg">
            {item.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="about" className={`w-full bg-white overflow-hidden relative ${
      sectionVisible ? 'fade-in-up-visible' : 'fade-in-up-hidden'
    }`} ref={sectionRef}>
      {/* Header Section */}
      <div className="px-5 md:px-8 lg:px-12 pt-8 md:pt-12 pb-8 md:pb-16 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="flex-1 w-full lg:w-auto">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light font-clash-display text-blue-500 mb-3 md:mb-6 lg:mb-8 leading-tight">
            Summit<br />Highlights
          </h2>
          <p className="text-xs md:text-lg lg:text-2xl text-black font-normal font-gilroy-light max-w-md leading-relaxed">
            Experience Kerala's largest student entrepreneurship platform with world-class speakers, hands-on workshops, and unparalleled networking opportunities.
          </p>
        </div>

        {/* Right Cards Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-3 lg:gap-4 w-full lg:w-150 lg:shrink-0" style={{ gridAutoColumns: 'minmax(0, 1fr)' }}>
          <HighlightCard item={highlights[0]} position="engineering" />
          <HighlightCard item={highlights[1]} position="medical" />
          <HighlightCard item={highlights[2]} position="arts" />
          <HighlightCard item={highlights[3]} position="management" />
        </div>
      </div>

      {/* Colored Blocks at Bottom */}
      <img 
        src="/hero-blocks.png" 
        alt="Decorative blocks" 
        className="w-full h-20 sm:h-24 object-cover"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full -mt-7 mb-10 -skew-y-2">
        <LogoLoop
          logos={[
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
          ]}
          speed={80}
          direction="left"
          logoHeight={20}
          gap={40}
          pauseOnHover={true}
          className="font-gilroy-bold bg-blue-600 py-5  text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </section>
  );
};

export default Highlights;
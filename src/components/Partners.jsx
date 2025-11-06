import React from 'react';
import LogoLoop from './LogoLoop';
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";

const Partners = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();

  // Ecosystem Partners
  const ecosystemPartners = [
    {
      node: <img src="/tie-logo.png" alt="TIE" className="h-10 md:h-25 object-contain" />,
      ariaLabel: "TIE"
    },
    {
      node: <img src="/kasaracode-logo.png" alt="Kasaracode" className="h-6 md:h-15 object-contain" />,
      ariaLabel: "Kasaracode"
    },
    {
      node: <img src="/tinkerhub-logo.png" alt="Tinkerhub" className="h-6 md:h-15 object-contain" />,
      ariaLabel: "Tinkerhub"
    },
    {
      node: <img src="/cpcri-logo.png" alt="CPCRI" className="h-13 md:h-30 object-contain" />,
      ariaLabel: "CPCRI"
    },
  ];

  // Startup Enablers
  const startupEnablers = [
    {
      node: <img src="/tiib-logo.png" alt="TIIB" className="h-10 md:h-20 object-contain" />,
      ariaLabel: "TIIB"
    },
    {
      node: <img src="/campusfund-logo.png" alt="Campus Fund" className="h-10 md:h-20 object-contain" />,
      ariaLabel: "Campus Fund"
    },
    {
      node: <img src="/1trepreneur-logo.png" alt="1trepreneur" className="h-10 md:h-20 object-contain" />,
      ariaLabel: "1trepreneur"
    },
  ];

  return (
    <section id="partners" className={`w-full bg-white overflow-hidden relative ${
      sectionVisible ? 'fade-in-up-visible' : 'fade-in-up-hidden'
    }`} ref={sectionRef}>
      {/* Header Section */}
      <div className="px-5 md:px-8 lg:px-12 pt-8 md:pt-12 pb-8 md:pb-16">
        {/* Left Content */}
        <div className="flex-1 w-full">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light font-clash-display text-blue-500 mb-3 md:mb-6 lg:mb-8 leading-tight">
            Our<br />Partners
          </h2>
          <p className="text-xs md:text-lg lg:text-2xl text-black font-normal font-gilroy-light max-w-md leading-relaxed">
            Grateful to our partners who make IEDC Summit 2025 possible through their unwavering support and commitment to innovation.
          </p>
        </div>
      </div>

      {/* Startup Enablers Section */}
      <div className="px-5 md:px-8 lg:px-12 pb-8 md:pb-12">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light font-clash-display text-black mb-4 md:mb-6">
          Startup Enablers
        </h3>
        <LogoLoop
          logos={startupEnablers}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          ariaLabel="Startup enabler logos"
        />
      </div>

      {/* Ecosystem Partners Section */} 
      <div className="px-5 md:px-8 lg:px-12 pb-8 md:pb-12">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light font-clash-display text-black mb-4 md:mb-6">
          Ecosystem Partners
        </h3>
        <LogoLoop
          logos={ecosystemPartners}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          ariaLabel="Ecosystem partner logos"
        />
      </div>
      
      {/* Colored Blocks at Bottom */}
      <img 
        src="/hero-blocks.png" 
        alt="Decorative blocks" 
        className="w-full h-20 sm:h-24 object-cover"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full -mt-7 mb-10 skew-y-2">
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
          className="font-gilroy-bold bg-blue-600 py-5 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </section>
  );
};

export default Partners;



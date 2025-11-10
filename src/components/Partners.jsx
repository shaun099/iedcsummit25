import React from "react";
import LogoLoop from "./LogoLoop";
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";

const Partners = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();

  // Ecosystem Partners
  const ecosystemPartners = [
    {
      node: (
        <img
          src="/tie-logo.png"
          alt="TIE"
          className="h-10 md:h-23 object-contain"
        />
      ),
      ariaLabel: "TIE",
    },
    {
      node: (
        <img
          src="/kasaracode-logo.png"
          alt="Kasaracode"
          className="h-6 md:h-11 object-contain"
        />
      ),
      ariaLabel: "Kasaracode",
    },
    {
      node: (
        <img
          src="/tinkerhub-logo.png"
          alt="Tinkerhub"
          className="h-6 md:h-11 object-contain"
        />
      ),
      ariaLabel: "Tinkerhub",
    },
    {
      node: (
        <img
          src="/cpcri-logo.png"
          alt="CPCRI"
          className="h-13 md:h-23 object-contain"
        />
      ),
      ariaLabel: "CPCRI",
    },
    {
      node: (
        <img
          src="/nammude-ksd-logo.png"
          alt="Nammude KSD"
          className="h-14 md:h-22 object-contain"
        />
      ),
      ariaLabel: "Nammude KSD",
    },
    {
      node: (
        <img
          src="/trest.png"
          alt="TrEST"
          className="h-10 md:h-22 object-contain"
        />
      ),
      ariaLabel: "TrEST",
    },
  ];

  // Startup Enablers
  const startupEnablers = [
    {
      node: (
        <img
          src="/tiib-logo.png"
          alt="TIIB"
          className="h-10 md:h-17 object-contain"
        />
      ),
      ariaLabel: "TIIB",
    },
    {
      node: (
        <img
          src="/campusfund-logo.png"
          alt="Campus Fund"
          className="h-10 md:h-17 object-contain"
        />
      ),
      ariaLabel: "Campus Fund",
    },
    {
      node: (
        <img
          src="/1trepreneur-logo.png"
          alt="1trepreneur"
          className="h-10 md:h-14 object-contain"
        />
      ),
      ariaLabel: "1trepreneur",
    },
  ];

  return (
    <section
      id="partners"
      className={`w-full bg-white overflow-hidden relative ${
        sectionVisible ? "fade-in-up-visible" : "fade-in-up-hidden"
      }`}
      ref={sectionRef}
    >
      {/* Powered By & Hosted By Section */}
      <div className="px-5 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 min-h-auto md:h-[45vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
          {/* Powered By */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light font-clash-display text-black mb-6 md:mb-8">
              Powered by
            </h3>
            <div className="flex items-start gap-8 md:gap-12">
              {/* KSUM */}
              <a
                href="https://www.startupmission.kerala.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="transition-transform duration-300 hover:scale-110 mb-3">
                  <img
                    src="/ksum-logo-black.png"
                    alt="KSUM"
                    className="h-16 md:h-24 lg:h-32 object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm lg:text-base font-gilroy-light text-black group-hover:text-blue-500 transition-colors duration-300 text-center">
                  Kerala Startup Mission
                </p>
              </a>

              {/* IEDC */}
              <a
                href="https://iedc.startupmission.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="transition-transform duration-300 hover:scale-110 mb-3">
                  <img
                    src="/iedc-logo-color.png"
                    alt="IEDC"
                    className="h-16 md:h-24 lg:h-32 object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm lg:text-base font-gilroy-light text-black group-hover:text-blue-500 transition-colors duration-300 text-center">
                  IEDC Kerala
                </p>
              </a>
            </div>
          </div>

          {/* Hosted By */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light font-clash-display text-black mb-6 md:mb-8">
              Hosted by
            </h3>
            <div className="flex items-start gap-8 md:gap-12">
              {/* LBS Institute */}
              <a
                href="https://www.lbscek.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="transition-transform duration-300 hover:scale-110 mb-3">
                  <img
                    src="/lbscek-logo-black.png"
                    alt="LBS Institute"
                    className="h-16 md:h-24 lg:h-32 object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm lg:text-base font-gilroy-light text-black group-hover:text-blue-500 transition-colors duration-300 text-center">
                  LBS College of Engineering, Kasaragod
                </p>
              </a>

              {/* CUK */}
              <a
                href="https://www.cukerala.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="transition-transform duration-300 hover:scale-110 mb-3">
                  <img
                    src="/cuk-logo.svg"
                    alt="CUK"
                    className="h-16 md:h-24 lg:h-32 object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm lg:text-base font-gilroy-light text-black group-hover:text-blue-500 transition-colors duration-300 text-center">
                  Central University of Kerala
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="px-5 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-16 ">
        {/* Left Content */}
        <div className="flex-1 w-full text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light font-clash-display text-blue-500 mb-3 md:mb-6 lg:mb-8 leading-tight ">
            Our Partners
          </h2>
          <p className="text-xs md:text-lg lg:text-2xl text-black font-light font-gilroy-light w-full leading-relaxed">
            Grateful to our partners who make IEDC Summit 2025 possible through
            their unwavering support and commitment to innovation.
          </p>
        </div>
      </div>

      {/* Startup Enablers Section */}
      <div className="px-5 md:px-8 lg:px-12 pb-8 md:pb-12 overflow-y-hiiden">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light font-clash-display text-black mb-4 md:mb-6 text-center">
          Startup Enablers
        </h3>
        <LogoLoop
          logos={startupEnablers}
          speed={60}
          direction="left"
          logoHeight={75}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          ariaLabel="Startup enabler logos"
          className="overflow-y-hidden"
        />
      </div>

      {/* Ecosystem Partners Section */}
      <div className="px-5 md:px-8 lg:px-12 pb-8 md:pb-12 overflow-y-hidden">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light font-clash-display text-black mb-4 md:mb-6 text-center">
          Ecosystem Partners
        </h3>
        <LogoLoop
          logos={ecosystemPartners}
          speed={60}
          direction="right"
          logoHeight={75}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          ariaLabel="Ecosystem partner logos"
          className="overflow-y-hidden"
        />
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
            { text: "IEDC SUMMIT 2025" },
            { text: "IEDC SUMMIT 2025" },
            { text: "IEDC SUMMIT 2025" },
            { text: "IEDC SUMMIT 2025" },
            { text: "IEDC SUMMIT 2025" },
            { text: "IEDC SUMMIT 2025" },
            { text: "IEDC SUMMIT 2025" },
            { text: "IEDC SUMMIT 2025" },
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

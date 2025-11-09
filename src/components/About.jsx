import React from "react";
import gridImage from "../assets/grid.svg";
import ellipse_group from "../assets/ellipse_group.svg";
import LogoLoop from "./LogoLoop";
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";

const About = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();
  const { ref: bottomRef, isVisible: bottomVisible } = useScrollFadeInUp();

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className={`w-full px-5 md:px-16 lg:px-20 py-16 md:py-24 bg-white relative overflow-hidden ${
          sectionVisible ? "fade-in-up-visible" : "fade-in-up-hidden"
        }`}
      >
        <img
          src={ellipse_group}
          alt=""
          className="absolute -left-[10%] -top-[20%] sm:-top-[30%] md:left-0 md:-top-[40%] lg:-top-[50%] w-[80%] sm:w-[30%] md:w-[40%]  object-contain pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Rest of the code remains the same */}
          <div className="mb-8 md:mb-5 relative">
            <div className="flex flex-col lg:flex-row lg:gap-12 justify-between text-wrap">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light font-clash-display text-blue-500 mb-4 md:mb-12 relative z-20">
                About
              </h2>
              {/* Right Side - Description */}
              <div className="lg:w-2/3">
                <div className="w-full text-justify justify-center">
                  <div className="flex flex-col gap-1 mb-4 md:hidden">
                    <div className="w-full text-left text-black text-xl font-normal font-clash-display">
                      Decade of Innovation
                    </div>
                    <div className="w-full opacity-75 text-left text-black text-sm font-light font-gilroy-light leading-5">
                      Asia's largest summit for aspiring
                      <br />
                      entrepreneurs
                    </div>
                  </div>
                  <p className="text-black text-sm md:text-2xl font-light font-gilroy-light leading-5 md:leading-7">
                    The IEDC Summit 2025, organised by Kerala Startup Mission
                    and jointly hosted by L.B.S. College of Engineering,
                    Kasaragod and Central University of Kerala, marks the 10th
                    anniversary edition of this flagship event, celebrating a
                    decade of fostering innovation, entrepreneurship, and
                    technological excellence. This two-day summit invites
                    students, aspiring entrepreneurs, innovators, faculty and
                    staff to participate in a vibrant festival of ideas,
                    collaboration, and learning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Image */}
          <div className="flex flex-row justify-between gap-10 mt-8 md:mt-0">
            <div className="lg:flex flex-col gap-10 mt-40 hidden">
              <div className="w-44 justify-start text-black text-3xl font-normal font-clash-display leading-7">
                A Decade of Innovation
              </div>
              <div className="w-40 opacity-75 justify-start text-black text-2xl font-light font-gilroy-light leading-7">
                Asia's largest summit for aspiring entrepreneurs
              </div>
            </div>
            <div className="w-full flex justify-center md:justify-end z-10">
              <img
                src={gridImage}
                alt="IEDC Summit Statistics Grid"
                className="w-full max-w-4xl h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Colored Blocks at Bottom */}
      <div
        ref={bottomRef}
        className={`${
          bottomVisible ? "fade-in-up-visible" : "fade-in-up-hidden"
        }`}
      >
        <img
          src="/hero-blocks.png"
          alt="Decorative blocks"
          className="w-full h-20 sm:h-24 object-cover"
        />

        {/* Scrolling Text Loop */}
        <div className="w-full -mt-7 mb-10 skew-y-2">
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
            direction="right"
            logoHeight={20}
            gap={40}
            pauseOnHover={true}
            className="font-gilroy-bold bg-blue-600 py-5  text-white"
            ariaLabel="IEDC Summit 2025"
          />
        </div>
      </div>
    </>
  );
};
export default About;

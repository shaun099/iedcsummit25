import React, { useState, useEffect } from "react";
import LogoLoop from "./LogoLoop";
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";
import { IoLogoLinkedin } from "react-icons/io5";

const LoadingAnimation = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex gap-2">
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      ></div>
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></div>
    </div>
  </div>
);

const starColors = [
  "#F8D247", // Yellow
  "#4D84F7", // Blue
  "#E371E3", // Pink
  "#F4BB40", // Orange-Yellow
  "#45BBA1", // Teal
];

export default function FeaturedSpeakers() {
  const [speakers, setSpeakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch(
          "https://events.startupmission.in/api/event/iedc-summit-2025/speakers"
        );
        const data = await response.json();
        // Get featured speakers and sort by order
        const featuredSpeakers = data.Featured || [];

        if (featuredSpeakers.length === 0) {
          setError("No featured speakers available");
        } else {
          featuredSpeakers.sort((a, b) => a.order - b.order);
          setSpeakers(featuredSpeakers);
        }
      } catch (error) {
        console.error("Error fetching speakers:", error);
        setError("Failed to load speakers. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full min-h-screen bg-white px-4 py-16 md:py-20 relative overflow-hidden transition-all duration-1000 ${
        sectionVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-4xl md:text-6xl lg:text-7xl text-center text-blue-500 mb-12 font-clash-display">
        Speakers
      </h2>

      <div className="w-full md:mb-30">
        {/* Responsive Grid */}
        {isLoading ? (
          <LoadingAnimation />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl md:text-2xl font-gilroy-light text-gray-500">
              {error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-7xl mx-auto justify-center mb-[15vh]  lg:mb-[2vh]">
            {speakers.map((speaker, index) => (
              <div
                key={speaker.id}
                className="relative w-full max-w-xs aspect-3/4 overflow-hidden group"
              >
                {/* Speaker Image */}
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />

                {speaker.linkedin && speaker.linkedin.length > 0 && (
                  <IoLogoLinkedin
                    className="z-50 absolute top-2 right-2 text-white text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-all duration-500 drop-shadow-2xl md:opacity-0 md:group-hover:opacity-100 md:-translate-y-4 md:group-hover:translate-y-0"
                    style={{
                      color: starColors[index % starColors.length],
                    }}
                    onClick={() => window.open(speaker.linkedin, "_blank")}
                  />
                )}

                {/* Star decoration - asterisk with color */}
                <div
                  className="absolute -bottom-8 left-2 md:-bottom-22 md:left-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-clash-display font-semibold pointer-events-none leading-none scale-350 md:scale-250"
                  style={{
                    color: starColors[index % starColors.length],
                  }}
                >
                  *
                </div>
                {/* Info - Always Visible */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/5 to-black/50 flex flex-col justify-end p-4">
                  <p className="text-[12px] md:text-[14px] font-medium font-clash-display leading-tight text-white">
                    {speaker.name}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-[12px] font-light font-gilroy-light text-white mt-1">
                    {speaker.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute bottom-15 left-0 object-cover"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full absolute bottom-8 left-0 -skew-y-2">
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
}

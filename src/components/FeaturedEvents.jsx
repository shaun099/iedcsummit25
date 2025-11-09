import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import side_image from "../assets/side_image.png";
import { Link } from "react-router-dom";
import LogoLoop from "./LogoLoop";

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

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Test data with sponsor logos
  const testEvents = [
    {
      id: 1,
      title: "1Tank for Students",
      description:
        "🚀 Seize Your Opportunity to Go Global! 🔥\n\n1Pitch, Infinite Opportunities\n\nPitch your startup idea on the IEDC Summit 2025 stage and stand a chance to:\n\n🏆 Secure Funding\n🎓 Win a Fully Funded* 1-Year Entrepreneurship Training in the UAE\n\nApplication Deadline: November 10, 2025",
      registrationLink: "https://www.iedcsummit.in/1tank",
      sponsors: ["/tiib-logo.png", "/1trepreneur-logo.png"],
    },
  ];

  useEffect(() => {
    // Comment out API fetching for testing
    // const fetchEvents = async () => {
    //   try {
    //     const fetchedEvents = await fetch("https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue");
    //     const eventsData = await fetchedEvents.json();
    //
    //     // Transform and filter for Featured events only
    //     const transformedEvents = [];
    //
    //     if (eventsData.agenda) {
    //       Object.values(eventsData.agenda).forEach(dateGroup => {
    //         Object.values(dateGroup).forEach(venueEvents => {
    //           venueEvents.forEach(event => {
    //             // Check if the event has "Featured" in its category
    //             if (event.category && event.category.includes("Featured")) {
    //               transformedEvents.push({
    //                 id: event.id || Math.random(),
    //                 title: event.name,
    //                 description: event.description,
    //                 registrationLink: event.link || "",
    //               });
    //             }
    //           });
    //         });
    //       });
    //     }
    //
    //     setEvents(transformedEvents);
    //   } catch (error) {
    //     console.error("Error fetching events:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetchEvents();

    // Use test data instead
    setEvents(testEvents);
    setIsLoading(false);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(events.length, 1));
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(events.length, 1)) % Math.max(events.length, 1)
    );
  };

  return (
    <section
      id="featured-events"
      className="w-full py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="w-96 h-96 left-32 top-1/3 absolute opacity-50 rounded-full border border-blue-600"></div>
      <div className="w-96 h-96 left-0 top-1/2 absolute opacity-30 rounded-full border border-blue-600"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 mb-20">
        {/* Header */}
        <div className="w-full flex flex-col items-start gap-4 text-left relative z-20 -mb-[10vh]">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-clash-display text-blue-500 leading-tight">
            Featured Events
          </h2>
        </div>

        {/* Carousel Container */}
        {isLoading ? (
          <LoadingAnimation />
        ) : events.length > 0 ? (
          <div className="relative">
            {/* Cards Grid with Stacked Effect */}
            <div className="relative h-80 sm:h-96 md:h-[550px] lg:h-[700px] flex items-center justify-center mt-[12vh] mb-[5vh] md:mt-[3vh]">
              {/* Previous Button - Large screens only, left side */}
              {events.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="hidden lg:flex absolute left-0 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
                  aria-label="Previous event"
                >
                  <ChevronLeft size={32} />
                </button>
              )}

              <AnimatePresence mode="popLayout">
                {/* Display 3 cards in a stacked fashion */}
                {[0, 1, 2].map((offset) => {
                  const cardIndex = (currentIndex + offset) % events.length;
                  const event = events[cardIndex];

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{
                        opacity: 1 - offset * 0.25,
                        scale: 1 - offset * 0.05,
                        x: offset * 20,
                        zIndex: 10 - offset,
                        rotateZ: offset === 0 ? 0 : 4,
                      }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="absolute w-full max-w-xs md:max-w-md"
                    >
                      <div className="w-full max-w-[80vw] md:max-w-[46vw] lg:max-w-4xl mx-auto aspect-4/5 relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                        <div className="w-[70%] h-full left-0 top-0 absolute overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col gap-3 md:gap-4">
                          <h3 className="text-xl md:text-3xl lg:text-4xl font-gilroy-medium text-black leading-tight [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
                            {event.title}
                          </h3>

                          <p className="text-xs md:text-sm lg:text-base font-gilroy-light text-black leading-relaxed [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
                            {event.description}
                          </p>

                          {/* Sponsor Logos */}
                          {event.sponsors && event.sponsors.length > 0 && (
                            <div className="flex items-center gap-2 md:gap-3 mt-auto pt-4">
                              {event.sponsors.map((sponsor, idx) => (
                                <img
                                  key={idx}
                                  src={sponsor}
                                  alt="sponsor"
                                  className="h-5 md:h-7 lg:h-8 object-contain"
                                />
                              ))}
                            </div>
                          )}

                          {/* Buttons Container */}
                          <div className="flex gap-2 mt-auto pt-4">
                            {event.registrationLink ? (
                              <a
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 h-9 md:h-10 lg:h-11 bg-black rounded-lg flex items-center justify-center hover:opacity-80 opacity-90 transition"
                              >
                                <span className="text-white text-xs md:text-sm lg:text-base font-medium font-clash-display tracking-tight">
                                  REGISTER NOW
                                </span>
                              </a>
                            ) : (
                              <div className="flex-1 h-9 md:h-10 lg:h-11 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
                                <span className="text-white text-xs md:text-sm lg:text-base font-medium font-clash-display tracking-tight">
                                  COMING SOON
                                </span>
                              </div>
                            )}

                            {/* Promo Video Button */}
                            <button
                              onClick={() => {
                                window.open(
                                  "https://www.linkedin.com/posts/iedcsummit_iedcsummit2025-daretodisrupt-keralastartupmission-activity-7392572580018311168-3nxw",
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }}
                              className="h-9 md:h-10 lg:h-11 px-3 md:px-4 lg:px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition shrink-0"
                              aria-label="Watch promo video"
                            >
                              <Play size={16} fill="currentColor" />
                              <span className="text-white text-xs md:text-sm font-medium font-clash-display tracking-tight hidden sm:inline">
                                PROMO
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Colored Decorative Blocks */}
                        <img
                          src={side_image}
                          alt="side decorations"
                          className="absolute right-0 top-0 w-12 md:w-20 h-auto"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Next Button - Large screens only, right side */}
              {events.length > 1 && (
                <button
                  onClick={handleNext}
                  className="hidden lg:flex absolute right-0 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
                  aria-label="Next event"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {/* Navigation Controls and View All - Mobile and Tablet only */}
            {events.length > 1 && (
              <div className="lg:hidden flex items-center justify-between gap-4 mb-[10vh]">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg shrink-0"
                  aria-label="Previous event"
                >
                  <ChevronLeft size={32} />
                </button>

                {/* View All Link - Center on mobile */}
                <Link
                  to="/events"
                  className="flex-1 text-center text-blue-600 text-base md:text-lg font-gilroy-medium cursor-pointer hover:opacity-70 transition-opacity"
                >
                  View all events...
                </Link>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg shrink-0"
                  aria-label="Next event"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
            )}

            {/* View All Link - Mobile only when single event */}
            {events.length <= 1 && (
              <div className="lg:hidden text-center py-8">
                <Link
                  to="/events"
                  className="text-blue-600 text-base md:text-lg font-gilroy-medium cursor-pointer hover:opacity-70 transition-opacity"
                >
                  View all events...
                </Link>
              </div>
            )}

            {/* View All Link - Desktop only */}
            <div className="hidden lg:block text-center pb-12">
              <Link
                to="/events"
                className="text-blue-600 text-lg md:text-xl font-gilroy-medium cursor-pointer hover:opacity-70 transition-opacity"
              >
                View all events...
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full text-center py-20">
            <p className="text-2xl font-gilroy-light text-gray-500">
              Loading featured events...
            </p>
          </div>
        )}
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute bottom-20 left-0 object-cover"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full absolute bottom-12 left-0 skew-y-2">
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
          className="font-gilroy-bold bg-blue-600 py-5 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </section>
  );
};

export default FeaturedEvents;

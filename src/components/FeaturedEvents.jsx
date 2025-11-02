import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import side_image from '../assets/side_image.png';
import { Link } from 'react-router-dom';
import LogoLoop from './LogoLoop';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await fetch("https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue");
        const eventsData = await fetchedEvents.json();
        
        // Transform and filter for Featured events only
        const transformedEvents = [];
        
        if (eventsData.agenda) {
          Object.values(eventsData.agenda).forEach(dateGroup => {
            Object.values(dateGroup).forEach(venueEvents => {
              venueEvents.forEach(event => {
                // Check if the event has "Featured" in its category
                if (event.category && event.category.includes("Featured")) {
                  transformedEvents.push({
                    id: event.id || Math.random(),
                    title: event.name,
                    description: event.description,
                    registrationLink: event.link || "",
                  });
                }
              });
            });
          });
        }
        
        setEvents(transformedEvents);
        console.log("Featured Events:", transformedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(events.length, 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(events.length, 1)) % Math.max(events.length, 1));
  };

  return (
    <section id="featured-events" className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="w-96 h-96 left-32 top-1/3 absolute opacity-50 rounded-full border border-blue-600"></div>
      <div className="w-96 h-96 left-0 top-1/2 absolute opacity-30 rounded-full border border-blue-600"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div className="w-full flex flex-col items-start gap-4 text-left relative z-20 -mb-[10vh]">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-clash-display text-blue-500 leading-tight">
            Featured Events
          </h2>
        </div>

        {/* Carousel Container */}
        {events.length > 0 ? (
          <div className="relative">
            {/* Cards Grid with Stacked Effect */}
            <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
              {/* Previous Button - Large screens only, left side */}
              <button
                onClick={handlePrev}
                className="hidden lg:flex absolute left-0 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
                aria-label="Previous event"
              >
                <ChevronLeft size={32} />
              </button>

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
                        x: offset * 30,
                        zIndex: 10 - offset,
                        rotateZ: offset === 0 ? 0 : 4,
                      }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="absolute w-full max-w-md"
                    >
                      <div className="w-full max-w-[50vh] mx-auto h-110 md:h-120 relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                        <div className="w-[75%] h-full left-0 top-0 absolute overflow-hidden p-6">
                          <h3 className="text-4xl md:text-5xl font-gilroy-medium text-black leading-tight mb-4 [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)] line-clamp-2">
                            {event.title}
                          </h3>
                          
                          <p className="text-base md:text-lg font-gilroy-light text-black leading-6 mb-8 line-clamp-5 [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
                            {event.description}
                          </p>
                          
                          {event.registrationLink ? (
                            <a
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-6 left-6 w-36 h-10 bg-black rounded-lg flex items-center justify-center hover:opacity-80 opacity-90 transition"
                            >
                              <span className="text-white text-sm md:text-base font-medium font-clash-display tracking-tight">
                                REGISTER NOW
                              </span>
                            </a>
                          ) : (
                            <div className="absolute bottom-6 left-6 w-36 h-10 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
                              <span className="text-white text-sm md:text-base font-medium font-clash-display tracking-tight">
                                COMING SOON
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Colored Decorative Blocks */}
                        <img
                            src={side_image}
                            alt="side decorations"
                            className="absolute right-0 top-0 w-20 h-auto"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Next Button - Large screens only, right side */}
              <button
                onClick={handleNext}
                className="hidden lg:flex absolute right-0 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
                aria-label="Next event"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Navigation Controls and View All - Mobile and Tablet only */}
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
              <Link to="/events" className="flex-1 text-center text-blue-600 text-base md:text-lg font-gilroy-medium cursor-pointer hover:opacity-70 transition-opacity">
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

            {/* View All Link - Desktop only */}
            <div className="hidden lg:block text-center pb-12">
              <Link to="/events" className="text-blue-600 text-lg md:text-xl font-gilroy-medium cursor-pointer hover:opacity-70 transition-opacity">
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
        <div className="w-full skew-y-2">
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
                className="font-gilroy-bold bg-blue-600 py-5 -bottom-10 text-white"
                ariaLabel="IEDC Summit 2025"
            />  
        </div>
    </section>
  );
};

export default FeaturedEvents;
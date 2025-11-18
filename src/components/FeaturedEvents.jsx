import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
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

// ---- Helpers ----

// Now supports category as string or array
const getEventType = (category) => {
  if (!category) return [];

  const categories = Array.isArray(category)
    ? category
    : String(category)
        .split(',')
        .map((c) => c.trim());

  const types = [];
  if (categories.includes('Featured')) types.push('Featured');
  if (categories.includes('Event')) types.push('Summit Day');
  if (categories.includes('Pre-Event')) types.push('Pre-Event');
  return types;
};

const transformAgendaToEvents = (agenda) => {
  if (!agenda) return [];

  const events = [];

  Object.values(agenda).forEach((dateGroup) => {
    Object.values(dateGroup).forEach((venueEvents) => {
      venueEvents.forEach((event) => {
        const categories = Array.isArray(event.category)
          ? event.category
          : String(event.category)
              .split(',')
              .map((c) => c.trim());

        // Skip events with Workshop or EOI categories
        if (categories.includes('Workshop') || categories.includes('EOI')) return;

        const eventType = getEventType(event.category);

        if (eventType.includes('Featured')) {
          events.push({
            id: event.id || Math.random(),
            title: event.name || '',
            description: event.description || '',
            registrationLink: event.link || '',
            eventType,
            startTime: event.start_time,
            endTime: event.end_time,
          });
        }
      });
    });
  });

  return events;
};

const processEventDescriptions = (events) =>
  events.map((event) => {
    const rawDescription = event.description || '';
    const cleanDescription = rawDescription.trim();

    if (!cleanDescription) return event;

    try {
      const descData = JSON.parse(cleanDescription);
      const extractedDescription = descData.description || descData.Description;

      if (!extractedDescription) return event;

      const processedEvent = {
        ...event,
        description: extractedDescription,
      };

      if (descData.ExtraData) {
        const extra = descData.ExtraData;
        Object.assign(processedEvent, {
          ...(extra.posterUrl && { posterUrl: extra.posterUrl }),
          ...(extra.logos && { logos: extra.logos }),
          ...(extra.slots && { slots: extra.slots }),
          ...(extra.registration_start && { registration_start: extra.registration_start }),
          ...(extra.registration_end && { registration_end: extra.registration_end }),
          ...(extra.vidLink && { vidLink: extra.vidLink }),
          ...(extra.poc && { poc: extra.poc }),
          ...(extra.capacity && { capacity: extra.capacity }),
        });
      }

      return processedEvent;
    } catch (parseError) {
      const descMatch = cleanDescription.match(
        /"description"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/
      );

      if (descMatch) {
        return {
          ...event,
          description: descMatch[1].replace(/\\"/g, '"'),
        };
      }

      console.warn(
        'Failed to parse description JSON for event:',
        event.title,
        'Error:',
        parseError.message
      );

      return event;
    }
  });

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          'https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue'
        );
        const data = await res.json();

        const transformed = transformAgendaToEvents(data.agenda);
        const processed = processEventDescriptions(transformed);

        setEvents(processed);
      } catch (error) {
        console.error('Error fetching featured events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section
      id="featured-events"
      className="w-full py-5 md:py-24 bg-white relative overflow-hidden"
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
            <div className="relative h-[450px] sm:h-[600px] md:h-[750px] lg:h-[900px] flex items-center justify-center mt-[28vh] mb-[25vh] md:mt-0 md:-mb-[10vh]">
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
                      className="absolute w-full max-w-sm md:max-w-3xl "
                    >
                      <div className="transform-gpu">
                        <EventCard event={event} />
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
              <div className="lg:hidden flex items-center justify-between gap-4 mb-[15vh]">
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
              No featured events available
            </p>
          </div>
        )}
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 relative bottom-20 left-0 object-cover"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full relative bottom-[13vh] left-0 skew-y-2">
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

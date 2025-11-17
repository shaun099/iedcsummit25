import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import EventCard from './EventCard';

const LoadingAnimation = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex gap-2">
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: '0.15s' }}
      />
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: '0.3s' }}
      />
    </div>
  </div>
);

// ---- Helpers ----

// Now supports category as string or array
const getEventType = (category) => {
  if (!category) return '';

  const categories = Array.isArray(category)
    ? category
    : String(category)
        .split(',')
        .map((c) => c.trim());

  if (categories.includes('Featured')) return 'Featured';
  if (categories.includes('Event')) return 'Summit Day';
  if (categories.includes('Pre-Event')) return 'Pre-Event';
  return '';
};

const transformAgendaToEvents = (agenda) => {
  if (!agenda) return [];

  const events = [];

  Object.values(agenda).forEach((dateGroup) => {
    Object.values(dateGroup).forEach((venueEvents) => {
      venueEvents.forEach((event) => {
        const eventType = getEventType(event.category);

        if (!eventType) return;

        events.push({
          id: event.id || Math.random(),
          title: event.name || '',
          description: event.description || '',
          registrationLink: event.link || '',
          eventType,
          startTime: event.start_time,
          endTime: event.end_time,
        });
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

const getRegistrationStatusOrder = (startTime, endTime, now) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const isActive = now >= start && now <= end;
  const notStartedYet = now < start;
  const ended = now > end;

  if (isActive) return 0; // Active registrations
  if (notStartedYet) return 1; // Upcoming registrations
  if (ended) return 2; // Past registrations

  return 3;
};

const sortEvents = (events) => {
  const now = new Date();

  return [...events].sort((a, b) => {
    // First priority: Featured events with open registration
    const aIsFeaturedOpen = a.eventType === 'Featured' && getRegistrationStatusOrder(a.startTime, a.endTime, now) !== 2;
    const bIsFeaturedOpen = b.eventType === 'Featured' && getRegistrationStatusOrder(b.startTime, b.endTime, now) !== 2;

    if (aIsFeaturedOpen && !bIsFeaturedOpen) return -1;
    if (!aIsFeaturedOpen && bIsFeaturedOpen) return 1;

    // If both are featured with open registration or both are not, use existing logic
    const statusA = getRegistrationStatusOrder(a.startTime, a.endTime, now);
    const statusB = getRegistrationStatusOrder(b.startTime, b.endTime, now);

    if (statusA !== statusB) return statusA - statusB;

    const startA = new Date(a.startTime);
    const startB = new Date(b.startTime);

    if (startA.getTime() !== startB.getTime()) {
      return startA - startB;
    }

    const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
    const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;

    return (idA || 0) - (idB || 0);
  });
};

// ---- Component ----

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          'https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue'
        );
        const data = await res.json();

        const transformed = transformAgendaToEvents(data.agenda);
        const processed = processEventDescriptions(transformed);
        const sorted = sortEvents(processed);

        setEvents(sorted);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return events;

    return events.filter((event) => {
      const title = event.title?.toLowerCase() || '';
      const description = event.description?.toLowerCase() || '';
      return title.includes(query) || description.includes(query);
    });
  }, [events, searchQuery]);

  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">
      {/* Main content */}
      <div className="relative py-[10vh] px-5 md:px-8 mt-7">
        {/* Header */}
        <div className="mb-[8vh] md:mb-[12vh] md:flex md:flex-col md:items-center">
          <div className="w-full md:text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-clash-display md:font-black text-blue-500 relative z-20">
              Events
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md mx-auto md:mx-0 mt-[3vh]">
            <input
              type="text"
              placeholder="Search events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[5vh] px-5 bg-indigo-100 rounded-[19px] text-sm text-blue-600 placeholder-blue-600 font-gilroy-light focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Event cards grid */}
        <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 md:auto-rows-fr gap-4 md:gap-6 mb-[10vh]">
          {isLoading ? (
            <div className="col-span-full">
              <LoadingAnimation />
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl font-gilroy-light text-gray-500">
                No events found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Bottom Image */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute bottom-0 left-0 object-cover"
      />
    </section>
  );
}

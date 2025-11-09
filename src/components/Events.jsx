import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import EventCard from './EventCard';

const LoadingAnimation = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
    </div>
  </div>
);

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      const fetchEvents = async () => {
        try {
          const fetchedEvents = await fetch("https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue");
          const eventsData = await fetchedEvents.json();
          
          // Transform and filter for Event category
          const transformedEvents = [];
          
          if (eventsData.agenda) {
            Object.values(eventsData.agenda).forEach(dateGroup => {
              Object.values(dateGroup).forEach(venueEvents => {
                venueEvents.forEach(event => {
                  // Get all categories
                  const categories = event.category || [];
                  let eventType = '';
                  
                  if (categories.includes('Featured')) {
                    eventType = 'Featured';
                  } else if (categories.includes('Pre-Event')) {
                    eventType = 'Pre-Event';
                  } else if (categories.includes('Event')) {
                    eventType = 'Summit Day';
                  }
                  
                  // Only add if it has a valid event type
                  if (eventType) {
                    transformedEvents.push({
                      id: event.id || Math.random(),
                      title: event.name,
                      description: event.description,
                      registrationLink: event.link || "",
                      eventType: eventType,
                      startTime: event.start_time,
                      endTime: event.end_time,
                      is1Tank: event.name && event.name.includes("1Tank"),
                      sponsors: event.name && event.name.includes("1Tank") 
                        ? ["/tiib-logo.png", "/1trepreneur-logo.png", "/campusfund-logo.png", "/tie-logo.png"]
                        : [],
                    });
                  }
                });
              });
            });
          }
          
          // Sort events - active registrations first, then upcoming, then past
          const now = new Date();
          const sortedEvents = transformedEvents.sort((a, b) => {
            const aStart = new Date(a.startTime);
            const aEnd = new Date(a.endTime);
            const bStart = new Date(b.startTime);
            const bEnd = new Date(b.endTime);
            
            // Check registration status
            const aRegistrationActive = now >= aStart && now <= aEnd; // Registration open
            const bRegistrationActive = now >= bStart && now <= bEnd;
            const aRegistrationEnded = now > aEnd;
            const bRegistrationEnded = now > bEnd;
            const aRegistrationNotStarted = now < aStart;
            const bRegistrationNotStarted = now < bStart;
            
            // Priority 1: Active registrations first
            if (aRegistrationActive && !bRegistrationActive) return -1;
            if (!aRegistrationActive && bRegistrationActive) return 1;
            
            // Priority 2: Upcoming registrations (not started yet)
            if (aRegistrationNotStarted && !bRegistrationNotStarted) return -1;
            if (!aRegistrationNotStarted && bRegistrationNotStarted) return 1;
            
            // Priority 3: Past registrations
            if (aRegistrationEnded && !bRegistrationEnded) return 1;
            if (!aRegistrationEnded && bRegistrationEnded) return -1;
            
            // Within same priority - sort by start time (earliest first)
            return aStart - bStart;
          });
          
          setEvents(sortedEvents);
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchEvents();
    }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Search className="absolute right-4 top-[1.5vh] w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Event cards grid - 3 per row */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[10vh]">
          {isLoading ? (
            <div className="col-span-full">
              <LoadingAnimation />
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard key={index} event={event} />
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
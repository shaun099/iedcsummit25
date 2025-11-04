import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import EventCard from './EventCard';

export default function WebinarsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  useEffect(() => {
      const fetchEvents = async () => {
        try {
          const fetchedEvents = await fetch("https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue");
          const eventsData = await fetchedEvents.json();
          
          // Transform and filter for Webinar events only
          const transformedEvents = [];
          
          if (eventsData.agenda) {
            Object.values(eventsData.agenda).forEach(dateGroup => {
              Object.values(dateGroup).forEach(venueEvents => {
                venueEvents.forEach(event => {
                  // Check if the event has "Webinar" in its category
                  if (event.category && event.category.includes("Webinar")) {
                    transformedEvents.push({
                      id: event.id || Math.random(),
                      title: event.name,
                      description: event.description,
                      registrationLink: event.link || "",
                      startTime: event.start_time,
                      endTime: event.end_time,
                    });
                  }
                });
              });
            });
          }
          
          setEvents(transformedEvents);
        } catch (error) {
          console.error("Error fetching events:", error);
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
              Webinars
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
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard key={index} event={event} isWebinar={true} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl font-gilroy-light text-gray-500">
                No webinars found matching "{searchQuery}"
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
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import side_image from '../assets/side_image.png';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const fetchedEvents = await fetch("https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue");
      const eventsData = await fetchedEvents.json();
      
      // Transform the nested agenda structure into a flat array
      const transformedEvents = [];
      
      if (eventsData.agenda) {
        Object.values(eventsData.agenda).forEach(dateGroup => {
          Object.values(dateGroup).forEach(venueEvents => {
            venueEvents.forEach(event => {
              transformedEvents.push({
                title: event.name,
                description: event.description,
                registrationLink: event.link || "",
              });
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
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div key={index} className="w-full max-w-80 mx-auto h-[40vh] relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer">
                <div className="w-[75%] h-full left-0 top-0 absolute overflow-hidden p-6">
                  <h3 className="text-3xl font-gilroy-medium text-black leading-tight mb-3 [text-shadow:_0px_1px_8px_rgb(37_99_235_/_0.10)]">
                    {event.title}
                  </h3>
                  
                  <p className="text-sm font-gilroy-light text-black leading-5 mb-8 line-clamp-6 [text-shadow:_0px_1px_8px_rgb(37_99_235_/_0.10)]">
                    {event.description}
                  </p>
                  
                  {event.registrationLink ? (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-6 left-6 w-28 h-7 bg-black rounded-lg flex items-center justify-center hover:opacity-100 opacity-90 transition"
                    >
                      <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                        REGISTER NOW
                      </span>
                    </a>
                  ) : (
                    <div className="absolute bottom-6 left-6 w-28 h-7 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
                      <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                        COMING SOON
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Figma Colored Decorations */}
                <img
                  src={side_image}
                  alt="side decorations"
                  className="absolute right-0 top-0 w-20 h-auto"
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl font-gilroy-light text-gray-500">
                No events found matching "{searchQuery}"
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
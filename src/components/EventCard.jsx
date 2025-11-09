import React, { useState, useEffect, useRef } from 'react';
import side_image from '../assets/side_image.png';

const MARQUEE_STYLES = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  
  .marquee-container {
    overflow: hidden;
    width: 100%;
  }
  
  .marquee-text {
    display: inline-block;
    padding-right: 100%;
    animation: marquee 15s linear infinite;
    white-space: nowrap;
  }
  
  .marquee-container:hover .marquee-text {
    animation-play-state: paused;
  }
`;

export default function EventCard({ event, isWebinar = false }) {
  const [isEventLive, setIsEventLive] = useState(false);
  const [isMarqueeActive, setIsMarqueeActive] = useState(false);
  const [canRegister, setCanRegister] = useState(true);
  const [isEventEnded, setIsEventEnded] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!event.startTime || !event.endTime) return;

    const checkEventLive = () => {
      const now = new Date();
      const eventStart = new Date(event.startTime);
      const eventEnd = new Date(event.endTime);
      
      // Check if event is live (for webinars)
      setIsEventLive(now >= eventStart && now <= eventEnd);
      
      // Check if event has ended (for all events)
      setIsEventEnded(now > eventEnd);
      
      // Check if we're within 30 minutes before start time (for webinars)
      if (isWebinar) {
        const thirtyMinutesBefore = new Date(eventStart.getTime() - 30 * 60000);
        const canReg = now < thirtyMinutesBefore;
        setCanRegister(canReg);
      }
    };

    checkEventLive();
    const interval = setInterval(checkEventLive, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isWebinar, event.startTime, event.endTime]);

  // Check if title needs marquee effect
  useEffect(() => {
    if (titleRef.current) {
      // Get the h3 element inside the container
      const h3Element = titleRef.current.querySelector('h3');
      if (h3Element) {
        // Activate marquee if text is 90% of container width (lower threshold)
        const isOverflow = h3Element.scrollWidth > titleRef.current.clientWidth;
        setIsMarqueeActive(isOverflow);
      }
    }
  }, [event.title]);

  // Parse webinar links (separated by comma)
  const getWebinarLinks = () => {
    if (!event.registrationLink || typeof event.registrationLink !== 'string') {
      return { registration: '', meet: '' };
    }
    const links = event.registrationLink.split(',').map(link => link.trim());
    return {
      registration: links[0] || '',
      meet: links[1] || ''
    };
  };

  const webinarLinks = isWebinar ? getWebinarLinks() : null;

  return (
    <>
      <style>{MARQUEE_STYLES}</style>
      <div className="w-full max-w-80 mx-auto aspect-4/5 relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer">
        {/* Event Type Badge */}
        {event.eventType && (
          <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-gilroy-medium">
            {event.eventType}
          </div>
        )}
        
        <div className="w-[70%] h-full left-0 top-0 absolute overflow-y-auto p-4 md:p-6 flex flex-col gap-3">
          <div ref={titleRef} className={isMarqueeActive ? 'marquee-container' : ''}>
            <h3 className={`${isMarqueeActive ? 'marquee-text' : ''} text-lg md:text-2xl font-gilroy-medium text-black leading-tight [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]`}>
              {event.title}
            </h3>
          </div>
          
          {isWebinar && event.startTime && (
            <div className="text-xs font-gilroy-medium text-blue-600">
              {new Date(event.startTime).toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
              })}
            </div>
          )}
        
          <p className="text-xs md:text-sm font-gilroy-light text-black leading-relaxed [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
            {event.description}
          </p>
        
          {isWebinar ? (
            // Webinar: Two buttons separated by comma
            <div className="mt-auto flex items-center gap-2 pt-4">
              {event.registrationLink ? (
                <button
                  onClick={() => {
                    window.open(webinarLinks.registration || event.registrationLink, '_blank', 'noopener,noreferrer');
                  }}
                  className={`flex-1 h-8 md:h-9 rounded-lg flex items-center justify-center text-center transition ${
                    canRegister && !isEventEnded
                      ? 'bg-black hover:opacity-100 opacity-90 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!canRegister || isEventEnded}
                >
                  <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                    {isEventEnded ? 'CLOSED' : (canRegister ? 'REGISTER' : 'CLOSED')}
                  </span>
                </button>
              ) : (
                <div className="flex-1 h-8 md:h-9 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
                  <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                    {isEventEnded ? 'CLOSED' : 'COMING SOON'}
                  </span>
                </div>
              )}
              
              {webinarLinks.meet && (canRegister || isEventLive) && !isEventEnded ? (
                <button
                  onClick={() => {
                    window.open(webinarLinks.meet, '_blank', 'noopener,noreferrer');
                  }}
                  className={`flex-1 h-8 md:h-9 rounded-lg flex items-center justify-center text-center transition ${
                    isEventLive
                      ? 'bg-green-600 hover:opacity-100 opacity-90'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  type="button"
                  disabled={!isEventLive}
                >
                  <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                    {isEventLive ? 'JOIN' : 'JOIN SOON'}
                  </span>
                </button>
              ) : null}
            </div>
          ) : (
            // Regular event: Single register button
            <>
              {event.registrationLink ? (
                <button
                  onClick={() => {
                    window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
                  }}
                  className={`mt-auto w-full h-8 md:h-9 rounded-lg flex items-center justify-center transition ${
                    !isEventEnded
                      ? 'bg-black hover:opacity-100 opacity-90'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={isEventEnded}
                >
                  <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                    {isEventEnded ? 'REGISTRATION CLOSED' : 'REGISTER NOW'}
                  </span>
                </button>
              ) : (
                <div className="mt-auto w-full h-8 md:h-9 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
                  <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                    {isEventEnded ? 'REGISTRATION CLOSED' : 'COMING SOON'}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Figma Colored Decorations */}
        <img
          src={side_image}
          alt="side decorations"
          className="absolute right-0 top-0 w-20 h-auto"
        />
      </div>
    </>
  );
}

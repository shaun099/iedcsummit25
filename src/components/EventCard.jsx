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
  const titleRef = useRef(null);

  useEffect(() => {
    if (!isWebinar || !event.startTime) return;

    const checkEventLive = () => {
      const now = new Date();
      const eventStart = new Date(event.startTime);
      const eventEnd = new Date(event.endTime);
      
      // Check if event is live
      setIsEventLive(now >= eventStart && now <= eventEnd);
      
      // Check if we're within 30 minutes before start time
      const thirtyMinutesBefore = new Date(eventStart.getTime() - 30 * 60000);
      const canReg = now < thirtyMinutesBefore;
      setCanRegister(canReg);
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
      <div className="w-full max-w-80 mx-auto h-[375px] relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer">
        <div className="w-[75%] h-full left-0 top-0 absolute overflow-hidden p-6">
          <div ref={titleRef} className={isMarqueeActive ? 'marquee-container mb-3 h-10 flex items-center' : 'mb-3'}>
            <h3 className={`${isMarqueeActive ? 'marquee-text' : ''} text-3xl font-gilroy-medium text-black leading-tight [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]`}>
              {event.title}
            </h3>
          </div>
          
          {isWebinar && event.startTime && (
            <div className="text-xs font-gilroy-medium text-blue-600 mb-2">
              {new Date(event.startTime).toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
              })}
            </div>
          )}
        
        <p className="text-sm font-gilroy-light text-black leading-5 mb-8 line-clamp-6 [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
          {event.description}
        </p>
        
        {isWebinar ? (
          // Webinar: Two buttons separated by comma
          <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
            {webinarLinks.registration && canRegister ? (
              <button
                onClick={() => {
                  window.open(webinarLinks.registration, '_blank', 'noopener,noreferrer');
                }}
                className="w-27 h-7 bg-black rounded-lg flex items-center justify-center hover:opacity-100 opacity-90 transition"
                type="button"
              >
                <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                  REGISTER NOW
                </span>
              </button>
            ) : (
              <div className="w-40 h-7 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
                <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                  {canRegister ? 'REGISTER SOON' : 'REGISTRATIONS CLOSED'}
                </span>
              </div>
            )}
            
            {webinarLinks.meet && (canRegister || isEventLive) ? (
              <button
                onClick={() => {
                  window.open(webinarLinks.meet, '_blank', 'noopener,noreferrer');
                }}
                className={`w-24 h-7 rounded-lg flex items-center justify-center transition ${
                  isEventLive
                    ? 'bg-green-600 hover:opacity-100 opacity-90'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                type="button"
                disabled={!isEventLive}
              >
                <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                  {isEventLive ? 'JOIN NOW' : 'JOIN SOON'}
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
                className="absolute bottom-6 left-6 w-28 h-7 bg-black rounded-lg flex items-center justify-center hover:opacity-100 opacity-90 transition"
                type="button"
              >
                <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                  REGISTER NOW
                </span>
              </button>
            ) : (
              <div className="absolute bottom-6 left-6 w-28 h-7 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
                <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                  COMING SOON
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

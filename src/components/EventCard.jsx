import React, { useState, useEffect, useMemo } from 'react';
import side_image from '../assets/side_image.png';
import { Play } from 'lucide-react';

export default function EventCard({ event, isWebinar = false }) {
  const [isEventLive, setIsEventLive] = useState(false);
  const [canRegister, setCanRegister] = useState(true);
  const [isEventEnded, setIsEventEnded] = useState(false);
  const [registrationEnded, setRegistrationEnded] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);

  const hasPoster = !!event.posterUrl;
  const hasLogos = Array.isArray(event.logos) && event.logos.length > 0;
  const hasSlots = Array.isArray(event.slots) && event.slots.length > 0;

  const slots = hasSlots ? event.slots : [];

  // Compute webinar links from registrationLink (comma separated)
  const webinarLinks = useMemo(() => {
    if (!isWebinar || !event.registrationLink || typeof event.registrationLink !== 'string') {
      return { registration: '', meet: '' };
    }

    const [registration = '', meet = ''] = event.registrationLink
      .split(',')
      .map((link) => link.trim());

    return { registration, meet };
  }, [isWebinar, event.registrationLink]);

  // Time-based state: live/ended/registration
  useEffect(() => {
    if (!event.startTime || !event.endTime) return;

    const checkEventLive = () => {
      const now = new Date();
      const eventStart = new Date(event.startTime);
      const eventEnd = new Date(event.endTime);

      setIsEventLive(now >= eventStart && now <= eventEnd);
      setIsEventEnded(now > eventEnd);

      if (!isWebinar && event.registration_start && event.registration_end) {
        // Parse as UTC to avoid timezone issues
        const regStart = new Date(`${event.registration_start}Z`);
        const regEnd = new Date(`${event.registration_end}Z`);

        const regHasStarted = now >= regStart;
        const regHasEnded = now > regEnd;

        setCanRegister(regHasStarted && !regHasEnded);
        setRegistrationEnded(regHasEnded);
      } else if (isWebinar) {
        // Webinars: registration allowed until 30 minutes before start
        const thirtyMinutesBefore = new Date(eventStart.getTime() - 30 * 60000);
        const canReg = now < thirtyMinutesBefore;

        setCanRegister(canReg);
        setRegistrationEnded(false);
      }
    };

    checkEventLive();
    const interval = setInterval(checkEventLive, 60000);
    return () => clearInterval(interval);
  }, [
    isWebinar,
    event.startTime,
    event.endTime,
    event.registration_start,
    event.registration_end,
  ]);

  const handleRegisterClick = () => {
    if (hasSlots && !event.registrationLink) {
      setShowSlotModal(true);
      return;
    }

    if (event.registrationLink) {
      window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSlotSelect = (slot) => {
    setShowSlotModal(false);
    if (slot?.link) {
      window.open(slot.link, '_blank', 'noopener,noreferrer');
    }
  };

  const renderSpeakers = () => {
    if (!isWebinar || !Array.isArray(event.speakers) || event.speakers.length === 0) {
      return null;
    }

    return (
      <div className="space-y-2">
        {event.speakers.map((speaker, index) => (
          <div key={index} className="flex items-start gap-3">
            {speaker.photo && (
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-14 h-14 rounded-full object-cover shrink-0 mt-1"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-gilroy-medium text-black wrap-break-word">
                {speaker.name}
              </p>
              <p className="text-xs font-gilroy-light text-gray-700 wrap-break-word">
                {speaker.designation}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderWebinarTime = () => {
    if (!isWebinar || !event.startTime) return null;

    return (
      <div className="text-xs font-gilroy-medium text-blue-600">
        {new Date(event.startTime).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}
      </div>
    );
  };

  const renderLogos = () => {
    if (!hasLogos) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-2">
        {event.logos.map((logo, index) => (
          <div
            key={index}
            className="flex justify-center items-center bg-white bg-opacity-75 rounded-lg p-2 shadow-sm"
          >
            <img
              src={logo}
              alt={`${event.title} logo ${index + 1}`}
              className="h-8 md:h-10 w-full object-contain"
            />
          </div>
        ))}
      </div>
    );
  };

  const renderSponsors = () => {
    if (!Array.isArray(event.sponsors) || event.sponsors.length === 0) {
      return null;
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-2 -my-3">
        {event.sponsors.map((sponsor, index) => (
          <img
            key={index}
            src={sponsor}
            alt="sponsor"
            className="h-10 w-full object-contain"
          />
        ))}
      </div>
    );
  };

  const renderPOC = () => {
    if (!event.poc) return null;

    return (
      <div>
        <h4 className="text-md font-gilroy-medium text-blue-800 mb-2">
          Any Queries?
        </h4>
        <div className="text-sm font-gilroy-light text-blue-700 space-y-1">
          {event.poc.name && <p><strong>Name:</strong> {event.poc.name}</p>}
          {event.poc.phone && <p><strong>Phone:</strong> {event.poc.phone}</p>}
          {event.poc.email && <p><strong>Email:</strong> {event.poc.email}</p>}
        </div>
      </div>
    );
  };

  const renderCapacity = () => {
    if (!event.capacity) return null;

    return (
      <div className="text-xs font-gilroy-bold text-blue-600">
        Seats Available: {event.capacity}
      </div>
    );
  };

  const renderWebinarButtons = () => {
    const { registration, meet } = webinarLinks;

    return (
      <div className="mt-auto flex items-center gap-2 pt-4">
        {event.registrationLink ? (
          <button
            onClick={() =>
              window.open(registration || event.registrationLink, '_blank', 'noopener,noreferrer')
            }
            className={`flex-1 h-8 md:h-9 rounded-lg flex items-center justify-center text-center transition ${
              canRegister && !isEventEnded
                ? 'bg-black hover:opacity-100 opacity-90 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!canRegister || isEventEnded}
          >
            <span className="text-white text-xs font-medium font-clash-display tracking-tight">
              {isEventEnded ? 'CLOSED' : canRegister ? 'REGISTER' : 'CLOSED'}
            </span>
          </button>
        ) : (
          <div className="flex-1 h-8 md:h-9 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
            <span className="text-white text-xs font-medium font-clash-display tracking-tight">
              {isEventEnded ? 'CLOSED' : 'COMING SOON'}
            </span>
          </div>
        )}

        {meet && (canRegister || isEventLive) && !isEventEnded && (
          <button
            onClick={() => window.open(meet, '_blank', 'noopener,noreferrer')}
            className={`flex-1 h-8 md:h-9 rounded-lg flex items-center justify-center text-center transition ${
              isEventLive
                ? 'bg-green-600 hover:opacity-100 opacity-90 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            type="button"
            disabled={!isEventLive}
          >
            <span className="text-white text-xs font-medium font-clash-display tracking-tight">
              {isEventLive ? 'JOIN' : 'JOIN SOON'}
            </span>
          </button>
        )}
      </div>
    );
  };

  const renderRegularButtons = () => {
    if (!event.registrationLink && !hasSlots) {
      return (
        <div className="mt-auto w-full h-8 md:h-9 bg-gray-400 rounded-lg flex items-center justify-center cursor-not-allowed">
          <span className="text-white text-xs font-medium font-clash-display tracking-tight">
            {isEventEnded ? 'REGISTRATION CLOSED' : 'COMING SOON'}
          </span>
        </div>
      );
    }

    const isClosed = isEventEnded || registrationEnded || !canRegister;

    return (
      <div className="mt-auto w-full flex gap-2">
        <button
          onClick={handleRegisterClick}
          className={`flex-1 h-8 md:h-9 rounded-lg flex items-center justify-center transition ${
            !isClosed
              ? 'bg-black hover:opacity-100 opacity-90 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={isClosed}
        >
          <span className="text-white text-xs font-medium font-clash-display tracking-tight">
            {isEventEnded || registrationEnded
              ? 'REGISTRATION CLOSED'
              : canRegister
              ? 'REGISTER NOW'
              : 'COMING SOON'}
          </span>
        </button>

        {event.vidLink && (
          <button
            onClick={() => {
              window.open(event.vidLink, '_blank', 'noopener,noreferrer');
            }}
            className="h-8 md:h-9 px-3 md:px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition shrink-0 cursor-pointer"
            aria-label="Watch promo video"
          >
            <Play size={14} fill="currentColor" />
            <span className="text-white text-xs font-medium font-clash-display tracking-tight hidden sm:inline">
              PROMO
            </span>
          </button>
        )}
      </div>
    );
  };

  const renderSlotModal = () => {
    if (!showSlotModal || !hasSlots) return null;

    return (
      <div
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
        onClick={() => setShowSlotModal(false)}
      >
        <div
          className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto border border-gray-300 animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-clash-display text-black mb-4">
            Select Time Slot
          </h3>

          <div className="space-y-3">
            {slots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotSelect(slot)}
                className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition"
              >
                <div className="font-gilroy-medium text-black text-sm">
                  {slot.name}
                </div>
                <div className="font-gilroy-light text-gray-600 text-xs mt-1">
                  {new Date(slot.start_time).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}{' '}
                  -{' '}
                  {new Date(slot.end_time).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSlotModal(false)}
            className="mt-4 w-full p-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-black font-gilroy-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`w-full mx-auto relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl h-full ${
          hasPoster
            ? 'col-span-1 md:col-span-2 flex flex-col md:flex-row'
            : 'col-span-1 flex flex-col'
        }`}
      >
        {!isWebinar && (
          <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {event.eventType}
          </div>
        )}

        {/* Poster Image */}
        {hasPoster && (
          <div
            className={`w-full md:w-1/2 h-auto md:h-auto shrink-0 ${
              isEventEnded || registrationEnded || !canRegister
                ? ''
                : 'cursor-pointer'
            }`}
            onClick={() => {
              const isClosed = isEventEnded || registrationEnded || !canRegister;
              if (!isClosed) {
                handleRegisterClick();
              }
            }}
          >
            <img
              src={event.posterUrl}
              alt={`${event.title} poster`}
              className={`w-full h-auto object-contain rounded-t-xl md:rounded-l-xl md:rounded-tr-none ${
                isEventEnded || registrationEnded || !canRegister
                  ? ''
                  : 'hover:opacity-90 transition-opacity'
              }`}
            />
          </div>
        )}

        {/* Content */}
        <div
          className={`relative overflow-y-auto p-4 md:p-5 flex flex-col gap-3 ${
            hasPoster ? 'w-full md:w-1/2 flex-1' : 'w-[80%] h-full'
          }`}
        >
          <h3 className="text-lg md:text-2xl font-clash-display text-black leading-tight">
            {event.title}
          </h3>

          {renderSpeakers()}
          {renderWebinarTime()}

          <p className="text-xs md:text-sm font-gilroy-light text-black leading-relaxed [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
            {event.description}
          </p>

          {renderCapacity()}

          {renderLogos()}
          {renderSponsors()}

          {renderPOC()}

          {isWebinar ? renderWebinarButtons() : renderRegularButtons()}
        </div>

        {/* Decorative Image (no poster) */}
        {!hasPoster && (
          <img
            src={side_image}
            alt="side decorations"
            className="absolute right-0 top-0 w-16 md:w-20 h-auto"
          />
        )}
      </div>

      {renderSlotModal()}
    </>
  );
}

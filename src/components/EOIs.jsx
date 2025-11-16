import React, { useState, useEffect } from 'react';
import EOICard from './EOICard';

const LoadingAnimation = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
    </div>
  </div>
);

const EOIs = () => {
  const [eoiCards, setEoiCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEOIs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue");
        const eoiData = await response.json();

        const transformedEOIs = [];

        if (eoiData.agenda) {
          Object.values(eoiData.agenda).forEach(dateGroup => {
            Object.values(dateGroup).forEach(venueEvents => {
              venueEvents.forEach(eoi => {
                const categories = Array.isArray(eoi.category) ? eoi.category : [eoi.category];
                if (categories.includes('EOI')) {
                  transformedEOIs.push({
                    id: eoi.id || Math.random(),
                    title: eoi.name,
                    description: eoi.description,
                    badgeText: 'EOI',
                    badgeColor: 'bg-blue-600',
                    features: [],
                    buttonText: eoi.link ? 'APPLY NOW' : 'COMING SOON',
                    buttonAction: eoi.link ? () => window.open(eoi.link, '_blank', 'noopener,noreferrer') : () => {},
                    disabled: !eoi.link,
                    logo: null,
                    posterUrl: null,
                    poc: null,
                    startTime: eoi.start_time,
                    endTime: eoi.end_time
                  });
                }
              });
            });
          });
        }

        const processedEOIs = transformedEOIs.map(eoi => {
          try {
            const descData = JSON.parse(eoi.description);
            if (descData.description && descData.ExtraData) {
              const extraData = descData.ExtraData;
              return {
                ...eoi,
                description: descData.description,
                features: extraData.features || eoi.features,
                badgeColor: extraData.badgeColor || eoi.badgeColor,
                badgeText: extraData.badgeText || eoi.badgeText,
                logo: extraData.logo || eoi.logo,
                posterUrl: extraData.posterUrl || eoi.posterUrl,
                poc: extraData.poc || eoi.poc,
                disabled: extraData.disabled !== undefined ? extraData.disabled : eoi.disabled,
                buttonText: extraData.buttonText || eoi.buttonText,
                buttonAction: extraData.disabled ? () => {} : (eoi.link ? () => window.open(eoi.link, '_blank', 'noopener,noreferrer') : () => {}),
                id: extraData.id || eoi.id
              };
            }
          } catch (parseError) {
            console.warn('Failed to parse description JSON for EOI:', eoi.title, parseError);
          }
          return eoi;
        });

        // Sort EOIs by id in ascending order
        const sortedEOIs = processedEOIs.sort((a, b) => {
          const idA = typeof a.id === 'string' ? parseInt(a.id) : a.id;
          const idB = typeof b.id === 'string' ? parseInt(b.id) : b.id;
          return idA - idB;
        });

        setEoiCards(sortedEOIs);
        setError(null);
      } catch (err) {
        console.error('Error fetching EOIs:', err);
        setError('Failed to load EOIs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEOIs();
  }, []);

  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">
      {/* Main content */}
      <div className="relative py-[10vh] px-5 md:px-8 mt-7">
        {/* Header */}
        <div className="mb-[8vh] md:mb-[12vh] md:flex md:flex-col md:items-center">
          <div className="w-full md:text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-clash-display md:font-black text-blue-500 relative z-20">
              Expressions of Interest
            </h2>
          </div>

          <p className="text-lg md:text-xl font-gilroy-light text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            Join the IEDC Summit 2025 ecosystem. We're looking for innovative startups and groundbreaking products to showcase at our premier innovation event.
          </p>
        </div>

        {/* Cards Section - 1 column on mobile, 4 columns on desktop */}
        <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 md:auto-rows-fr gap-4 md:gap-6 mb-[10vh]">
          {isLoading ? (
            <div className="col-span-full">
              <LoadingAnimation />
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl font-gilroy-light text-gray-500 mb-4">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : eoiCards.length > 0 ? (
            eoiCards.map((card) => (
              <EOICard key={card.id} card={card} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl font-gilroy-light text-gray-500">
                No EOIs available
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
};

export default EOIs;
import React, { useState, useEffect } from 'react';
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";

const Directions = () => {
  const [activeCollege, setActiveCollege] = useState('lbs');
  const [activeTransport, setActiveTransport] = useState('flight');
  const [hasAnimated, setHasAnimated] = useState(false);
  const headerRef = React.useRef(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();

  // Only animate on first mount
  useEffect(() => {
    if (sectionVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [sectionVisible, hasAnimated]);

  const lbsDirections = {
    flight: {
      title: 'For those arriving by flight',
      airports: [
        { name: 'Mangaluru International Airport', distance: 'Approx 71km away' },
        { name: 'Kannur International Airport', distance: 'Approx 115km away' },
      ],
      note: 'From the Airport choose train / bus / taxi'
    },
    train: {
      title: 'For those arriving by train',
      stations: [
        { name: 'Kasaragod Railway Station', distance: 'Approx 13kms away', transport: 'by city bus / direct auto taxi (~300-400₹)' },
        { name: 'Kanhangad Railway Station', distance: 'Approx 30kms away', transport: 'By State/Line Bus' },
      ]
    },
    bus: {
      title: 'For those arriving by Bus',
      routes: [
        'Kasaragod Rwy Bustop > Old bus stand > Takeoff Towards Bovikanam, Mulleria, Adoor, Adhur, Sullia get down at Povval LBS Stop',
        'Kanhangad Town Stand > Bus Towards Kasaragod via Cherkala, Chattanchal, Poinachi, Vidyangara (NH66) get off at Cherkala, then Bus Towards Mulleria get down at Povval LBS Stop',
        'From Kannur Bus Stand : Take a bus to Kasaragod via NH-LS & get down cherkala, then move to Povval Lbs Stop',
        'Povval > LBS College Entrance Gate, Just 500m away | Auto taxi fare of 40₹',
      ]
    }
  };

  const cukDirections = {
    flight: {
      title: 'For those arriving by flight',
      airports: [
        { name: 'Mangaluru International Airport', distance: 'Approx 83km away' },
        { name: 'Kannur International Airport', distance: 'Approx 99km away' },
      ],
      note: 'From the Airport choose train / bus / taxi'
    },
    train: {
      title: 'For those arriving by train',
      stations: [
        { name: 'Kanhangad Railway Station', distance: 'Approx 11.4kms away', transport: 'By State/Line Bus' },
        { name: 'Kasaragod Railway Station', distance: 'Approx 30kms away', transport: 'by city bus / direct auto taxi' },
      ]
    },
    bus: {
      title: 'For those arriving by Bus',
      routes: [
        'Bus information for CUK will be available soon. Please check back later or contact us for details.',
      ]
    }
  };

  return (
    <section id="directions" ref={sectionRef} className={`w-full py-8 md:py-16 bg-white ${
      hasAnimated ? 'fade-in-up-visible' : 'fade-in-up-hidden'
    }`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-16 lg:px-20">
        <div ref={headerRef} className="text-center mb-6 md:mb-12">
          <div className="inline-flex justify-center items-center mb-3">
            <img 
              src="/iedc-summit-25-logo.png" 
              alt="IEDC Logo" 
              className="w-14 h-14 md:w-20 md:h-20 object-contain"
            />
          </div>
          <h2 className="text-2xl md:text-5xl font-normal font-clash-display text-gray-800 mb-3 px-4">
            Get Directions to the <span className="text-blue-500">Event</span>
          </h2>
          <div className="w-20 h-0.5 md:w-24 md:h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* College Selection Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveCollege('lbs')}
            className={`px-6 py-2 rounded-lg font-clash-display transition-all ${
              activeCollege === 'lbs'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            LBSCE Kasaragod
          </button>
          <button
            onClick={() => setActiveCollege('cuk')}
            className={`px-6 py-2 rounded-lg font-clash-display transition-all ${
              activeCollege === 'cuk'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Central University of Kerala
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Left Column - Content */}
          <div>
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-2xl md:text-3xl font-clash-display text-gray-800 mb-2">
                  How to Reach {activeCollege === 'lbs' ? 'LBSCEK' : 'CUK'}
                </h3>
                <div className="text-sm text-gray-600 font-gilroy-light space-y-1">
                  <p>
                    <span className="font-gilroy-medium text-gray-700">Venue: </span>
                    {activeCollege === 'lbs' 
                      ? 'IEDC Summit 2025' 
                      : "Nodal Officer's Meet/Founders Meet 34.0"}
                  </p>
                  <p>
                    <span className="font-gilroy-medium text-gray-700">Date: </span>
                    {activeCollege === 'lbs' 
                      ? '22-Dec-2025' 
                      : '21-Dec-2025'}
                  </p>
                </div>
              </div>
              <a 
                href={activeCollege === 'lbs' ? 'https://maps.app.goo.gl/25U116tE8YQsnNtn6' : 'https://maps.app.goo.gl/zhfTwny2aWRhLv9a7'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-clash-display rounded-lg transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                 Get Directions
              </a>
            </div>

            {/* Transport Mode Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {['flight', 'train', 'bus'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveTransport(mode)}
                  className={`px-4 py-2 rounded-lg font-gilroy-medium text-sm transition-all ${
                    activeTransport === mode
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {mode === 'flight' ? '✈️ Flight' : mode === 'train' ? '🚂 Train' : '🚌 Bus'}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="space-y-4">
              {(() => {
                const directions = activeCollege === 'lbs' ? lbsDirections : cukDirections;
                const data = directions[activeTransport];

                return (
                  <>
                    <h4 className="text-lg font-clash-display text-gray-800">
                      {data.title}
                    </h4>

                    {activeTransport === 'flight' && (
                      <>
                        <div className="space-y-3">
                          {data.airports?.map((airport, idx) => (
                            <div key={idx} className="pb-3 border-b border-gray-200 last:border-b-0">
                              <p className="text-gray-800 font-gilroy-medium">{airport.name}</p>
                              <p className="text-gray-600 text-sm font-gilroy-light">{airport.distance}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-blue-600 font-gilroy-medium text-sm mt-4 p-3 bg-blue-50 rounded-lg">
                          {data.note}
                        </p>
                      </>
                    )}

                    {activeTransport === 'train' && (
                      <div className="space-y-3">
                        {data.stations?.map((station, idx) => (
                          <div key={idx} className="pb-3 border-b border-gray-200 last:border-b-0">
                            <p className="text-gray-800 font-gilroy-medium">{station.name}</p>
                            <p className="text-gray-600 text-sm font-gilroy-light">{station.distance}</p>
                            <p className="text-gray-600 text-sm font-gilroy-light">{station.transport}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTransport === 'bus' && (
                      <div className="space-y-3">
                        {data.routes?.map((route, idx) => (
                          <div key={idx} className="pb-3 border-b border-gray-200 last:border-b-0">
                            <p className="text-gray-700 font-gilroy-light text-sm leading-relaxed">{route}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Colored Blocks at Bottom */}
      <img 
        src="/hero-blocks.png" 
        alt="Decorative blocks" 
        className="w-full h-20 sm:h-24 mt-5 -mb-16 object-cover"
      />
    </section>
  );
};

export default Directions;

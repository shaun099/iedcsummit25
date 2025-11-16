import React, { useState } from 'react';
import { Search } from 'lucide-react';

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

  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">

      {/* Maintenance Banner */}

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
      {/* <div className="w-full bg-yellow-400 text-black py-4 px-5 text-center font-gilroy-medium text-lg top-10">
        🚧 Events page is currently under maintenance. We'll be back soon! 🚧
      </div> */}

        {/* Maintenance Message */}
        <div className="w-full max-w-4xl mx-auto text-center py-20">
          <div className="text-6xl mb-6">🔧</div>
          <h3 className="text-2xl md:text-3xl font-clash-display text-blue-600 mb-4">
            Under Maintenance
          </h3>
          <p className="text-lg font-gilroy-light text-gray-600 max-w-2xl mx-auto">
            We're currently working on some exciting updates to the events page. 
            Please check back soon for the latest information about IEDC Summit 2025 events.
          </p>
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
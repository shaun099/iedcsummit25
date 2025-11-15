import React from 'react';
import { Link } from 'react-router-dom';
import side_image from '../assets/side_image.png';

const EOIs = () => {
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

        {/* Cards Section */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-[10vh]">
          {/* Call for Startups Card */}
          <div className="w-full max-w-80 mx-auto aspect-4/5 relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Event Type Badge */}
            <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-gilroy-medium">
              STARTUP
            </div>

            <div className="w-[75%] md:w-[80%] h-full left-0 top-0 absolute overflow-y-auto p-4 md:p-6 flex flex-col gap-3">
              <h3 className="text-lg md:text-2xl font-gilroy-medium text-black leading-tight wrap-break-word [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
                Call for Startups
              </h3>

              <p className="text-xs md:text-sm font-gilroy-light text-black leading-relaxed [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
                Are you building the next big thing? Join our startup showcase and connect with investors, mentors, and fellow entrepreneurs. Present your innovative solutions and gain visibility in the startup ecosystem.
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-xs font-gilroy-medium text-blue-600">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pitch to industry experts
                </div>
                <div className="flex items-center text-xs font-gilroy-medium text-blue-600">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Network with investors
                </div>
                <div className="flex items-center text-xs font-gilroy-medium text-blue-600">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gain media exposure
                </div>
              </div>

              <div className="mt-auto w-full flex gap-2">
                <button
                  onClick={() => {
                    window.open('/call-for-startups', '_blank', 'noopener,noreferrer');
                  }}
                  className="flex-1 h-8 md:h-9 rounded-lg flex items-center justify-center transition bg-black hover:opacity-100 opacity-90 cursor-pointer"
                >
                  <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                    APPLY NOW
                  </span>
                </button>
              </div>
            </div>

            {/* Figma Colored Decorations */}
            <img
              src={side_image}
              alt="side decorations"
              className="absolute right-0 top-0 w-20 h-auto"
            />
          </div>

          {/* Call for Products/Student Startups Card */}
          <div className="w-full max-w-80 mx-auto aspect-4/5 relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Event Type Badge */}
            <div className="absolute top-3 right-3 z-10 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-gilroy-medium">
              PRODUCT
            </div>

            <div className="w-[75%] md:w-[80%] h-full left-0 top-0 absolute overflow-y-auto p-4 md:p-6 flex flex-col gap-3">
              <h3 className="text-lg md:text-2xl font-gilroy-medium text-black leading-tight wrap-break-word [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
                Call for Products/Student Startups
              </h3>

              <p className="text-xs md:text-sm font-gilroy-light text-black leading-relaxed [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
                Showcase your innovative products at IEDC Summit 2025. Connect with customers, partners, and industry leaders in our product exhibition.
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-xs font-gilroy-medium text-blue-600">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Exhibition space
                </div>
                <div className="flex items-center text-xs font-gilroy-medium text-blue-600">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Demo opportunities
                </div>
                <div className="flex items-center text-xs font-gilroy-medium text-blue-600">
                  <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Business networking
                </div>
              </div>

              <div className="mt-auto w-full flex gap-2">
                <button
                  onClick={() => {
                    window.open('/call-for-products', '_blank', 'noopener,noreferrer');
                  }}
                  className="flex-1 h-8 md:h-9 rounded-lg flex items-center justify-center transition bg-black hover:opacity-100 opacity-90 cursor-pointer"
                >
                  <span className="text-white text-xs font-medium font-clash-display tracking-tight">
                    APPLY NOW
                  </span>
                </button>
              </div>
            </div>

            {/* Figma Colored Decorations */}
            <img
              src={side_image}
              alt="side decorations"
              className="absolute right-0 top-0 w-20 h-auto"
            />
          </div>
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
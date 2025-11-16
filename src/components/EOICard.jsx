import React from 'react';
import side_image from '../assets/side_image.png';

const EOICard = ({ card }) => {
  const hasPoster = card.posterUrl;

  return (
    <div className={`w-full mx-auto relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl h-full ${
      hasPoster 
        ? 'col-span-1 md:col-span-2 flex flex-col md:flex-row' 
        : 'col-span-1 flex flex-col'
    }`}>
      {/* Event Type Badge */}
      <div className={`absolute top-3 right-3 z-10 ${card.badgeColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
        {card.badgeText}
      </div>

      {/* Poster Image - Takes full width on mobile, left half on desktop */}
      {hasPoster && (
        <div className="w-full md:w-1/2 h-auto md:h-auto flex-shrink-0">
          <img
            src={card.posterUrl}
            alt={`${card.title} poster`}
            className="w-full h-auto object-contain rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
          />
        </div>
      )}

      {/* Content Container */}
      <div className={`relative overflow-y-auto p-4 md:p-5 flex flex-col gap-3 ${
        hasPoster
          ? 'w-full md:w-1/2 flex-1'
          : 'w-[80%] h-full'
      }`}>
        {/* Title */}
        <h3 className={`text-lg md:text-2xl font-clash-display text-black leading-tight ${
          hasPoster ? 'pr-0' : ''
        }`}>
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm font-gilroy-light text-black leading-relaxed">
          {card.description}
        </p>

        {/* Features */}
        {card.features && card.features.length > 0 && (
          <div className="space-y-2">
            {card.features.map((feature, index) => (
              <div key={index} className="flex items-center text-xs font-gilroy-medium text-blue-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* Point of Contact */}
        {card.poc && (
          <p className="text-xs font-gilroy-medium text-gray-700">
            POC: {card.poc.phone}
          </p>
        )}

        {/* Action Button */}
        <div className="mt-auto w-full flex gap-2">
          <button
            onClick={card.buttonAction}
            disabled={card.disabled}
            className={`flex-1 h-9 md:h-10 rounded-lg flex items-center justify-center transition ${
              card.disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:opacity-90 opacity-100 cursor-pointer'
            }`}
          >
            <span className="text-white text-xs md:text-sm font-clash-display tracking-tight">
              {card.buttonText}
            </span>
          </button>
        </div>
      </div>

      {/* Decorative Image - only show when no poster */}
      {!hasPoster && (
        <img
          src={side_image}
          alt="side decorations"
          className="absolute right-0 top-0 w-16 md:w-20 h-auto"
        />
      )}

      {/* Logo */}
      {card.logo && (
        <div className={`flex absolute justify-center bg-white bg-opacity-75 rounded-full items-center shadow-lg z-20 ${
          hasPoster
            ? 'right-3 top-3 md:top-12 w-16 h-16 md:w-20 md:h-20'
            : 'right-3 top-12 w-16 h-16 md:w-20 md:h-20'
        }`}>
          <img
            src={card.logo}
            alt={`${card.title} logo`}
            className="w-14 h-14 md:w-18 md:h-18 object-contain p-1"
          />
        </div>
      )}
    </div>
  );
};

export default EOICard;
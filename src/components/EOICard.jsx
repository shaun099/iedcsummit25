import React from 'react';
import side_image from '../assets/side_image.png';

const EOICard = ({ card }) => {
  return (
    <div className="w-full max-w-80 mx-auto aspect-4/5 relative bg-white rounded-xl shadow-[2px_4px_4px_0px_rgba(37,99,235,0.25)] outline-2 outline-blue-600/75 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Event Type Badge */}
      <div className={`absolute top-3 right-3 z-10 ${card.badgeColor} text-white px-3 py-1 rounded-full text-xs font-gilroy-medium`}>
        {card.badgeText}
      </div>

      <div className="w-[75%] md:w-[80%] h-full left-0 top-0 absolute overflow-y-auto p-4 md:p-5 flex flex-col gap-3">
        {/* Logo */}

        <h3 className="text-lg md:text-2xl font-gilroy-medium text-black leading-tight wrap-break-word [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
          {card.title}
        </h3>

        <p className="text-xs md:text-sm font-gilroy-light text-black leading-relaxed [text-shadow:0px_1px_8px_rgb(37_99_235/0.10)]">
          {card.description}
        </p>

        <div className="space-y-2">
          {card.features.map((feature, index) => (
              <div key={index} className="flex items-center text-xs font-gilroy-medium text-blue-600">
              <svg className="w-4 h-4 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </div>
          ))}
        </div>

        {card.poc && (
            <p className="text-xs font-gilroy-medium">
              POC: {card.poc.phone}
            </p>
        )}

        <div className="mt-auto w-full flex gap-2">
          <button
            onClick={card.buttonAction}
            disabled={card.disabled}
            className={`flex-1 h-8 md:h-9 rounded-lg flex items-center justify-center transition ${
                card.disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:opacity-100 opacity-90 cursor-pointer'
            }`}
            >
            <span className="text-white text-xs font-medium font-clash-display tracking-tight">
              {card.buttonText}
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
  {card.logo && (
    <div className="flex absolute justify-center right-0 top-10 w-22 h-22 mt-3 mr-3 bg-white bg-opacity-75 rounded-full items-center shadow-lg z-20">
      <img
        src={card.logo}
        alt={`${card.title} logo`}
        className="w-20 h-20 md:w-20 md:h-20 object-contain"
      />
    </div>
  )}
    </div>
  );
};

export default EOICard;
import React from 'react';
import { Link } from 'react-router-dom';
import EOICard from './EOICard';

const EOIs = () => {
  const eoiCards = [
    {
      id: 1,
      title: 'Call for Startups',
      description: 'Are you building the next big thing? Join our startup showcase and connect with investors, mentors, and fellow entrepreneurs. Present your innovative solutions and gain visibility in the startup ecosystem.',
      badgeText: 'STARTUP',
      badgeColor: 'bg-blue-600', 
      features: [
        'Pitch to industry experts',
        'Network with investors',
        'Gain media exposure'
      ],
      buttonText: 'APPLY NOW',
      buttonAction: () => {
        window.open('/call-for-startups', '_blank', 'noopener,noreferrer');
      },
      disabled: false
    },
    {
      id: 2,
      title: 'Call for Products/ Student Startups',
      description: 'Showcase your innovative products at IEDC Summit 2025. Connect with customers, partners, and industry leaders in our product exhibition.',
      badgeText: 'PRODUCT',
      badgeColor: 'bg-purple-600',
      features: [
        'Exhibition space',
        'Demo opportunities',
        'Business networking'
      ],
      poc: {
        phone: '+91 88918 39081'
      },
      buttonText: 'APPLY NOW',
      buttonAction: () => {
        window.open('/call-for-products', '_blank', 'noopener,noreferrer');
      },
      disabled: false
    },
    {
      id: 3,
      title: 'Celebrating Young Entrepreneurs – Live Market',
      description: 'Exhibition-cum-Sale event for student entrepreneurs to showcase products and gain real-world experience.',
      badgeText: 'EXHIBITION',
      badgeColor: 'bg-green-600',
      logo: '/udhyam.png', // Replace with actual exhibition logo path
      features: [
        'Real-world market experience',
        'Networking and mentorship'
      ],
      poc: {
        phone: '+91 70126 15894'
      },
      buttonText: 'COMING SOON',
      buttonAction: () => {},
      disabled: true
    }
  ];

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
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[10vh]">
          {eoiCards.map((card) => (
            <EOICard key={card.id} card={card} />
          ))}
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
import React from 'react';
import Leaderboard from './Leaderboard';
import LogoLoop from './LogoLoop';

const RegisterCTA = () => {
  return (
    <div>
      <Leaderboard />
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 bottom-0 left-0 object-cover"
      />
      {/* Scrolling Text Loop */}
            <div className="w-full skew-y-2 relative bottom-10 left-0 z-10 md:bottom-[4vh] lg:bottom-[3vh] md:left-0">
              <LogoLoop
                logos={[
                  { text: "IEDC SUMMIT 2025" },
                  { text: "IEDC SUMMIT 2025" },
                  { text: "IEDC SUMMIT 2025" },
                  { text: "IEDC SUMMIT 2025" },
                  { text: "IEDC SUMMIT 2025" },
                  { text: "IEDC SUMMIT 2025" },
                  { text: "IEDC SUMMIT 2025" },
                  { text: "IEDC SUMMIT 2025" },
                ]}
                speed={80}
                direction="left"
                logoHeight={20}
                gap={40}
                pauseOnHover={true}
                className="font-gilroy-bold bg-blue-600 py-5 text-white"
                ariaLabel="IEDC Summit 2025"
              />
            </div>
    </div>
  );
};

export default RegisterCTA;
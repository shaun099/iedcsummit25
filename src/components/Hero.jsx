import React from 'react';
import LogoLoop from './LogoLoop';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2025-12-22T09:00:00').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="home" className="w-full h-[110vh] md:h-[110vh] relative bg-white overflow-hidden">
      {/* Mobile Layout - Hidden on md and up */}
      <div className="md:hidden w-full min-h-screen relative bg-white">
        {/* Decorative Circles for Mobile */}
        <div className="w-64 h-64 absolute left-[-29px] top-[500px] opacity-50 rounded-full border-[0.50px] border-blue-600 animate-fade-in-up" style={{animationDelay: '0.6s'}} />
        <img src="/Ellipse3.svg" alt="Decorative" className="w-72 h-72 absolute left-[80px] top-[350px] opacity-50 animate-fade-in-up" style={{animationDelay: '0.7s'}} />
        
        {/* Main Content */}
        <div className="px-5 pt-24 pb-20 relative z-10">
          <h1 className="text-blue-500 text-[42px] font-bold font-clash-display leading-11 mb-3 animate-fade-in-down">
            IEDC SUMMIT<br />2025
          </h1>
          {/* Location */}
          <div className="text-blue-400 text-xl font-semibold font-clash-display mb-2 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Kasaragod</div>

          {/* Date */}
          <div className="flex items-center gap-2 relative mb-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-blue-500 text-lg font-bold font-gilroy-bold relative z-10">22 Dec 2025</div>
            <div className="w-6 h-6 rounded-full border-[0.32px] border-blue-600 absolute left-[105px]" />
          </div>

          {/* Register Button */}
          <a href="https://tickets.startupmission.in/iedc-summit-2025?code=earlybird" target="_blank" rel="noopener noreferrer" className="w-[200px] h-11 rounded-xl flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-shadow mb-3 z-20 animate-scale-in" style={{backgroundImage: 'url(/hero-blocks.png)', backgroundSize: 'cover', backgroundPosition: 'center', animationDelay: '0.3s'}}>
            <div className="absolute inset-0 bg-violet-600 group-hover:bg-violet-800 transition-bg-color duration-300"></div>
            <div className="text-neutral-100 text-lg font-semibold font-clash-display tracking-tight relative z-10">REGISTER NOW</div>
          </a>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="relative inline-block">
              <div className="text-blue-400 text-2xl font-gilroy-bold opacity-75">₹999</div>
              <div className="w-16 h-0.5 border-t-[3px] border-red-600 absolute top-1/2 left-0 -translate-y-1/2 -skew-y-10" />
            </div>
            <div className="text-blue-600 text-3xl font-gilroy-bold">₹749/-</div>
          </div>

          {/* Early Bird */}
          <div className="text-blue-400 text-sm font-normal font-gilroy-bold animate-fade-in-up" style={{animationDelay: '0.5s'}}>*Be quick, connect more*</div>
          
          {/* Coupon Code */}
          <div className="mt-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="inline-block px-3 py-1 bg-blue-100 border-2 border-blue-500 rounded-lg">
              <span className="text-blue-600 text-xs font-bold font-gilroy-bold">Code: </span>
              <span className="text-blue-700 text-xs font-black font-gilroy-bold">EARLYBIRD</span>
            </div>
          </div>
        </div>

        {/* Spacer for better separation */}
        <div className="h-32"></div>

        {/* Hero Background Image - Mobile - On Top of Blocks */}
        <div className="absolute bottom-0 right-0 w-[65%] max-w-[260px] z-10 animate-slide-in-right" style={{animationDelay: '0.8s'}}>
          <img
            src="/hero-img.png" 
            alt="Decorative image"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Colored Blocks at Bottom */}
        <img 
          src="/hero-blocks.png" 
          alt="Decorative blocks" 
          className="w-full h-14 object-cover absolute bottom-0 left-0 z-5 animate-fade-in-up" style={{animationDelay: '0.9s'}}
        />

        {/* Countdown Badge - Mobile */}
        <div className="absolute bottom-15 left-1 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border-2 border-blue-200">
            <div className="grid grid-cols-4 gap-2">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="text-blue-600 text-3xl font-bold font-gilroy-bold leading-none">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-blue-400 text-xs font-bold font-gilroy-bold mt-1">DAYS</div>
              </div>
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="text-blue-600 text-3xl font-bold font-gilroy-bold leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-blue-400 text-xs font-bold font-gilroy-bold mt-1">HRS</div>
              </div>
              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="text-blue-600 text-3xl font-bold font-gilroy-bold leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-blue-400 text-xs font-bold font-gilroy-bold mt-1">MIN</div>
              </div>
              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="text-blue-600 text-3xl font-bold font-gilroy-bold leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-blue-400 text-xs font-bold font-gilroy-bold mt-1">SEC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Text Loop - At Blocks Level */}
      <div className="w-full -skew-y-2 absolute bottom-10 left-0 z-10 md:absolute md:bottom-[6vh] lg:bottom-[5vh] md:left-0">
        <LogoLoop
          logos={[
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
          ]}
          speed={80}
          direction="right"
          logoHeight={20}
          gap={40}
          pauseOnHover={true}
          className="font-gilroy-bold bg-blue-600 py-5 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block w-full min-h-screen lg:h-[110vh] relative">
        {/* Decorative Circles - Using SVG */}
        <img src="/Ellipse2.svg" alt="Decorative circle 1" className="w-1/2 absolute left-1/2 top-10 opacity-50 animate-fade-in-up" style={{animationDelay: '0.1s'}} />
        <img src="/Ellipse3.svg" alt="Decorative circle 2" className="w-2/5 absolute right-10 top-20 lg:top-30 animate-fade-in-up" style={{animationDelay: '0.2s'}} />
        <img src="/Ellipse3.svg" alt="Decorative circle 3" className="w-2/5 absolute -right-80 top-20 lg:top-30 opacity-25 animate-fade-in-up" style={{animationDelay: '0.3s'}} />
        <img src="/Ellipse3.svg" alt="Decorative circle 4" className="w-1/3 absolute left-130 bottom-20 lg:bottom-30 opacity-5 animate-fade-in-up" style={{animationDelay: '0.4s'}} />

        {/* Main Content Container */}
        <div className="w-1/2 absolute top-[6vh] md:top-[25vh] lg:top-[13vh] xl:top-[25vh] left-[10%] flex flex-col gap-3 pb-40 animate-fade-in-down" style={{animationDelay: '0.5s'}}>
          {/* Title with Logo */}
          <div className="relative">
            <h1 className="text-blue-500 text-[5vh] lg:text-[6vh] xl:text-[7vh] font-semibold drop-shadow-[0px_2px_19px_rgba(37,99,235,0.10)] font-clash-display leading-15">
              IEDC <br/>SUMMIT 2025<br/>
            </h1>

            {/* Logo - Top Right of Title */}
            <img className="w-[2vh] md:w-[10vh] lg:w-[15vh] h-auto absolute -top-[3vh]  lg:-top-[8vh] left-[8vh] md:left-[12vh] lg:left-[20vh] animate-scale-in" style={{animationDelay: '0.6s'}} src="/iedc-summit-25-logo.png" alt="IEDC Badge" />

            {/* Location */}
            <div className="text-[#597fba] text-[2vh] lg:text-[3vh] font-semibold font-gilroy-medium">Kasaragod</div>

            {/* Date */}
            <div className="flex items-center relative my-[0.5vh] lg:my-[1vh]">
              <img src="/Ellipse1.svg" alt="Decorative circle 1" className="w-[1.5vh] lg:w-[2vh] h-[1.5vh] lg:h-[2vh] absolute -top-[0.2vh] lg:-top-[0.5vh] left-[3vh] lg:left-[4vh]" />
              <div className="text-blue-500 text-[2.5vh] lg:text-[4vh] font-black leading-[2vh]  font-gilroy-bold relative z-10">22 Dec 2025</div>
            </div>

            {/* Register Button */}
            <a 
              href="https://tickets.startupmission.in/iedc-summit-2025?code=earlybird" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 lg:px-12 py-3 lg:py-4 rounded-[29px] flex items-center justify-center mt-[2vh]  transition-colors duration-300 relative overflow-hidden group inline-block"
            >
              <div className="absolute inset-0 bg-violet-600 group-hover:bg-violet-800 transition-bg-color duration-300"></div>
              <div className="text-white text-[2.5vh] lg:text-[3.5vh] font-normal font-clash-display relative z-10">
                REGISTER NOW
              </div>
            </a>

            {/* Amount */}
            <div className="flex items-baseline gap-2 mt-[2vh]">
              <div className="text-blue-400 text-[2.5vh] lg:text-[4vh] font-black font-gilroy-bold opacity-75 relative inline-block">
              <div className="w-full lg:w-full h-[0.5vh] lg:h-[0.7vh] border-t-4 border-red-600 absolute top-1/2 left-0 -translate-y-1/2 -skew-6" />
              ₹999
            </div>
              <div className="text-blue-600 text-[3vh] lg:text-[5vh] font-black font-gilroy-bold">₹749/-</div>
            </div>
            {/* Paragraph */}
            <div className="text-blue-400 text-[1.2vh] lg:text-xl font-black font-gilroy-bold leading-3">*Be quick, connect more*</div>
            
            {/* Coupon Code */}
            <div className="mt-[1vh] lg:mt-[1.5vh] animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="inline-block px-3 lg:px-4 py-1 lg:py-2 bg-blue-100 border-2 border-blue-500 rounded-lg">
                <span className="text-blue-600 text-[1vh] lg:text-base font-bold font-gilroy-bold">Code: </span>
                <span className="text-blue-700 text-[1.1vh] lg:text-lg font-black font-gilroy-bold">EARLYBIRD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colored Blocks at Bottom - Using PNG */}
        <img 
          src="/hero-blocks.png" 
          alt="Decorative blocks" 
          className="w-full h-16 lg:h-[10vh] absolute bottom-0 lg:bottom-[9vh] left-0 object-cover animate-fade-in-up" style={{animationDelay: '0.7s'}}
        />

        {/* Hero Background Image - Aligned Left and Scaled */}
       <img
            src="/hero-img.png" 
            alt="Decorative blocks"
            className="h-[50vh] lg:h-[70vh] xl:h-[90vh] absolute bottom-[1vh] lg:bottom-[8%] right-[1%] object-contain animate-slide-in-right" style={{animationDelay: '0.8s'}}/>

        {/* Countdown Badge - Near Hero Image */}
        <div className="absolute bottom-[10vh] md:bottom-[15vh] lg:bottom-[23vh] right-[5%] md:right-[50%] lg:right-[40%] animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 shadow-xl border-2 border-blue-200">
            <div className="grid grid-cols-4 gap-2 md:gap-4 lg:gap-6">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="text-blue-600 text-[4vh] md:text-[6vh] lg:text-[8vh] font-bold font-gilroy-bold leading-none">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-blue-400 text-[1.2vh] md:text-[1.8vh] lg:text-[2.5vh] font-bold font-gilroy-bold mt-1">DAYS</div>
              </div>
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="text-blue-600 text-[4vh] md:text-[6vh] lg:text-[8vh] font-bold font-gilroy-bold leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-blue-400 text-[1.2vh] md:text-[1.8vh] lg:text-[2.5vh] font-bold font-gilroy-bold mt-1">HRS</div>
              </div>
              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="text-blue-600 text-[4vh] md:text-[6vh] lg:text-[8vh] font-bold font-gilroy-bold leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-blue-400 text-[1.2vh] md:text-[1.8vh] lg:text-[2.5vh] font-bold font-gilroy-bold mt-1">MIN</div>
              </div>
              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="text-blue-600 text-[4vh] md:text-[6vh] lg:text-[8vh] font-bold font-gilroy-bold leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-blue-400 text-[1.2vh] md:text-[1.8vh] lg:text-[2.5vh] font-bold font-gilroy-bold mt-1">SEC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
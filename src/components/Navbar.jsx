import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/iedc-summit-25-logo.png';
import ellipse1 from '/Ellipse1.svg';

const navItems = [
  { label: 'Home', href: '/' },
  // { label: 'About', href: '#about' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Events', href: '/events' },
  //{ label: 'Schedule', href: '/schedule' },
  { label: 'Webinars', href: '/webinars' },
  { label: 'EOIs', href: '/eois' },
  // { label: 'FAQ', href: '#faq' },
  // { label: 'Gallery', href: '#gallery' },
  { label: 'Be Our Sponsor', href: '/be-our-sponsor' },
];

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    // Set active section based on current route
    const currentPath = location.pathname;
    
    // Check if we're on a route page
    const routeItem = navItems.find(item => item.href === currentPath);
    if (routeItem) {
      setActiveSection(routeItem.label);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only detect active section based on scroll if on home page
      if (currentPath === '/') {
        // Detect active section based on scroll position (only hash links, not routes)
        const sections = navItems
          .filter(item => item.href.startsWith('#'))
          .map(item => ({
            id: item.href.substring(1),
            label: item.label
          }));

        let currentSection = 'Home';
        let closestDistance = Infinity;

        for (let section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            
            // Check if section is in viewport
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
              // For sections that are visible, prioritize those closer to the top
              const distanceFromTop = Math.max(0, rect.top);
              
              if (distanceFromTop < closestDistance) {
                closestDistance = distanceFromTop;
                currentSection = section.label;
              }
            }
          }
        }

        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (label, href) => {
    setActiveSection(label);
    // If it's a route (starts with /), use Link navigation
    if (href.startsWith('/')) {
      // React Router will handle this, just update active section
      return;
    }
    // If it's a hash link (starts with #), scroll to element
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 w-full h-16 lg:h-20 items-center justify-center z-50 px-2 lg:px-4">
        {/* Logo and Navigation Links Container */}
        <div className={`flex items-center gap-2 md:gap-4 lg:gap-6 xl:gap-8 transition-all duration-300 max-w-full ${isScrolled ? 'bg-white rounded-lg px-3 md:px-4 lg:px-6 py-2 lg:py-3' : 'bg-transparent'}`}>
          {/* Logo */}
          <button
            onClick={() => {
              setActiveSection('Home');
              window.location.href = '/';
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity bg-none border-none p-0 flex-shrink-0"
          >
            <img 
              src={logo} 
              alt="IEDC Logo" 
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
            />
          </button>

          {/* Navigation Links */}
          <div className="inline-flex justify-start items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6 flex-wrap">
            {navItems.map((item) => (
              <div key={item.href} className="relative flex-shrink-0">
                {item.href.startsWith('/') ? (
                  // Route link
                  <Link 
                    to={item.href}
                    onClick={() => setActiveSection(item.label)}
                    className="pb-px inline-flex flex-col justify-start items-start group cursor-pointer"
                  >
                    <div className={`justify-center text-blue-600 text-sm md:text-base lg:text-lg font-bold font-Gilroy leading-tight hover:opacity-100 transition-opacity whitespace-nowrap ${activeSection === item.label ? 'opacity-100' : 'opacity-50'}`}>
                      {item.label}
                    </div>
                  </Link>
                ) : (
                  // Hash link
                  <button 
                    onClick={() => handleNavClick(item.label, item.href)}
                    className="pb-px inline-flex flex-col justify-start items-start group cursor-pointer bg-none border-none"
                  >
                    <div className={`justify-center text-blue-600 text-sm md:text-base lg:text-lg font-bold font-Gilroy leading-tight hover:opacity-100 transition-opacity whitespace-nowrap ${activeSection === item.label ? 'opacity-100' : 'opacity-50'}`}>
                      {item.label}
                    </div>
                  </button>
                )}
                {/* Active Indicator */}
                {activeSection === item.label && (
                  <img 
                    src={ellipse1} 
                    alt="Active indicator" 
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 absolute -top-1 md:top-0 left-1/2 transform -translate-x-1/2"
                  />
                )}
              </div>
            ))}

            {/* Register Button */}
            <a 
              href="https://tickets.startupmission.in/iedc-summit-2025?code=earlybird" target='_blank'
              className="w-28 h-8 md:w-32 md:h-9 lg:w-36 lg:h-10 xl:w-40 xl:h-10 relative bg-blue-600 rounded-lg lg:rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center flex-shrink-0"
            >
              <div className="text-white text-xs md:text-sm lg:text-base xl:text-lg font-semibold font-clash-display leading-tight">REGISTER NOW</div>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 w-full z-50 px-3 py-2 sm:px-4 sm:py-3 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setActiveSection('Home');
              setIsMobileMenuOpen(false);
              window.location.href = '/';
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity bg-none border-none p-0"
          >
            <img 
              src={logo} 
              alt="IEDC Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-blue-600 text-xl sm:text-2xl font-bold p-2"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <div className="mt-3 space-y-1 bg-white rounded-lg px-3 py-2 border border-gray-100 shadow-lg">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.href.startsWith('/') ? (
                  // Route link
                  <Link
                    to={item.href}
                    onClick={() => {
                      setActiveSection(item.label);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left text-blue-600 text-sm sm:text-base font-bold py-2 px-2 hover:opacity-100 hover:bg-blue-50 rounded transition-all cursor-pointer ${activeSection === item.label ? 'opacity-100 bg-blue-50' : 'opacity-70'}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  // Hash link
                  <button
                    onClick={() => {
                      handleNavClick(item.label, item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left text-blue-600 text-sm sm:text-base font-bold py-2 px-2 hover:opacity-100 hover:bg-blue-50 rounded transition-all cursor-pointer bg-none border-none ${activeSection === item.label ? 'opacity-100 bg-blue-50' : 'opacity-70'}`}
                  >
                    {item.label}
                  </button>
                )}
                {/* Active Indicator */}
                {activeSection === item.label && (
                  <img 
                    src={ellipse1} 
                    alt="Active indicator" 
                    className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>
            ))}
            <a
              href="https://tickets.startupmission.in/iedc-summit-2025?code=earlybird" target="_blank"
              className="block w-full bg-blue-600 text-white text-sm sm:text-base font-bold py-2.5 text-center rounded-lg hover:bg-blue-700 transition-all duration-300 mt-3"
            >
              REGISTER NOW
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

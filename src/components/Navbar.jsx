import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/iedc-summit-25-logo.png';
import ellipse1 from '/Ellipse1.svg';

const navItems = [
  { label: 'Home', href: '/' },
  // { label: 'About', href: '#about' },
  { label: 'Schedule', href: '/schedule' },
  {label: 'Events', href: "/events"},
  // { label: 'Directions', href: '#directions' },
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
      <nav className="hidden md:flex fixed top-0 left-0 right-0 w-full h-24 items-center justify-center z-1000">
        {/* Logo and Navigation Links Container */}
        <div className={`flex items-center gap-8 transition-all duration-300 ${isScrolled ? 'bg-white rounded-lg px-6 py-3' : 'bg-transparent'}`}>
          {/* Logo */}
          <button
            onClick={() => {
              setActiveSection('Home');
              window.location.href = '/';
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity bg-none border-none p-0"
          >
            <img 
              src={logo} 
              alt="IEDC Logo" 
              className="w-16 h-16 object-contain"
            />
          </button>

          {/* Navigation Links */}
          <div className="inline-flex justify-start items-center gap-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.href.startsWith('/') ? (
                  // Route link
                  <Link 
                    to={item.href}
                    onClick={() => setActiveSection(item.label)}
                    className="pb-px inline-flex flex-col justify-start items-start group cursor-pointer"
                  >
                    <div className={`justify-center text-blue-600 text-lg font-bold font-Gilroy leading-7 hover:opacity-100 transition-opacity ${activeSection === item.label ? 'opacity-100' : 'opacity-50'}`}>
                      {item.label}
                    </div>
                  </Link>
                ) : (
                  // Hash link
                  <button 
                    onClick={() => handleNavClick(item.label, item.href)}
                    className="pb-px inline-flex flex-col justify-start items-start group cursor-pointer bg-none border-none"
                  >
                    <div className={`justify-center text-blue-600 text-lg font-bold font-Gilroy leading-7 hover:opacity-100 transition-opacity ${activeSection === item.label ? 'opacity-100' : 'opacity-50'}`}>
                      {item.label}
                    </div>
                  </button>
                )}
                {/* Active Indicator */}
                {activeSection === item.label && (
                  <img 
                    src={ellipse1} 
                    alt="Active indicator" 
                    className="w-8 h-8 absolute top-0 left-1/2 transform -translate-x-1/2"
                  />
                )}
              </div>
            ))}

            {/* Register Button */}
            <a 
              href="https://tickets.startupmission.in/iedc-summit-2025?code=earlybird" target='_blank'
              className="w-40 h-10 relative bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
            >
              <div className="text-white text-lg font-semibold font-clash-display leading-6">REGISTER NOW</div>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 w-full z-1000 p-4 bg-white">
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
              className="w-16 h-16 object-contain"
            />
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-blue-600 text-2xl font-bold"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <div className="mt-4 space-y-2 bg-white rounded-lg px-4 py-3">
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
                    className={`block w-full text-left text-blue-600 text-lg font-bold py-2 hover:opacity-100 transition-opacity cursor-pointer ${activeSection === item.label ? 'opacity-100' : 'opacity-50'}`}
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
                    className={`block w-full text-left text-blue-600 text-lg font-bold py-2 hover:opacity-100 transition-opacity cursor-pointer bg-none border-none ${activeSection === item.label ? 'opacity-100' : 'opacity-50'}`}
                  >
                    {item.label}
                  </button>
                )}
                {/* Active Indicator */}
                {activeSection === item.label && (
                  <img 
                    src={ellipse1} 
                    alt="Active indicator" 
                    className="w-5 h-5 absolute right-0 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>
            ))}
            <a
              href="https://tickets.startupmission.in/iedc-summit-2025?code=earlybird" target="_blank"
              className="block w-full bg-blue-600 text-white text-lg font-bold py-2 text-center rounded-lg hover:bg-blue-700 transition-all duration-300 mt-4"
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

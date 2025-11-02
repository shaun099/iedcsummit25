import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const Schedule = () => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cardHeights, setCardHeights] = useState({});
  const [sectionHeight, setSectionHeight] = useState("140vh");

  const toggleExpand = (index) => {
    setExpandedItems((prev) => (prev.includes(index) ? [] : [index]));
  };

  const updateCardHeight = (index, height) => {
    setCardHeights((prev) => ({ ...prev, [index]: height }));
  };

  const calculateTopPosition = (index) => {
    let top = 20;
    const baseSpacing = window.innerWidth >= 768 ? 105 : 80;
    for (let i = 0; i < index; i++) {
      if (expandedItems.includes(i) && cardHeights[i]) {
        top += cardHeights[i] + 20;
      } else {
        top += baseSpacing;
      }
    }
    return top;
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;
    
    const baseSpacing = isMobile ? 80 : 105;
    let calculatedHeight = 20; // Initial top margin
    
    schedule.forEach((_, index) => {
      if (expandedItems.includes(index) && cardHeights[index]) {
        calculatedHeight += cardHeights[index] + 20;
      } else {
        calculatedHeight += baseSpacing;
      }
    });
    
    // Add header height and bottom padding (different for mobile, tablet, and desktop)
    const headerHeight = isMobile ? 250 : 300; // More space for location filters
    let bottomPadding;
    
    if (isMobile) {
      bottomPadding = 50;
    } else if (isTablet) {
      bottomPadding = 120;
    } else {
      bottomPadding = 200;
    }
    
    calculatedHeight += headerHeight + bottomPadding;
    
    const calculatedVh = `${calculatedHeight}px`;
    
    setSectionHeight(calculatedVh);
  }, [expandedItems, cardHeights]);

  const location = [
    "OAT",
    "Aryabhatta",
    "Auditorium",
    "Cafeteria",
    "Innovation Hub",
    "Lounge Area",
    "OAT",
    "Aryabhatta",
    "Auditorium",
    "Cafeteria",
    "Innovation Hub",
    "Lounge Area",
  ];

  const schedule = [
    {
      time: "10:00 AM",
      event: "Product Pitch",
      bg_color: "#F8D247",
      speakers: [
        {
          name: "Anoop Ambika",
          title: "CEO, Kerala Startup Mission",
          image: "https://i.pravatar.cc/150?img=5",
        },
      ],
      description:
        "An insightful session on building sustainable innovation ecosystems and empowering local startups.",
    },
    {
      time: "11:00 AM",
      event: "Team Horizon",
      bg_color: "#2FEEC4",
      speakers: [
        {
          name: "Anoop Ambika",
          title: "CEO, Kerala Startup Mission",
          image: "https://i.pravatar.cc/150?img=5",
        },
        {
          name: "Sneha Raj",
          title: "Product Lead, Horizon Labs",
          image: "https://i.pravatar.cc/150?img=5",
        },
      ],
      description:
        "A deep dive into startup incubation strategies and the role of mentorship in early-stage growth. Exploring the future of collaborative AI and its impact on workplace efficiency.A deep dive into startup incubation strategies and the role of mentorship in early-stage growth. Exploring the future of collaborative AI and its impact on workplace efficiency.",
    },
    {
      time: "12:00 PM",
      event: "CIH Keynotes",
      bg_color: "#6495FD",
      speakers: [
        {
          name: "Dr. Rahul Menon",
          title: "Director, Centre for Innovation & Health",
          image: "https://i.pravatar.cc/150?img=5",
        },
      ],
      description:
        "Insights into healthtech innovations and AI-assisted diagnostics for better patient outcomes.",
    },
    {
      time: "1:00 PM",
      event: "Lunch Break",
      bg_color: "#FD83FD",
      speakers: [],
      description: "Time to refuel and network with fellow attendees.",
    },
    {
      time: "2:00 PM",
      event: "Women in Tech Panel",
      bg_color: "#F8D247",
      speakers: [
        {
          name: "Divya Nair",
          title: "CTO, NextGen Solutions",
          image: "https://i.pravatar.cc/150?img=5",
        },
        {
          name: "Neha Thomas",
          title: "Software Architect, CloudByte",
          image: "https://i.pravatar.cc/150?img=5",
        },
      ],
      description:
        "A panel discussion highlighting women leaders shaping the future of technology. Sharing experiences and growth strategies in leading high-performing tech teams.",
    },
    {
      time: "3:00 PM",
      event: "Product Demos",
      bg_color: "#2FEEC4",
      speakers: [
        {
          name: "Aditya Kumar",
          title: "Founder, Innovent",
          image: "https://i.pravatar.cc/150?img=5",
        },
      ],
      description:
        "Showcasing cutting-edge IoT and automation tools designed for modern living.",
    },
    {
      time: "4:00 PM",
      event: "Networking Hour",
      bg_color: "#FD83FD",
      speakers: [],
      description:
        "Connect with entrepreneurs, investors, and fellow innovators.",
    },
    {
      time: "5:00 PM",
      event: "Closing Ceremony",
      bg_color: "#6495FD",
      speakers: [
        {
          name: "Anoop Ambika",
          title: "CEO, Kerala Startup Mission",
          image: "https://i.pravatar.cc/150?img=5",
        },
      ],
      description:
        "Closing remarks and recognition of outstanding contributions during the event.",
    },
  ];

  return (
    <section
      id="Schedule"
      className="w-full overflow-y-hidden bg-white relative"
    >
      <div 
        className="mb-8 md:mb-5 md:flex md:flex-col md:items-center relative py-10 px-5 mt-15 md:mt-10"
        style={{ minHeight: sectionHeight }}
      >
        <div className="w-full md:text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-clash-display md:font-black text-blue-500 relative z-20">
            Schedule
          </h2>
          <div className="w-full px-6">
            <h3 className="text-xl font-light font-gilroy-light">
              Be on Time
            </h3>
          </div>
        </div>
        <div className="w-full md:w-[60%] max-h-[10vh] md:max-h-[20vh] flex gap-4 flex-nowrap overflow-x-auto overflow-y-hidden md:flex-wrap md:justify-center px-5 py-6">
          {location.map((loc, index) => (
            <div
              key={index}
              onClick={() => setSelectedLocation(index)}
              className={`flex-shrink-0 px-4 font-gilroy-light py-2 rounded-4xl shadow-md cursor-pointer transition-colors duration-200 ${
                selectedLocation === index
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "border border-blue-500 text-blue-500 hover:bg-blue-50"
              }`}
            >
              {loc}
            </div>
          ))}
        </div>
        <div className="w-full md:w-[70%] min-h-[18vh] mt-10 relative">
          <div className="w-full relative mx-auto rounded-4xl h-1/2 bg-transparent"></div>
          {schedule.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el && expandedItems.includes(index)) {
                  const height = el.offsetHeight;
                  if (cardHeights[index] !== height) {
                    updateCardHeight(index, height);
                  }
                }
              }}
              onClick={() => toggleExpand(index)}
              className="absolute w-full mx-auto rounded-4xl z-9 px-5 py-4 md:px-10 md:py-5 transition-all duration-300 shadow-xl cursor-pointer hover:shadow-2xl"
              style={{
                top: `${calculateTopPosition(index)}px`,
                height: expandedItems.includes(index) || index === schedule.length - 1 ? "auto" : "100%",
                backgroundColor: item.bg_color,
              }}
            >
              <div className="w-full h-auto flex flex-row justify-between">
                <div className="font-medium font-clash-display text-xl md:text-4xl flex flex-row items-center gap-2">
                  <ArrowDown
                    size={window.innerWidth >= 700 ? 40 : 24}
                    className={`transition-transform duration-300 ${
                      expandedItems.includes(index) ? "rotate-360" : "rotate-315"
                    }`}
                  />
                  <span>
                    {item.time.split(" ")[0]}
                    <span className="text-sm md:text-xl ml-1">
                      {item.time.split(" ")[1]} IST
                    </span>
                  </span>
                </div>
                <div className="font-medium font-clash-display text-xl md:text-4xl">
                  {item.event}
                </div>
              </div>
              {expandedItems.includes(index) && (
                <div className="mt-4 text-sm text-center">
                  {item.speakers.length > 0 ? (
                    <div className="md:flex md:flex-row md:items-center font-gilroy-light md:gap-2 md:mt-10">
                      {item.speakers.map((speaker, speakerIndex) => (
                        <div
                          key={speakerIndex}
                          className="mb-2 flex flex-row md:w-1/2 justify-center gap-4"
                        >
                          <div className="flex flex-row gap-3">
                            <img
                              src={speaker.image}
                              alt=""
                              className="rounded-full w-20"
                            />
                            <div className="flex flex-col md:items-start">
                              <p className="font-medium mt-4 md:text-2xl">
                                {speaker.name}
                              </p>
                              <p className="text-xs md:text-lg">
                                {speaker.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="italic">No speakers scheduled</p>
                  )}
                  <p className="mb-3 font-gilroy-light md:text-xl md:mt-8">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute bottom-0 left-0 object-cover"
      />
    </section>
  );
};

export default Schedule;
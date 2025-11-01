import React, { useState } from "react";
import LogoLoop from "./LogoLoop";
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";
import { ArrowDown } from "lucide-react";
import side_Image from "../assets/side_image.png";
const Schedule = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => (prev.includes(index) ? [] : [index]));
  };

  const calculateTopPosition = (index) => {
    let top = 20;
    for (let i = 0; i < index; i++) {
      // Base spacing is 60px, expanded items add 200px more
      top += expandedItems.includes(i) ? 380 : 80;
    }
    return top;
  };

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
      className={`w-full overflow-y-hidden  bg-white relative ${
        sectionVisible ? "fade-in-up-visible" : "fade-in-up-hidden"
      }`}
      ref={sectionRef}
    >
      <div className="hidden lg:block w-auto fixed left-0 top-0 h-[100%]">
        <img
          src={side_Image}
          alt="Side Left"
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="mb-8 md:mb-5 min-h-[140vh] md:min-h-[180vh] md:flex md:flex-col md:items-center  relative py-10 px-5 ">
        <div className="w-full md:text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light md:font-black font-clash-display text-blue-500  relative z-20 ">
            Schedule
          </h2>
          <div className="w-full px-6">
            <h3 className="text-xl font-light font-clash-display">
              Be on Time
            </h3>
          </div>
        </div>
        <div className="w-full md:w-[60%] max-h-[10vh] md:max-h-[30vh] flex gap-4 flex-nowrap overflow-x-auto overflow-y-hidden md:flex-wrap md:justify-center px-5 py-6 ">
          {location.map((loc, index) => (
            <div
              key={index}
              onClick={() => setSelectedLocation(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-4xl shadow-md cursor-pointer transition-colors duration-200 ${
                selectedLocation === index
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "border border-blue-500 text-blue-500 hover:bg-blue-50"
              }`}
            >
              {loc}
            </div>
          ))}
        </div>
        <div className="w-full md:w-[70%] min-h-[60vh]  mt-10 relative ">
          <div className="w-full relative mx-auto rounded-4xl h-1/2 bg-transparent"></div>
          {schedule.map((item, index) => (
            <div
              key={index}
              className="absolute w-full  mx-auto rounded-4xl z-9 px-5 py-4 md:px-10 md:py-5 transition-all duration-300 shadow-xl"
              style={{
                top: `${calculateTopPosition(index)}px`,
                height: expandedItems.includes(index) ? "100%" : "100%",
                backgroundColor: item.bg_color,
              }}
            >
              <div className="w-full h-auto flex flex-row justify-between">
                <div className="font-clash-display font-medium text-xl md:text-4xl flex flex-row items-center gap-2">
                  <ArrowDown
                    size={window.innerWidth >= 700 ? 40 : 24}
                    className={`cursor-pointer transition-transform duration-300 rotate-z-315 ${
                      expandedItems.includes(index) ? "rotate-45" : ""
                    }`}
                    onClick={() => toggleExpand(index)}
                  />
                  <span>
                    {item.time.split(" ")[0]}
                    <span className="text-sm md:text-xl ml-1 lowercase">
                      {item.time.split(" ")[1]} IST
                    </span>
                  </span>
                </div>
                <div className="font-clash-display font-medium text-xl md:text-4xl">
                  {item.event}
                </div>
              </div>
              {expandedItems.includes(index) && (
                <div className="mt-4 text-sm text-center">
                  {item.speakers.length > 0 ? (
                    <div className=" md:flex md:flex-row md:items-center md:gap-2 md:mt-10 ">
                      {item.speakers.map((speaker, speakerIndex) => (
                        <div
                          key={speakerIndex}
                          className="mb-2 flex flex-row   md:w-1/2  justify-center  gap-4"
                        >
                          <div className="flex flex-row gap-3">
                            <img
                              src={speaker.image}
                              alt=""
                              className="rounded-full w-20"
                            />
                            <div className="flex flex-col md:items-start">
                              <p className="font-medium font-clash-display mt-4 md:text-2xl">
                                {speaker.name}
                              </p>
                              <p className="text-xs font-clash-display md:text-lg">
                                {speaker.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="italic">No speakers scheduled</p>
                  )}{" "}
                  <p className="mb-3 font-gilroy-light md:text-xl md:mt-8">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block w-auto fixed right-0 top-0 h-[100%]">
        <img
          src={side_Image}
          alt="Side Left"
          className="h-full w-auto object-cover"
        />
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 object-cover mt-25 md:hidden relative z-50"
      />
    </section>
  );
};

export default Schedule;

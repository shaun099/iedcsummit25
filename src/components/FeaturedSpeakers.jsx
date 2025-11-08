import React from "react";
import star from "../assets/star.svg";

const speakers = [
  {
    name: "Deepak Ravindran",
    designation: "CEO, Kiranoppo",
    photo: "./anoop-ambika-ceo.jpg",
  },
  {
    name: "Anjali Menon",
    designation: "Founder, GreenHive",
    photo: "./anoop-ambika-ceo.jpg",
  },
  {
    name: "Ravi Kumar",
    designation: "Investor, StartupHub",
    photo: "./anoop-ambika-ceo.jpg",
  },
  {
    name: "Priya Nair",
    designation: "Founder, Tech4Change",
    photo: "./anoop-ambika-ceo.jpg",
  },
  {
    name: "Arjun Nambiar",
    designation: "CTO, NexaLabs",
    photo: "./anoop-ambika-ceo.webp",
  },
  {
    name: "Dr. Maya Krishnan",
    designation: "AI Researcher, Google Research",
    photo: "./anoop-ambika-ceo.webp",
  },
  {
    name: "Haris",
    designation: "Founder, Haris&Co.",
    photo: "./anoop-ambika-ceo.webp",
  },
  {
    name: "Neha Varghese",
    designation: "Product Manager, UrbanGro",
    photo: "./anoop-ambika-ceo.webp",
  },
];

const colors = [
  "bg-[#F8D247]",
  "bg-[#4D84F7]",
  "bg-[#E371E3]",
  "bg-[#45BBA1]",
  "bg-[#F8D247]",
  "bg-[#4D84F7]",
  "bg-[#E371E3]",
  "bg-[#45BBA1]",
];

export default function FeaturedSpeakers() {
  return (
    <section className="w-full min-h-screen bg-white px-4 py-10">
      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-500 mb-10">
        Featured Speakers
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[85vw] mx-auto">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden group shadow-sm w-[20vw] h-[60vh]  grayscale-0"
          >
            {/* Speaker Image */}
            <img
              src={speaker.photo}
              alt={speaker.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 "
            />

            <div className="absolute bottom-0 left-0 w-full transition-transform duration-300">
              <img src={star} alt="star" className="w-[1/3]" />
              <div className="absolute inset-0 flex flex-col justify-center items-start text-center px-4">
                <p className="text-lg md:text-xl font-semibold font-clash-display leading-tight text-black">
                  {speaker.name}
                </p>
                <p className="text-xs md:text-sm font-light font-clash-display opacity-90 text-black">
                  {speaker.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

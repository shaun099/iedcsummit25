import React, { useState, useEffect } from "react";
import arrow_r from "../assets/arrow_right.svg";

const LoadingAnimation = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" />
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      />
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      />
    </div>
  </div>
);

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch data
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://events.startupmission.in/api/event/iedc-summit-2025/speakers"
        );
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setSpeakers(Object.values(data).flat());
      } catch (err) {
        console.error(err);
        setSpeakers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  const colors = [
    "bg-[#F8D247] text-black",
    "bg-[#4D84F7] text-black",
    "bg-[#45BBA1] text-black",
    "bg-[#E371E3] text-black",
  ];

  const getSafePhoto = (photo) =>
    photo && photo.startsWith("http") && !photo.includes("null")
      ? photo
      : "https://placehold.co/300x300?text=Speaker";

  // --- RENDER ---
  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">
      <div className="relative py-[10vh] px-5 md:px-8 mt-7 mb-[10vh]">
        <div className="mb-[8vh] md:mb-[12vh] flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-clash-display font-black text-blue-500">
            Speakers
          </h2>
        </div>

        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-7xl mx-auto">
            {(() => {
              const items = [];
              const colsPerRow = isMobile ? 2 : 4;
              const speakersPerRow = isMobile ? 1 : 2;
              const rows = Math.ceil(speakers.length / speakersPerRow);
              console.log(speakers.length);

              for (let r = 0; r < rows; r++) {
                for (let c = 0; c < colsPerRow; c++) {
                  const isEvenRow = r % 2 === 0;
                  const speakerIndex = r * speakersPerRow + Math.floor(c / 2);
                  const speaker = speakers[speakerIndex];

                  if (!speaker) continue;

                  const color = colors[(speakerIndex + c) % colors.length];
                  const name = speaker.name || "Unnamed Speaker";
                  const designation = speaker.designation || "";
                  const organisation = speaker.organisation || "";
                  const photo = getSafePhoto(speaker.photo);

                  // determine whether this cell is photo or text
                  const isPhotoBlock = isMobile
                    ? isEvenRow
                      ? c % 2 === 0 // even rows: photo left (0), details right (1)
                      : c % 2 !== 0 // odd rows: details left (0), photo right (1)
                    : isEvenRow
                    ? c % 2 === 0
                    : c % 2 !== 0;

                  items.push(
                    <div
                      key={`${r}-${c}-${speaker.id || speakerIndex}`}
                      className={`w-full h-0 pb-[100%] relative ${
                        !isPhotoBlock ? `${color}` : ""
                      }`}
                    >
                      {isPhotoBlock ? (
                        <img
                          src={photo}
                          alt={name}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 px-4 pb-7 flex flex-col justify-end ${
                            isEvenRow ? "items-start" : "items-end"
                          }`}
                        >
                          <img
                            src={arrow_r}
                            alt="arrow"
                            className={`w-10 md:w-16 mb-2 ${
                              isEvenRow ? "transform -scale-x-100" : ""
                            }`}
                          />
                          <p
                            className={`text-base md:text-3xl font-clash-display font-semibold leading-tight ${
                              isEvenRow ? "text-left" : "text-right"
                            }`}
                          >
                            {name}
                          </p>
                          <p
                            className={`text-xs md:text-sm mt-1 font-gilroy-regular ${
                              isEvenRow ? "text-left" : "text-right"
                            }`}
                          >
                            {designation}
                          </p>
                          <p
                            className={`text-xs md:text-sm opacity-80 font-gilroy-regular mt-1 ${
                              isEvenRow ? "text-left" : "text-right"
                            }`}
                          >
                            {organisation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
              }
              return items;
            })()}
          </div>
        )}
      </div>

      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute bottom-0 left-0 object-cover"
      />
    </section>
  );
}

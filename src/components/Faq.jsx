import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import LogoLoop from "./LogoLoop";

const Faq = () => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [cardHeights, setCardHeights] = useState({});
  const [sectionHeight, setSectionHeight] = useState("160vh");

  const toggleExpand = (index) => {
    setExpandedItems((prev) => (prev.includes(index) ? [] : [index]));
  };

  const updateCardHeight = (index, height) => {
    setCardHeights((prev) => ({ ...prev, [index]: height }));
  };

  const calculateTopPosition = (index) => {
    let top = 15;
    const baseSpacing = window.innerWidth >= 768 ? 80 : 70;
    for (let i = 0; i < index; i++) {
      if (expandedItems.includes(i) && cardHeights[i]) {
        top += cardHeights[i] + 15;
      } else {
        top += baseSpacing;
      }
    }
    // Add extra spacing for the last item
    if (index === faqs.length - 1) {
      top += 35;
    }
    return top;
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    const baseSpacing = isMobile ? 60 : 70;
    let calculatedHeight = 15; // Initial top margin

    faqs.forEach((_, index) => {
      if (expandedItems.includes(index) && cardHeights[index]) {
        calculatedHeight += cardHeights[index] + 15;
      } else {
        calculatedHeight += baseSpacing;
      }
    });

    // Add header height and bottom padding (different for mobile, tablet, and desktop)
    const headerHeight = isMobile ? 140 : 160;
    let bottomPadding;

    if (isMobile) {
      bottomPadding = 120;
    } else if (isTablet) {
      bottomPadding = 150;
    } else {
      bottomPadding = 200;
    }

    calculatedHeight += headerHeight + bottomPadding;

    const calculatedVh = `${calculatedHeight}px`;

    setSectionHeight(calculatedVh);
  }, [expandedItems, cardHeights]);

  const faqs = [
    {
      question: "What is IEDC?",
      description:
        "A platform in educational institutions to foster innovation and entrepreneurial skills in students.",
    },
    {
      question: "What is the IEDC Summit?",
      description:
        "IEDC Summit 2025 is Kerala's largest innovation and entrepreneurship gathering, where students get the opportunity to interact with founders, entrepreneurs, and industry professionals. The summit encourages participants to think creatively and take their first steps toward entrepreneurship and startup building. As part of the event, several flagship programs and competitions are conducted, giving aspiring entrepreneurs a platform.",
    },
    {
      question: "What includes in it?",
      description:
        "Keynote Talks: Inspiring stories from top entrepreneurs. Panel Discussions: Experts share insights on startups and innovation. Learning Stations: Student projects and tech showcases with KSUM mentors. Workshops: Hands-on sessions on design thinking and entrepreneurship. Networking: Meet and connect with students, founders, and investors.",
    },
    {
      question: "Who can participate?",
      description:
        "The IEDC Summit 2025 is open to all students and aspiring innovators who are passionate about entrepreneurship, creativity, and innovation. Whether you're an active startup enthusiast or simply curious to learn and experience something new, the summit welcomes everyone who wants to explore the world of ideas and innovation.",
    },
    {
      question: "How to Register for the IEDC Summit 2025?",
      description:
        "Visit the official IEDC Summit 2025 registration page at iedcsummit.in. Click on 'Register Now' on the homepage to begin the registration process. If you have a coupon code, enter it in the designated field during checkout to avail any discounts. Add the registration to your cart, fill in your personal and payment details, choose your preferred payment method, and complete the transaction.",
    },
    {
      question: "Can I showcase my startup or project at the IEDC Summit?",
      description:
        "Yes! The IEDC Summit provides a platform for aspiring entrepreneurs and innovators to showcase their startups, projects, or innovative ideas. Participants can interact with industry experts, investors, and fellow entrepreneurs, receive feedback, and gain exposure for their initiatives. You may need to register your project in advance or follow the specific guidelines provided on the official registration page.",
    },
    {
      question: "What is the benefit of attending?",
      description:
        "Exposure to the startup/innovation ecosystem and peer learning. A platform to showcase their work. Networking with entrepreneurs/faculty/mentors. Workshops to build relevant entrepreneurial skills.",
    },
    {
      question: "Are refreshments or meals provided at the IEDC Summit?",
      description:
        "Yes! The registration fee includes a registration kit, morning refreshments, and lunch for all participants.",
    },
    {
      question: "Can we meet founders and entrepreneurs at the Summit?",
      description:
        "Absolutely! The summit is designed to provide participants with direct interaction opportunities with successful founders, entrepreneurs, and industry professionals. You can attend panel discussions, workshops, and networking sessions to gain insights, ask questions, and explore potential collaborations.",
    },
    {
      question:
        "Are the workshops at the IEDC Summit suitable for beginners, or do I need prior experience?",
      description:
        "The workshops are designed to cater to participants of all skill levels, including beginners. You don't need prior experience to attend. The sessions will provide step-by-step guidance, practical examples, and mentorship to help everyone learn and participate effectively.",
    },
    {
      question: "Whom can I contact for more details about the IEDC Summit?",
      description:
        "For any queries regarding the summit, you can contact the organizing team via the details in the website footer: Email: iedcsummit@lbscek.ac.in, Phone: +91 99467 60222.",
    },
  ];

  return (
    <section id="faq" className="w-full overflow-y-hidden bg-white relative">
      <div
        className="mb-8 md:mb-5 md:flex md:flex-col md:items-center relative py-10 px-5"
        style={{ minHeight: sectionHeight }}
      >
        <div className="w-full md:text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light font-gilroy-medium md:font-black text-blue-500 relative z-20">
            FAQ
          </h2>
          <div className="w-full px-0">
            <h3 className="text-lg md:text-xl font-light font-clash-display">
              Any Doubts...?!
            </h3>
          </div>
        </div>

        <div className="w-full md:w-[70%] min-h-[20vh] mt-10 relative scale-90 md:scale-95 origin-top pb-20">
          <div className="w-full relative mx-auto rounded-4xl h-1/2 bg-transparent"></div>
          {faqs.map((item, index) => (
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
              className={`absolute w-full mx-auto rounded-4xl z-9 px-4 py-3 md:px-8 md:py-4 transition-all duration-300 shadow-xl border border-blue-500 ${
                expandedItems.includes(index)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              style={{
                top: `${calculateTopPosition(index)}px`,
                height:
                  expandedItems.includes(index) || index === faqs.length - 1
                    ? "auto"
                    : "100%",
              }}
            >
              <div className="w-full h-auto flex flex-row justify-between items-center">
                <div className="font-normal font-clash-display text-lg md:text-2xl lg:text-3xl flex flex-row items-center gap-2 flex-1">
                  <ArrowDown
                    size={window.innerWidth >= 700 ? 30 : 20}
                    className={`cursor-pointer transition-transform duration-300 shrink-0 ${
                      expandedItems.includes(index)
                        ? "rotate-360"
                        : "rotate-315"
                    }`}
                    onClick={() => toggleExpand(index)}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    {item.question}
                  </span>
                </div>
              </div>
              {expandedItems.includes(index) && (
                <div className="mt-4 text-left">
                  <p className="mb-3 text-base md:text-lg lg:text-xl md:mt-8 leading-relaxed">
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
        className="w-full h-20 sm:h-24 object-cover"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full -mt-7 mb-10 -skew-y-2">
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
          className="font-gilroy-bold bg-blue-600 py-5  text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </section>
  );
};

export default Faq;

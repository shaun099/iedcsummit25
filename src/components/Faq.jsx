import React, { useState } from "react";
import LogoLoop from "./LogoLoop";
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";
import { ArrowDown } from "lucide-react";
import side_Image from "../assets/side_image.png";
const Faq = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => (prev.includes(index) ? [] : [index]));
  };

  const calculateTopPosition = (index) => {
    let top = 20;
    const baseSpacing = window.innerWidth >= 768 ? 105 : 80;
    for (let i = 0; i < index; i++) {
      // Base spacing is 60px, expanded items add 200px more
      top += expandedItems.includes(i) ? 380 : baseSpacing;
    }
    return top;
  };

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
      <div className="mb-8 md:mb-5 min-h-[160vh] md:min-h-[240vh] md:flex md:flex-col md:items-center  relative py-10 px-5 ">
        <div className="w-full md:text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light md:font-black font-clash-display text-blue-500  relative z-20 ">
            FAQ
          </h2>
          <div className="w-full px-0">
            <h3 className="text-xl font-light font-clash-display">
              Any Doubts...?!
            </h3>
          </div>
        </div>

        <div className="w-full md:w-[70%] min-h-[60vh]  mt-10 relative ">
          <div className="w-full relative mx-auto rounded-4xl h-1/2 bg-transparent"></div>
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`absolute w-full  mx-auto rounded-4xl z-9 px-5 py-4 md:px-10 md:py-5 transition-all duration-300 shadow-xl border border-blue-500 ${
                expandedItems.includes(index)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              style={{
                top: `${calculateTopPosition(index)}px`,
                height: expandedItems.includes(index) ? "100%" : "100%",
              }}
            >
              <div className="w-full h-auto flex flex-row justify-between items-center">
                <div className="font-clash-display font-medium text-xl md:text-4xl flex flex-row items-center gap-2 flex-1">
                  <ArrowDown
                    size={window.innerWidth >= 700 ? 40 : 24}
                    className={`cursor-pointer transition-transform duration-300 flex-shrink-0 ${
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
                <div className="mt-4 text-sm text-left">
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

export default Faq;

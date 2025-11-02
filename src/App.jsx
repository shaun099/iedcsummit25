import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Highlights from "./components/Highlights";
import FeaturedEvents from "./components/FeaturedEvents";
import Directions from "./components/Directions";
import Faq from "./components/Faq";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

import "./fonts/ClashDisplay-Variable.ttf";
import "./fonts/Gilroy-Light.otf";
import "./fonts/Gilroy-ExtraBold.otf";
import "./fonts/Gilroy-Medium.ttf";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div id="about">
        <About />
      <Highlights />
      </div>
      <FeaturedEvents />
      <Directions />
      <Faq />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ExternalFormRedirect from "./components/ExternalFormRedirect";
import Schedule from "./components/Schedule.jsx";
import Events from "./components/Events.jsx";
import Webinars from "./components/Webinars.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { SponsorForm } from './components/SponsorForm'
import { ScrollToTop } from './components/ScrollToTop';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/schedule"
            element={
              <>
                <Navbar />
                <Schedule />
                <Footer />
              </>
            }
          />
          <Route 
            path="/events"
            element={
              <>
                <Navbar />
                <Events />
                <Footer />
              </>
            }
          />
          <Route 
            path="/webinars" 
            element={<>
              <Navbar />
              <Webinars />
              <Footer />
            </>} />
          <Route 
            path="/be-our-sponsor" 
            element={<>
              <Navbar />
              <SponsorForm />
              <Footer />
            </>} />
          {/* Catch-all route for external form redirects - MUST be last */}
          <Route 
            path="/:formName" element={<ExternalFormRedirect />} />
        </Routes>
      </ScrollToTop>
    </Router>
  </StrictMode>
);

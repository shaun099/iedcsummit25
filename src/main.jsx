import { StrictMode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ExternalFormRedirect from "./components/ExternalFormRedirect";
import SessionRedirect from "./components/SessionRedirect";
import Schedule from "./components/Schedule.jsx";
import Events from "./components/Events.jsx";
import Webinars from "./components/Webinars.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Speaker from "./components/Speaker.jsx";
import EOIs from "./components/EOIs.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import { SponsorForm } from "./components/SponsorForm";
import { ScrollToTop } from "./components/ScrollToTop";

const AccommodationRedirect = () => {
  useEffect(() => {
    window.location.href = "https://forms.gle/Y2rxmj3pojK1ASMc7";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <p className="text-blue-600 font-clash-display text-lg mb-2">
          Redirecting to accommodation form...
        </p>
        <p className="text-blue-400 font-gilroy-medium">
          If you are not redirected, click <a href="https://forms.gle/Y2rxmj3pojK1ASMc7" className="text-blue-600 underline">here</a>
        </p>
      </div>
    </div>
  );
};

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
            element={
              <>
                <Navbar />
                <Webinars />
                <Footer />
              </>
            }
          />
          <Route
            path="/eois"
            element={
              <>
                <Navbar />
                <EOIs />
                <Footer />
              </>
            }
          />
          <Route
            path="/be-our-sponsor"
            element={
              <>
                <Navbar />
                <SponsorForm />
                <Footer />
              </>
            }
          />
          <Route
            path="/speakers"
            element={
              <>
                <Navbar />
                <Speaker />
                <Footer />
              </>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <>
                <Navbar />
                <Leaderboard />
                <Footer />
              </>
            }
          />
          <Route
            path="/accomodation"
            element={<AccommodationRedirect />}
          />
          {/* Session redirect route - /r/sessionId */}
          <Route path="/r/:sessionId" element={<SessionRedirect />} />
          {/* Catch-all route for external form redirects - MUST be last */}
          <Route path="/:formName" element={<ExternalFormRedirect />} />
        </Routes>
      </ScrollToTop>
    </Router>
  </StrictMode>
);

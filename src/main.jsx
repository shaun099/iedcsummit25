import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ExternalFormRedirect from "./components/ExternalFormRedirect";
import Schedule from "./components/Schedule.jsx";
import Footer from "./components/Footer.jsx";
import { SponsorForm } from './components/SponsorForm'
import { ScrollToTop } from './components/ScrollToTop';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/be-our-sponsor" element={<SponsorForm />} />
          <Route
            path="/schedule"
            element={
              <>
                <Schedule />
                <Footer />
              </>
            }
          />
          {/* Catch-all route for external form redirects - MUST be last */}
          <Route path="/:formName" element={<ExternalFormRedirect />} />
        </Routes>
      </ScrollToTop>
    </Router>
  </StrictMode>
);

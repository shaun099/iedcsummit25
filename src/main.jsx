import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ExternalFormRedirect from './components/ExternalFormRedirect'
import { SponsorForm } from './components/SponsorForm'
//import StartupEOIForm from './components/StartupEOIForm';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/be-our-sponsor" element={<SponsorForm />} />
        {/* Catch-all route for external form redirects */}
        <Route path="/:formName" element={<ExternalFormRedirect />} />
      </Routes>
    </Router>
  </StrictMode>,
)
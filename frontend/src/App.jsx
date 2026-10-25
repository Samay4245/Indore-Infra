import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Process from './pages/Process';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Location from './pages/Location';
import MobilePreview from './pages/MobilePreview';
import ProjectDetails from './pages/ProjectDetails';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        {/* We want Navbar & Footer on public pages, not on admin dashboard ideally, 
            but for simplicity, we'll put them everywhere except we can conditionally render if needed.
            Let's just use routes inside a wrapper. */}
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />

          <Route path="*" element={
            <>
              <Navbar />
              <main style={{ minHeight: '80vh' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetails />} />
                  <Route path="/process" element={<Process />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/mobile-preview" element={<MobilePreview />} />
                </Routes>
              </main>

              {/* Floating CTAs */}
              <div className="floating-cta">
                <a href="https://wa.me/919669171255?text=Hello,%20I%20found%20the%20INDORE%20INFRA%20CONSTRUCTION%20website%20and%20would%20like%20to%20discuss%20an%20architecture/interior/construction%20project." target="_blank" rel="noreferrer" className="floating-btn btn-whatsapp" title="WhatsApp Us">
                  <FaWhatsapp />
                </a>
                <a href="tel:+919669171255" className="floating-btn btn-call" title="Call Now">
                  <FaPhoneAlt />
                </a>
              </div>

              {/* Mobile Sticky Bar */}
              <div className="mobile-sticky-bar">
                <a href="tel:+919669171255" className="nav-item nav-link">
                  <FaPhoneAlt />
                  Call
                </a>
                <a href="https://wa.me/919669171255?text=Hello,%20I%20found%20the%20INDORE%20INFRA%20CONSTRUCTION%20website%20and%20would%20like%20to%20discuss%20an%20architecture/interior/construction%20project." target="_blank" rel="noreferrer" className="nav-item nav-link">
                  <FaWhatsapp />
                  WhatsApp
                </a>
                <Link to="/contact#quote" className="nav-item nav-link">
                  <i className="bi bi-envelope"></i>
                  Get Quote
                </Link>
              </div>

              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

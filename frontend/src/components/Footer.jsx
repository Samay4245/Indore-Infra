import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-light)', padding: '60px 0 20px 0' }}>
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4">
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', letterSpacing: '1px', marginBottom: '20px' }}>
              INDORE INFRA<br />CONSTRUCTION
            </h4>
            <p style={{ color: 'var(--text-muted)' }}>Architecture • Interior • Construction</p>
            <p className="mt-4">
              <strong>Owner:</strong><br />
              Roopnarayan Shukla
            </p>
            <p>
              <FaMapMarkerAlt className="me-2" /> F-17, Ahinsa Tower, 7 MG Road,<br />
              Near Indraprastha Tower, South Tukoganj, Indore
            </p>
            <p>
              <FaPhoneAlt className="me-2" /> <a href="tel:+919669171255" style={{ color: 'var(--text-light)' }}>+91 96691 71255</a>
            </p>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <h5 className="mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">Home</Link></li>
              <li className="mb-2"><Link to="/about">About</Link></li>
              <li className="mb-2"><Link to="/services">Services</Link></li>
              <li className="mb-2"><Link to="/projects">Projects</Link></li>
              <li className="mb-2"><Link to="/gallery">Gallery</Link></li>
              <li className="mb-2"><Link to="/location">Location</Link></li>
              <li className="mb-2"><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <h5 className="mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Services</h5>
            <ul className="list-unstyled mb-4">
              <li className="mb-2"><Link to="/services">Architecture</Link></li>
              <li className="mb-2"><Link to="/services">Interior Design</Link></li>
              <li className="mb-2"><Link to="/services">Construction</Link></li>
              <li className="mb-2"><Link to="/services">3D Visualization</Link></li>
              <li className="mb-2"><Link to="/services">Renovation</Link></li>
            </ul>
            <div>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="me-3" style={{ fontSize: '1.5rem' }}>
                <FaInstagram />
              </a>
              <a href="https://wa.me/919669171255" target="_blank" rel="noreferrer" style={{ fontSize: '1.5rem' }}>
                <FaWhatsapp />
              </a>
            </div>
          </Col>
        </Row>

        <div className="text-center pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} INDORE INFRA CONSTRUCTION. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

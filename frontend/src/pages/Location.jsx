import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaDirections, FaPhoneAlt } from 'react-icons/fa';

const MAPS_LOCATION = 'https://maps.app.goo.gl/Lk3QTTaH4tMeMPNo8';

// Google Maps Embed URL: search the exact office address.
const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=F-17%2C%20Ahinsa%20Tower%2C%207%20MG%20Road%2C%20Near%20Indraprastha%20Tower%2C%20South%20Tukoganj%2C%20Indore%2C%20Madhya%20Pradesh%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed';

const Location = () => {
  return (
    <>
      <section
        className="py-5"
        style={{
          backgroundColor: 'var(--primary-color)',
          color: 'white',
        }}
      > <Container className="text-center py-4">
          <h1
            className="display-4 fw-bold text-uppercase mb-3"
            style={{ color: 'white' }}
          >
            Our Location </h1>

          ```
          <p
            className="lead mx-auto"
            style={{ maxWidth: '700px', color: 'var(--text-muted)' }}
          >
            Find our office easily. We are centrally located in Indore,
            Madhya Pradesh.
          </p>
        </Container>
      </section>

      <section className="section-padding bg-light">
        <Container>
          <Row className="mb-5">
            <Col lg={4} className="mb-4 mb-lg-0">
              <Card className="h-100 border-0 shadow-sm p-4">
                <Card.Body className="d-flex flex-column justify-content-center text-center">
                  <div
                    className="mb-4 text-accent mx-auto"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    <FaMapMarkerAlt size={50} />
                  </div>

                  <h4 className="fw-bold mb-3">Office Address</h4>

                  <p
                    className="text-muted mb-4"
                    style={{ fontSize: '1.1rem' }}
                  >
                    F-17, Ahinsa Tower, 7 MG Road
                    <br />
                    Near Indraprastha Tower, South Tukoganj, Indore,
                    Madhya Pradesh, India
                  </p>

                  <h4 className="fw-bold mb-3">Contact</h4>

                  <p
                    className="text-muted mb-4"
                    style={{ fontSize: '1.1rem' }}
                  >
                    <FaPhoneAlt
                      className="me-2 text-accent"
                      style={{ color: 'var(--accent-color)' }}
                    />
                    +91 96691 71255
                  </p>

                  <a
                    href={MAPS_LOCATION}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-premium w-100 mt-auto d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaDirections />
                    Get Directions on Maps
                  </a>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <div
                className="w-100 shadow-sm rounded overflow-hidden"
                style={{
                  height: '500px',
                  minHeight: '400px',
                  backgroundColor: '#e9e9e9',
                }}
              >
                <iframe
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="INDORE INFRA Construction Office Location"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>


  );
};

export default Location;

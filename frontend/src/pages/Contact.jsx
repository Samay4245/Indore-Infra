import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project_type: 'Architecture',
    location: '',
    budget: 'Not Decided',
    description: ''
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'http://localhost:5000/api/enquiries',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Something went wrong'
        );
      }

      // Success message
      setStatus({
        type: 'success',
        message:
          'Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.'
      });

      // Clear form
      setFormData({
        name: '',
        phone: '',
        email: '',
        project_type: 'Architecture',
        location: '',
        budget: 'Not Decided',
        description: ''
      });

    } catch (error) {
      console.error(
        'Enquiry submission error:',
        error
      );

      setStatus({
        type: 'danger',
        message:
          'Unable to submit your enquiry. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          backgroundColor: 'var(--primary-color)',
          color: 'white'
        }}
      >
        <Container className="text-center py-4">
          <h1
            className="display-4 fw-bold text-uppercase mb-3"
            style={{ color: 'white' }}
          >
            Contact Us
          </h1>

          <p
            className="lead mx-auto"
            style={{
              maxWidth: '700px',
              color: 'var(--text-muted)'
            }}
          >
            Let's discuss your next project. Reach out to us
            for a consultation or quote.
          </p>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <Container>
          <Row>

            {/* Contact Information */}
            <Col
              lg={5}
              className="mb-5 mb-lg-0"
            >
              <span className="section-subtitle">
                Get In Touch
              </span>

              <h2 className="section-title mb-4">
                We're Here to Help
              </h2>

              <p className="text-muted mb-5">
                Whether you have a question about our services,
                need a quotation, or want to discuss a new
                project, we are ready to assist you.
              </p>

              {/* Location */}
              <div className="d-flex align-items-start mb-4">
                <div className="me-4 p-3 bg-light rounded-circle text-accent">
                  <FaMapMarkerAlt
                    size={24}
                    color="var(--accent-color)"
                  />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Our Location
                  </h5>

                  <p className="text-muted mb-0">
                    F_17 Ahinsa tower 7 MG road,South Tukoganj,
                    <br />
                    Indore, Madhya Pradesh, India
                  </p>

                  <a
                    href="https://maps.app.goo.gl/btKCR28UkKBnD2wE8"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none mt-2 d-inline-block fw-bold"
                    style={{
                      color: 'var(--primary-color)'
                    }}
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="d-flex align-items-start mb-4">
                <div className="me-4 p-3 bg-light rounded-circle text-accent">
                  <FaPhoneAlt
                    size={24}
                    color="var(--accent-color)"
                  />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Call Us
                  </h5>

                  <p className="text-muted mb-0">
                    +91 96691 71255
                  </p>

                  <p className="text-muted small">
                    Roopnarayan Shukla (Owner)
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="d-flex align-items-start mb-4">
                <div className="me-4 p-3 bg-light rounded-circle text-accent">
                  <FaWhatsapp
                    size={24}
                    color="#25D366"
                  />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    WhatsApp
                  </h5>

                  <p className="text-muted mb-0">
                    +91 96691 71255
                  </p>

                  <a
                    href="https://wa.me/919669171255?text=Hello,%20I%20found%20the%20INDORE%20INFRA%20CONSTRUCTION%20website..."
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none mt-2 d-inline-block fw-bold"
                    style={{
                      color: 'var(--primary-color)'
                    }}
                  >
                    Message Us →
                  </a>
                </div>
              </div>
            </Col>

            {/* Quote Form */}
            <Col
              lg={7}
              id="quote"
            >
              <div className="p-5 shadow-lg bg-white rounded">

                <h3 className="fw-bold mb-4">
                  Request a Quote
                </h3>

                {/* Success / Error Message */}
                {status && (
                  <Alert variant={status.type}>
                    {status.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>

                  {/* Name + Phone */}
                  <Row>

                    <Col
                      md={6}
                      className="mb-3"
                    >
                      <Form.Group>
                        <Form.Label>
                          Name *
                        </Form.Label>

                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="rounded-0 p-2"
                        />
                      </Form.Group>
                    </Col>

                    <Col
                      md={6}
                      className="mb-3"
                    >
                      <Form.Group>
                        <Form.Label>
                          Phone *
                        </Form.Label>

                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="rounded-0 p-2"
                        />
                      </Form.Group>
                    </Col>

                  </Row>

                  {/* Email + Location */}
                  <Row>

                    <Col
                      md={6}
                      className="mb-3"
                    >
                      <Form.Group>
                        <Form.Label>
                          Email
                        </Form.Label>

                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="rounded-0 p-2"
                        />
                      </Form.Group>
                    </Col>

                    <Col
                      md={6}
                      className="mb-3"
                    >
                      <Form.Group>
                        <Form.Label>
                          Location
                        </Form.Label>

                        <Form.Control
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="rounded-0 p-2"
                        />
                      </Form.Group>
                    </Col>

                  </Row>

                  {/* Project Type + Budget */}
                  <Row>

                    <Col
                      md={6}
                      className="mb-3"
                    >
                      <Form.Group>
                        <Form.Label>
                          Project Type *
                        </Form.Label>

                        <Form.Select
                          name="project_type"
                          value={formData.project_type}
                          onChange={handleChange}
                          required
                          className="rounded-0 p-2"
                        >
                          <option>
                            Architecture
                          </option>

                          <option>
                            Interior Design
                          </option>

                          <option>
                            Residential
                          </option>

                          <option>
                            Commercial
                          </option>

                          <option>
                            Construction
                          </option>

                          <option>
                            Renovation
                          </option>

                          <option>
                            Other
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col
                      md={6}
                      className="mb-3"
                    >
                      <Form.Group>
                        <Form.Label>
                          Budget
                        </Form.Label>

                        <Form.Select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="rounded-0 p-2"
                        >
                          <option>
                            Below ₹5 Lakh
                          </option>

                          <option>
                            ₹5–10 Lakh
                          </option>

                          <option>
                            ₹10–20 Lakh
                          </option>

                          <option>
                            ₹20–50 Lakh
                          </option>

                          <option>
                            ₹50 Lakh+
                          </option>

                          <option>
                            Not Decided
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                  </Row>

                  {/* Project Description */}
                  <Form.Group className="mb-4">

                    <Form.Label>
                      Project Description *
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="rounded-0 p-2"
                      placeholder="Tell us about your requirements..."
                    />

                  </Form.Group>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-premium w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>

                </Form>

              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* Map */}
      <section
        className="p-0 m-0"
        style={{ height: '400px' }}
      >
        <iframe
          src="https://maps.google.com/maps?q=F-17%2C%20Ahinsa%20Tower%2C%207%20MG%20Road%2C%20Near%20Indraprastha%20Tower%2C%20South%20Tukoganj%2C%20Indore%2C%20Madhya%20Pradesh%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
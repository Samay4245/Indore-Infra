import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDraftingCompass, FaCouch, FaHardHat, FaCheckCircle } from 'react-icons/fa';
import BeforeAfter from '../components/BeforeAfter';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="position-relative" style={{ height: '90vh', overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}
        >
          <source src="/assets/promo-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback image if video fails or takes time to load */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/assets/hero-image.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -3
          }}
        ></div>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: -1
        }}></div>

        <Container className="h-100 d-flex align-items-center position-relative fade-in-up">
          <Row>
            <Col lg={8} md={10} className="text-white">
              <span className="mb-3 d-block" style={{ color: 'var(--accent-color)', letterSpacing: '3px', fontWeight: '600', textTransform: 'uppercase' }}>
                INDORE INFRA CONSTRUCTION
              </span>
              <h1 className="display-3 fw-bold mb-4" style={{ color: 'white', textTransform: 'uppercase', lineHeight: '1.1' }}>
                DESIGNING SPACES.<br />BUILDING VISIONS.
              </h1>
              <p className="lead mb-4" style={{ maxWidth: '600px', fontSize: '1.2rem', opacity: 0.9 }}>
                Creating functional, elegant and beautiful spaces for modern living. Architecture • Interior • Construction
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/projects" className="btn btn-accent">View Projects</Link>
                <Link to="/contact#quote" className="btn btn-premium" style={{ backgroundColor: 'transparent', border: '1px solid white', color: 'white' }}>Get a Quote</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4 mb-md-0">
              <h2 className="display-4 fw-bold" style={{ color: 'var(--accent-color)' }}>10+</h2>
              <p className="text-uppercase letter-spacing-1 mb-0">Years Experience</p>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <h2 className="display-4 fw-bold" style={{ color: 'var(--accent-color)' }}>50+</h2>
              <p className="text-uppercase letter-spacing-1 mb-0">Projects Completed</p>
            </Col>
            <Col md={4}>
              <h2 className="display-4 fw-bold" style={{ color: 'var(--accent-color)' }}>30+</h2>
              <p className="text-uppercase letter-spacing-1 mb-0">Happy Clients</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="position-relative">
                <img src="/assets/hero-image.jpeg" alt="Shiv Shakti Construction Work" className="img-fluid rounded shadow-lg" style={{ height: '500px', width: '100%', objectFit: 'cover' }} />
                <div className="position-absolute bottom-0 end-0 bg-white p-4 shadow" style={{ transform: 'translate(-20px, 20px)' }}>
                  <h5 className="mb-1 fw-bold">Roopnaryan Sukhla</h5>
                  <p className="text-muted mb-0 small text-uppercase">Founder & Owner</p>
                </div>
              </div>
            </Col>
            <Col lg={5} className="offset-lg-1">
              <span className="section-subtitle">About Us</span>
              <h2 className="section-title">We Build Dreams Into Reality</h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                At Shiv Shakti Construction, we believe that every space has a story to tell. Based in Indore, we specialize in high-end architecture, bespoke interior design, and flawless construction execution.
              </p>
              <p className="text-muted mb-4">
                Our approach blends functionality with aesthetics, ensuring that every project reflects the client's vision while adhering to the highest standards of quality and modern design philosophy.
              </p>
              <Link to="/about" className="btn btn-premium-outline">Read More</Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-stone)' }}>
        <Container>
          <div className="text-center mb-5">
            <span className="section-subtitle">What We Do</span>
            <h2 className="section-title">Our Services</h2>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Card.Body className="p-5 text-center">
                  <FaDraftingCompass size={50} color="var(--accent-color)" className="mb-4" />
                  <Card.Title className="fw-bold mb-3">Architecture Design</Card.Title>
                  <Card.Text className="text-muted">
                    Residential and commercial architectural planning and conceptual design tailored to modern needs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Card.Body className="p-5 text-center">
                  <FaCouch size={50} color="var(--accent-color)" className="mb-4" />
                  <Card.Title className="fw-bold mb-3">Interior Design</Card.Title>
                  <Card.Text className="text-muted">
                    Modern, functional and personalized interior solutions that breathe life into your living spaces.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Card.Body className="p-5 text-center">
                  <FaHardHat size={50} color="var(--accent-color)" className="mb-4" />
                  <Card.Title className="fw-bold mb-3">Construction</Card.Title>
                  <Card.Text className="text-muted">
                    Professional, reliable, and high-quality construction and project execution from start to finish.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-premium">View All Services</Link>
          </div>
        </Container>
      </section>

      {/* Before & After Section */}
      <BeforeAfter />

      {/* Why Choose Us */}
      <section className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="mb-5 mb-lg-0">
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="section-title mb-4">Building Trust Through Excellence</h2>

              <div className="d-flex mb-4">
                <div className="me-3 mt-1 text-accent"><FaCheckCircle size={24} color="var(--accent-color)" /></div>
                <div>
                  <h5 className="fw-bold">Experienced Professionals</h5>
                  <p className="text-muted">A dedicated and professional approach to architecture, interior and construction projects.</p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3 mt-1 text-accent"><FaCheckCircle size={24} color="var(--accent-color)" /></div>
                <div>
                  <h5 className="fw-bold">Customized Designs</h5>
                  <p className="text-muted">Designs tailored strictly according to the client's unique requirements and lifestyle.</p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3 mt-1 text-accent"><FaCheckCircle size={24} color="var(--accent-color)" /></div>
                <div>
                  <h5 className="fw-bold">Quality Work</h5>
                  <p className="text-muted">Unyielding focus on premium quality materials and meticulous execution.</p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3 mt-1 text-accent"><FaCheckCircle size={24} color="var(--accent-color)" /></div>
                <div>
                  <h5 className="fw-bold">Transparent Process</h5>
                  <p className="text-muted">Clear, open communication throughout every phase of the project.</p>
                </div>
              </div>
            </Col>
            <Col lg={6} className="offset-lg-1">
              <img src="/assets/hero-image.jpeg" alt="Why Choose Us" className="img-fluid" style={{ objectFit: 'cover', height: '600px', width: '100%' }} />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Video Section Preview */}
      <section className="py-0 position-relative" style={{ height: '60vh' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/assets/promo-video.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <h2 className="display-4 fw-bold text-center text-uppercase mb-4" style={{ color: 'white' }}>Experience Our Work</h2>
          <Link to="/projects" className="btn btn-accent">View Portfolio</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

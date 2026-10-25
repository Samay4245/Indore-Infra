import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Nav, Card, Table, Modal, Button, Form, Badge, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  FaUserShield, FaSignOutAlt, FaExternalLinkAlt, FaSearch,
  FaSync, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFileInvoiceDollar,
  FaComments, FaFilter, FaCheckCircle, FaTrash, FaEye
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, inProgress: 0, closed: 0 });
  const [adminUser, setAdminUser] = useState({ name: 'Roopnarayan Shukla', username: '9669171255' });

  const fetchStats = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/enquiries/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/admin');
        return;
      }
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
    } else {
      fetchStats();
      const stored = localStorage.getItem('admin_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) setAdminUser(parsed);
        } catch (_) { }
      }
    }
  }, [navigate, fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin');
  };

  const isEnquiriesPage = location.pathname.includes('/enquiries');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '260px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="p-4 text-center border-bottom border-secondary border-opacity-25">
          <h5 className="fw-bold mb-1" style={{ letterSpacing: '1px' }}>INDORE INFRA</h5>
          <small className="text-uppercase text-light opacity-75" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
            CONSTRUCTION
          </small>
        </div>

        <div className="p-3 mx-3 my-3 rounded" style={{ backgroundColor: '#1e293b' }}>
          <div className="d-flex align-items-center">
            <div className="me-3 p-2 rounded-circle bg-primary bg-opacity-25 text-primary">
              <FaUserShield size={20} />
            </div>
            <div>
              <small className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Administrator</small>
              <strong className="d-block text-white" style={{ fontSize: '0.9rem' }}>{adminUser.name}</strong>
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>ID: {adminUser.username}</small>
            </div>
          </div>
        </div>

        <Nav className="flex-column px-3 flex-grow-1">
          <Nav.Link
            as={Link}
            to="/admin/dashboard"
            className={`rounded mb-2 py-2 px-3 d-flex align-items-center ${!isEnquiriesPage ? 'bg-primary text-white fw-semibold' : 'text-light opacity-75'}`}
          >
            Dashboard Overview
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/admin/dashboard/enquiries"
            className={`rounded mb-2 py-2 px-3 d-flex justify-content-between align-items-center ${isEnquiriesPage ? 'bg-primary text-white fw-semibold' : 'text-light opacity-75'}`}
          >
            <span>Customer Enquiries</span>
            {stats.new > 0 && (
              <Badge bg="danger" pill>
                {stats.new} New
              </Badge>
            )}
          </Nav.Link>

          <hr className="border-secondary opacity-25 my-3" />

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="nav-link text-light opacity-75 py-2 px-3 d-flex align-items-center gap-2"
          >
            <FaExternalLinkAlt size={13} /> View Website
          </a>
        </Nav>

        <div className="p-3 border-top border-secondary border-opacity-25">
          <Button
            variant="outline-danger"
            size="sm"
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto', maxHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<DashboardHome stats={stats} onRefresh={fetchStats} />} />
          <Route path="/enquiries" element={<AdminEnquiries onStatsUpdate={fetchStats} />} />
        </Routes>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 1. Dashboard Overview Component
// ----------------------------------------------------
const DashboardHome = ({ stats, onRefresh }) => {
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch('http://localhost:5000/api/enquiries', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setRecentEnquiries(data.enquiries.slice(0, 5));
        }
      } catch (err) {
        console.error('Error fetching recent enquiries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#0f172a' }}>Dashboard Overview</h2>
          <p className="text-muted mb-0">Real-time enquiries & customer submissions from MySQL database</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" size="sm" onClick={onRefresh} className="d-flex align-items-center gap-1">
            <FaSync /> Refresh
          </Button>
          <Link to="/admin/dashboard/enquiries" className="btn btn-primary btn-sm d-flex align-items-center gap-1">
            <FaEye /> View All Enquiries
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-3 bg-white h-100">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-uppercase text-muted small fw-bold">Total Enquiries</span>
                <span className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary">
                  <FaComments size={20} />
                </span>
              </div>
              <h1 className="fw-bold my-3 text-dark">{stats.total}</h1>
              <small className="text-muted">Total customer queries submitted</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-3 bg-white h-100 border-start border-danger border-4">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-uppercase text-danger small fw-bold">New / Unread</span>
                <Badge bg="danger" pill>Needs Action</Badge>
              </div>
              <h1 className="fw-bold my-3 text-danger">{stats.new}</h1>
              <small className="text-muted">Requires follow-up</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-3 bg-white h-100 border-start border-warning border-4">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-uppercase text-warning small fw-bold">Contacted</span>
                <span className="p-2 rounded-circle bg-warning bg-opacity-10 text-warning">
                  <FaPhoneAlt size={18} />
                </span>
              </div>
              <h1 className="fw-bold my-3 text-warning">{stats.contacted}</h1>
              <small className="text-muted">Customer reached out</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-3 bg-white h-100 border-start border-success border-4">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-uppercase text-success small fw-bold">Closed / Converted</span>
                <span className="p-2 rounded-circle bg-success bg-opacity-10 text-success">
                  <FaCheckCircle size={18} />
                </span>
              </div>
              <h1 className="fw-bold my-3 text-success">{stats.closed}</h1>
              <small className="text-muted">Completed enquiries</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Enquiries Preview */}
      <Card className="border-0 shadow-sm rounded-3">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Latest Customer Submissions</h5>
          <Link to="/admin/dashboard/enquiries" className="small text-decoration-none fw-semibold">
            See all ({stats.total}) &rarr;
          </Link>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Project Type</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map(enq => (
                <tr key={enq.id}>
                  <td><strong>#ENQ-{enq.id}</strong></td>
                  <td>{new Date(enq.created_at).toLocaleDateString()}</td>
                  <td className="fw-semibold">{enq.name}</td>
                  <td><a href={`tel:${enq.phone}`} className="text-decoration-none">{enq.phone}</a></td>
                  <td><Badge bg="secondary">{enq.project_type}</Badge></td>
                  <td>{enq.location || 'N/A'}</td>
                  <td>
                    <Badge bg={
                      enq.status === 'New' ? 'danger' :
                        enq.status === 'Contacted' ? 'warning' :
                          enq.status === 'In Progress' ? 'info' : 'success'
                    }>
                      {enq.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {!loading && recentEnquiries.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">No customer enquiries found in database.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

// ----------------------------------------------------
// 2. Full Customer Enquiries Management Component
// ----------------------------------------------------
const AdminEnquiries = ({ onStatsUpdate }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterProjectType, setFilterProjectType] = useState('All');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'quotes', 'contact'

  // Modal edit fields
  const [modalStatus, setModalStatus] = useState('New');
  const [modalNotes, setModalNotes] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [saveAlert, setSaveAlert] = useState(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:5000/api/enquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        if (onStatsUpdate) onStatsUpdate();
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [onStatsUpdate]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // Open modal with complete enquiry details
  const handleOpenDetails = (enq) => {
    setSelectedEnquiry(enq);
    setModalStatus(enq.status || 'New');
    setModalNotes(enq.notes || '');
    setSaveAlert(null);
    setShowModal(true);
  };

  // Status & Notes Update
  const handleSaveStatusAndNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNote(true);
    setSaveAlert(null);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/enquiries/${selectedEnquiry.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: modalStatus,
          notes: modalNotes
        })
      });
      const data = await response.json();
      if (data.success) {
        setSaveAlert({ type: 'success', message: 'Status and notes updated successfully in MySQL!' });
        setSelectedEnquiry({ ...selectedEnquiry, status: modalStatus, notes: modalNotes });
        fetchEnquiries();
      } else {
        setSaveAlert({ type: 'danger', message: data.message || 'Failed to update' });
      }
    } catch (err) {
      setSaveAlert({ type: 'danger', message: 'Server communication error' });
    } finally {
      setSavingNote(false);
    }
  };

  // Delete Enquiry
  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete Enquiry #ENQ-${id}? This action cannot be undone.`)) {
      return;
    }
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setShowModal(false);
        fetchEnquiries();
      }
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  // Filter Logic:
  // - Tabs: 'all', 'quotes' (with budget specified or project quote), 'contact'
  const filteredEnquiries = enquiries.filter(enq => {
    // Search
    const term = searchTerm.toLowerCase();
    const matchSearch =
      (enq.name && enq.name.toLowerCase().includes(term)) ||
      (enq.phone && enq.phone.includes(term)) ||
      (enq.email && enq.email.toLowerCase().includes(term)) ||
      (enq.location && enq.location.toLowerCase().includes(term)) ||
      (enq.description && enq.description.toLowerCase().includes(term));

    // Status filter
    const matchStatus = filterStatus === 'All' || enq.status === filterStatus;

    // Project Type filter
    const matchType = filterProjectType === 'All' || enq.project_type === filterProjectType;

    // Tab filter
    let matchTab = true;
    if (activeTab === 'quotes') {
      matchTab = enq.budget && enq.budget !== 'Not Decided';
    } else if (activeTab === 'contact') {
      matchTab = !enq.budget || enq.budget === 'Not Decided';
    }

    return matchSearch && matchStatus && matchType && matchTab;
  });

  const quoteCount = enquiries.filter(e => e.budget && e.budget !== 'Not Decided').length;
  const contactCount = enquiries.filter(e => !e.budget || e.budget === 'Not Decided').length;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#0f172a' }}>Customer Enquiries</h2>
          <p className="text-muted mb-0">View, search, filter, and manage all contact & quote submissions</p>
        </div>
        <Button variant="outline-primary" size="sm" onClick={fetchEnquiries} className="d-flex align-items-center gap-1">
          <FaSync /> Refresh List
        </Button>
      </div>

      {/* Tabs */}
      <div className="d-flex gap-2 mb-3 border-bottom pb-2">
        <Button
          variant={activeTab === 'all' ? 'primary' : 'light'}
          size="sm"
          onClick={() => setActiveTab('all')}
          className="rounded-pill px-3"
        >
          All Enquiries ({enquiries.length})
        </Button>
        <Button
          variant={activeTab === 'quotes' ? 'primary' : 'light'}
          size="sm"
          onClick={() => setActiveTab('quotes')}
          className="rounded-pill px-3"
        >
          <FaFileInvoiceDollar className="me-1" /> Get a Quote Requests ({quoteCount})
        </Button>
        <Button
          variant={activeTab === 'contact' ? 'primary' : 'light'}
          size="sm"
          onClick={() => setActiveTab('contact')}
          className="rounded-pill px-3"
        >
          <FaComments className="me-1" /> Contact Messages ({contactCount})
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="border-0 shadow-sm rounded-3 mb-4">
        <Card.Body className="p-3">
          <Row className="g-2">
            <Col md={5}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, phone, email, location..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="border-start-0"
                />
              </InputGroup>
            </Col>

            <Col md={3}>
              <Form.Select
                value={filterProjectType}
                onChange={e => setFilterProjectType(e.target.value)}
              >
                <option value="All">All Project Types</option>
                <option value="Architecture">Architecture</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Construction">Construction</option>
                <option value="Renovation">Renovation</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </Form.Select>
            </Col>

            <Col md={1}>
              <Button
                variant="outline-secondary"
                className="w-100"
                title="Reset Filters"
                onClick={() => { setSearchTerm(''); setFilterStatus('All'); setFilterProjectType('All'); setActiveTab('all'); }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Enquiries Table */}
      <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: '85px' }}>ID</th>
                <th>Date & Time</th>
                <th>Customer Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Project Type</th>
                <th>Budget</th>
                <th>Status</th>
                <th className="text-center" style={{ width: '130px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map(enq => (
                <tr
                  key={enq.id}
                  style={{
                    backgroundColor: enq.status === 'New' ? '#fffbeb' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleOpenDetails(enq)}
                >
                  <td><strong>#ENQ-{enq.id}</strong></td>
                  <td className="small text-muted">
                    {new Date(enq.created_at).toLocaleString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="fw-semibold text-dark">{enq.name}</td>
                  <td>
                    <a
                      href={`tel:${enq.phone}`}
                      className="text-decoration-none fw-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {enq.phone}
                    </a>
                  </td>
                  <td>
                    {enq.email ? (
                      <a
                        href={`mailto:${enq.email}`}
                        className="text-decoration-none small"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {enq.email}
                      </a>
                    ) : (
                      <span className="text-muted small">N/A</span>
                    )}
                  </td>
                  <td>
                    <Badge bg="secondary" className="fw-normal">
                      {enq.project_type}
                    </Badge>
                  </td>
                  <td className="small">{enq.budget || 'Not Decided'}</td>
                  <td>
                    <Badge bg={
                      enq.status === 'New' ? 'danger' :
                        enq.status === 'Contacted' ? 'warning' :
                          enq.status === 'In Progress' ? 'info' : 'success'
                    }>
                      {enq.status}
                    </Badge>
                  </td>
                  <td className="text-center" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="py-1 px-2 d-flex align-items-center gap-1 mx-auto"
                      onClick={() => handleOpenDetails(enq)}
                    >
                      <FaEye size={12} /> View
                    </Button>
                  </td>
                </tr>
              ))}

              {!loading && filteredEnquiries.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-muted">
                    <p className="mb-1 fw-semibold">No customer enquiries match your filters.</p>
                    <small>Try clearing your search term or status filters.</small>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Details & Status Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        {selectedEnquiry && (
          <>
            <Modal.Header closeButton className="bg-light">
              <div className="d-flex align-items-center gap-2">
                <Modal.Title className="h5 mb-0 fw-bold">
                  Enquiry #ENQ-{selectedEnquiry.id}
                </Modal.Title>
                <Badge bg={
                  modalStatus === 'New' ? 'danger' :
                    modalStatus === 'Contacted' ? 'warning' :
                      modalStatus === 'In Progress' ? 'info' : 'success'
                }>
                  {modalStatus}
                </Badge>
              </div>
            </Modal.Header>

            <Modal.Body className="p-4">
              {saveAlert && (
                <Alert variant={saveAlert.type} dismissible onClose={() => setSaveAlert(null)}>
                  {saveAlert.message}
                </Alert>
              )}

              {/* Customer Details Box */}
              <div className="p-3 bg-light rounded-3 mb-3">
                <h6 className="fw-bold mb-3 text-primary text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                  Customer Details
                </h6>
                <Row className="g-3">
                  <Col md={6}>
                    <small className="text-muted d-block">Full Name</small>
                    <span className="fw-bold text-dark fs-6">{selectedEnquiry.name}</span>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block">Phone Number</small>
                    <a href={`tel:${selectedEnquiry.phone}`} className="fw-bold text-decoration-none">
                      <FaPhoneAlt className="me-1" size={13} /> {selectedEnquiry.phone}
                    </a>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block">Email Address</small>
                    {selectedEnquiry.email ? (
                      <a href={`mailto:${selectedEnquiry.email}`} className="text-decoration-none">
                        <FaEnvelope className="me-1" size={13} /> {selectedEnquiry.email}
                      </a>
                    ) : (
                      <span className="text-muted">Not provided</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <small className="text-muted d-block">Location / City</small>
                    <span>
                      <FaMapMarkerAlt className="me-1 text-danger" size={13} />
                      {selectedEnquiry.location || 'Not provided'}
                    </span>
                  </Col>
                </Row>
              </div>

              {/* Project & Enquiry Details */}
              <div className="p-3 border rounded-3 mb-3">
                <h6 className="fw-bold mb-3 text-primary text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                  Project Request Information
                </h6>
                <Row className="g-3 mb-3">
                  <Col md={4}>
                    <small className="text-muted d-block">Project Type</small>
                    <Badge bg="dark" className="fs-6 fw-normal mt-1">{selectedEnquiry.project_type}</Badge>
                  </Col>
                  <Col md={4}>
                    <small className="text-muted d-block">Estimated Budget</small>
                    <strong className="text-success fs-6 mt-1 d-block">{selectedEnquiry.budget || 'Not Decided'}</strong>
                  </Col>
                  <Col md={4}>
                    <small className="text-muted d-block">Submitted At</small>
                    <span className="small text-muted mt-1 d-block">
                      {new Date(selectedEnquiry.created_at).toLocaleString()}
                    </span>
                  </Col>
                </Row>

                <div>
                  <small className="text-muted d-block fw-bold mb-1">Message / Project Description:</small>
                  <div className="p-3 bg-white border rounded" style={{ whiteSpace: 'pre-line', maxHeight: '180px', overflowY: 'auto' }}>
                    {selectedEnquiry.description}
                  </div>
                </div>
              </div>

              {/* Admin Actions: Status & Notes */}
              <div className="p-3 border rounded-3 bg-white">
                <h6 className="fw-bold mb-3 text-primary text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                  Manage Enquiry Status & Internal Notes
                </h6>
                <Row className="g-3">
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label className="fw-semibold small">Update Status:</Form.Label>
                      <Form.Select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                      >
                        <option value="New">New (Uncontacted)</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed / Completed</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={7}>
                    <Form.Group>
                      <Form.Label className="fw-semibold small">Admin Notes / Remarks:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Add internal notes about client conversation..."
                        value={modalNotes}
                        onChange={(e) => setModalNotes(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-3 text-end">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleSaveStatusAndNotes}
                    disabled={savingNote}
                    className="px-3"
                  >
                    {savingNote ? 'Saving to Database...' : 'Save Status & Notes'}
                  </Button>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between bg-light">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="d-flex align-items-center gap-1"
              >
                <FaTrash size={12} /> Delete Enquiry
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default AdminDashboard;

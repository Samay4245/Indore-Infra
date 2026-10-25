import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        if (data.user) {
          localStorage.setItem('admin_user', JSON.stringify(data.user));
        }
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Unable to reach server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-stone, #f7f6f2)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <div className="mx-auto" style={{ maxWidth: '420px' }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-uppercase mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              INDORE INFRA
            </h3>
            <div className="fw-semibold text-muted small" style={{ letterSpacing: '2px' }}>CONSTRUCTION</div>
            <span className="badge bg-dark mt-2 text-uppercase px-3 py-2" style={{ letterSpacing: '1px' }}>
              Admin Portal
            </span>
          </div>

          <Card className="border-0 shadow-lg p-3 p-md-4 rounded">
            <Card.Body>
              <h4 className="fw-bold mb-1 text-center">Administrator Login</h4>
              <p className="text-center text-muted small mb-4">Enter your Login ID and password</p>

              {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Login ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Login ID (e.g. 9669171255)"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold small">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btn-premium py-2"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mt-4">
            <Link to="/" className="text-muted text-decoration-none small">
              &larr; Back to Website
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;

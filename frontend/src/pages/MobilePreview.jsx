import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaMobileAlt, FaTabletAlt } from 'react-icons/fa';

const MobilePreview = () => {
  const [device, setDevice] = useState('mobile'); // 'mobile' or 'tablet'

  const dimensions = {
    mobile: { width: '375px', height: '812px', name: 'Mobile (iPhone X/12/13)' },
    tablet: { width: '768px', height: '1024px', name: 'Tablet (iPad)' }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-stone)', minHeight: '100vh', padding: '40px 0' }}>
      <Container className="text-center">
        <h2 className="fw-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Device Preview</h2>

        <div className="mb-4">
          <button
            className={`btn me-3 ${device === 'mobile' ? 'btn-premium' : 'btn-premium-outline'}`}
            onClick={() => setDevice('mobile')}
          >
            <FaMobileAlt className="me-2" /> Mobile
          </button>
          <button
            className={`btn ${device === 'tablet' ? 'btn-premium' : 'btn-premium-outline'}`}
            onClick={() => setDevice('tablet')}
          >
            <FaTabletAlt className="me-2" /> Tablet
          </button>
        </div>

        <p className="text-muted mb-4">Currently viewing: <strong>{dimensions[device].name}</strong></p>

        {/* Device Frame */}
        <div
          className="mx-auto shadow-lg bg-white"
          style={{
            width: dimensions[device].width,
            height: dimensions[device].height,
            borderRadius: '40px',
            border: '12px solid #1a1a1a',
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.5s ease'
          }}
        >
          {/* Notch for mobile */}
          {device === 'mobile' && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '150px',
                height: '25px',
                backgroundColor: '#1a1a1a',
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px',
                zIndex: 10
              }}
            ></div>
          )}

          {/* Iframe pointing to the homepage */}
          <iframe
            src="/"
            title="Mobile Preview"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'white'
            }}
          />
        </div>

        <div className="mt-5">
          <p className="text-muted small">Note: The preview iframe is fully functional. You can navigate through the entire website inside the device frame.</p>
        </div>
      </Container>
    </div>
  );
};

export default MobilePreview;

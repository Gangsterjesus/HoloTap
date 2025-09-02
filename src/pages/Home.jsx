import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '3rem', marginBottom: '1rem' }}>
          💠 Welcome to HoloTap
        </h1>
        <p style={{ fontSize: '1.4rem', marginBottom: '2rem', color: '#666' }}>
          Scan the hologram. Skip the fraud. Creator-first payments with flair.
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <Link 
            to="/payments" 
            style={{
              background: 'linear-gradient(135deg, #0077cc, #005fa3)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0, 119, 204, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 119, 204, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 119, 204, 0.3)';
            }}
          >
            💳 Make Payment
          </Link>
          
          <Link 
            to="/qr-demo" 
            style={{
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
            }}
          >
            🧩 QR Demo
          </Link>
        </div>
        
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '12px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'left'
        }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🚀 New Features</h2>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#495057' }}>
            <li>✅ <strong>Modular QR Components</strong> - Reusable QR generation and scanning</li>
            <li>✅ <strong>Badge Tier Support</strong> - Bronze, Silver, Gold, Platinum tiers</li>
            <li>✅ <strong>Creator Shoutouts</strong> - Support your favorite creators</li>
            <li>✅ <strong>Holographic Overlays</strong> - Anti-fraud verification system</li>
            <li>✅ <strong>Conditional Rendering</strong> - Smart UI based on payment type</li>
            <li>✅ <strong>Responsive Design</strong> - Works on mobile and desktop</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
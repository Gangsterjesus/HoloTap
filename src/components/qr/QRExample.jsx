import React, { useState } from 'react';
import { QRGenerator, QRScanner, QRPaymentFlow, HolographicOverlay } from './index';
import './QRExample.css';

/**
 * 🧩 QR Components Example/Demo
 * 
 * Demonstrates all modular QR components with:
 * - Different payment types
 * - Badge tier examples
 * - Contributor shoutout examples
 * - Holographic overlay integration
 */
const QRExample = () => {
  const [activeDemo, setActiveDemo] = useState('flow');
  const [showHolographic, setShowHolographic] = useState(false);
  const [holographicData, setHolographicData] = useState(null);

  const examplePaymentData = {
    recipient: 'creator@example.com',
    amount: '5.00',
    reference: 'HoloTap Demo',
    currency: 'GBP'
  };

  const exampleBadgeData = {
    ...examplePaymentData,
    tier: 'gold',
    badgeId: 'badge_123',
    badgeName: 'Gold Contributor'
  };

  const exampleCreatorData = {
    ...examplePaymentData,
    creatorId: 'creator_456',
    message: 'Thanks for the amazing content!',
    platform: 'TikTok'
  };

  const exampleHolographicData = {
    ...examplePaymentData,
    hologramId: 'holo_789',
    verificationHash: 'abc123def456',
    securityLevel: 'high'
  };

  const handlePaymentComplete = (paymentData) => {
    console.log('Payment completed:', paymentData);
    
    if (paymentData.type === 'holographic') {
      setHolographicData(paymentData);
      setShowHolographic(true);
    } else {
      alert(`💠 Payment completed! Type: ${paymentData.type}`);
    }
  };

  const handleHolographicComplete = (verificationData) => {
    console.log('Holographic verification completed:', verificationData);
    setShowHolographic(false);
    alert('🔒 Holographic verification successful!');
  };

  const handleQRScanned = (scanData) => {
    console.log('QR scanned:', scanData);
    alert(`📱 QR Code scanned! Type: ${scanData.type}`);
  };

  const handleQRGenerated = (qrData) => {
    console.log('QR generated:', qrData);
  };

  const renderDemo = () => {
    switch (activeDemo) {
      case 'generator':
        return (
          <div className="qr-example__demo">
            <h3>QR Generator Examples</h3>
            <div className="qr-example__generators">
              <div className="qr-example__generator-item">
                <h4>Standard Payment</h4>
                <QRGenerator
                  paymentData={examplePaymentData}
                  type="standard"
                  onGenerate={handleQRGenerated}
                />
              </div>
              
              <div className="qr-example__generator-item">
                <h4>Badge Tier Payment</h4>
                <QRGenerator
                  paymentData={exampleBadgeData}
                  type="badge_tier"
                  onGenerate={handleQRGenerated}
                />
              </div>
              
              <div className="qr-example__generator-item">
                <h4>Creator Shoutout</h4>
                <QRGenerator
                  paymentData={exampleCreatorData}
                  type="contributor_shoutout"
                  onGenerate={handleQRGenerated}
                />
              </div>
              
              <div className="qr-example__generator-item">
                <h4>Holographic Payment</h4>
                <QRGenerator
                  paymentData={exampleHolographicData}
                  type="holographic"
                  onGenerate={handleQRGenerated}
                />
              </div>
            </div>
          </div>
        );

      case 'scanner':
        return (
          <div className="qr-example__demo">
            <h3>QR Scanner Examples</h3>
            <div className="qr-example__scanners">
              <div className="qr-example__scanner-item">
                <h4>Standard Scanner</h4>
                <QRScanner
                  type="standard"
                  onScan={handleQRScanned}
                  showPreview={true}
                />
              </div>
              
              <div className="qr-example__scanner-item">
                <h4>Badge Tier Scanner</h4>
                <QRScanner
                  type="badge_tier"
                  onScan={handleQRScanned}
                  showPreview={true}
                />
              </div>
              
              <div className="qr-example__scanner-item">
                <h4>Holographic Scanner</h4>
                <QRScanner
                  type="holographic"
                  onScan={handleQRScanned}
                  showPreview={true}
                />
              </div>
            </div>
          </div>
        );

      case 'flow':
        return (
          <div className="qr-example__demo">
            <h3>Complete Payment Flow</h3>
            <QRPaymentFlow
              initialType="standard"
              onPaymentComplete={handlePaymentComplete}
              onPaymentError={(error) => console.error('Payment error:', error)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="qr-example">
      <div className="qr-example__header">
        <h2>🧩 HoloTap QR Components Demo</h2>
        <p>Explore the modular QR payment system with different types and features</p>
      </div>

      <div className="qr-example__navigation">
        <button 
          className={`qr-example__nav-btn ${activeDemo === 'flow' ? 'active' : ''}`}
          onClick={() => setActiveDemo('flow')}
        >
          Complete Flow
        </button>
        <button 
          className={`qr-example__nav-btn ${activeDemo === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveDemo('generator')}
        >
          QR Generators
        </button>
        <button 
          className={`qr-example__nav-btn ${activeDemo === 'scanner' ? 'active' : ''}`}
          onClick={() => setActiveDemo('scanner')}
        >
          QR Scanners
        </button>
      </div>

      <div className="qr-example__content">
        {renderDemo()}
      </div>

      {/* Holographic Overlay */}
      {showHolographic && holographicData && (
        <HolographicOverlay
          type="holographic"
          isActive={true}
          securityLevel="high"
          badgeTier={holographicData.paymentData?.tier}
          creatorInfo={holographicData.paymentData?.creatorId ? {
            name: holographicData.paymentData.recipient,
            platform: 'HoloTap',
            message: 'Holographic verification in progress...'
          } : null}
          onVerificationComplete={handleHolographicComplete}
        />
      )}

      <div className="qr-example__info">
        <h4>🎯 Features Demonstrated:</h4>
        <ul>
          <li>✅ Modular QR generation for different payment types</li>
          <li>✅ Conditional rendering based on payment type</li>
          <li>✅ Badge tier support with visual indicators</li>
          <li>✅ Contributor shoutout handling</li>
          <li>✅ Holographic overlay preparation</li>
          <li>✅ Reusable components with consistent styling</li>
          <li>✅ Error handling and validation</li>
          <li>✅ Responsive design for mobile and desktop</li>
        </ul>
      </div>
    </div>
  );
};

export default QRExample;

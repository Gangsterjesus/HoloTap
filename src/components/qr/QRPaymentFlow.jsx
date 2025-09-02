import React, { useState } from 'react';
import QRGenerator from './QRGenerator';
import QRScanner from './QRScanner';
import './QRPaymentFlow.css';

/**
 * 🧩 Complete QR Payment Flow Component
 * 
 * Orchestrates the entire QR payment process with:
 * - Conditional rendering for different payment types
 * - Badge tier support
 * - Contributor shoutout handling
 * - Holographic verification preparation
 */
const QRPaymentFlow = ({ 
  initialType = 'standard',
  onPaymentComplete,
  onPaymentError,
  className = '',
  ...props 
}) => {
  const [currentStep, setCurrentStep] = useState('form'); // form, generate, scan, complete
  const [paymentType, setPaymentType] = useState(initialType);
  const [paymentData, setPaymentData] = useState(null);
  const [generatedQR, setGeneratedQR] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  const handleFormSubmit = (data) => {
    setPaymentData(data);
    setCurrentStep('generate');
  };

  const handleQRGenerated = (qrData) => {
    setGeneratedQR(qrData);
    setCurrentStep('scan');
  };

  const handleQRScanned = (scanData) => {
    setScannedData(scanData);
    setCurrentStep('complete');
    
    if (onPaymentComplete) {
      onPaymentComplete({
        paymentData,
        generatedQR,
        scannedData,
        type: paymentType,
        timestamp: Date.now()
      });
    }
  };

  const handleError = (error) => {
    if (onPaymentError) {
      onPaymentError(error);
    }
  };

  const resetFlow = () => {
    setCurrentStep('form');
    setPaymentData(null);
    setGeneratedQR(null);
    setScannedData(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'form':
        return (
          <PaymentForm 
            type={paymentType}
            onSubmit={handleFormSubmit}
            onTypeChange={setPaymentType}
          />
        );
      
      case 'generate':
        return (
          <div className="qr-flow__step">
            <h3>Generate QR Code</h3>
            <QRGenerator
              paymentData={paymentData}
              type={paymentType}
              onGenerate={handleQRGenerated}
              showDetails={true}
            />
            <button 
              className="qr-flow__back"
              onClick={() => setCurrentStep('form')}
            >
              Back to Form
            </button>
          </div>
        );
      
      case 'scan':
        return (
          <div className="qr-flow__step">
            <h3>Scan QR Code</h3>
            <QRScanner
              type={paymentType}
              onScan={handleQRScanned}
              onError={handleError}
              showPreview={true}
            />
            <button 
              className="qr-flow__back"
              onClick={() => setCurrentStep('generate')}
            >
              Back to QR
            </button>
          </div>
        );
      
      case 'complete':
        return (
          <div className="qr-flow__step qr-flow__complete">
            <h3>✅ Payment Complete!</h3>
            <div className="qr-flow__summary">
              <p><strong>Type:</strong> {paymentType}</p>
              {paymentData?.recipient && (
                <p><strong>Recipient:</strong> {paymentData.recipient}</p>
              )}
              {paymentData?.amount && (
                <p><strong>Amount:</strong> £{paymentData.amount}</p>
              )}
              {scannedData?.data?.tier && (
                <p><strong>Badge Tier:</strong> {scannedData.data.tier}</p>
              )}
              {scannedData?.data?.message && (
                <p><strong>Message:</strong> {scannedData.data.message}</p>
              )}
            </div>
            <button 
              className="qr-flow__new"
              onClick={resetFlow}
            >
              New Payment
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`qr-payment-flow ${className}`} {...props}>
      <div className="qr-flow__header">
        <h2>HoloTap QR Payment</h2>
        <div className="qr-flow__progress">
          <div className={`qr-flow__step-indicator ${currentStep === 'form' ? 'active' : ''}`}>
            Form
          </div>
          <div className={`qr-flow__step-indicator ${currentStep === 'generate' ? 'active' : ''}`}>
            Generate
          </div>
          <div className={`qr-flow__step-indicator ${currentStep === 'scan' ? 'active' : ''}`}>
            Scan
          </div>
          <div className={`qr-flow__step-indicator ${currentStep === 'complete' ? 'active' : ''}`}>
            Complete
          </div>
        </div>
      </div>
      
      <div className="qr-flow__content">
        {renderStep()}
      </div>
    </div>
  );
};

// Payment Form Component
const PaymentForm = ({ type, onSubmit, onTypeChange }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    reference: '',
    tier: 'bronze',
    message: '',
    creatorId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form className="qr-flow__form" onSubmit={handleSubmit}>
      <div className="qr-flow__form-header">
        <h3>Payment Details</h3>
        <select 
          value={type} 
          onChange={(e) => onTypeChange(e.target.value)}
          className="qr-flow__type-selector"
        >
          <option value="standard">Standard Payment</option>
          <option value="badge_tier">Badge Tier Payment</option>
          <option value="contributor_shoutout">Creator Shoutout</option>
          <option value="holographic">Holographic Payment</option>
        </select>
      </div>

      <div className="qr-flow__form-fields">
        <div className="qr-flow__field">
          <label>Recipient:</label>
          <input
            type="text"
            value={formData.recipient}
            onChange={(e) => handleInputChange('recipient', e.target.value)}
            placeholder="e.g. @creator123"
            required
          />
        </div>

        <div className="qr-flow__field">
          <label>Amount (£):</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            placeholder="e.g. 5.00"
            required
          />
        </div>

        <div className="qr-flow__field">
          <label>Reference:</label>
          <input
            type="text"
            value={formData.reference}
            onChange={(e) => handleInputChange('reference', e.target.value)}
            placeholder="Optional reference"
          />
        </div>

        {type === 'badge_tier' && (
          <div className="qr-flow__field">
            <label>Badge Tier:</label>
            <select
              value={formData.tier}
              onChange={(e) => handleInputChange('tier', e.target.value)}
            >
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>
        )}

        {type === 'contributor_shoutout' && (
          <>
            <div className="qr-flow__field">
              <label>Creator ID:</label>
              <input
                type="text"
                value={formData.creatorId}
                onChange={(e) => handleInputChange('creatorId', e.target.value)}
                placeholder="Creator identifier"
                required
              />
            </div>
            <div className="qr-flow__field">
              <label>Message:</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Your message to the creator"
                rows="3"
              />
            </div>
          </>
        )}

        {type === 'holographic' && (
          <div className="qr-flow__field">
            <label>Hologram ID:</label>
            <input
              type="text"
              value={formData.hologramId || ''}
              onChange={(e) => handleInputChange('hologramId', e.target.value)}
              placeholder="Holographic sticker ID"
            />
          </div>
        )}
      </div>

      <button type="submit" className="qr-flow__submit">
        Generate QR Code
      </button>
    </form>
  );
};

export default QRPaymentFlow;

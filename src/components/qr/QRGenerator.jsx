import React from 'react';
import QRCode from 'qrcode.react';
import { formatPaymentPayload, generateVerificationHash } from '../../payments/paymentUtils';
import './QRGenerator.css';

/**
 * 🧩 Modular QR Generator Component
 * 
 * Generates QR codes for different payment types with support for:
 * - Standard payments
 * - Badge tier payments
 * - Contributor shoutouts
 * - Future holographic overlays
 */
const QRGenerator = ({ 
  paymentData, 
  type = 'standard', 
  size = 200, 
  showDetails = true,
  onGenerate,
  className = '',
  ...props 
}) => {
  if (!paymentData) return null;

  const generateQRPayload = () => {
    const basePayload = {
      type,
      timestamp: Date.now(),
      ...paymentData
    };

    // Add type-specific data
    switch (type) {
      case 'badge_tier':
        basePayload.tier = paymentData.tier || 'bronze';
        basePayload.badgeId = paymentData.badgeId;
        break;
      case 'contributor_shoutout':
        basePayload.creatorId = paymentData.creatorId;
        basePayload.message = paymentData.message;
        break;
      case 'holographic':
        basePayload.verificationHash = generateVerificationHash(basePayload);
        basePayload.hologramId = paymentData.hologramId;
        break;
      default:
        // Standard payment
        break;
    }

    return formatPaymentPayload(basePayload);
  };

  const qrPayload = generateQRPayload();

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate({
        payload: qrPayload,
        type,
        paymentData,
        timestamp: Date.now()
      });
    }
  };

  return (
    <div className={`qr-generator ${className}`} {...props}>
      <div className="qr-generator__wrapper">
        <QRCode 
          value={qrPayload} 
          size={size}
          level="M"
          includeMargin={true}
        />
      </div>
      
      {showDetails && (
        <div className="qr-generator__details">
          <h3 className="qr-generator__title">
            {type === 'badge_tier' ? 'Badge Payment' :
             type === 'contributor_shoutout' ? 'Creator Support' :
             type === 'holographic' ? 'Holographic Payment' :
             'Scan to Pay'}
          </h3>
          
          {paymentData.recipient && (
            <p className="qr-generator__detail">
              <strong>Recipient:</strong> {paymentData.recipient}
            </p>
          )}
          
          {paymentData.amount && (
            <p className="qr-generator__detail">
              <strong>Amount:</strong> £{parseFloat(paymentData.amount).toFixed(2)}
            </p>
          )}
          
          {paymentData.reference && (
            <p className="qr-generator__detail">
              <strong>Reference:</strong> {paymentData.reference}
            </p>
          )}
          
          {type === 'badge_tier' && paymentData.tier && (
            <p className="qr-generator__detail">
              <strong>Tier:</strong> {paymentData.tier}
            </p>
          )}
          
          {type === 'contributor_shoutout' && paymentData.message && (
            <p className="qr-generator__detail">
              <strong>Message:</strong> {paymentData.message}
            </p>
          )}
        </div>
      )}
      
      {onGenerate && (
        <button 
          className="qr-generator__button"
          onClick={handleGenerate}
        >
          Generate QR
        </button>
      )}
    </div>
  );
};

export default QRGenerator;

import React, { useState, useRef, useEffect } from 'react';
import './QRScanner.css';

/**
 * 🧩 Modular QR Scanner Component
 * 
 * Handles QR code scanning with support for:
 * - Different payment types
 * - Badge tier validation
 * - Contributor shoutout processing
 * - Holographic verification
 */
const QRScanner = ({ 
  onScan, 
  onError, 
  type = 'standard',
  showPreview = true,
  className = '',
  ...props 
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setScannedData(null);
    
    // Simulate QR scanning (replace with actual QR library in production)
    setTimeout(() => {
      const mockQRData = generateMockQRData(type);
      handleScanResult(mockQRData);
    }, 2000);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const generateMockQRData = (scanType) => {
    const baseData = {
      type: scanType,
      timestamp: Date.now(),
      recipient: 'creator@example.com',
      amount: '5.00',
      currency: 'GBP'
    };

    switch (scanType) {
      case 'badge_tier':
        return {
          ...baseData,
          tier: 'gold',
          badgeId: 'badge_123',
          badgeName: 'Gold Contributor'
        };
      case 'contributor_shoutout':
        return {
          ...baseData,
          creatorId: 'creator_456',
          message: 'Thanks for the amazing content!',
          platform: 'TikTok'
        };
      case 'holographic':
        return {
          ...baseData,
          verificationHash: 'abc123def456',
          hologramId: 'holo_789',
          securityLevel: 'high'
        };
      default:
        return baseData;
    }
  };

  const handleScanResult = (data) => {
    try {
      // Validate scanned data based on type
      const validationResult = validateScannedData(data, type);
      
      if (validationResult.isValid) {
        setScannedData(data);
        setIsScanning(false);
        
        if (onScan) {
          onScan({
            data,
            type,
            timestamp: Date.now(),
            validation: validationResult
          });
        }
      } else {
        throw new Error(validationResult.error);
      }
    } catch (err) {
      setError(err.message);
      setIsScanning(false);
      
      if (onError) {
        onError(err);
      }
    }
  };

  const validateScannedData = (data, expectedType) => {
    if (!data || typeof data !== 'object') {
      return { isValid: false, error: 'Invalid QR code data' };
    }

    if (data.type !== expectedType) {
      return { isValid: false, error: `Expected ${expectedType} QR code, got ${data.type}` };
    }

    // Type-specific validation
    switch (expectedType) {
      case 'badge_tier':
        if (!data.tier || !data.badgeId) {
          return { isValid: false, error: 'Missing badge tier information' };
        }
        break;
      case 'contributor_shoutout':
        if (!data.creatorId) {
          return { isValid: false, error: 'Missing creator information' };
        }
        break;
      case 'holographic':
        if (!data.verificationHash || !data.hologramId) {
          return { isValid: false, error: 'Missing holographic verification data' };
        }
        break;
      default:
        if (!data.recipient || !data.amount) {
          return { isValid: false, error: 'Missing payment information' };
        }
    }

    return { isValid: true };
  };

  const handleConfirmPayment = () => {
    if (scannedData && onScan) {
      onScan({
        data: scannedData,
        type,
        timestamp: Date.now(),
        confirmed: true
      });
    }
  };

  return (
    <div className={`qr-scanner ${className}`} {...props}>
      <div className="qr-scanner__header">
        <h3 className="qr-scanner__title">
          {type === 'badge_tier' ? 'Scan Badge QR' :
           type === 'contributor_shoutout' ? 'Scan Creator QR' :
           type === 'holographic' ? 'Scan Holographic QR' :
           'Scan Payment QR'}
        </h3>
        <p className="qr-scanner__subtitle">
          {type === 'holographic' ? 'Point camera at holographic sticker' :
           'Point camera at QR code to scan'}
        </p>
      </div>

      <div className="qr-scanner__camera">
        <video 
          ref={videoRef}
          className="qr-scanner__video"
          style={{ display: isScanning ? 'block' : 'none' }}
        />
        <canvas 
          ref={canvasRef}
          className="qr-scanner__canvas"
          style={{ display: 'none' }}
        />
        
        {!isScanning && !scannedData && (
          <div className="qr-scanner__placeholder">
            <div className="qr-scanner__icon">📱</div>
            <p>Camera ready to scan</p>
          </div>
        )}
      </div>

      {error && (
        <div className="qr-scanner__error">
          <p>❌ {error}</p>
          <button 
            className="qr-scanner__retry"
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      )}

      {scannedData && showPreview && (
        <div className="qr-scanner__preview">
          <h4>Scanned Data:</h4>
          <div className="qr-scanner__data">
            {scannedData.recipient && (
              <p><strong>Recipient:</strong> {scannedData.recipient}</p>
            )}
            {scannedData.amount && (
              <p><strong>Amount:</strong> £{scannedData.amount}</p>
            )}
            {scannedData.tier && (
              <p><strong>Tier:</strong> {scannedData.tier}</p>
            )}
            {scannedData.message && (
              <p><strong>Message:</strong> {scannedData.message}</p>
            )}
            {scannedData.verificationHash && (
              <p><strong>Verified:</strong> ✅ Holographic</p>
            )}
          </div>
          <button 
            className="qr-scanner__confirm"
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </button>
        </div>
      )}

      <div className="qr-scanner__controls">
        {!isScanning ? (
          <button 
            className="qr-scanner__start"
            onClick={startScanning}
          >
            Start Scanning
          </button>
        ) : (
          <button 
            className="qr-scanner__stop"
            onClick={stopScanning}
          >
            Stop Scanning
          </button>
        )}
      </div>
    </div>
  );
};

export default QRScanner;

import React, { useState, useEffect } from 'react';
import './HolographicOverlay.css';

/**
 * 🧩 Holographic Overlay Component
 * 
 * Prepares for future holographic anti-fraud overlays with:
 * - Animated holographic effects
 * - Security verification display
 * - Badge tier visualization
 * - Creator shoutout animations
 */
const HolographicOverlay = ({ 
  type = 'standard',
  isActive = false,
  securityLevel = 'medium',
  badgeTier = null,
  creatorInfo = null,
  onVerificationComplete,
  className = '',
  ...props 
}) => {
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isActive) {
      // Simulate holographic verification process
      const verificationTimer = setTimeout(() => {
        setVerificationStatus('verified');
        if (onVerificationComplete) {
          onVerificationComplete({
            type,
            securityLevel,
            badgeTier,
            creatorInfo,
            timestamp: Date.now()
          });
        }
      }, 3000);

      return () => clearTimeout(verificationTimer);
    }
  }, [isActive, type, securityLevel, badgeTier, creatorInfo, onVerificationComplete]);

  useEffect(() => {
    if (isActive) {
      const animationInterval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 4);
      }, 1000);

      return () => clearInterval(animationInterval);
    }
  }, [isActive]);

  if (!isActive) return null;

  const getSecurityColor = () => {
    switch (securityLevel) {
      case 'low': return '#ffc107';
      case 'medium': return '#17a2b8';
      case 'high': return '#28a745';
      case 'maximum': return '#6f42c1';
      default: return '#17a2b8';
    }
  };

  const getBadgeTierColor = () => {
    switch (badgeTier) {
      case 'bronze': return '#cd7f32';
      case 'silver': return '#c0c0c0';
      case 'gold': return '#ffd700';
      case 'platinum': return '#e5e4e2';
      default: return '#6c757d';
    }
  };

  return (
    <div className={`holographic-overlay ${className}`} {...props}>
      <div className="holographic-overlay__container">
        {/* Holographic Grid Background */}
        <div className="holographic-overlay__grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="holographic-overlay__grid-line"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationPhase: animationPhase
              }}
            />
          ))}
        </div>

        {/* Security Verification Display */}
        <div className="holographic-overlay__security">
          <div className="holographic-overlay__security-header">
            <h3>🔒 Holographic Verification</h3>
            <div 
              className="holographic-overlay__security-level"
              style={{ borderColor: getSecurityColor() }}
            >
              {securityLevel.toUpperCase()}
            </div>
          </div>
          
          <div className="holographic-overlay__verification-status">
            {verificationStatus === 'pending' && (
              <div className="holographic-overlay__spinner">
                <div className="holographic-overlay__spinner-ring"></div>
                <div className="holographic-overlay__spinner-ring"></div>
                <div className="holographic-overlay__spinner-ring"></div>
              </div>
            )}
            {verificationStatus === 'verified' && (
              <div className="holographic-overlay__verified">
                ✅ VERIFIED
              </div>
            )}
          </div>
        </div>

        {/* Badge Tier Display */}
        {badgeTier && (
          <div className="holographic-overlay__badge">
            <div 
              className="holographic-overlay__badge-icon"
              style={{ color: getBadgeTierColor() }}
            >
              🏆
            </div>
            <div className="holographic-overlay__badge-info">
              <h4>{badgeTier.toUpperCase()} TIER</h4>
              <p>Contributor Badge</p>
            </div>
          </div>
        )}

        {/* Creator Shoutout Display */}
        {creatorInfo && (
          <div className="holographic-overlay__creator">
            <div className="holographic-overlay__creator-avatar">
              👤
            </div>
            <div className="holographic-overlay__creator-info">
              <h4>{creatorInfo.name}</h4>
              <p>{creatorInfo.platform}</p>
              {creatorInfo.message && (
                <div className="holographic-overlay__creator-message">
                  "{creatorInfo.message}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Type-specific Visual Effects */}
        {type === 'holographic' && (
          <div className="holographic-overlay__hologram-effects">
            <div className="holographic-overlay__light-beam"></div>
            <div className="holographic-overlay__light-beam"></div>
            <div className="holographic-overlay__light-beam"></div>
          </div>
        )}

        {/* Verification Complete Animation */}
        {verificationStatus === 'verified' && (
          <div className="holographic-overlay__success">
            <div className="holographic-overlay__success-ring"></div>
            <div className="holographic-overlay__success-ring"></div>
            <div className="holographic-overlay__success-ring"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolographicOverlay;

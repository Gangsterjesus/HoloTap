/**
 * 🧩 QR Components Module
 * 
 * Exports all modular QR components for HoloTap payment system
 */

export { default as QRGenerator } from './QRGenerator';
export { default as QRScanner } from './QRScanner';
export { default as QRPaymentFlow } from './QRPaymentFlow';
export { default as HolographicOverlay } from './HolographicOverlay';

// Re-export utility functions
export { 
  formatPaymentPayload, 
  generateVerificationHash, 
  validatePaymentInput 
} from '../../payments/paymentUtils';

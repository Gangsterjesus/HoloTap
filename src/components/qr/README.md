# 🧩 HoloTap QR Components

A modular QR payment system for HoloTap, designed for creator-first fintech with holographic anti-fraud capabilities.

## 🚀 Features

- **Modular QR Generation** - Reusable components for different payment types
- **Badge Tier Support** - Bronze, Silver, Gold, Platinum contributor tiers
- **Creator Shoutouts** - Support your favorite creators with messages
- **Holographic Overlays** - Anti-fraud verification system (prepared for future)
- **Conditional Rendering** - Smart UI based on payment type
- **Responsive Design** - Works seamlessly on mobile and desktop

## 📦 Components

### QRGenerator
Generates QR codes for different payment types with customizable styling and data.

```jsx
import { QRGenerator } from './components/qr';

<QRGenerator
  paymentData={{
    recipient: 'creator@example.com',
    amount: '5.00',
    reference: 'HoloTap Demo'
  }}
  type="standard" // standard, badge_tier, contributor_shoutout, holographic
  size={200}
  showDetails={true}
  onGenerate={(qrData) => console.log('QR generated:', qrData)}
/>
```

### QRScanner
Handles QR code scanning with validation and type-specific processing.

```jsx
import { QRScanner } from './components/qr';

<QRScanner
  type="standard"
  onScan={(scanData) => console.log('QR scanned:', scanData)}
  onError={(error) => console.error('Scan error:', error)}
  showPreview={true}
/>
```

### QRPaymentFlow
Complete payment flow orchestrator with step-by-step process.

```jsx
import { QRPaymentFlow } from './components/qr';

<QRPaymentFlow
  initialType="standard"
  onPaymentComplete={(paymentData) => console.log('Payment completed:', paymentData)}
  onPaymentError={(error) => console.error('Payment error:', error)}
/>
```

### HolographicOverlay
Future-ready holographic verification overlay with security levels.

```jsx
import { HolographicOverlay } from './components/qr';

<HolographicOverlay
  type="holographic"
  isActive={true}
  securityLevel="high" // low, medium, high, maximum
  badgeTier="gold"
  onVerificationComplete={(data) => console.log('Verified:', data)}
/>
```

## 🎯 Payment Types

### Standard Payment
Basic payment with recipient, amount, and reference.

```jsx
const paymentData = {
  recipient: 'creator@example.com',
  amount: '5.00',
  reference: 'Payment reference',
  currency: 'GBP'
};
```

### Badge Tier Payment
Payment with contributor badge tier information.

```jsx
const badgeData = {
  ...paymentData,
  tier: 'gold', // bronze, silver, gold, platinum
  badgeId: 'badge_123',
  badgeName: 'Gold Contributor'
};
```

### Contributor Shoutout
Payment with creator support message.

```jsx
const creatorData = {
  ...paymentData,
  creatorId: 'creator_456',
  message: 'Thanks for the amazing content!',
  platform: 'TikTok'
};
```

### Holographic Payment
Payment with holographic verification (future feature).

```jsx
const holographicData = {
  ...paymentData,
  hologramId: 'holo_789',
  verificationHash: 'abc123def456',
  securityLevel: 'high'
};
```

## 🎨 Styling

All components include comprehensive CSS with:
- **Type-specific colors** - Visual indicators for different payment types
- **Responsive design** - Mobile-first approach
- **Smooth animations** - Hover effects and transitions
- **Accessibility** - Proper contrast and focus states

## 🔧 Utility Functions

### formatPaymentPayload
Formats payment data for QR generation.

```jsx
import { formatPaymentPayload } from './components/qr';

const payload = formatPaymentPayload({
  recipient: 'creator@example.com',
  amount: '5.00',
  currency: 'GBP',
  metadata: { custom: 'data' }
});
```

### generateVerificationHash
Generates verification hash for holographic validation.

```jsx
import { generateVerificationHash } from './components/qr';

const hash = generateVerificationHash(paymentData);
```

### validatePaymentInput
Validates payment input before processing.

```jsx
import { validatePaymentInput } from './components/qr';

const error = validatePaymentInput({
  recipient: 'creator@example.com',
  amount: '5.00'
});
```

## 🚀 Getting Started

1. **Import the components**:
```jsx
import { QRGenerator, QRScanner, QRPaymentFlow } from './components/qr';
```

2. **Use in your app**:
```jsx
function App() {
  return (
    <QRPaymentFlow
      initialType="standard"
      onPaymentComplete={(data) => console.log('Payment completed:', data)}
    />
  );
}
```

3. **Customize styling**:
```jsx
<QRGenerator
  className="custom-qr-generator"
  paymentData={data}
  type="badge_tier"
/>
```

## 🔮 Future Features

- **Real QR Scanning** - Integration with camera APIs
- **Holographic Verification** - Physical hologram validation
- **Badge Animations** - Dynamic badge reveal effects
- **Multi-currency Support** - International payment support
- **Analytics Integration** - Payment tracking and insights

## 📱 Demo

Visit `/qr-demo` to see all components in action with interactive examples.

## 🤝 Contributing

This modular system is designed for easy extension. Add new payment types by:
1. Extending the type enum in components
2. Adding type-specific validation
3. Creating custom styling
4. Updating the documentation

---

**Built with ❤️ for the HoloTap creator community**

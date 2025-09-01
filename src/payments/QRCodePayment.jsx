import React from 'react';
import QRCode from 'qrcode.react';
import './qrCodePayment.css'; // Optional: modular styles

const QRCodePayment = ({ paymentData, onScan }) => {
  if (!paymentData) return null;

  const { name, amount, reference } = paymentData;
  const qrPayload = JSON.stringify({
    payee: name,
    amount: parseFloat(amount).toFixed(2),
    reference,
    timestamp: Date.now(),
  });

  return (
    <div className="qr-payment">
      <h2>Scan to Pay</h2>

      <div className="qr-wrapper">
        <QRCode value={qrPayload} size={200} />
      </div>

      <div className="qr-details">
        <p><strong>Payee:</strong> {name}</p>
        <p><strong>Amount:</strong> £{parseFloat(amount).toFixed(2)}</p>
        <p><strong>Reference:</strong> {reference}</p>
      </div>

      {onScan && (
        <button onClick={onScan} className="scan-confirm">
          Confirm Scan
        </button>
      )}
    </div>
  );
};

export default QRCodePayment;

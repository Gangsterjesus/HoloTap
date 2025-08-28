import React from 'react';
import './paymentPreview.css'; // Optional: modular styles

const PaymentPreview = ({ data, onEdit, onConfirm }) => {
  if (!data) return null;

  const { name, amount, reference } = data;

  return (
    <div className="payment-preview">
      <h2>Preview Payment</h2>

      <div className="preview-field">
        <strong>Name:</strong> <span>{name}</span>
      </div>

      <div className="preview-field">
        <strong>Amount:</strong> <span>£{parseFloat(amount).toFixed(2)}</span>
      </div>

      <div className="preview-field">
        <strong>Reference:</strong> <span>{reference}</span>
      </div>

      <div className="preview-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onConfirm}>Confirm & Send</button>
      </div>
    </div>
  );
};

export default PaymentPreview;

import React from 'react';

const PaymentPreview = ({ recipient, amount, onConfirm }) => {
  if (!recipient || !amount) return null;

  return (
    <section className="creator-card badge-reveal">
      <div className="creator-card__name">{recipient}</div>
      <div className="creator-card__platform">Amount: £{amount}</div>
      <button className="creator-card__button" onClick={onConfirm}>
        Confirm & Generate QR
      </button>
    </section>
  );
};

export default PaymentPreview;
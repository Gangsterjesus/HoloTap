
import React, { useState } from 'react';
import PaymentPreview from './PaymentPreview'; // ✅ Import preview component

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && recipient) {
      setSubmitted(true);
    }
  };

  const handleConfirm = () => {
    alert(`💠 HoloTap confirmed: £${amount} sent to ${recipient}`);
    // HoloTap QR logic will go here next
  };

  return (
    <section className="holotap-payment">
      <h2 className="holotap-payment__title">Send a Payment via HoloTap</h2>
      <form className="holotap-payment__form" onSubmit={handleSubmit}>
        <div>
          <label>Recipient:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="e.g. @creator123"
          />
        </div>
        <div>
          <label>Amount (£):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 2.50"
          />
        </div>
        <button className="cta__button" type="submit">Preview with HoloTap</button>
      </form>

      {submitted && (
        <PaymentPreview
          recipient={recipient}
          amount={amount}
          onConfirm={handleConfirm}
        />
      )}
    </section>
  );
};

export default PaymentForm;
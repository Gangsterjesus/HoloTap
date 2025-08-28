
import React, { useState } from 'react';
import './paymentForm.css'; // Optional: modular styles

const PaymentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    reference: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.amount || isNaN(formData.amount)) newErrors.amount = 'Valid amount required';
    if (!formData.reference.trim()) newErrors.reference = 'Reference is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit?.(formData); // Optional callback
      console.log('Payment submitted:', formData);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h2>Send Payment</h2>

      <label>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Amount (£)
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="e.g. 25.00"
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </label>

      <label>
        Reference
        <input
          type="text"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
          placeholder="e.g. PayDog badge"
        />
        {errors.reference && <span className="error">{errors.reference}</span>}
      </label>

      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
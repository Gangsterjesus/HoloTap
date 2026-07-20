import { generateId } from "../utils/id.js";

const payments = new Map();

export const paymentService = {
  createPayment({ merchantId, amount }) {
    const id = generateId();
    const payment = {
      id,
      merchantId,
      amount,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    payments.set(id, payment);
    return payment;
  },

  getPayment(id) {
    return payments.get(id) || null;
  },

  confirmPayment(id) {
    const payment = payments.get(id);
    if (!payment) return null;
    payment.status = "confirmed";
    payment.confirmedAt = new Date().toISOString();
    return payment;
  }
};

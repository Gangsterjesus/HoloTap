// src/flows/Flow3Payment.jsx

/**
 * HoloTap — Flow 3: Payment Screen
 * Author: Raymond Newton
 * Date: 01 June 2026
 *
 * Purpose:
 * Handles user payment entry, validation, and QR token generation for the
 * consumer-facing payment flow.
 */

import { useState } from "react";
import { generateQrToken } from "../services/QrTokenService";
import { formatCurrency } from "../Utils/format";

export default function Flow3Payment({ setFlow, creator }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function parseAmount(value) {
    const numeric = Number(value);
    if (Number.isNaN(numeric) || numeric <= 0) {
      return null;
    }
    return numeric;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const parsedAmount = parseAmount(amount);

    if (!parsedAmount) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    try {
      const tokenObject = await generateQrToken({
        amount: parsedAmount,
        description: description.trim() || null,
        userId: creator?.id || "anonymous"
      });

      localStorage.setItem("ht_last_qr_token", JSON.stringify(tokenObject));

      const logs = JSON.parse(localStorage.getItem("ht_logs") || "[]");
      logs.push({
        id: crypto.randomUUID(),
        amount: parsedAmount,
        description: description.trim() || null,
        createdAt: Date.now()
      });
      localStorage.setItem("ht_logs", JSON.stringify(logs));

      setFlow(7); // go to Processing
    } catch (error) {
      console.error("Error generating QR token:", error);
      setError("Something went wrong while generating the payment token.");
    }
  }

  return (
    <div className="ht-container">
      <h2>Flow 3 — Payment</h2>

      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          {amount && (
            <p className="form__hint">
              Preview: {formatCurrency(parseAmount(amount) || 0)}
            </p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="description">Description (optional)</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        {error && <p className="form__error">{error}</p>}

        <button type="submit" className="cta__button">
          Generate QR Code
        </button>

        <button
          type="button"
          className="cta__button cta__button--secondary"
          onClick={() => setFlow(2)}
        >
          Back
        </button>
      </form>
    </div>
  );
}


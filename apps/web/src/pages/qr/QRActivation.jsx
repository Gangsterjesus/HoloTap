import { useState } from "react";
import QRCode from "react-qrcode-svg";

export default function QRActivation() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [expires, setExpires] = useState(null);
  const [error, setError] = useState(null);

  async function generateQR() {
    try {
      setLoading(true);
      setError(null);
      setToken(null);

      const response = await fetch("http://192.168.1.205:3001/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchantId: "MERCHANT_123" })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate QR session");
      }

      setToken(data.token);
      setExpires(data.expiresIn ?? 30);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>QR Activation</h1>
      <p>Generate a QR code to start a secure payment session.</p>

      {loading && <p>Generating QR…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!token && (
        <button onClick={generateQR} style={{ padding: "10px 20px" }}>
          Generate QR
        </button>
      )}

      {token && (
        <div style={{ marginTop: "2rem" }}>
          <QRCode value={token} size={220} />
          <p>Session Token:</p>
          <code>{token}</code>
          <p>Expires in: {expires}s</p>
        </div>
      )}
    </div>
  );
}

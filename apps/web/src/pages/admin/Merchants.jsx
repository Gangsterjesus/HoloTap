/**
 * ============================================================
 *  HoloTap — Merchant Directory
 *  File: src/pages/admin/Merchants.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Module Purpose:
 *    Displays all merchants registered on the HoloTap platform,
 *    including identity, status, and operational metadata.
 *
 *  Module Responsibilities:
 *    - Fetch merchant records from the admin API
 *    - Surface merchant identifiers and status
 *    - Provide entry into deeper admin‑level merchant tools
 * ============================================================
 */

import { useEffect, useState } from "react";

export default function Merchants() {
  const [merchants, setMerchants] = useState([]);

  async function loadMerchants() {
    const res = await fetch("http://192.168.1.205:3001/admin/merchants");
    const data = await res.json();
    setMerchants(data || []);
  }

  useEffect(() => {
    loadMerchants();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Merchant Directory</h1>

      {merchants.map((m) => (
        <div key={m.id} style={{ marginBottom: "1rem" }}>
          <strong>{m.name}</strong>
          <br />
          Merchant ID: {m.id}
          <br />
          Status: {m.status}
        </div>
      ))}
    </div>
  );
}

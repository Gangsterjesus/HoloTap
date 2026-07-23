/**
 * ============================================================
 *  HoloTap — Organisation Management (Admin)
 *  File: src/pages/admin/Organisations.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Displays all organisations registered on the HoloTap platform,
 *    including membership counts, identifiers, and operational status.
 *    This module supports multi‑tenant administration for TM470.
 *
 *  Responsibilities:
 *    - Fetch organisation records from the admin API
 *    - Surface organisation identifiers and membership totals
 *    - Provide entry into deeper organisation‑level tools
 * ============================================================
 */

import { useEffect, useState } from "react";

export default function Organisations() {
  const [orgs, setOrgs] = useState(null);

  async function loadOrgs() {
    try {
      const res = await fetch("http://192.168.1.205:3001/admin/organisations");
      const data = await res.json();
      setOrgs(data);
    } catch (err) {
      setOrgs({ error: "Unable to load organisation data." });
    }
  }

  useEffect(() => {
    loadOrgs();
  }, []);

  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Organisations</h1>
      <p style={styles.subtitle}>
        Multi‑tenant organisation directory for administrators.
      </p>

      {/* ============================
          GRID SECTION
          ============================ */}
      <div style={styles.grid}>
        {Array.isArray(orgs) ? (
          orgs.map((org) => (
            <OrganisationCard
              key={org.id}
              name={org.name}
              id={org.id}
              members={org.members}
            />
          ))
        ) : (
          <p style={styles.placeholder}>Loading organisations…</p>
        )}
      </div>

    </div>
  );
}

/* ============================
   ACCESSIBLE + CUTE ORG CARD
   ============================ */
function OrganisationCard({ name, id, members }) {
  return (
    <div style={styles.cardAccessible} tabIndex={0}>
      <span style={styles.icon}>🏢</span>

      <h3 style={styles.cardLabelAccessible}>{name}</h3>

      <p style={styles.cardValueAccessible}>
        Organisation ID: <strong>{id}</strong>
      </p>

      <p style={styles.cardValueAccessible}>
        Members: <strong>{members}</strong>
      </p>
    </div>
  );
}

/* ============================
   STYLES (ACCESSIBLE + COLOUR SAFE)
   ============================ */
const styles = {
  container: {
    padding: "40px",
  },

  // Header
  title: {
    fontSize: "38px",
    marginBottom: "10px",
    color: "#111",
  },
  subtitle: {
    fontSize: "19px",
    color: "#333",
    marginBottom: "30px",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "26px",
    marginTop: "20px",
  },

  // Accessible Card
  cardAccessible: {
    padding: "26px",
    borderRadius: "16px",
    backgroundColor: "#F7F7F7",
    border: "2px solid #D0D0D0",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
    transition: "transform 0.15s ease, outline 0.15s ease",
    outline: "2px solid transparent",
  },

  icon: {
    fontSize: "34px",
    marginBottom: "12px",
  },

  cardLabelAccessible: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "8px",
  },

  cardValueAccessible: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#111",
    marginTop: "6px",
  },

  placeholder: {
    color: "#777",
    marginTop: "10px",
  },
};

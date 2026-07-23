/**
 * ============================================================
 *  HoloTap — User Directory (Admin)
 *  File: src/pages/admin/Users.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Displays all users registered on the HoloTap platform,
 *    including identity, role, and membership metadata.
 *    This module supports admin‑level user management.
 *
 *  Responsibilities:
 *    - Fetch user records from the admin API
 *    - Surface user identifiers, names, and roles
 *    - Provide entry into deeper user‑level tools
 * ============================================================
 */

import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState(null);

  async function loadUsers() {
    try {
      const res = await fetch("http://192.168.1.205:3001/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setUsers({ error: "Unable to load user data." });
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Users</h1>
      <p style={styles.subtitle}>
        Platform‑wide user directory for administrators.
      </p>

      {/* ============================
          GRID SECTION
          ============================ */}
      <div style={styles.grid}>
        {Array.isArray(users) ? (
          users.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              id={user.id}
              role={user.role}
            />
          ))
        ) : (
          <p style={styles.placeholder}>Loading users…</p>
        )}
      </div>

    </div>
  );
}

/* ============================
   ACCESSIBLE + CUTE USER CARD
   ============================ */
function UserCard({ name, id, role }) {
  const icon = "👤"; // shape indicator for accessibility

  return (
    <div style={styles.cardAccessible} tabIndex={0}>
      <span style={styles.icon}>{icon}</span>

      <h3 style={styles.cardLabelAccessible}>{name}</h3>

      <p style={styles.cardValueAccessible}>
        User ID: <strong>{id}</strong>
      </p>

      <p style={styles.cardValueAccessible}>
        Role: <strong>{role}</strong>
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

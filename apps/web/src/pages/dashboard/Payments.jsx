/**
 * ============================================================
 *  HoloTap — Creator Payments Page
 *  File: src/pages/dashboard/Payments.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays all payment activity associated with the creator’s
 *  HoloTap badge. Includes recent transactions, payout history,
 *  and settlement status. This page is part of the creator
 *  dashboard suite.
 * ============================================================
 */

export default function Payments() {
  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Payments</h1>
      <p style={styles.subtitle}>Your recent transactions and payout history.</p>

      {/* ============================
          SUMMARY SECTION
          ============================ */}
      <div style={styles.summary}>
        <div style={styles.card}>
          <h2>Total Earnings</h2>
          <p>£0.00</p>
        </div>

        <div style={styles.card}>
          <h2>Pending Payouts</h2>
          <p>£0.00</p>
        </div>

        <div style={styles.card}>
          <h2>Completed Transactions</h2>
          <p>0</p>
        </div>
      </div>

      {/* ============================
          TRANSACTIONS LIST SECTION
          ============================ */}
      <div style={styles.transactions}>
        <h2>Recent Transactions</h2>
        <p style={styles.placeholder}>No transactions yet.</p>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
  },

  // Header
  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },

  // Summary cards
  summary: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    textAlign: "center",
  },

  // Transactions list
  transactions: {
    marginTop: "20px",
  },
  placeholder: {
    color: "#777",
    marginTop: "10px",
  },
};

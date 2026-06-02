/**
 * ============================================================
 *  HoloTap — Merchant Home Dashboard
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the primary landing screen for authenticated merchants.
 *  Offers quick access to core merchant operations:
 *    • Display static merchant QR code
 *    • View live incoming payments
 *    • Perform refund / void operations
 *    • Review settlement information
 *    • Access merchant settings
 *
 *  Architecture Notes:
 *  - This component is UI‑only and contains no business logic.
 *  - Merchant identity (tagID) is handled by MerchantSession.js.
 *  - QR display, payments, refunds, and settlement are delegated
 *    to their respective service modules and screens.
 *  - Designed for mobile‑first merchant usage in real‑world retail.
 *
 *  Identity Model:
 *  - Merchants are identified by tagID (public merchant identifier).
 *  - tagID is used for all payment, refund, and settlement lookups.
 *
 *  Dependencies:
 *  - None directly (navigation handled by parent flow controller).
 *
 * ============================================================
 */

export default function MerchantHome() {
  return (
    <div className="merchant__container">

      <header className="merchant__header">
        <h1 className="merchant__title">HoloTap Merchant</h1>
        <p className="merchant__tagline">Instant QR payments for UK businesses</p>
      </header>

      <main className="merchant__actions">
        <button className="cta__button merchant__primary">
          Show My QR Code
        </button>

        <button className="cta__button">
          Live Payments
        </button>

        <button className="cta__button">
          Refund / Void
        </button>

        <button className="cta__button">
          Settlement
        </button>

        <button className="cta__button">
          Settings
        </button>
      </main>

      <footer className="merchant__footer">
        <p>HoloTap Badge • Secure UK merchant payments</p>
      </footer>

    </div>
  );
}


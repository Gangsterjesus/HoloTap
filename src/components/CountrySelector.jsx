/**
 * ============================================================
 *  HoloTap — Country / Dial Code Selector Component
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a reusable dropdown component for selecting an
 *  international dial code. Used across consumer registration
 *  and login flows to construct fullMobile values.
 *
 *  Architecture Notes:
 *  - Stateless UI component.
 *  - Emits the selected dial code via the onChange callback.
 *  - Performs no validation or business logic.
 *  - Designed for extensibility (additional countries can be added).
 *
 *  Identity Model:
 *  - fullMobile = dialCode + cleanedMobile
 *  - This component supplies the dialCode portion.
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - No legacy TM352 dependencies remain.
 *  - Clean, accessible, mobile‑friendly select element.
 *
 * ============================================================
 */

export default function CountrySelector({ value, onChange }) {
  return (
    <select
      className="form__input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="+44">🇬🇧 +44 United Kingdom</option>
      <option value="+1">🇺🇸 +1 United States</option>
      <option value="+61">🇦🇺 +61 Australia</option>
      <option value="+65">🇸🇬 +65 Singapore</option>
      <option value="+66">🇹🇭 +66 Thailand</option>
    </select>
  );
}

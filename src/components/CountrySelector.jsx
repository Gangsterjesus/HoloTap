/**
 * ============================================================
 *  HoloTap — Country / Area Code Selector Component
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a reusable dropdown component for selecting an
 *  international country/area code. Used across consumer
 *  registration and login flows to construct fullMobile.
 *
 *  Architecture Notes:
 *  - Stateless UI component.
 *  - Emits selected country code via onChange callback.
 *  - Does not perform validation or business logic.
 *  - Designed for extensibility (additional countries can be added).
 *
 *  Identity Model:
 *  - fullMobile = countryCode + cleanedMobile
 *  - This component supplies the countryCode portion.
 *
 *  Dependencies:
 *  - None (pure UI component).
 *
 * ============================================================
 */

export default function CountrySelector({ value, onChange }) {
  return (
    <select
      className="form__input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="+44">🇬🇧 +44 United Kingdom</option>
      <option value="+1">🇺🇸 +1 United States</option>
      <option value="+61">🇦🇺 +61 Australia</option>
      <option value="+65">🇸🇬 +65 Singapore</option>
      <option value="+66">🇹🇭 +66 Thailand</option>
    </select>
  );
}

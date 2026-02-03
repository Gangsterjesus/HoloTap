import { COUNTRY_CODES } from "../Data/countryCodes.js";

export default function CountrySelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        background: "#111",
        color: "white",
        border: "1px solid #555",
        borderRadius: 6,
        marginBottom: 15
      }}
    >
      {COUNTRY_CODES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.label} ({c.code})
        </option>
      ))}
    </select>
  );
}
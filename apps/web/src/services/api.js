const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "API error");
  return data;
}

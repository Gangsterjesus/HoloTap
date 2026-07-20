import { apiRequest } from "./api";

export function createSession(role, merchantId = null) {
  return apiRequest("/api/session", {
    method: "POST",
    body: JSON.stringify({ role, merchantId }),
  });
}

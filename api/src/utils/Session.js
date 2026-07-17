export function getSession() {
  const session = localStorage.getItem("session");
  return session ? JSON.parse(session) : null;
}

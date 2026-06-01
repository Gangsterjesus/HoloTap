// src/services/userService.js

// Retrieve the currently registered creator (Flow 1)
export function getUser() {
  const u = localStorage.getItem("ht_user");
  return u ? JSON.parse(u) : null;
}

// Look up a user by mobile number (Flow 2)
export function getUserByMobile(mobile) {
  const users = JSON.parse(localStorage.getItem("ht_users") || "[]");
  return users.find((u) => u.mobile === mobile);
}

// Save a new user (Flow 1 Registration)
export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("ht_users") || "[]");
  users.push(user);

  // Also store the "current" creator profile
  localStorage.setItem("ht_user", JSON.stringify(user));

  localStorage.setItem("ht_users", JSON.stringify(users));
}

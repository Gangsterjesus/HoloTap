// src/services/userService.js

// Look up a user by mobile number
export function getUserByMobile(mobile) {
  const users = JSON.parse(localStorage.getItem("ht_users") || "[]");
  return users.find((u) => u.mobile === mobile);
}

// Save a new user (used in Flow 1 Registration)
export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("ht_users") || "[]");
  users.push(user);
  localStorage.setItem("ht_users", JSON.stringify(users));
}

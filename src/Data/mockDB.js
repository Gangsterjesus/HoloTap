// Simple in-memory mock database

let users = [];

export function createUser({ mobileNumber, countryCode }) {
  const id = crypto.randomUUID();

  // Generate a QR code URL using a free API
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${id}`;

  const newUser = {
    id,
    mobileNumber,
    countryCode,
    qrCode,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  return newUser;
}

export function getUserByMobile(mobileNumber) {
  return users.find(u => u.mobileNumber === mobileNumber);
}

export function getUserById(id) {
  return users.find(u => u.id === id);
}

export function generateQRToken() {
  return "qr_" + Math.random().toString(36).substring(2, 12);
}

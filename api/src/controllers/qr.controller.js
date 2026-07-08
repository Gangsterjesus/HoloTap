import { createQrSession } from "../services/qr.service.js";

export async function createQRSession(req, res) {
  try {
    const { merchantId } = req.body;

    if (!merchantId) {
      return res.status(400).json({ message: "merchantId is required" });
    }

    const session = await createQrSession(merchantId);

    return res.status(200).json(session);
  } catch (err) {
    console.error("QR Session Error:", err);
    return res.status(500).json({ message: "Failed to create QR session" });
  }
}

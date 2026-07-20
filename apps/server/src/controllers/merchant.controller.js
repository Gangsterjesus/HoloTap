import { merchantService } from "../services/merchant.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function createMerchant(req, res, next) {
  try {
    const merchant = merchantService.createMerchant(req.body);
    return sendSuccess(res, 201, "Merchant created", merchant);
  } catch (err) {
    next(err);
  }
}

export function getMerchant(req, res, next) {
  try {
    const merchant = merchantService.getMerchant(req.params.merchantId);
    if (!merchant) return sendError(res, 404, "Merchant not found");
    return sendSuccess(res, 200, "Merchant retrieved", merchant);
  } catch (err) {
    next(err);
  }
}

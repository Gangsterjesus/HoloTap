import { paymentService } from "../services/payment.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function createPayment(req, res, next) {
  try {
    const payment = paymentService.createPayment(req.body);
    return sendSuccess(res, 201, "Payment created", payment);
  } catch (err) {
    next(err);
  }
}

export function getPayment(req, res, next) {
  try {
    const payment = paymentService.getPayment(req.params.paymentId);
    if (!payment) return sendError(res, 404, "Payment not found");
    return sendSuccess(res, 200, "Payment retrieved", payment);
  } catch (err) {
    next(err);
  }
}

export function confirmPayment(req, res, next) {
  try {
    const payment = paymentService.confirmPayment(req.params.paymentId);
    if (!payment) return sendError(res, 404, "Payment not found");
    return sendSuccess(res, 200, "Payment confirmed", payment);
  } catch (err) {
    next(err);
  }
}

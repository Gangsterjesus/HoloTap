import { generateId } from "../utils/id.js";

const consumers = new Map();

export const consumerService = {
  createConsumer(data) {
    const id = generateId();
    const consumer = { id, ...data };
    consumers.set(id, consumer);
    return consumer;
  }
};

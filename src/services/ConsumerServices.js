/**
 * ============================================================
 *  HoloTap — Consumer Registry Service
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides persistent storage and lookup for consumer identities.
 *  Handles registration, retrieval, and canonical mobile identity
 *  matching using fullMobile (countryCode + cleanedMobile).
 *
 *  Architecture Notes:
 *  - Consumers are stored in localStorage under "ht_consumers".
 *  - Registry entries include:
 *      • consumerId (UUID)
 *      • fullMobile (canonical login identifier)
 *      • country
 *      • mobile (cleaned national number)
 *      • createdAt (timestamp)
 *  - This module contains no UI logic and no session logic.
 *  - Used by ConsumerRegistration and ConsumerLogin flows.
 *
 *  Identity Model:
 *  - fullMobile is the authoritative consumer identifier.
 *  - consumerId is used internally for session binding.
 *
 *  Dependencies:
 *  - None (pure storage + lookup service).
 *
 * ============================================================
 */

const CONSUMER_KEY = "ht_consumers";

/* Load all consumers */
function loadConsumers() {
  return JSON.parse(localStorage.getItem(CONSUMER_KEY) || "[]");
}

/* Save all consumers */
function saveConsumers(consumers) {
  localStorage.setItem(CONSUMER_KEY, JSON.stringify(consumers));
}

/* Register a new consumer */
export function registerConsumer(consumer) {
  const list = loadConsumers();
  list.push(consumer);
  saveConsumers(list);
  return consumer;
}

/* Find consumer by full mobile number */
export function findConsumer(fullMobile) {
  const list = loadConsumers();
  return list.find((c) => c.fullMobile === fullMobile);
}


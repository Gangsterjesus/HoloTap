/**
 * HoloTapServer
 * Bootstrap Module — Server Initialisation
 * Flow 0 — Application Entry Point
 * Author: R. Newton (Founder-Architect)
 * Date: 2026-08-06
 *
 * Overview:
 * Provides the main Express application bootstrap. All middleware layers
 * (Flow 6–11) and all route modules (Flow 10, org, user, QR, etc.) are
 * mounted here in deterministic order.
 */

import express from 'express';
import { actorPipeline } from './middleware/actorPipeline';
import { founderRoute } from './routes/founder';

const app = express();

// ------------------------------------------------------
// 1. Global Middleware
// ------------------------------------------------------
app.use(express.json());

// ------------------------------------------------------
// 2. Flow 11 — Unified Actor Pipeline
// ------------------------------------------------------
app.use(actorPipeline);

// ------------------------------------------------------
// 3. Flow 10 — Founder Routes
// ------------------------------------------------------
app.use('/founder', founderRoute);

// ------------------------------------------------------
// 4. Additional Routes (future wiring)
// ------------------------------------------------------
// app.use('/org', orgRoute);
// app.use('/user', userRoute);
// app.use('/qr', qrRoute);

// ------------------------------------------------------
// 5. Server Start
// ------------------------------------------------------
app.listen(3000, () => {
  console.log('HoloTapServer running on port 3000');
});

export default app;

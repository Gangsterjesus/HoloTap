
/**
 * =============================================================================
 *  HoloTap Backend API — Server Entry Point
 * =============================================================================
 *  Author:        R. Newton (Raymond Newton)
 *  Co‑Author:     Microsoft Copilot (AI Engineering Assistant)
 *
 *  File:          server.js
 *  Description:   Primary Express server configuration for the HoloTap API.
 *                 Responsible for initialising middleware, routing, environment
 *                 configuration, and application lifecycle management.
 *
 *  Version:       1.0.0
 *  Created:       18 June 2026
 *
 *  Engineering Notes:
 *  - This file acts as the root of the backend service.
 *  - All routes are mounted from the /routes directory.
 *  - All business logic is delegated to controllers and services.
 *  - No inline styles or abbreviations are used, in accordance with project
 *    documentation standards.
 *
 *  Copyright:
 *  © 2026 HoloTap. All rights reserved.
 * =============================================================================
 */


















import express from "express";
import cors from "cors";
import dotenv from "dotenv";



// -----------------------------------------------------------------------------
// Route Mounting: Session Management
// -----------------------------------------------------------------------------
// The following import brings the session routing module into the server.  
// This module contains all HTTP endpoints related to session creation and 
// lifecycle management for the HoloTap application.
//
// The route is mounted at the base path "/api/session".  
// Any request beginning with this path will be delegated to the sessionRoutes 
// router, which then forwards the request to the appropriate controller and 
// service layers.
//
// Example:
// POST /api/session/create  →  Generates a new HoloTap session token.
// -----------------------------------------------------------------------------

import sessionRoutes from "./routes/session.routes.js";   // Imports session routing module
app.use("/api/session", sessionRoutes);                   // Registers the session routes


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "HoloTap API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`HoloTap API running on port ${PORT}`);
});

/**
 * ============================================================
 *  HoloTap — ReactDOM Root
 *  File: src/main.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 * ============================================================
 *
 *  Purpose:
 *  Mounts the entire HoloTap application using ReactDOM.
 *  Wraps App.jsx with BrowserRouter and StrictMode.
 * ============================================================
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

/* ============================
   MOUNT APPLICATION
   ============================ */

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>

);

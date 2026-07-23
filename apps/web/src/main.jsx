/**
 * ============================================================
 *  HoloTap — Web Application Router
 *  File: src/main.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Mounts the HoloTap web client and registers all top‑level
 *  routes, including merchant tools, QR activation flows,
 *  dashboards, identity modules, and system navigation.
 *
 *  Responsibilities:
 *  - Define global routing structure
 *  - Inject Navigation across all pages
 *  - Register merchant suite modules
 *  - Register creator suite modules
 *  - Register QR activation and dashboard routes
 *  - Serve as the root entry point for the web application
 * ============================================================
 */



import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navigation from "./components/Navigation.jsx";

/* ============================
   PUBLIC PAGES
   ============================ */
import Home from "./pages/public/Home.jsx";
import Onboarding from "./pages/public/Onboarding.jsx";
import Verify from "./pages/public/Verify.jsx";

/* ============================
   CREATOR WORKSPACE
   ============================ */
import CreatorDashboard from "./pages/creator/Dashboard.jsx";
import CreatorPayments from "./pages/creator/Payments.jsx";
import CreatorIdentity from "./pages/creator/Identity.jsx";
import CreatorStatus from "./pages/creator/Status.jsx";
import CreatorSettings from "./pages/creator/Settings.jsx";

/* ============================
   ADMIN WORKSPACE
   ============================ */
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Merchants from "./pages/admin/Merchants.jsx";
import Logs from "./pages/admin/Logs.jsx";
import SystemStatus from "./pages/admin/SystemStatus.jsx";
import Organisations from "./pages/admin/Organisations.jsx";
import Users from "./pages/admin/Users.jsx";

/* ============================
   ORGANISATION WORKSPACE (TM470)
   ============================ */
import OrgHome from "./pages/org/Home.jsx";
import OrgMembers from "./pages/org/Members.jsx";
import OrgRoles from "./pages/org/Roles.jsx";
import OrgSettings from "./pages/org/Settings.jsx";
import OrgActivity from "./pages/org/Activity.jsx";

/* ============================
   AUTHENTICATION
   ============================ */
import Login from "./pages/auth/Login.jsx";
import MagicLink from "./pages/auth/MagicLink.jsx";
import Passkey from "./pages/auth/Passkey.jsx";
import VerifyAuth from "./pages/auth/VerifyAuth.jsx";

/* ============================
   PAYMENT RESULT PAGE
   ============================ */
import PaymentResult from "./pages/payment/Result.jsx";

/* ============================
   ROUTER CONFIG
   ============================ */
const router = createBrowserRouter([
  /* PUBLIC */
  {
    path: "/",
    element: (
      <>
        <Navigation />
        <Home />
      </>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <>
        <Navigation />
        <Onboarding />
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <Navigation />
        <Verify />
      </>
    ),
  },

  /* CREATOR WORKSPACE */
  {
    path: "/dashboard",
    element: (
      <>
        <Navigation />
        <CreatorDashboard />
      </>
    ),
  },
  {
    path: "/payments",
    element: (
      <>
        <Navigation />
        <CreatorPayments />
      </>
    ),
  },
  {
    path: "/identity",
    element: (
      <>
        <Navigation />
        <CreatorIdentity />
      </>
    ),
  },
  {
    path: "/status",
    element: (
      <>
        <Navigation />
        <CreatorStatus />
      </>
    ),
  },
  {
    path: "/settings",
    element: (
      <>
        <Navigation />
        <CreatorSettings />
      </>
    ),
  },

  /* ADMIN WORKSPACE */
  {
    path: "/admin",
    element: (
      <>
        <Navigation />
        <AdminDashboard />
      </>
    ),
  },
  {
    path: "/admin/merchants",
    element: (
      <>
        <Navigation />
        <Merchants />
      </>
    ),
  },
  {
    path: "/admin/logs",
    element: (
      <>
        <Navigation />
        <Logs />
      </>
    ),
  },
  {
    path: "/admin/status",
    element: (
      <>
        <Navigation />
        <SystemStatus />
      </>
    ),
  },
  {
    path: "/admin/organisations",
    element: (
      <>
        <Navigation />
        <Organisations />
      </>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <>
        <Navigation />
        <Users />
      </>
    ),
  },

  /* ORGANISATION WORKSPACE (TM470) */
  {
    path: "/org",
    element: (
      <>
        <Navigation />
        <OrgHome />
      </>
    ),
  },
  {
    path: "/org/members",
    element: (
      <>
        <Navigation />
        <OrgMembers />
      </>
    ),
  },
  {
    path: "/org/roles",
    element: (
      <>
        <Navigation />
        <OrgRoles />
      </>
    ),
  },
  {
    path: "/org/settings",
    element: (
      <>
        <Navigation />
        <OrgSettings />
      </>
    ),
  },
  {
    path: "/org/activity",
    element: (
      <>
        <Navigation />
        <OrgActivity />
      </>
    ),
  },

  /* AUTHENTICATION */
  {
    path: "/login",
    element: (
      <>
        <Navigation />
        <Login />
      </>
    ),
  },
  {
    path: "/magic-link",
    element: (
      <>
        <Navigation />
        <MagicLink />
      </>
    ),
  },
  {
    path: "/passkey",
    element: (
      <>
        <Navigation />
        <Passkey />
      </>
    ),
  },
  {
    path: "/auth/verify",
    element: (
      <>
        <Navigation />
        <VerifyAuth />
      </>
    ),
  },

  /* PAYMENT RESULT */
  {
    path: "/payment/result",
    element: (
      <>
        <Navigation />
        <PaymentResult />
      </>
    ),
  },
]);

/* ============================
   RENDER
   ============================ */
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
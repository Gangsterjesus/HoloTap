# 💠 HoloTap — Scan‑to‑Pay for the Next Digital Economy

HoloTap is a creator‑first QR‑code payment prototype designed for fast, secure, and frictionless micro‑transactions. Built for fans, creators, and independent developers, HoloTap blends holographic QR logic with a modular open‑source architecture — paving the way for future digital‑asset payments.

## 🌍 Vision

To deliver a secure, modern QR‑code payment platform that evolves naturally into the next era of digital value — including NFTs, BRICS‑aligned digital currencies, and emerging asset‑to‑asset (A2A) payment systems.

## 🚀 Features

• 💠 Holographic QR payments  
• 💠 Secure token‑based transaction flow  
• 💠 Creator‑friendly micro‑payment design  
• 💠 Modular React components, CSS tokens & font system  
• 💠 Open‑source and contributor‑friendly  
• 💠 Future integration with NFTs & BRICS‑aligned digital currencies  

## 🛠️ Tech Stack

• React + Vite  
• HTML5 / CSS3 / JavaScript  
• TypeScript (in progress)  
• Node.js (planned)  
• GitHub Pages (for live preview)  

## 🎨 Design Philosophy

HoloTap focuses on clarity, modularity, and security. Every component is built to be reusable, auditable, and easy to extend — whether for simple QR payments or advanced digital‑asset flows.

## 🤝 Contributing

We welcome contributions of all kinds — from code improvements and feature ideas to architecture discussions and documentation.

Ways to help:  
• Fork the repo and submit a PR  
• Suggest features via GitHub Issues  
• Join the conversation and help shape HoloTap’s evolution  

## 📄 License

Licensed under the AGPL‑3.0. You are free to use, modify, and distribute this project under the terms of the license.

## 🔗 Live Preview

Coming soon via GitHub Pages.

## 👤 Credits

Founder & Lead Developer: Raymond Newton  
Final‑year BSc Computing & IT student at The Open University  
Architect of HoloTap's QR‑payment vision and future digital‑currency roadmap

---

## 🚀 Version 6 — Full Router Architecture Upgrade (June 2026)

Version 6 introduces the largest structural improvement to the HoloTap codebase to date.  
This release replaces the legacy flow‑based navigation system with a modern, scalable, and secure **React Router v6 architecture**.

### 🔧 Key Improvements in v6

- Full migration to React Router v6  
- Legacy routers removed  
- New centralised router added  
- Role‑based access control via ProtectedRoute  
- Dynamic payment routes  
- Cleaner folder structure  
- All consumer and merchant flows upgraded  
- TM470‑ready architecture  

### 📁 Updated Folder Structure (v6)

## 🧩 Architecture Overview

HoloTap follows a modular, production‑grade architecture designed for clarity, security, and scalability.  
The system is divided into **flows**, **screens**, **routes**, **services**, and **utilities**, with React Router v6 providing the navigation backbone.

### 🔷 High‑Level Architecture Diagram

HoloTap (SPA)
│
├── Routes/
│   ├── AppRouter.jsx
│   └── ProtectedRoute.jsx
│
├── flows/
│   ├── Consumer Flows
│   └── Merchant Flows
│
├── screens/
│   ├── ConsumerHome.jsx
│   └── MerchantHome.jsx
│
├── services/
│   ├── userService.js
│   └── paymentApiService.js
│
└── Utils/
└── Session.js

### 🔷 Routing Diagram (React Router v6)/register

/login

/consumer
/pay
/processing/:paymentId
/confirm/:paymentId

/merchant
/merchant/status
/live
/refund
/identity
/admin
/merchant/confirm/:paymentId

/register
/login

/consumer
/pay
/processing/:paymentId
/confirm/:paymentId

/merchant
/merchant/status
/live
/refund
/identity
/admin
/merchant/confirm/:paymentId

### 🔷 Flow Diagram (Consumer → Merchant)

Consumer:
Register → Login → Home → Pay → Processing → Confirm

Merchant:
Dashboard → Live Payments → Confirm Payment → Status

## 🧪 How to Run HoloTap Locally

Follow these steps to run the HoloTap prototype on your machine.

### 1️⃣ Clone the Repository

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Start the Development Server

npm run dev

This launches Vite and provides a local development URL, typically:

<http://localhost:5173>

### 4️⃣ Optional: Build for Production

npm run build

This generates an optimised production bundle in the `dist/` directory.

### 5️⃣ Optional: Preview the Production Build

npm run preview

This simulates how the app will run once deployed.

---

### ✔ Requirements

- Node.js 18+  
- npm 9+  
- Modern browser (Chrome, Edge, Firefox, Safari)

---

### ✔ Notes

- The backend API is currently mocked or planned for future integration.  
- All routing is handled client‑side using React Router v6.  
- The project is structured for easy extension into a full payment ecosystem.

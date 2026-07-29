
Fast, secure QR payments built for scale 🚀
HoloTap — Scan‑to‑Pay for the Next Digital Economy
HoloTap is a dual‑version QR‑code payment platform built for both everyday mobile users and large multi‑tenant organisations.

The mobile version delivers fast, secure, frictionless micro‑transactions for customers and travellers in everyday environments.

The enterprise version powers high‑volume QR‑payments for businesses, kiosks, airports, ticket terminals, and duty‑free retail — speeding up foot‑traffic flow and reducing queue times. Each QR‑code is wired to use a holographic security overlay applied on top of a standard QR‑template, providing tamper‑resistance and visual verification for both mobile users and organisations.

HoloTap blends holographic QR logic with a modular architecture, paving the way for future digital‑asset payments.

🌍 Vision
To deliver a secure, modern QR‑payment system that evolves naturally into the next era of digital value — including NFTs, BRICS‑aligned digital currencies, and emerging asset‑to‑asset (A2A) payment systems.

🚀 Core Features
Lightweight mobile QR‑payments (mobile version)

Full multi‑tenant QR‑payment platform (enterprise version)

Secure token‑based activation + session flow

Identity layer for merchants and organisations

Mobile‑first user experience for fast QR scanning

Modular React components, CSS tokens & font system

Open‑source and contributor‑friendly

Future integration with NFTs & BRICS‑aligned digital currencies

🧩 Architecture Overview
Mobile Users — Mobile Version
A lightweight QR → Activation → Session → Payment flow designed for speed and simplicity.
Optimised for customers, travellers, and everyday micro‑transactions.

Org‑Users (Multi‑Tenant) — Enterprise Version
Organisation dashboards, identity verification, passkey login, payment history, QR‑fleet management, and tenant‑level configuration.
Designed for high‑volume environments such as airports, kiosks, ticket terminals, and duty‑free shopping.

Shared Entry Point
Both versions begin with the same QR‑code scan, then diverge into separate identity and session pipelines.

Server Layer
A secure TypeScript API foundation handling identity, session integrity, verification loops, and multi‑tenant routing.

🔐 Security Policies
HoloTap follows a strict security posture designed for both open‑source transparency and enterprise‑grade protection.

Security Principles
Zero‑trust identity flows

Encrypted A2A payloads (planned)

Holographic QR tamper‑resistance

Session integrity enforcement

Multi‑tenant isolation

Secure token‑based activation

Continuous CodeQL scanning

Dependabot monitoring

Reporting Security Issues
Security vulnerabilities can be reported privately via:

GitHub Security Advisories

Direct organisational contact (enterprise customers)

All reports are handled confidentially and responsibly.

🧑‍💼 Founder’s Comment — HoloTap Repository Update
The repo is finally behaving like a real product. Clean structure, stable flows, modernised routing, and a mobile pipeline that reflects the architecture I’ve been building toward. Every rewrite — diagnostics, explore, home, tabs, live payments, payment result, profile — pushes HoloTap closer to the deterministic fintech system it’s meant to be.

This is the part of engineering most people never see: fighting complicated solutions with logical outcomes, removing noise, and enforcing a single architectural standard across every screen, every flow, every commit.

One engineer. One direction. One standard. Momentum continues.

📄 Licensing
HoloTap is offered under a dual‑licensing model to support both free mobile usage and commercial enterprise deployment.

🔓 Open‑Source Licence — AGPL‑3.0 (Mobile Version)
The mobile version of HoloTap is free for all users and can be downloaded on any mobile device through app stores.

This version is released under the AGPL‑3.0 licence, which allows:

free use on any mobile device

free modification and deployment

open collaboration and contributions

academic and organisational experimentation

AGPL‑3.0 requires that any modified version deployed publicly — including server‑side changes — must also be released under AGPL‑3.0.
This keeps the core mobile QR‑payment flow open, transparent, and community‑driven.

💼 Commercial Licence — Enterprise Multi‑Tenant Version
The enterprise version of HoloTap is available under a commercial licence for organisations that require advanced features, closed‑source deployments, and high‑volume QR‑payment infrastructure.

The commercial licence unlocks:

closed‑source rights (no AGPL obligations)

private multi‑tenant identity + passkey login

branded QR‑codes and QR‑fleet management

organisation dashboards, analytics, and reporting

high‑volume payment routing for kiosks, airports, terminals, and duty‑free retail

compliance features and audit logs

SLA uptime guarantees

priority support

optional hosted SaaS version

This version is designed for:

airports

duty‑free shopping

ticket terminals

kiosks

venues

festivals

enterprise organisations

🏢 Licensing Tiers
Starter — small venues, independent kiosks

Professional — mid‑size organisations

Enterprise — airports, terminals, duty‑free, high‑volume retail

Each tier includes different levels of identity, analytics, QR‑fleet management, and support.

📬 Commercial Licensing Contact
Organisations interested in the enterprise version can request commercial licensing details via GitHub Issues or direct contact.

🛠️ Tech Stack
React + Vite

HTML5 / CSS3 / JavaScript

TypeScript (in progress)

Node.js (planned)

GitHub Pages (for live preview)

🎨 Design Philosophy
HoloTap focuses on clarity, modularity, and security. Every component is built to be reusable, auditable, and easy to extend — whether for simple QR payments or advanced digital‑asset flows.

🤝 Contributing
We welcome contributions of all kinds — from code improvements and feature ideas to architecture discussions and documentation.

Ways to help:

Fork the repo and submit a PR

Suggest features via GitHub Issues

Join the conversation and help shape HoloTap’s evolution

Raymond — this README is now clean, enterprise‑grade, security‑aligned, and fully free of creator/mascot language.

If you want, I can also generate:

a SECURITY.md

a CODE_OF_CONDUCT.md

a CONTRIBUTING.md

a v2.0.0 Release page

📘 Project Brief – Drinking Tracker App
🧠 Overview
You are building a mobile hydration tracking app using React Native. The app helps users log their daily water intake, visualize progress toward a daily goal, review their hydration history, and optionally receive reminders to drink water. It is designed to be offline-first, simple, and fast.

The product is aimed at users who want to build a water-drinking habit and track their consistency. There’s no login or cloud sync — all data is stored locally.

🧩 Core Features
Daily Water Logging
Users input the amount of water they drink (in milliliters).

Daily Progress Visualization
A progress bar shows how close they are to meeting their hydration goal.

Weekly/Monthly History
Users can review their hydration logs over time to see trends.

Customizable Reminders
Local notifications remind users to drink water at default or custom times.

Adjustable Hydration Goal
Users can set or change their daily intake goal (default is 2000ml).

Streaks & Badges (Optional)
Users earn visual rewards for consistent daily logging.

📐 Architecture & Tech
Framework: React Native (iOS prioritized)

Architecture: Clean Architecture with feature-based folder organization

State Management: Zustand (or similar local store)

Storage: Local-only (AsyncStorage/MMKV)

Notifications: Local notifications (no background services)

UI Components: Modular and reusable

No Backend: Offline-first design, no authentication or cloud sync

Accessibility: Follows mobile accessibility best practices

Units: Milliliters only

Dark Mode: Not supported at launch

🗂 Folder Structure (No src/ prefix)
pgsql
Copy
Edit
app/ → Entry point, routes, providers
assets/ → Static files (e.g., icons, fonts)
components/ → Shared UI components
config/ → Environment constants
features/ → Modular feature folders
hooks/ → Shared React hooks
lib/ → Integrations (e.g., notifications)
stores/ → State management (hydration, logging, etc.)
testing/ → Unit and integration test utilities
types/ → Shared TypeScript interfaces
utils/ → Reusable utility functions (e.g., storage wrapper)
✅ Development Guidelines
Implement features one task at a time, based on the task checklist.

Follow Clean Architecture: logic belongs in stores, UI in components, screens in app/routes, etc.

Keep everything modular, composable, and testable.

Optimize for fast performance and low overhead (e.g., <300ms logging updates, <1.5s launch time).

Assume only local device capabilities — no external APIs or services unless explicitly stated.

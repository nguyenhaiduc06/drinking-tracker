# 🧠 Implementation Task List – Drinking Tracker App

## 🏗 Setup & Foundation

- [x] **Initialize hydration goal state management**
  - Description: Create a Zustand store for storing and updating the user’s daily hydration goal (default 2000ml).
  - Priority: High
  - Feature: Adjustable Hydration Goal
  - Dependencies: None
  - Estimated Effort: Small
  - Target Folder: `stores/hydrationGoalStore.ts`

- [x] **Initialize water log state and local persistence**
  - Description: Create store logic to manage daily water entries and persist them locally.
  - Priority: High
  - Feature: Daily Water Logging
  - Dependencies: hydration goal store
  - Estimated Effort: Medium
  - Target Folder: `stores/waterLogStore.ts`

- [x] **Create storage utility for local data (hydration goal, logs, reminders)**
  - Description: Wrapper around AsyncStorage or MMKV for storing and retrieving app data.
  - Priority: High
  - Feature: All
  - Dependencies: Zustand stores
  - Estimated Effort: Medium
  - Target Folder: `utils/storage.ts`

## 💧 Daily Logging & Progress

- [x] **Build `WaterLogInput` component**
  - Description: UI component to let users input how much water they just drank.
  - Priority: High
  - Feature: Daily Water Logging
  - Dependencies: waterLogStore
  - Estimated Effort: Small
  - Target Folder: `components/WaterLogInput.tsx`

- [x] **Build `DailyProgressBar` component**
  - Description: Shows user’s current progress toward daily goal as a percentage.
  - Priority: High
  - Feature: Daily Progress Visualization
  - Dependencies: hydrationGoalStore, waterLogStore
  - Estimated Effort: Small
  - Target Folder: `components/DailyProgressBar.tsx`

- [x] **Create daily logging screen**
  - Description: Main screen that shows WaterLogInput and DailyProgressBar.
  - Priority: High
  - Feature: Daily Water Logging
  - Dependencies: UI components
  - Estimated Effort: Medium
  - Target Folder: `app/routes/home.tsx`

- [x] **Refactor home screen to new layout**
  - Description: Implement new home screen layout with header navigation, character silhouette, and plus button modal.
  - Priority: High
  - Feature: Daily Water Logging
  - Dependencies: Existing components
  - Estimated Effort: Medium
  - Target Folder: `app/index.tsx`, `components/CharacterSilhouette.tsx`, `components/WaterLogModal.tsx`

- [x] **Add full-screen water progress view**
  - Description: Create a full-screen water progress view that fills from bottom to top based on progress, using brand color #0079F1.
  - Priority: High
  - Feature: Daily Progress Visualization
  - Dependencies: WaterLogStore, HydrationGoalStore
  - Estimated Effort: Medium
  - Target Folder: `components/WaterProgressView.tsx`, `app/index.tsx`

- [x] **Create color configuration**
  - Description: Create a centralized color configuration file with brand colors and UI color palette for consistent usage throughout the app.
  - Priority: Medium
  - Feature: UI/UX Consistency
  - Dependencies: None
  - Estimated Effort: Small
  - Target Folder: `config/colors.ts`

## 📊 History & Trends

- [x] **Extend store to compute weekly/monthly aggregates**
  - Description: Add logic to waterLogStore to summarize logs by week/month.
  - Priority: High
  - Feature: Weekly/Monthly History View
  - Dependencies: Existing log structure
  - Estimated Effort: Medium
  - Target Folder: `stores/waterLogStore.ts`

- [x] **Create `HistoryChart` component**
  - Description: Renders charts or lists for hydration history (weekly/monthly).
  - Priority: High
  - Feature: Weekly/Monthly History View
  - Dependencies: Aggregated data from store
  - Estimated Effort: Medium
  - Target Folder: `components/HistoryChart.tsx`

- [x] **Build history screen with toggle for weekly/monthly**
  - Description: Page for users to explore their past hydration logs.
  - Priority: High
  - Feature: Weekly/Monthly History View
  - Dependencies: Chart component
  - Estimated Effort: Medium
  - Target Folder: `app/routes/history.tsx`

## ⏰ Reminders

- [x] **Create `ReminderScheduler` logic module**
  - Description: Handles setup, update, and cancelation of local notifications.
  - Priority: High
  - Feature: Customizable Reminders
  - Dependencies: Notification API
  - Estimated Effort: Medium
  - Target Folder: `lib/notifications.ts`

- [x] **Create default reminder schedule on first launch**
  - Description: Schedule reminders every 2 hours unless user customizes it.
  - Priority: High
  - Feature: Reminders (Default Behavior)
  - Dependencies: ReminderScheduler
  - Estimated Effort: Small
  - Target Folder: `app/provider.tsx`

- [x] **Build custom reminder settings UI**
  - Description: Screen allowing users to add/edit/delete reminder times.
  - Priority: High
  - Feature: Customizable Reminders
  - Dependencies: ReminderScheduler
  - Estimated Effort: Medium
  - Target Folder: `features/reminders`

## ⚙️ Settings

- [x] **Create `HydrationGoalInput` component**
  - Description: Input to allow user to adjust their daily water goal (in ml).
  - Priority: High
  - Feature: Adjustable Hydration Goal
  - Dependencies: hydrationGoalStore
  - Estimated Effort: Small
  - Target Folder: `components/HydrationGoalInput.tsx`

- [x] **Build settings screen**
  - Description: Screen for managing hydration goal and notifications.
  - Priority: High
  - Feature: Adjustable Hydration Goal, Reminders
  - Dependencies: `HydrationGoalInput`, reminder logic
  - Estimated Effort: Medium
  - Target Folder: `app/routes/settings.tsx`

## 🏅 Streaks & Badges (Nice-to-Have)

- [ ] **Add `streak` and `badge` logic to store**
  - Description: Track consecutive logging days and badge milestones.
  - Priority: Low
  - Feature: Streaks & Badges
  - Dependencies: waterLogStore
  - Estimated Effort: Medium
  - Target Folder: `features/gamification`

- [ ] **Create `BadgeDisplay` component**
  - Description: Display visual badges/streaks earned by the user.
  - Priority: Low
  - Feature: Streaks & Badges
  - Dependencies: Streak logic
  - Estimated Effort: Small
  - Target Folder: `components/BadgeDisplay.tsx`

- [ ] **Integrate badges into home screen**
  - Description: Show current streak or latest badge earned.
  - Priority: Low
  - Feature: Streaks & Badges
  - Dependencies: BadgeDisplay component
  - Estimated Effort: Small
  - Target Folder: `app/routes/home.tsx`

## 🧪 Testing & Finalization

- [ ] **Write unit tests for all stores**
  - Description: Validate business logic for hydration goal, logs, streaks, and reminders.
  - Priority: High
  - Feature: All
  - Dependencies: All store modules
  - Estimated Effort: Medium
  - Target Folder: `testing/`

- [ ] **Add smoke tests for screens**
  - Description: Ensure all major screens mount and render basic content.
  - Priority: High
  - Feature: All
  - Dependencies: App routes
  - Estimated Effort: Medium
  - Target Folder: `testing/`

- [ ] **Accessibility checks**
  - Description: Ensure components are screen-reader friendly and follow touch guidelines.
  - Priority: Medium
  - Feature: All
  - Dependencies: All UI components
  - Estimated Effort: Medium
  - Target Folder: Cross-cutting

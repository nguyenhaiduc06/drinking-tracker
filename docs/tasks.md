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

- [x] **Integrate Ionicons for iconography**
  - Description: Set up @expo/vector-icons with Ionicons for consistent icon usage throughout the app.
  - Priority: Medium
  - Feature: UI/UX Consistency
  - Dependencies: @expo/vector-icons
  - Estimated Effort: Small
  - Target Folder: `config/icons.ts`

- [x] **Integrate Quicksand font family**
  - Description: Set up custom Quicksand font family for branding and consistent typography throughout the app.
  - Priority: Medium
  - Feature: UI/UX Consistency
  - Dependencies: expo-font, Quicksand font files
  - Estimated Effort: Small
  - Target Folder: `config/fonts.ts`, `app/_layout.tsx`

- [x] **Clean up unused font files**
  - Description: Remove Satoshi font files since Quicksand is used for the entire app.
  - Priority: Low
  - Feature: Code Cleanup
  - Dependencies: None
  - Estimated Effort: Small
  - Target Folder: `assets/fonts/`

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

- [x] **Update home screen with navigation buttons**
  - Description: Add icon buttons to top left (history) and top right (settings) for easy navigation.
  - Priority: High
  - Feature: Navigation & UX
  - Dependencies: Existing home screen
  - Estimated Effort: Small
  - Target Folder: `app/index.tsx`

- [x] **Restructure settings screen with organized list**
  - Description: Display a clean list of setting items, each opening a dedicated screen for that setting.
  - Priority: High
  - Feature: Settings & Navigation
  - Dependencies: Settings screen
  - Estimated Effort: Medium
  - Target Folder: `app/settings.tsx`

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

## 🎨 UI/UX Design System

- [x] **Create UI/UX context document**
  - Description: Define cute, young, and energetic design language with color palette, typography, and component guidelines.
  - Priority: High
  - Feature: Design System
  - Dependencies: None
  - Estimated Effort: Medium
  - Target Folder: `docs/uiuxContext.md`

- [x] **Update color palette to cute & energetic theme**
  - Description: Replace current blue theme with pink/mint/yellow palette for cute and energetic feel.
  - Priority: High
  - Feature: Visual Design
  - Dependencies: UI/UX context
  - Estimated Effort: Small
  - Target Folder: `config/colors.ts`

- [x] **Update settings screen with new UI/UX design**
  - Description: Apply cute design principles to settings screen with rounded corners, soft shadows, gradient backgrounds, and friendly messaging.
  - Priority: High
  - Feature: Visual Design
  - Dependencies: Color palette
  - Estimated Effort: Medium
  - Target Folder: `app/settings.tsx`

- [x] **Implement new typography scale**
  - Description: Update typography system with proper font weights and sizes for cute & energetic feel.
  - Priority: High
  - Feature: Visual Design
  - Dependencies: UI/UX context
  - Estimated Effort: Small
  - Target Folder: `config/fonts.ts`

- [ ] **Update component styling with rounded corners and soft shadows**
  - Description: Apply cute design principles to all components with rounded corners, soft shadows, and friendly styling.
  - Priority: High
  - Feature: Visual Design
  - Dependencies: Color palette, typography
  - Estimated Effort: Medium
  - Target Folder: `components/`

- [ ] **Add gradient backgrounds to key elements**
  - Description: Implement gradient backgrounds for buttons, cards, and hero elements using the new color palette.
  - Priority: Medium
  - Feature: Visual Design
  - Dependencies: Color palette
  - Estimated Effort: Small
  - Target Folder: `components/`

- [ ] **Implement bouncy button animations**
  - Description: Add delightful micro-interactions with bouncy easing curves for button presses and interactions.
  - Priority: Medium
  - Feature: Micro-interactions
  - Dependencies: Component styling
  - Estimated Effort: Small
  - Target Folder: `components/`

- [x] **Update content messaging to friendly tone**
  - Description: Replace all text content with encouraging, friendly language and strategic emoji usage.
  - Priority: Medium
  - Feature: Content & Messaging
  - Dependencies: UI/UX context
  - Estimated Effort: Medium
  - Target Folder: All screens

- [ ] **Add success celebrations and confetti effects**
  - Description: Implement delightful success animations and confetti effects for achievements and goal completions.
  - Priority: Low
  - Feature: Micro-interactions
  - Dependencies: Animation system
  - Estimated Effort: Medium
  - Target Folder: `components/`

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

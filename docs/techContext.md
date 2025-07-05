# 🛠 techContext.md

This document outlines the default technical environment, tools, and architectural constraints used in this project.

---

## 📦 Technologies and Frameworks

- **React Native** with [Expo](https://expo.dev/) (Managed Workflow)
- **TypeScript** for type safety
- **Zustand** for global state management
- **AsyncStorage** for local data persistence
- **Expo Router** for routing and navigation
- **Jest** and **React Native Testing Library** for unit and component testing
- **NativeWind** for styling
- **Expo Font** for custom font loading
- **@expo/vector-icons** (Ionicons) for iconography

---

## ⚙️ Development Setup

- Expo CLI with Managed Workflow
- TypeScript configured with strict mode
- Prettier and ESLint for consistent code formatting
- Metro bundler (default with Expo)
- Git for version control
- VSCode recommended as default IDE
- Use `npx expo install` to add libraries and dependencies

---

## 🧱 Architectural Principles

- **Clean Architecture** with feature-based modular layout
- Clear separation between:
  - State (stores)
  - UI (components)
  - Business logic (features/hooks/utils)
- Components follow atomic design where possible
- Logic and UI are decoupled for testability and reusability
- Each feature is self-contained in its own folder under `features/`

---

## 📂 Folder Structure

app/ → App entry point, Expo Router pages, and providers
assets/ → Static files (e.g., images, fonts)
components/ → Shared UI components
config/ → Global configuration and constants
features/ → Feature modules (e.g., hydration, reminders)
hooks/ → Shared React hooks
lib/ → Custom libraries or API wrappers
stores/ → Global state (Zustand)
testing/ → Testing utilities and mocks
types/ → Global TypeScript interfaces and types
utils/ → Pure utility functions

---

## 🌐 Data & Persistence

- The app is **offline-first** by default
- Use `AsyncStorage` for local persistence
- Do not assume any backend or cloud sync unless explicitly specified
- No user login or authentication by default

---

## ⛔ Technical Constraints

- No backend services unless specified
- No login/authentication unless requested
- No Redux or heavy state managers unless needed
- Avoid third-party libraries unless functionality is clearly required
- No custom native modules unless explicitly specified
- Install all libraries using `npx expo install`
- Keep implementation modular and minimal

---

## 📎 Default Dependencies

| Purpose          | Tool/Library                      |
| ---------------- | --------------------------------- |
| State Management | Zustand                           |
| Routing          | Expo Router                       |
| Storage          | AsyncStorage                      |
| Forms            | Native inputs + useState          |
| Styling          | StyleSheet or Tailwind (optional) |
| Icons            | @expo/vector-icons (Ionicons)     |
| Fonts            | Expo Font (Quicksand font family) |
| Testing          | Jest + Testing Library            |

---

## 🧪 Testing Strategy

- Use `jest` for unit tests and `@testing-library/react-native` for UI tests
- Prefer testing logic in isolation
- Keep feature-level logic testable outside of UI

---

## ✅ Assumptions

This document represents the **default tech setup**.  
If the product spec overrides any of the above (e.g., needs Firebase, Supabase, or login), this document should be updated accordingly.

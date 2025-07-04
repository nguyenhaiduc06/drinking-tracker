import { create } from 'zustand';

export interface HydrationGoalState {
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
  resetToDefault: () => void;
}

const DEFAULT_DAILY_GOAL = 2000; // ml

export const useHydrationGoalStore = create<HydrationGoalState>((set) => ({
  dailyGoal: DEFAULT_DAILY_GOAL,
  setDailyGoal: (goal: number) => set({ dailyGoal: goal }),
  resetToDefault: () => set({ dailyGoal: DEFAULT_DAILY_GOAL }),
}));

import React, { createContext, ReactNode, useContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

export interface Habit {
  id: number;
  title: string;
  icon: string;
  target: number;
  streak: number;
  history: string[];
}

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Partial<Habit>) => void;
  updateHabit: (id: number, updatedFields: Partial<Habit>) => void;
  deleteHabit: (id: number) => void;
  resetHabit: (id: number) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("trackedHabits", []);

  const addHabit = (habit: Partial<Habit>) => {
    const id = habit.id ?? Date.now();
    setHabits((prev) => [
      ...prev,
      { ...habit, id, history: [], streak: 0 } as Habit,
    ]);
  };

  const updateHabit = (id: number, updatedFields: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, ...updatedFields } : habit
      )
    );
  };

  const deleteHabit = (id: number) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const resetHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, streak: 0, history: [] } : habit
      )
    );
  };

  return (
    <HabitContext.Provider
      value={{ habits, addHabit, updateHabit, deleteHabit, resetHabit }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (!context)
    throw new Error("useHabits must be used within a HabitProvider");
  return context;
};

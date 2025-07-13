import { createContext, useContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useLocalStorage("trackedHabits", []);

  const addHabit = (habit) => {
    const newHabit = {
      ...habit,
      id: Date.now(),
      history: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const removeHabit = (habitId) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  const updateHabit = (habitId, updatedData) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, ...updatedData } : h))
    );
  };

  return (
    <HabitContext.Provider
      value={{ habits, setHabits, addHabit, removeHabit, updateHabit }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};

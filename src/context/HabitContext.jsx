import { createContext, useContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useLocalStorage("trackedHabits", []);

  const addHabit = (habit) => {
    const id = habit.id ?? Date.now(); // unique id
    setHabits((prev) => [...prev, { ...habit, id }]);
  };

  const updateHabit = (id, updatedFields) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, ...updatedFields } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const resetHabit = (id) => {
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

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context)
    throw new Error("useHabits must be used within a HabitProvider");
  return context;
};

import { createContext, useContext, useEffect, useState } from "react";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem("trackedHabits");
    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem("trackedHabits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit) => {
    const newHabit = { id: Date.now(), ...habit };
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const removeHabit = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId)
    );
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, removeHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};

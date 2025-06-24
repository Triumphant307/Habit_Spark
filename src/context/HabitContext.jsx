import { createContext, useContext, useState } from "react";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  const addHabit = (habit) => {
    setHabits((prevHabits) => [...prevHabits, habit]);
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit }}>
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

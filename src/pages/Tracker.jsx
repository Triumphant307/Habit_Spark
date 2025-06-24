import style from "../Styles/Tracker.module.css";
import { useHabits } from "../context/HabitContext";

const Tracker = () => {
  const { habits } = useHabits();

  return (
    <div className="tracker-container">
      <h1>Habit Tracker</h1>
      <ul>
        {habits.map((habit, index) => (
          <li key={index}>
            {habit.icon} {habit.title} - {habit.streak}/{habit.target} days
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracker;

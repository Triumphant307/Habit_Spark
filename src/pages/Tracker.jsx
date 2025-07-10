import style from "../Styles/Tracker.module.css";
import { useHabits } from "../context/HabitContext";

const Tracker = () => {
  const { habits } = useHabits();

  return (
    <>
    {/* <div className="tracker-container">
      <h1>Habit Tracker</h1>
      <ul>
        {habits.map((habit, index) => (
          <li key={index}>
            {habit.icon} {habit.title} - {habit.streak}/{habit.target} days
          </li>
        ))}
      </ul>
    </div>

    <div className="habit-card">
      <div className="habitinfo">
        <span className="habit-icon">{habits.icon}</span>

        <div>
          <h4 className="habit-title">{habits.title}</h4>
          <p className="habit-streak">Streak : {habits.streak} days</p>
        </div>

                {habits.map((habit, index) => (
          <li key={index}>
            {habit.icon} {habit.title} - {habit.streak}/{habit.target} days
          </li>
        ))}
      </div>

      <div className="habit-actions">
        <button className="done-btn">+1</button>
        <button className="reset-btn">Reset</button>
      </div>
    </div> */}



   <div className="tracker-page">
      <h2 className={style.header}>Your Habits</h2>

      {habits.length === 0 ? (
        <p className="text-gray-400">No habits added yet. Go to suggestions to add some!</p>
      ) : (
        <div className="grid gap-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="rounded-lg p-4 bg-[#1e1e1e] shadow-md border border-[#333]"
            >
              <span className="text-2xl">{habit.icon}</span>
              <h3 className="text-lg font-semibold">{habit.title}</h3>
              <p className="text-sm text-gray-400">Target: {habit.target} days</p>
              <p className="text-sm text-gray-500">Streak: {habit.streak}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Tracker;

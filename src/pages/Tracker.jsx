import style from "../Styles/Tracker/Tracker.module.css";
import { AnimatePresence } from "framer-motion";
import TrackerCard from "../components/Tracker/TrackerCard";
import { useHabits } from "../context/HabitContext";

const Tracker = () => {
  const { habits } = useHabits();

  return (
    <section className={style.tracker}>
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
      <h2 className={style.title}>🎯 Your Habits</h2>


    </div>
   <AnimatePresence>
    <TrackerCard 
     habits={habits}
    />
    </AnimatePresence>
    </section>
  );
};

export default Tracker;

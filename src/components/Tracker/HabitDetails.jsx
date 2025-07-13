import React from "react";
import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCheck, FaUndoAlt, FaTrash } from "react-icons/fa";
import style from "../../Styles/Tracker/HabitDetails.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import ProgressTrack from "../ProgressTracker";
import { useHabits } from "../../context/HabitContext";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

const HabitDetails = () => {
  const { id } = useParams();
  const { habits, removeHabit } = useHabits();
  const navigate = useNavigate();

  const [storedHabits, setStoredHabits] = useLocalStorage("trackedHabits", []);

  const habit = storedHabits.find((habit) => habit.id === Number(id));

  const habitId = Number(id);

  if (!habit) {
    return <p className={style.noFound}>Habit not found</p>;
  }

  const progress = Math.round((habit.streak / habit.target) * 100);

  useEffect(() => {
    if (habit.streak >= habit.target) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      toast.success("🎉 Congratulations! You've reached your target!");
    }
  }, [habit.streak, habit.target]);

  const handleDone = () => {
    const today = new Date().toDateString();

    if (habit.history?.includes(today)) {
      toast.info("You've already marked this habit as done today.");
      return;
    }

    if (habit.streak < habit.target) {
      const updated = storedHabits.map((h) =>
        h.id === habitId
          ? {
              ...h,
              streak: h.streak + 1,
              history: [...(h.history || []), today],
            }
          : h
      );

      setStoredHabits(updated);

      toast.success("Streak increased 🔥");
    } else {
      toast.info("🎯 You've already reached your target!");
    }
  };

  const handleReset = () => {
    const updated = storedHabits.map((h) =>
      h.id === habitId ? { ...h, streak: 0, history: [] } : h
    );

    setStoredHabits(updated);

    toast.info("Streak reset to 0. Keep going! 💪");
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this habit?"
    );
    if (!confirmed) return;

    const updated = storedHabits.filter((h) => h.id !== habitId);
    setStoredHabits(updated);
    removeHabit(habitId);
    toast.success("Habit deleted successfully! 🗑️");
    navigate("/tracker");
  };

  return (
    <section className={style.details}>
      <Link to="/tracker" className={style.backBtn} title="Back to Tracker">
        ← Back to Tracker
      </Link>
      <div className={style.card}>
        <span className={style.icon}>{habit.icon}</span>
        <h2 className={style.title}>{habit.title}</h2>
        <p>
          <p>
            <strong>Target:</strong> {habit.target} days
          </p>
          <p>
            <strong>Streak:</strong> {habit.streak} days
          </p>
          <ProgressTrack progress={progress} radius={60} stroke={6} />

          <div className={style.actions}>
            {habit.streak < habit.target && (
              <button onClick={handleDone} title="Done">
                <FaCheck /> Done
              </button>
            )}
            <button onClick={handleReset} title="Reset Streak">
              <FaUndoAlt /> Reset
            </button>
          </div>
          <div className={style.deleteActions}>
            <button className={style.deleteBtn} onClick={handleDelete}>
              <FaTrash /> Delete
            </button>
          </div>
        </p>
      </div>

      <div className={style.history}>
        <h3 className={style.historyTitle}>📆 Habit History</h3>

        <Calendar
          tileContent={({ date }) => {
            const isDone = (habit.history || []).includes(date.toDateString());
            return isDone ? <span style={{ color: "green" }}>•</span> : null;
          }}
          tileClassName={({ date }) =>
            (habit.history || []).includes(date.toDateString())
              ? "highlight"
              : null
          }
        />
      </div>
    </section>
  );
};

export default HabitDetails;

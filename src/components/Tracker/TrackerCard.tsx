import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressTrack from "../ProgressTracker";
import style from "../../Styles/Tracker/TrackerCard.module.css";
import React from "react";

interface Habits {
  id: number;
  title: string;
  icon: string;
  streak: number;
  target: number;
}

interface TrackerCardProps {
  habits: Habits[];
}
const TrackerCard: React.FC<TrackerCardProps> = ({ habits }) => {
  return (
    <>
      <section>
        <div>
          {habits.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={style.emptyState}
            >
              <span className={style.emptyIcon}>📭</span>
              <p className={style.emptyText}>No habits added yet.</p>
              <Link to="/suggestions" className={style.goSuggestBtn}>
                Browse Suggestions
              </Link>
            </motion.div>
          ) : (
            <div className={style.tipCard}>
              {habits.map((habit) => {
                const progress = Math.round(
                  (habit.streak / habit.target) * 100
                );
                return (
                  <Link
                    to={`/habit/${habit.id}`}
                    className={style.cardLink}
                    key={habit.id || habit.title}
                    title="Click for more details"
                  >
                    <motion.div
                      className={style.card}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={style.habitIcon}>{habit.icon}</span>
                      <h3 className={style.habitTitle}>{habit.title}</h3>
                      <p className={style.habitTarget}>
                        Target: {habit.target} days
                      </p>
                      <p className={style.habitStreak}>
                        Streak: {habit.streak}
                      </p>
                      <ProgressTrack
                        radius={50}
                        stroke={5}
                        progress={progress}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrackerCard;

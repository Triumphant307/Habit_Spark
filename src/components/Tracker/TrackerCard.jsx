import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import style from "../../Styles/Tracker/TrackerCard.module.css";
const TrackerCard = ({ habits }) => {
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
              {habits.map((habit) => (
                <Link
                  to={`/habit/${habit.id}`}
                  className={style.cardLink}
                  title="Click for more details"
                >
                  <motion.div
                    key={habit.id}
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
                    <p className={style.habitStreak}>Streak: {habit.streak}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrackerCard;

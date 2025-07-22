import styles from "../Styles/Tracker/Tracker.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import TrackerCard from "../components/Tracker/TrackerCard";
import { useHabits } from "../context/HabitContext";
import Search from "../components/suggestion/Search";
import { useState, useRef } from "react";

const Tracker = () => {
  const { habits } = useHabits();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredHabits = habits.filter((habit) =>
    habit.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resultRef = useRef(null);
  return (
    <section className={styles.tracker}>
      <div className="tracker-page">
        <h2 className={styles.title}>🎯 Your Habits</h2>
      </div>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultRef={resultRef}
      />
      {filteredHabits.length === 0 ? (
        <motion.div
          className={styles.noResults}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span style={{ fontSize: "2rem" }}>📭</span>
          <p>
            {searchQuery
              ? "No habits match your search."
              : "No habits added yet."}
          </p>
          <small>
            {searchQuery
              ? "Try a different keyword."
              : "Browse suggestions to start tracking habits."}
          </small>
          <br />
          <div>
            {searchQuery ? (
              ""
            ) : (
              <Link to="/suggestions" className={styles.goSuggestBtn}>
                Browse Suggestions
              </Link>
            )}
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <TrackerCard habits={filteredHabits} />
        </AnimatePresence>
      )}
    </section>
  );
};

export default Tracker;

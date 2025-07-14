import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useHabits } from "../../context/HabitContext";
import styles from "../../Styles/Suggestion/suggestionCard.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AnimatedTipCard = ({ tip, favorites, setFavorites, viewMode }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const { habits, addHabit, deleteHabit } = useHabits();

  const alreadyAdded = habits.some((h) => h.id === tip.id);

  useEffect(() => {
    const found = habits.some((h) => h.id === tip.id);

    console.log("TIP", found);
    console.log("habits", habits);
  }, [habits, tip.id]);

  const handleAdd = () => {
    const newHabit = { ...tip, target: 30, streak: 0 };

    if (!habits.some((h) => h.id === newHabit.id)) {
      addHabit(newHabit);
    }

    toast.success(
      <span>
        {`${tip.title.trim()} ${tip.icon} added! `}
        <Link
          to="/tracker"
          style={{ color: "#4caf50", textDecoration: "underline" }}
        >
          Go to Tracker
        </Link>
        <button
          style={{
            marginLeft: 10,
            background: "none",
            border: "none",
            color: "#1976d2",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
            fontSize: "inherit",
          }}
          onClick={() => handleUndo(tip.id)}
        >
          Undo
        </button>
      </span>
    );
  };

  const handleUndo = (id) => {
    deleteHabit(id);

    toast.info(`${tip.title.trim()} ${tip.icon} removed!`);
  };

  const toggleFavorite = () => {
    const isFavorite = favorites.includes(tip.id);
    setFavorites((prev) =>
      isFavorite ? prev.filter((id) => id !== tip.id) : [...prev, tip.id]
    );
    toast[isFavorite ? "info" : "success"](
      `${tip.title} ${tip.icon} ${
        isFavorite ? "removed from" : "added to"
      } Favorites!`
    );
  };

  return (
    <motion.div
      ref={ref}
      layout
      key={tip.id}
      className={`${styles.card} ${
        viewMode === "list" ? styles.listView : styles.gridView
      }`}
      style={{ textAlign: "center" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <button className={styles.btnHeart} onClick={toggleFavorite}>
        <FaHeart color={favorites.includes(tip.id) ? "red" : "gray"} />
      </button>

      <span className={styles.icon} style={{ fontSize: "2rem" }}>
        {tip.icon}
      </span>

      <h3>{tip.title}</h3>

      <button
        className={styles.btn}
        onClick={handleAdd}
        disabled={alreadyAdded}
        title={alreadyAdded ? "Already added" : "Add to habits"}
      >
        {alreadyAdded ? "Added ✅" : "Add Habit"}
      </button>
    </motion.div>
  );
};

export default AnimatedTipCard;

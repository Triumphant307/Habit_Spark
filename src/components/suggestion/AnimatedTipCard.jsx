import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import useLocalStorage from "../../Hooks/useLocalStorage";
import styles from "../../Styles/Suggestion/suggestionCard.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AnimatedTipCard = ({
  tip,
  addHabit,
  favorites,
  setFavorites,
  viewMode,
  removeHabit,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const [addedTips, setAddedTips] = useLocalStorage("addedTips", []);

  const alreadyAdded = addedTips.includes(tip.id);

  const handleAdd = () => {
    addHabit({ ...tip, target: 30, streak: 0 });
    setAddedTips([...addedTips, tip.id]);
    toast.success(
      <span>
        {`${tip.title.trim()} ${tip.icon} added to your habits! `}
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
          onClick={() => {
            handleUndo(tip);
          }}
        >
          Undo
        </button>
      </span>
    );
  };

  const toggleFavorite = () => {
    const isFavorite = favorites.includes(tip.id);
    setFavorites((prev) =>
      isFavorite ? prev.filter((id) => id !== tip.id) : [...prev, tip.id]
    );
    if (isFavorite) {
      toast.info(`${tip.title} ${tip.icon} removed from Favorites!`);
    } else {
      toast.success(`${tip.title} ${tip.icon} added to Favorites!`);
    }
  };

  const handleUndo = (habit) => {
    removeHabit(habit.id);
    setAddedTips((prev) => prev.filter((id) => id !== habit.id));
    toast.info(`${tip.title.trim()} ${tip.icon} removed from your habits!`);
  };

  return (
    <motion.div
      ref={ref}
      layout
      key={tip.id}
      className={`${styles.card} ${
        viewMode === "list" ? styles.listView : styles.gridView
      } `}
      style={{ textAlign: "center" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
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
        style={{ display: "block", margin: "0 auto" }}
        title={alreadyAdded ? "Added to your habits" : "Add to habits"}
      >
        {alreadyAdded ? "Added ✅" : "Add Habit"}
      </button>
    </motion.div>
  );
};

export default AnimatedTipCard;

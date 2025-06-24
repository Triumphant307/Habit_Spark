import { useInView } from "react-intersection-observer";
import { useHabits } from "../../context/HabitContext";
import { motion, AnimatePresence } from "framer-motion";
import useLocalStorage from "../../Hooks/useLocalStorage";
import styles from "../../Styles/suggestionCard.module.css";
import { toast } from "react-toastify";
const AnimatedTipCard = ({ tip, addHabit }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const { habits } = useHabits();

  const [addedTips, setAddedTips] = useLocalStorage("addedTips", []);

  const alreadyAdded = addedTips.includes(tip.id);

  const handleAdd = () => {
    addHabit({ ...tip, target: 30, streak: 0 });
    setAddedTips([...addedTips, tip.id]);
    toast.success(`${tip.title} ${tip.icon} added to your habits!`);
  };

  return (
    <motion.div
      ref={ref}
      layout
      key={tip.id}
      className={styles.card}
      style={{ textAlign: "center" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      // transition={{ duration: 0.3 }}
    >
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

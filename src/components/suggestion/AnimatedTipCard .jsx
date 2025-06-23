import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence,  } from "framer-motion";
import styles from '../../Styles/suggestionCard.module.css'
import { toast } from "react-toastify";
const AnimatedTipCard = ({ tip, addHabit }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      layout
      key={tip.id}
      className={styles.card}
      style={{ textAlign: 'center' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      // transition={{ duration: 0.3 }}
    >
      <span className={styles.icon} style={{ fontSize: '2rem' }}>{tip.icon}</span>
      <h3>{tip.title}</h3>
      <button
        className={styles.btn}
        onClick={() => {
          addHabit({ ...tip, target: 30, streak: 0 });
          toast.success(`${tip.title} ${tip.icon} added to your habits!`);
        }}
        style={{ display: 'block', margin: '0 auto' }}
      >
        Add Habit
      </button>
    </motion.div>
  );
};

export default AnimatedTipCard
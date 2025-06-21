import { useEffect, useState } from "react";
import { useHabits } from "../../context/HabitContext";
import { motion, AnimatePresence } from "framer-motion";
import { getTipsByCategory } from "../../utils/getTipsByCatergory";
import tips from '../../data/tips.json'
import styles from '../../Styles/suggestionCard.module.css' 
import useLocalStorage from "../../Hooks/useLocalStorage";
import { toast } from "react-toastify";
import Aos from 'aos'


const SuggestionCard = () => {

  const { addHabit } = useHabits()





  useEffect(() => {
    Aos.init({ duration: 1000})
  }, [])

   const [filter, setFilter]  = useLocalStorage("habitFilter", "All")

    const categories = ['All', 'Health', 'Wellness', 'Learning', 'Productivity']

  const filteredTips = getTipsByCategory(filter)

  return (
          <>
          <div className={styles.filterButtons}>
              {categories.map(catergory => (
                <button
                 type="button"
                 onClick={() => setFilter(catergory)}
                 className={filter === catergory ? styles.active: ''}
                >
                  {catergory}
                </button>
              ))}

          </div>

          <div 
      className={styles.tipCard} 
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px', gap: '20px' }}>
        <AnimatePresence>
        {filteredTips.map((tip, index) => (
          <motion.div 
            key= {tip.id}
            layout
          //  key={index}
           className={styles.card} 
           style={{ textAlign: 'center' }} 
           data-aos="fade-up"  
           data-aos-easing="ease-in-out-back" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.icon} style={{ fontSize: '2rem' }}>{tip.icon}</span>
            <h3>{tip.title}</h3>
            <button 
              className={styles.btn} 
              onClick={() => {addHabit({ ...tip, target: 30, streak: 0 })
              toast.success(`${tip.title} ${tip.icon} added to your habits!`);
            }}
              style={{ display: 'block', margin: '0 auto' }}
            >Add Habit</button>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
      
          </>

  )
}

export default SuggestionCard
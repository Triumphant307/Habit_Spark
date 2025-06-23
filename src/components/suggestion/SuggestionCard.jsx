import { useEffect, useRef, useState } from "react";
import { useHabits } from "../../context/HabitContext";
import { motion, AnimatePresence,  } from "framer-motion";
import { getTipsByCategory } from "../../utils/getTipsByCatergory";
import tips from '../../data/tips.json'
import styles from '../../Styles/suggestionCard.module.css' 
import AnimatedTipCard from "./AnimatedTipCard.jsx";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { toast } from "react-toastify";



const SuggestionCard = () => {

  const { addHabit } = useHabits()

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
                 aria-pressed={filter === catergory}
                //  title={filter === catergory}
                >
                  {catergory}
                </button>
              ))}

          </div>

          <div 
      className={styles.tipCard} 
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px', gap: '20px' }}>
        <AnimatePresence >
        {filteredTips.map((tip) => (

      <AnimatedTipCard
      key={`${filter}-${tip.id || tip.title}`} 
       tip={tip}
       addHabit={addHabit}
       />
))}
        </AnimatePresence>
      </div>
      
          </>

  )
}

export default SuggestionCard
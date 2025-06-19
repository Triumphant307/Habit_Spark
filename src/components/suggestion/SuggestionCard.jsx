import { useEffect, useState } from "react";
import { useHabits } from "../../context/HabitContext";
import styles from '../../Styles/suggestionCard.module.css' 
import { toast } from "react-toastify";
import Aos from 'aos'


const SuggestionCard = () => {

  const { addHabit } = useHabits()

 const tips = [
  {icon: '💧', title: 'Drink water regularly', category: 'Health'},
  {icon: '🏃', title: 'Exercise daily', category: 'Health'},
  {icon: '🛌', title: 'Get enough sleep', category: 'Wellness'},
  {icon: '🥗', title: 'Eat healthy meals', category: 'Health'},
  {icon: '🧘', title: 'Practice mindfulness', category: 'Wellness'},
  {icon: '📚', title: 'Read books daily', category: 'Learning'},
  {icon: '📝', title: 'Journal your thoughts', category: 'Wellness'},
  {icon: '🌱', title: 'Learn something new', category: 'Learning'},
  {icon: '🚶', title: 'Take daily walks', category: 'Health'},
  {icon: '🧹', title: 'Declutter your space', category: 'Productivity'},
  {icon: '🎨', title: 'Engage in a hobby', category: 'Wellness'},
 ]



  useEffect(() => {
    Aos.init({ duration: 1000})
  }, [])

   const [filter, setFilter] = useState(() => {
    return localStorage.getItem('habitFilter') || 'All'
   })

   useEffect (() => {
    localStorage.setItem('habitFilter', filter)
   }, [filter])

   const filteredTips = filter === 'All'
    ? tips 
    : tips.filter(tip => tip.category === filter)

    const catergories = ['All', 'Health', 'Wellness', 'Learning', 'Productivity']

  return (
          <>
          <div className={styles.filterButtons}>
              {catergories.map(catergory => (
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
        {filteredTips.map((tip, index) => (
          <div 
           key={index}
           className={styles.card} 
           style={{ textAlign: 'center' }} 
           data-aos="fade-up"  
           data-aos-easing="ease-in-out-back" 
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
          </div>
        ))}
      </div>
          </>

  )
}

export default SuggestionCard
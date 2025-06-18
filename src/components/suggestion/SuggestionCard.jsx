import { useEffect, useState } from "react";
import { useHabits } from "../../context/HabitContext";
import styles from '../../Styles/suggestionCard.module.css' 
import { toast } from "react-toastify";
import Aos from 'aos'


const SuggestionCard = () => {

  const { addHabit } = useHabits()

 const tips = [
  {icon: '💧', title: 'Drink water regularly'},
  {icon: '🏃', title: 'Exercise daily'},
  {icon: '🛌', title: 'Get enough sleep'},
  {icon: '🥗', title: 'Eat healthy meals'},
  {icon: '🧘', title: 'Practice mindfulness'},
  {icon: '📚', title: 'Read books daily'},
  {icon: '📝', title: 'Journal your thoughts'},
  {icon: '🌱', title: 'Learn something new'},
  {icon: '🚶', title: 'Take daily walks'},
  {icon: '🧹', title: 'Declutter your space'},
  {icon: '🎨', title: 'Engage in a hobby'},
 ]



  useEffect(() => {
    Aos.init({ duration: 1000})
  }, [])

 

  return (
          <div 
      className={styles.tipCard} 
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px', gap: '20px' }}>
        {tips.map((tip, index) => (
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
  )
}

export default SuggestionCard
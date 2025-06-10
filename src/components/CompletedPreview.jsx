import styles from '../Styles/CompletedPreview.module.css';
import Aos from "aos";
import { useEffect } from 'react';
import ProgressTrack from './ProgressTracker';

const CompletedPreview = () => {

    const habits = [
        { icon: "🔥", title: "Drink Water", streak: 30, target: 30 },
        { icon: "📚", title: "Read Book", streak: 3, target: 30 },
        { icon: "🏃", title: "Exercise", streak: 5,  target: 30},
    ]

    useEffect(() => {
        Aos.init({ duration: 1000 });
    })


   return (
    <section className={styles.completedPreview}>
      <h2 className={styles.title}>Complete Habits Preview </h2>
      <div className={styles.habits}  data-aos="fade-up" data-aos-delay="200">
        {habits.map((habit, index) => {
          const progress = Math.round((habit.streak / habit.target) * 100);
          return (
            <div key={index} className={styles.habit}>
              <div className={styles.icon}>{habit.icon}</div>
              <h3 className={styles.habitTitle}>{habit.title}</h3>
              <p className={styles.streak}>{habit.streak} days</p>
                <ProgressTrack radius={40} stroke={5} progress={progress} />
            </div>
          );
        })}
      </div>
    </section>
   )
}

export default CompletedPreview;

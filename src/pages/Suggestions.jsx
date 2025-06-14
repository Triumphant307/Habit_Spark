import { useHabits } from "../context/HabitContext";
import styles from '../Styles/Suggestion.module.css';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useState, useEffect, useRef } from "react";
const Suggestions = () => {
  const { addHabit } = useHabits();

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

 const [ title, setTitle ] = useState('');
 const [ icon, setIcon ] = useState('');
 const [ target, setTarget ] = useState(30);
 const  [ error, setError ] = useState('');
  const [ showPicker, setShowPicker ] = useState(false);
  const pickerRef = useRef(null)

    useEffect(() => {
        if( !showPicker){
        setShowPicker(false);
      }
      const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
          setShowPicker(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }

    }, [showPicker])

  const handleEmojiSelect = (emoji) => {
    setIcon(emoji.native); // Set the selected emoji as the icon
    setShowPicker(false);  // Optionally close the picker
  }

  // Handle adding a new habit
  const handleAddHabit = (e) => {
    e.preventDefault();
    // Validate input fields
    // Ensure title, icon, and target are not empty or invalid
    if (title.trim() === '' || icon.trim() === '') {
      setError('Please enter a title and select an icon.');
      return;
    } else if (title.length < 3) {
      setError('Title must be at least 3 characters long.');
      return;
    } else if (icon.length < 1) {
      setError('Please select an icon.');
      return;
    } else if (target < 1) {
      setError('Target must be at least 1.');
      return;
    }
    addHabit({ 
      title, 
      icon,
      target,
      streak: 0
    });



// Reset form fields after adding habit
    setTitle('');
    setIcon('');
    setTarget(30);
    setError('');
    setShowPicker(false);
  }



  return (
    <div className={styles.suggestions} >
      <h1 className={styles.title}>Habit Suggestions</h1>
      <form 
        onSubmit={handleAddHabit}
      >
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle((e.target.value))} 
          placeholder="Habit Title" 
        />
        <div className={styles.pickerContainer}>
          <button 
            className={styles.btn} 
            type="button" 
            onClick={() => setShowPicker((prev) => !prev)} 
          >
            {icon ? `Selected: ${icon}` : 'Show Emoji'}
          </button>
          {showPicker && (
            <div 
            className={styles.pickerWrapper}
            ref={pickerRef}
            >
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </div>

        <input 
          type="number" 
          value={target} 
          onChange={(e) => setTarget(Number(e.target.value))} 
          placeholder="Habit Target" 
        />
        <button 
        className={styles.btn} 
        type="submit" 
        onClick={handleAddHabit}
        >
        Add New Habit</button>
        {error && <div className={styles.error}>{error}</div>}
      </form>

      <div 
      className={styles.tipCard} 
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px', gap: '20px' }}>
        {tips.map((tip, index) => (
          <div key={index} className={styles.card} style={{ textAlign: 'center' }}>
            <span className={styles.icon} style={{ fontSize: '2rem' }}>{tip.icon}</span>
            <h3>{tip.title}</h3>
            <button 
              className={styles.btn} 
              onClick={() => addHabit({ ...tip, target: 30, streak: 0 })}
              style={{ display: 'block', margin: '0 auto' }}
            >Add Habit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
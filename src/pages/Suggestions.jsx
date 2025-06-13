import { useHabits } from "../context/HabitContext";
import styles from '../Styles/Suggestion.module.css';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useState } from "react";
const Suggestions = () => {
  const { addHabit } = useHabits();

 const tips = [
  {icon: '💧', title: 'Drink water regularly'},
  {icon: '🏃', title: 'Exercise daily'},
  {icon: '🛌', title: 'Get enough sleep'},
  {icon: '🥗', title: 'Eat healthy meals'},
  {icon: '🧘', title: 'Practice mindfulness'}
 ]

 const [ title, setTitle ] = useState('');
 const [ icon, setIcon ] = useState('');
 const [ target, setTarget ] = useState(30);
 const  [ error, setError ] = useState('');
  const [ showPicker, setShowPicker ] = useState(false);



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
    <div className={styles.suggestions}>
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
    <div>
      <button type="button" onClick={() => setShowPicker((prev) => !prev)}>
        {icon ? `Selected: ${icon}` : 'Show Emoji'}
      </button>
        {showPicker && (
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        )}
    </div>
        <input 
        type="number" 
        value={target} 
        onChange={(e) => setTarget(Number(e.target.value))} 
        placeholder="Habit Target" 
        />
        <button type="submit" onClick={handleAddHabit}>Add New Habit</button>
        {error && <div className={styles.error}>{error}</div>}
      </form>

      <div className={styles.tipCard}>
        {tips.map((tip, index) => (
          <div key={index} className={styles.card}>
            <span className={styles.icon}>{tip.icon}</span>
            <h3>{tip.title}</h3>
            <button onClick={() => addHabit({ ...tip, target: 30, streak: 0 })}>Add Habit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
import React from 'react'
import { useParams } from 'react-router-dom'
import { useHabits } from '../../context/HabitContext'

const HabitDetails = () => {
const {id } = useParams()
const { habits } = useHabits()

  const habit = habits.find((h) => h.id === id);

  if (!habit) return <p>Habit not found</p>;

  return (
       <div className="p-4">
      <h2>{habit.icon} {habit.title}</h2>
      <p>Target: {habit.target} days</p>
      <p>Current Streak: {habit.streak}</p>

      {/* Later... */}
      {/* - Add a progress circle or bar */}
      {/* - Add a mini-calendar with check marks */}
      {/* - Add a journal/note section */}
    </div>
  )
}

export default HabitDetails
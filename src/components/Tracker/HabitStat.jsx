import React from "react";
import ProgressTrack from "../ProgressTracker";
const HabitStat = ({ habit, progress, style }) => {
  return (
    <div className={style.stats}>
      <p>
        <strong>Target:</strong> {habit.target} days
      </p>
      <p>
        <strong>Streak:</strong> {habit.streak} days
      </p>
      <ProgressTrack progress={progress} radius={60} stroke={6} />
    </div>
  );
};

export default HabitStat;

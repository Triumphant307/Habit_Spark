import ProgressTrack from "../ProgressTracker";

interface styleProps {
  stats?: string;
  style: Record<string, string>;
}

interface Habit {
  target: number;
  streak: number;
}

interface HabitStatProps {
  habit: Habit;
  progress: number;
  style: Record<string, string>;
}

const HabitStat: React.FC<HabitStatProps> = ({ habit, progress, style }) => {
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

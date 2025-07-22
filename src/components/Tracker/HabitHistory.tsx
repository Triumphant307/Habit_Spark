import Calendar from "react-calendar";

interface Habit {
  history: string[];
}

interface HabitHistoryProps {
  habit: Habit;
  style: Record<string, string>;
}
const HabitHistory: React.FC<HabitHistoryProps> = ({ habit, style }) => {
  return (
    <div className={style.history}>
      <h3 className={style.historyTitle}>📆 Habit History</h3>

      <Calendar
        tileContent={({ date }) => {
          const isDone = habit.history.includes(date.toDateString());
          return isDone ? <span style={{ color: "green" }}>•</span> : null;
        }}
        tileClassName={({ date }) =>
          (habit.history || []).includes(date.toDateString())
            ? "highlight"
            : null
        }
      />
    </div>
  );
};

export default HabitHistory;

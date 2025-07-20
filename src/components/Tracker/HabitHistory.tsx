import Calendar from "react-calendar";

type Habit = {
  history : string[]
}

type HabitHistoryProps = {
  habit: Habit,
  style: {[key: string] :string}
}
const HabitHistory = ({ habit, style }: HabitHistoryProps) => {
  return (
    <div className={style.history}>
      <h3 className={style.historyTitle}>📆 Habit History</h3>

      <Calendar
        tileContent={({ date }) => {
          const isDone = (habit.history || []).includes(date.toDateString());
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

import { FaCheck, FaUndoAlt, FaTrash } from "react-icons/fa";
const HabitAction = ({
  habit,
  handleDone,
  handleReset,
  handleDelete,
  style,
}) => {
  return (
    <>
      <div className={style.actions}>
        {habit.streak < habit.target && (
          <button onClick={handleDone} title="Done">
            <FaCheck /> Done
          </button>
        )}
        <button onClick={handleReset} title="Reset Streak">
          <FaUndoAlt /> Reset
        </button>
      </div>
      <div className={style.deleteActions}>
        <button className={style.deleteBtn} onClick={handleDelete}>
          <FaTrash /> Delete
        </button>
      </div>
    </>
  );
};

export default HabitAction;

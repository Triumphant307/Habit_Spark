import { FaCheck, FaUndoAlt, FaTrash, FaEdit } from "react-icons/fa";
const HabitAction = ({
  habit,
  handleDone,
  handleReset,
  handleDeleteClick,
  handleEditClick,
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

        <button
          className={style.editBtn}
          onClick={handleEditClick}
          title="Edit Habit"
        >
          <FaEdit /> Edit
        </button>
      </div>
      <div className={style.deleteActions}>
        <button className={style.deleteBtn} onClick={handleDeleteClick}>
          <FaTrash /> Delete
        </button>
      </div>
    </>
  );
};

export default HabitAction;

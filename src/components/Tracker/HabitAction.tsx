import { FaCheck, FaUndoAlt, FaTrash, FaEdit } from "react-icons/fa";

interface Habit {
  streak: number;
  target: number;
}

interface HabitActionProps {
  habit: Habit;
  handleDone: () => void;
  handleReset: () => void;
  handleDeleteClick: () => void;
  handleEditClick: () => void;
  style: Record<string, string>;
}
const HabitAction: React.FC<HabitActionProps> = ({
  habit,
  handleDone,
  handleReset,
  handleDeleteClick,
  handleEditClick,
  style,
}: HabitActionProps) => {
  return (
    <>
      <div className={style.actions}>
        {habit.streak < habit.target && (
          <button type="button" onClick={handleDone} title="Done">
            <FaCheck /> Done
          </button>
        )}
        <button type="button" onClick={handleReset} title="Reset Streak">
          <FaUndoAlt /> Reset
        </button>

        <button
          type="button"
          className={style.editBtn}
          onClick={handleEditClick}
          title="Edit Habit"
        >
          <FaEdit /> Edit
        </button>
      </div>
      <div className={style.deleteActions}>
        <button
          type="button"
          className={style.deleteBtn}
          onClick={handleDeleteClick}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </>
  );
};

export default HabitAction;

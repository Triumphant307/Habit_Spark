import { useRef, useEffect } from "react";
import styles from "../../Styles/Tracker/DeleteDialog.module.css";

interface DeleteDialogProp  {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteDialog: React.FC<DeleteDialogProp> = ({ isOpen, onClose, onConfirm }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialogRef.current) {
      dialogRef.current.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
    >
      <h2>Delete Habit</h2>
      <p>
        Are you sure you want to delete this habit? This action cannot be
        undone.
      </p>
      <div className={styles.dialogActions}>
        <button
          onClick={onClose}
          className={styles.cancelBtn}
          title="Cancel habit"
        >
          Cancel
        </button>
        <button
          className={styles.deleteBtn}
          onClick={onConfirm}
          title="Delete habit"
        >
          Delete
        </button>
      </div>
    </dialog>
  );
};

export default DeleteDialog;

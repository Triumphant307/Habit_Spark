import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../Styles/Tracker/EditDialog.module.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface Habit {
  title: string;
  target: number;
  icon: string;
}

interface EditDialogProps {
  isOpen: boolean;
  habit: Habit;
  onClose: () => void;
  onSave: (updateHabit: Habit) => void;
}
const EditDialog: React.FC<EditDialogProps> = ({
  isOpen,
  habit,
  onClose,
  onSave,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(1);
  const [icon, setIcon] = useState("");
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && dialogRef?.current) {
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialogRef.current) {
      dialogRef.current.close();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!habit) return;
    setTitle(habit.title);
    setTarget(habit.target);
    setIcon(habit.icon);
  }, [habit]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "" || icon.trim() === "") {
      setError("Please enter a title and select an icon.");
      return;
    } else if (title.length < 3) {
      setError("Title must be at least 3 characters long.");
      return;
    } else if (icon.length < 1) {
      setError("Please select an icon.");
      return;
    } else if (target < 1) {
      setError("Target must be at least 1.");
      return;
    }
    onSave({
      ...habit,
      title,
      target: Number(target),
      icon,
    });
    onClose();
  };

  const handleEmojiSelect = (emoji: { native: string }) => {
    setIcon(emoji.native); // Set the selected emoji as the icon
    setShowPicker(false); // Optionally close the picker
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(e.target.value));
  };

  return (
    <>
      <dialog
        className={styles.EditDialog}
        onClose={onClose}
        onCancel={onClose}
        ref={dialogRef}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <form onSubmit={handleSubmit}>
                <h2>Edit Habit</h2>

                <div className={styles.floatingInput}>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder=" "
                  />
                  <label htmlFor="title">Habit Title</label>
                </div>

                <div className={styles.floatingInput}>
                  <input
                    id="target"
                    type="number"
                    value={target}
                    onChange={handleChange}
                    min={1}
                    required
                    placeholder=" "
                    className={styles.inputs}
                  />
                  <label htmlFor="target">Habit Target:</label>
                </div>

                <label htmlFor="">
                  <div className={styles.pickerContainer}>
                    <button
                      className={styles.btn}
                      type="button"
                      onClick={() => setShowPicker(!showPicker)}
                      title={icon ? `Selected: ${icon}` : "Show Emoji"}
                    >
                      {/* {icon ? `Selected: ${icon}` : "Show Emoji"} */}
                      {icon || "😀 Choose Emoji"}
                    </button>
                    {showPicker && (
                      <div className={styles.pickerWrapper} ref={pickerRef}>
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                      </div>
                    )}
                  </div>
                </label>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.dialogAction}>
                  <button
                    type="button"
                    onClick={onClose}
                    title="Cancel Edit"
                  >
                    Cancel
                  </button>

                  <button type="submit" title="Save Edit">
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
};

export default EditDialog;

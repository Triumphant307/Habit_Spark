import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "../../Styles/Tracker/EditDialog.module.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const EditDialog = ({ isOpen, habit, onClose, onSave }) => {
  const dialogRef = useRef(null);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(1);
  const [icon, setIcon] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

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
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...habit,
      title,
      target: Number(target),
      icon,
    });
    onClose();
  };

  const handleEmojiSelect = (emoji) => {
    setIcon(emoji.native); // Set the selected emoji as the icon
    setShowPicker(false); // Optionally close the picker
  };

  return (
    <>
      <dialog
        className={styles.EditDialog}
        onClose={onClose}
        onCancel={onClose}
        ref={dialogRef}
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
              onChange={(e) => setTarget(e.target.value)}
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

          <div className={styles.dialogAction}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">Save</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default EditDialog;

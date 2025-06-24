import { useEffect, useRef, useState } from "react";
import styles from "../../Styles/SuggestionForm.module.css";
import { useHabits } from "../../context/HabitContext";
import { toast } from "react-toastify";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const SuggestionForm = () => {
  const { addHabit } = useHabits();

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [target, setTarget] = useState(30);
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

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

  const handleEmojiSelect = (emoji) => {
    setIcon(emoji.native); // Set the selected emoji as the icon
    setShowPicker(false); // Optionally close the picker
  };

  const handleAddHabit = (e) => {
    e.preventDefault();
    // Validate input fields
    // Ensure title, icon, and target are not empty or invalid
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
    addHabit({
      title: title.trim(),
      icon,
      target,
      streak: 0,
    });

    toast.dismiss();
    toast.success(`${title.trim()} ${icon} added to your habits!`);

    // Reset form fields after adding habit
    setTitle("");
    setIcon("");
    setTarget(30);
    setError("");
    setShowPicker(false);
  };

  return (
    <form onSubmit={handleAddHabit}>
      <input
        className={styles.TitleInput}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Habit Title"
      />
      <div className={styles.pickerContainer}>
        <button
          className={styles.btn}
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          title={icon ? `Selected: ${icon}` : "Show Emoji"}
        >
          {icon ? `Selected: ${icon}` : "Show Emoji"}
        </button>
        {showPicker && (
          <div className={styles.pickerWrapper} ref={pickerRef}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
      </div>

      <input
        className={styles.TargetInput}
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        placeholder="Habit Target"
      />
      <button
        className={styles.btn}
        type="submit"
        onClick={handleAddHabit}
        title="Add new Habits"
      >
        Add New Habit
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default SuggestionForm;

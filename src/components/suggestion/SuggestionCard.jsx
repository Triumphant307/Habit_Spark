// import { useEffect, useRef, useState } from "react";
import { useHabits } from "../../context/HabitContext";
import { AnimatePresence } from "framer-motion";
import { getTipsByCategory } from "../../utils/getTipsByCatergory";
import Search from "./Search.jsx";
// import tips from '../../data/tips.json'
import styles from "../../Styles/suggestionCard.module.css";
import AnimatedTipCard from "./AnimatedTipCard.jsx";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { useState } from "react";
// import { toast } from "react-toastify";

const SuggestionCard = () => {
  const { addHabit } = useHabits();

  const [filter, setFilter] = useLocalStorage("habitFilter", "All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Health", "Wellness", "Learning", "Productivity"];

  const filteredTips = getTipsByCategory(filter).filter((tip) =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.filterButtons}>
        {categories.map((catergory) => (
          <button
            type="button"
            onClick={() => setFilter(catergory)}
            className={filter === catergory ? styles.active : ""}
            aria-pressed={filter === catergory}
            //  title={filter === catergory}
          >
            {catergory}
          </button>
        ))}
      </div>

      <div
        className={styles.tipCard}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "30px",
          gap: "20px",
        }}
      >
        {filteredTips.length === 0 ? (
          <p> oops No Search Result Was Found</p>
        ) : (
          <AnimatePresence>
            {filteredTips.map((tip) => (
              <AnimatedTipCard
                key={`${filter}-${tip.id || tip.title}`}
                tip={tip}
                addHabit={addHabit}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

export default SuggestionCard;

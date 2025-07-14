import { motion, AnimatePresence } from "framer-motion";
import { getTipsByCategory } from "../../utils/getTipsByCatergory";
import Search from "./Search.jsx";
import styles from "../../Styles/Suggestion/suggestionCard.module.css";
import AnimatedTipCard from "./AnimatedTipCard.jsx";
import { MdGridView, MdViewList } from "react-icons/md";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { useState, useRef } from "react";

const SuggestionCard = () => {


  const [filter, setFilter] = useLocalStorage("habitFilter", "All");
  const [favorites, setFavorites] = useLocalStorage("habitFavorites", []);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useLocalStorage("viewMode", "grid");

  const resultRef = useRef(null);

  const categories = [
    "All",
    "Health",
    "Wellness",
    "Learning",
    "Productivity",
    "Favorites",
  ];

  const filteredTips = getTipsByCategory(filter, favorites).filter((tip) =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toogleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultRef={resultRef}
      />
      <div className={styles.viewToggle}>
        <button
          className={viewMode === "grid" ? styles.active : ""}
          onClick={toogleViewMode}
          aria-label="Grid View"
          title="Toogle grid"
        >
          <MdGridView size={20} />
        </button>
        <button
          className={viewMode === "list" ? styles.active : ""}
          onClick={() => setViewMode("list")}
          aria-label="List View"
          title="Toogle List"
        >
          <MdViewList size={20} />
        </button>
      </div>

      <div className={styles.filterButtons}>
        {categories.map((catergory) => (
          <button
            ref={resultRef}
            key={catergory}
            type="button"
            onClick={() => setFilter(catergory)}
            className={filter === catergory ? styles.active : ""}
            aria-pressed={filter === catergory}
          >
            {catergory === "Favorites"
              ? `❤️ Favorites${
                  favorites.length > 0 ? ` (${favorites.length})` : ""
                }`
              : catergory}
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
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.noResults}
            >
              <span style={{ fontSize: "2rem" }}>
                {filter === "Favorites" ? "⭐" : "🔍"}
              </span>
              <p>
                {filter === "Favorites"
                  ? "No favorites yet"
                  : "No suggestions found"}
              </p>
              <small>
                {filter === "Favorites"
                  ? "Try favoriting a suggestion by clicking the heart icon ❤️"
                  : "Try a different keyword or browse categories above."}
              </small>
            </motion.div>
          </>
        ) : (
          <AnimatePresence>
            {filteredTips.map((tip) => (
              <AnimatedTipCard
                key={`${filter}-${tip.id || tip.title}`}
                tip={tip}
                favorites={favorites}
                setFavorites={setFavorites}
                viewMode={viewMode}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

export default SuggestionCard;

import style from "../../Styles/Suggestion/SearchBar.module.css";
import { useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
const Search = ({ searchQuery, setSearchQuery }) => {
  const handleClear = () => setSearchQuery("");
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <div className={style.searchWrapper}>
      <FaSearch className={style.iconLeft} />
      <input
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        placeholder="Search for a habit..."
        className={style.searchBar}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button onClick={handleClear} className={style.clearButton}>
          <FaTimes title="clear" />
        </button>
      )}
    </div>
  );
};

export default Search;

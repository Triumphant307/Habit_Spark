import style from "../../Styles/Suggestion/SearchBar.module.css";
import React, { useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultRef: React.RefObject<HTMLDivElement | null>;
}
const Search: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
  resultRef,
}) => {
  const handleClear = () => setSearchQuery("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef?.current?.blur();
      resultRef?.current?.scrollIntoView({ behavior: "smooth" });
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

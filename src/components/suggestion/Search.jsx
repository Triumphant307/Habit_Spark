import style from '../../Styles/SearchBar.module.css'
import { FaSearch, FaTimes } from 'react-icons/fa';
const Search = ({ searchQuery, setSearchQuery}) => {

const handleClear = () => setSearchQuery('')

  return (
    <div className={style.searchWrapper}>
        <FaSearch className={style.iconLeft}/>
      <input
       type="text"
       placeholder="Search for a habit..."
       className={style.searchBar}
       value={searchQuery}
       onChange={e => setSearchQuery(e.target.value)}
      />
      {
        searchQuery && (
            <button
             onClick={handleClear}
             className={style.clearButton}
            >
              <FaTimes
               title='clear'
              />      
            </button>
        )
      }
    </div>
  )
}

export default Search
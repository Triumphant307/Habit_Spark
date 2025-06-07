import Style from '../Styles/Header.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef  } from 'react';
const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null)
  const hamburgerRef = useRef(null)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target) 
      
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen])


  return (
    <header className={Style.header}>
        <h1 className={Style.header__title}>HabitSpark</h1>


      <button className={`${Style.hamburger} ${isMenuOpen ? Style.open : ''}`}
              onClick={toggleMenu} 
              aria-label="Toggle Menu"
              ref={hamburgerRef}
              >
          <span className={Style.bar} />
          <span className={Style.bar} />
          <span className={Style.bar} />
      </button>

        <nav  
        className={`${Style.headerNav} ${isMenuOpen ? Style.open : ''}`}
        ref={navRef}>
            <ul className={Style.header__navlist}>
                <li className={Style.header__nav__item}>
                    <Link to="/" className={Style.header__nav__link} onClick={() => setIsMenuOpen(false)}>Home</Link>
                </li>
                <li className={Style.header__nav__item}>
                    <Link to="/suggestions" className={Style.header__nav__link} onClick={() => setIsMenuOpen(false)} >Suggestions</Link>
                </li>
                <li className={Style.header__nav__item}>
                    <Link to="/completed" className={Style.header__nav__link} onClick={() => setIsMenuOpen(false)}>Completed</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;
import Style from "../Styles/Header.module.css";
import ThemeToggle from "../Theme/ThemeToggle.jsx";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll event and change header styl
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Function to toggle the menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside of it
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // This component renders the header with a title and a responsive navigation menu
  return (
    <header
      className={`${Style.header} ${isScrolled ? Style.headerScrolled : ""}`}
    >
      <h1 className={Style.header__title}>HabitSpark</h1>

      <button
        className={`${Style.hamburger} ${isMenuOpen ? Style.open : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        ref={hamburgerRef}
      >
        <span className={Style.bar} />
        <span className={Style.bar} />
        <span className={Style.bar} />
      </button>

      <nav
        className={`${Style.headerNav} ${isMenuOpen ? Style.open : ""}`}
        ref={navRef}
      >
        <ul className={Style.header__navlist}>
          <li className={Style.header__nav__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${Style.header__nav__link} ${isActive ? Style.active : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className={Style.header__nav__item}>
            <NavLink
              to="/suggestions"
              className={({ isActive }) =>
                `${Style.header__nav__link} ${isActive ? Style.active : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Suggestions
            </NavLink>
          </li>
          <li className={Style.header__nav__item}>
            <NavLink
              to="/completed"
              className={({ isActive }) =>
                `${Style.header__nav__link} ${isActive ? Style.active : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Completed
            </NavLink>
          </li>
          <li className={Style.header__nav__item}>
            <NavLink
              to="/tracker"
              className={({ isActive }) =>
                `${Style.header__nav__link} ${isActive ? Style.active : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Tracker
            </NavLink>
          </li>
          <li
            className={Style.header__nav__item}
            onClick={() => setIsMenuOpen(false)}
          >
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

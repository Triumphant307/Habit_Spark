import { FaSun, FaMoon } from "react-icons/fa";
import style from "../Styles/ThemeToggle.module.css";
import useLocalStorage from "../Hooks/useLocalStorage.js";
import {  useEffect } from "react";
const ThemeToggle = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("theme", prefersDark);

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button className={style.themeToggle} onClick={toggleTheme}>
      {isDark ? (
        <FaMoon
          size={24}
          color="#fff"
          className={style.iconTransition}
          style={{ transform: "rotate(-360deg)", opacity: 1 }}
        />
      ) : (
        <FaSun
          size={24}
          color="#facc15"
          className={style.iconTransition}
          style={{ transform: "rotate(360deg)", opacity: 1 }}
        />
      )}
    </button>
  );
};

export default ThemeToggle;

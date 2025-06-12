import { use } from 'react';
import { FaSun, FaMoon } from "react-icons/fa";
import style from '../Styles/ThemeToggle.module.css';
import { useState, useEffect } from 'react';
const ThemeToggle = () => {

      const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  };



    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    })

    useEffect(() => {
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark])

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return(
        <button className={style.themeToggle} onClick={toggleTheme}>
                {isDark ? (
      <FaMoon 
      size={24} 
      color="#fff" 
      className={style.iconTransition}
      style={{ transform: 'rotate(-360deg)', opacity:1 }}
      />
    ) : (
      <FaSun size={24} color="#facc15"
       className={style.iconTransition}
      style={{ transform: 'rotate(360deg)', opacity:1 }}
       />
    )}
        </button>
    )
};

export default ThemeToggle;

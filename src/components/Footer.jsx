import styles from '../Styles/Footer.module.css';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>HabitSpark © 2025</div>

      <ul className={styles.navLinks}>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/suggestions">Suggestions</NavLink></li>
        <li><NavLink to="/completed">Completed</NavLink></li>
        <li><NavLink to="/tracker">Tracker</NavLink></li>
      </ul>

      <div className={styles.socials}>
        <a href="https://github.com/Triumphant307" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a href="https://x.com/UsuangbonT" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com/in/usuangbon-triumphant/" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
      </div>

      <div className={styles.credit}>
        Made with <span className={styles.heart}>❤️</span> by Triumphant_
      </div>
    </footer>
  );
};

export default Footer;

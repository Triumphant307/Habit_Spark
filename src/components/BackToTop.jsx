import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "../Styles/BackToTop.module.css";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {showButton && (
        <button
          className={styles.backToTop}
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default BackToTop;

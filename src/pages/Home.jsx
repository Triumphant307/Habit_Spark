import styles from "../Styles/Home.module.css";
import FeaturesdHighlight from "../components/FeaturedHighlight";
import QuotesMotivation from "../components/QuotesMotivation";
import CompletedPreview from "../components/CompletedPreview";
import LottieAnimation from "../components/LottieAniamtion";
import { FaBullseye, FaDumbbell, FaStar, FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const words = [
    { label: "HabitSpark" },
    { label: "Focus", icon: <FaBullseye style={{ color: "red" }} /> },
    { label: "Productivity", icon: <FaDumbbell style={{ color: "blue" }} /> },
    { label: "Success", icon: <FaStar style={{ color: "gold" }} /> },
    { label: "Goals", icon: <FaFlag style={{ color: "green" }} /> },
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWordComplete, setIsWordComplete] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex].label;
    let typeSpeed = 150;

    const type = () => {
      if (!isDeleting) {
        setTypedText(currentWord.slice(0, typedText.length + 1));
        if (typedText === currentWord) {
          setIsWordComplete(true);
          setTimeout(() => {
            setIsDeleting(true);
            setIsWordComplete(false);
          }, 1000);
        }
      } else {
        const updatedText = currentWord.slice(0, typedText.length - 1);
        setTypedText(updatedText);
        if (updatedText === "") {
          setIsDeleting(false);
          setIsWordComplete(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);

          return;
        }
      }
    };

    const timer = setTimeout(type, typeSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting]);

  return (
    <>
      <section>
        <div className={styles.home}>
          <h1 className={styles.home__title}>
            Welcome to <br />
            <span className={styles.typed}>
              {typedText}
              {isWordComplete && words[currentWordIndex].icon && (
                <span className={styles.icon}>
                  {words[currentWordIndex].icon}
                </span>
              )}
            </span>
            <span className={styles.cursor}>|</span>
          </h1>
          <p className={styles.home__description}>
            Your journey to better habits starts here. Track your progress, get
            suggestions, and celebrate your achievements.
          </p>
          <div className={styles.home__cta}>
            <Link to="/suggestions" className={styles.home__button_link}>
              <button className={styles.home__button}>Get Started</button>
            </Link>
          </div>
        </div>
        <FeaturesdHighlight />

        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Stay Consistent, Stay Motivated</h2>
          <p>Join us in building better habits and achieving your goals.</p>
          <LottieAnimation />
        </div>

        <QuotesMotivation />
        <CompletedPreview />
      </section>
    </>
  );
};

export default Home;

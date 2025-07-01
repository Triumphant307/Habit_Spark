import { useEffect, useState } from "react";
import Aos from "aos";
import styles from "../../Styles/Home/QuotesMotivation.module.css";

const fallBackQuote = [
  { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
  {
    q: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    a: "Winston Churchill",
  },
  {
    q: "The only way to do great work is to love what you do.",
    a: "Steve Jobs",
  },
  {
    q: "Your time is limited, don't waste it living someone else's life.",
    a: "Steve Jobs",
  },
];

const QuotesMotivation = () => {
  const [quote, setQuote] = useState(fallBackQuote[0]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://corsproxy.io/?https://zenquotes.io/api/random"
      );
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.q) {
        setQuote({ q: data[0].q, a: data[0].a });
      } else {
        console.error("Invalid quote format:", data);
        setQuote(fallBackQuote[index]);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote(fallBackQuote[index]);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => {
      fetchQuote();
      setVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    Aos.refresh({ duration: 1000 });
  }, [quote]);

  return (
    <section
      className={styles.QuotesMotivation}
      data-aos="zoom-in"
      data-aos-delay="200"
    >
      <h2 className={styles.title}>💭 Daily Motivational Quote</h2>
      <blockquote
        className={styles.quotes}
        style={{ opacity: visible ? 1 : 0 }}
      >
        "{quote.q}"<footer className={styles.author}>- {quote.a}</footer>
      </blockquote>
    </section>
  );
};

export default QuotesMotivation;

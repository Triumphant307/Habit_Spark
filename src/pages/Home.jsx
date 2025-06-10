import styles from '../Styles/Home.module.css';
import FeaturesdHighlight from '../components/FeaturedHighlight';
import QuotesMotivation from '../components/QuotesMotivation';
import LottieAnimation from '../components/LottieAniamtion';
import { Link } from 'react-router-dom';
import { useEffect , useState } from 'react';

const Home = () => {
    const words = [ 'HabitSpark' , 'Focus🎯' , 'Productivity🏋️‍♀️', 'Success', 'Goals' ];
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [typedText, setTypedText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {
        const currentWord = words[currentWordIndex];
        let typeSpeed = 150

        const type = () => {
            if(!isDeleting){
                setTypedText(currentWord.slice(0 , typedText.length + 1))
                if(typedText === currentWord){
                    setTimeout(() => setIsDeleting(true), 1000)
                }
            } else {
                const updatedText = currentWord.slice(0, typedText.length - 1)
                setTypedText(updatedText)
                if(updatedText === ''){
                    setIsDeleting(false)
                    setCurrentWordIndex((prev) => (prev + 1) % words.length)

                    return

                    
                }
            }
        }

        const timer = setTimeout(type , typeSpeed)
        return () => clearTimeout(timer)

    }, [typedText , isDeleting])



    return (
      <>
        <section>
        <div className={styles.home}>
          <h1 className={styles.home__title}>Welcome to <br /><span className={styles.typed}>{typedText}</span><span className={styles.cursor}>|</span></h1>
          <p className={styles.home__description}>
            Your journey to better habits starts here. Track your progress, get suggestions, and celebrate your achievements.
          </p>
          <div className={styles.home__cta}>
            <Link to="/suggestions" className={styles.home__button_link}><button className={styles.home__button}>Get Started</button></Link>
          </div>
        </div>
          <FeaturesdHighlight />

           <div style={{ textAlign: 'center' , padding: '2rem'}}>
            <h2>Stay Consistent, Stay Motivated</h2>
            <p>Join us in building better habits and achieving your goals.</p>
            <LottieAnimation />
           </div>

          <QuotesMotivation />
      </section>
       
        
      </>

    
    );
}

export default Home;
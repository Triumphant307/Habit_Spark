import styles from '../Styles/FeaturedHighlight.module.css';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import { Link } from 'react-router-dom';
const FeaturesdHighlight = () => {

    const feature = [
        {
           icon: '✅',
            title: 'Track Daily Progress',
            description: 'Easily monitor your daily habits and see how you\'re improving over time.',
            link: '/suggestions'
        },
        {
            icon: '💡',
            title: 'Get Personalized Suggestions',
            description: 'Receive tailored recommendations to help you build better habits.',
            link: '/suggestions'
            
        },
        {
            icon: '📈',
            title: 'View Your Progress',
            description: 'Visualize your achievements with insightful graphs and statistics.',  
            link: '/completed'

        }
    ]

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <section className={styles.festuresSection}>
            <h2 className={styles.featuresTitle}>Features</h2>
            <div className={styles.featuresContainer}>
                {feature.map((item, index) => (
                    <Link to={item.link} className={styles.featureLink}>
                        <div key={index} className={styles.featureCard} data-aos="fade-up">
                        <span className={styles.featureIcon}>{item.icon}</span>
                        <h3 className={styles.featureTitle}>{item.title}</h3>
                        <p className={styles.featureDescription}>{item.description}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default FeaturesdHighlight;
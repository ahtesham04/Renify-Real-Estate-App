import React from 'react'
// import React from 'react'
import Navbar from '../navbar/Navbar'
import styles from './hero.module.css'
import heroImg from '../../assets/hero15.jpeg'
const HeroSection = () => {
  return (
    <div className={styles.hero}>
        <div className={styles.row}>
        <div className={styles.col1}>
          <div className={styles.heroText}>
            <h1>BEST WAY FIND YOUR PLACE OF DREAM</h1>
            <p>Find your home very easily by using our real estate platform. We makes home 
              finding so easy and flexible.Renify to help find the correct tenants find the 
              correct house based on their key requirements.
            </p>
            <button>Get Started</button>
            </div>
          
        </div>
        <div className={styles.col2}><img src={heroImg} alt='hero img' /></div>
        </div>
    </div>
  )
}

export default HeroSection
import React from 'react'
import Navbar from '../navbar/Navbar'
import styles from './hero.module.css'

const hero = () => {
  return (
    <div className={styles.hero}>
        <Navbar />
    </div>
  )
}

export default hero
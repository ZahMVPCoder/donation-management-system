'use client'

import { useState, useEffect } from 'react'
import styles from './splash-screen.module.css'

export default function SplashScreen({ onComplete }) {
  const [showTagline, setShowTagline] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show tagline after 1 second
    const taglineTimer = setTimeout(() => {
      setShowTagline(true)
    }, 1000)

    // Fade out and complete after 4 seconds total
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 3500)

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 4500)

    return () => {
      clearTimeout(taglineTimer)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className={`${styles.splashScreen} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.emoji}>💝</span>
          <h1 className={styles.name}>DonorHQ</h1>
        </div>

        {showTagline && (
          <p className={styles.tagline}>The Place to make a difference.</p>
        )}
      </div>
    </div>
  )
}

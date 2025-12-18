'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './loading-screen.module.css'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleStop = () => setIsLoading(false)

    router.prefetch = ((href) => {
      handleStart()
      return Promise.resolve()
    })

    // Listen for route changes
    const handleRouteChange = () => handleStart()
    const handleRouteChangeComplete = () => handleStop()
    const handleRouteChangeError = () => handleStop()

    // Using setTimeout to detect navigation
    const originalPush = router.push
    router.push = function(href, options) {
      handleStart()
      setTimeout(handleStop, 500)
      return originalPush.call(this, href, options)
    }

    return () => {
      router.push = originalPush
    }
  }, [router])

  if (!isLoading) return null

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  )
}

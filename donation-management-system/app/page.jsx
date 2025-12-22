'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to signup
    router.push('/auth/signup')
  }, [router])

  return (
    <>
      
      <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to DonorHQ</h1>
        <p>The Place to make a difference.</p>
        <div className={styles.buttons}>
          <Link href="/auth/signup" className={styles.primaryBtn}>
            Sign Up
          </Link>
          <Link href="/auth/login" className={styles.secondaryBtn}>
            Log In
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>📊 Dashboard</h3>
            <p>View key metrics and fundraising progress at a glance</p>
          </div>
          <div className={styles.featureCard}>
            <h3>👥 Donor Management</h3>
            <p>Track all donor information and giving history</p>
          </div>
          <div className={styles.featureCard}>
            <h3>💰 Donation Tracking</h3>
            <p>Log and monitor all donations with ease</p>
          </div>
          <div className={styles.featureCard}>
            <h3>🎯 Campaigns</h3>
            <p>Manage fundraising campaigns and track progress</p>
          </div>
          <div className={styles.featureCard}>
            <h3>✅ Task Management</h3>
            <p>Organize follow-ups and thank-you tasks</p>
          </div>
          <div className={styles.featureCard}>
            <h3>📈 Analytics</h3>
            <p>Get insights into your fundraising efforts</p>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

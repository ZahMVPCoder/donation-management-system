'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './dashboard.module.css'

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/dashboard/metrics')
      const data = await res.json()
      if (data.metrics) {
        setMetrics(data.metrics)
        setRecentActivity(data.recentActivity || [])
      }
    } catch (error) {
      console.error('Error fetching metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <h1>Dashboard</h1>
        <p className={styles.loading}>Loading dashboard...</p>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className={styles.container}>
        <h1>Dashboard</h1>
        <p className={styles.error}>Unable to load dashboard data</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p className={styles.subtitle}>Overview of your donation metrics and progress</p>
      </div>

      {/* Primary Metrics Grid */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.cardContent}>
            <h3>Total Raised This Month</h3>
            <p className={styles.metricValue}>
              ${metrics.totalRaised.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className={styles.cardIcon}>💰</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.cardContent}>
            <h3>Monthly Goal</h3>
            <p className={styles.metricValue}>
              ${metrics.monthlyGoal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className={styles.cardIcon}>🎯</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.cardContent}>
            <h3>Goal Progress</h3>
            <p className={styles.metricValue}>{metrics.goalPercentage}%</p>
          </div>
          <div className={styles.cardIcon}>📊</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span>Progress to Monthly Goal</span>
          <span className={styles.progressPercent}>{metrics.goalPercentage}% Complete</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${Math.min(metrics.goalPercentage, 100)}%`,
              backgroundColor: metrics.goalPercentage >= 100 ? '#27AE60' : '#FDB813',
            }}
          />
        </div>
        <div className={styles.progressText}>
          ${metrics.totalRaised.toLocaleString('en-US', { maximumFractionDigits: 0 })} of ${metrics.monthlyGoal.toLocaleString('en-US', { maximumFractionDigits: 0 })} needed
        </div>
      </div>

      {/* Secondary Metrics Grid */}
      <div className={styles.secondaryMetricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.cardContent}>
            <h3>New Donors This Month</h3>
            <p className={styles.metricValue}>{metrics.newDonors}</p>
          </div>
          <div className={styles.cardIcon}>👤</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.cardContent}>
            <h3>Lapsed Donors (90+ days)</h3>
            <p className={styles.metricValue}>{metrics.lapsedDonors}</p>
          </div>
          <div className={styles.cardIcon}>⚠️</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.cardContent}>
            <h3>Average Gift Size</h3>
            <p className={styles.metricValue}>
              ${metrics.averageGift.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className={styles.cardIcon}>💵</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.cardContent}>
            <h3>Total Donations</h3>
            <p className={styles.metricValue}>{metrics.donationCount}</p>
          </div>
          <div className={styles.cardIcon}>📋</div>
        </div>
      </div>

      {/* Recent Activity Section */}
      {recentActivity.length > 0 && (
        <div className={styles.section}>
          <h2>Recent Activity</h2>
          <ul className={styles.activityList}>
            {recentActivity.map((activity) => (
              <li key={activity.id} className={styles.activityItem}>
                <span className={styles.activityIcon}>💝</span>
                <div className={styles.activityContent}>
                  <span className={styles.activityDonor}>
                    <Link href={`/donors/${activity.donorId}`} className={styles.donorLink}>
                      {activity.donorName}
                    </Link>
                  </span>
                  {' donated '}
                  <strong>
                    ${activity.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                  {' to '}
                  <strong>{activity.campaign}</strong>
                </div>
                <span className={styles.activityDate}>
                  {new Date(activity.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Link href="/donations/new" className={styles.actionBtn}>
          + Log Donation
        </Link>
        <Link href="/donors/new" className={styles.actionBtn}>
          + Add Donor
        </Link>
        <Link href="/tasks" className={styles.actionBtn}>
          View Tasks
        </Link>
      </div>
    </div>
  )
}


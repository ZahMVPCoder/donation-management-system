'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { withAuth } from '@/lib/withAuth'
import styles from './campaigns.module.css'

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([])
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [campaignsRes, donationsRes] = await Promise.all([
        fetch('/api/campaigns'),
        fetch('/api/donations?take=5'),
      ])
      const campaignsData = await campaignsRes.json()
      const donationsData = await donationsRes.json()
      setCampaigns(campaignsData.campaigns || [])
      setDonations(donationsData.donations || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className={styles.container}>Loading...</div>

  const totalGoal = campaigns.reduce((sum, c) => sum + (c.goalAmount || 0), 0)
  const totalRaised = campaigns.reduce((sum, c) => {
    // Calculate total raised from campaign donations
    return sum + (c.donations?.reduce((s, d) => s + (d.amount || 0), 0) || 0)
  }, 0)
  const totalDonors = new Set(donations.map(d => d.donorId)).size
  const avgDonation = donations.length > 0 ? totalRaised / totalDonors : 0

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Campaigns</h1>
          <p className={styles.subtitle}>Track fundraising campaigns and goal progress</p>
        </div>
        <Link href="/campaigns/new" className={styles.primaryBtn}>
          + New Campaign
        </Link>
      </div>

      {/* Campaign Cards */}
      {campaigns.length > 0 && (
        <div className={styles.campaignGrid}>
          {campaigns.map(campaign => {
            const raised = campaign.donations?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0
            const progress = campaign.goalAmount > 0 ? (raised / campaign.goalAmount) * 100 : 0
            const donorCount = new Set(campaign.donations?.map(d => d.donorId) || []).size

            return (
              <div key={campaign.id} className={styles.campaignCard}>
                <div className={styles.cardTop}>
                  <h3>{campaign.name}</h3>
                  <div className={styles.iconPlaceholder}>◉</div>
                </div>

                <span className={styles.badge}>
                  {campaign.status === 'active' ? '✓' : ''} {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>

                <div className={styles.progressSection}>
                  <div className={styles.progressLabel}>Progress</div>
                  <div className={styles.progressValue}>{Math.round(progress)}%</div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                </div>

                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Raised</span>
                    <span className={styles.statValue}>${raised.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Goal</span>
                    <span className={styles.statValue}>${campaign.goalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Donors</span>
                    <span className={styles.statValue}>{donorCount}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>End Date</span>
                    <span className={styles.statValue}>{new Date(campaign.endDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                  </div>
                </div>

                <Link href={`/campaigns/${campaign.id}`} className={styles.viewButton}>
                  View Details
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {/* Metrics Section */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>◉</div>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>Total Goal</div>
            <div className={styles.metricValue}>${totalGoal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📈</div>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>Total Raised</div>
            <div className={styles.metricValue}>${totalRaised.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>👥</div>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>Total Donors</div>
            <div className={styles.metricValue}>{totalDonors}</div>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>$</div>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>Avg. Donation</div>
            <div className={styles.metricValue}>${avgDonation.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
      </div>

      {/* Recent Campaign Donations */}
      {donations.length > 0 && (
        <div className={styles.recentSection}>
          <h2>Recent Campaign Donations</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Campaign</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation.id}>
                  <td>{donation.donor?.firstName} {donation.donor?.lastName}</td>
                  <td>${donation.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>
                    {donation.campaigns?.[0]?.campaign?.name || 'N/A'}
                  </td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default withAuth(CampaignsPage)

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './campaign-detail.module.css'

export default function CampaignDetailPage({ params }) {
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaign()
  }, [params.id])

  const fetchCampaign = async () => {
    try {
      const res = await fetch(`/api/campaigns/${params.id}`)
      const data = await res.json()
      setCampaign(data)
    } catch (error) {
      console.error('Error fetching campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className={styles.container}><div className={styles.loading}>Loading campaign...</div></div>
  if (!campaign) return <div className={styles.container}><div className={styles.error}>Campaign not found</div></div>

  const topDonors = campaign.donations
    .map(cd => ({
      donor: cd.donation.donor,
      amount: cd.donation.amount,
      date: cd.donation.date,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  const statusColor = {
    active: '#27AE60',
    completed: '#3498db',
    paused: '#f39c12',
    planned: '#95a5a6',
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>{campaign.name}</h1>
          <p className={styles.description}>{campaign.description || 'No description provided'}</p>
          <div className={styles.meta}>
            <span className={styles.badge} style={{ backgroundColor: statusColor[campaign.status] || '#95a5a6' }}>
              {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}
            </span>
          </div>
        </div>
        <Link href={`/donations/new?campaignId=${params.id}`} className={styles.logDonationBtn}>
          + Log Donation
        </Link>
      </div>

      {/* Key Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Goal</span>
          <span className={styles.statValue}>
            ${campaign.goalAmount?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Raised</span>
          <span className={styles.statValue}>
            ${campaign.totalRaised?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Progress</span>
          <span className={styles.statValue}>{Math.round(campaign.progressPercentage)}%</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Donors</span>
          <span className={styles.statValue}>{campaign.donations.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span>Progress to Goal</span>
          <span className={styles.progressPercent}>{Math.round(campaign.progressPercentage)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${Math.min(campaign.progressPercentage, 100)}%`,
              backgroundColor: campaign.progressPercentage >= 100 ? '#27AE60' : '#FDB813',
            }}
          />
        </div>
        <div className={styles.progressText}>
          ${campaign.totalRaised?.toLocaleString('en-US', { maximumFractionDigits: 0 })} of ${campaign.goalAmount?.toLocaleString('en-US', { maximumFractionDigits: 0 })} needed
          {campaign.goalAmount > campaign.totalRaised && (
            <>
              <br />
              <strong>${(campaign.goalAmount - campaign.totalRaised)?.toLocaleString('en-US', { maximumFractionDigits: 0 })} remaining</strong>
            </>
          )}
        </div>
      </div>

      {/* Two Column Grid: Top Donors & Campaign Details */}
      <div className={styles.grid}>
        {/* Top Donors Section */}
        <div className={styles.section}>
          <h2>Top Donors</h2>
          {topDonors.length > 0 ? (
            <div className={styles.donorsList}>
              {topDonors.map((donor, idx) => (
                <div key={idx} className={styles.donorRow}>
                  <span className={styles.donorRank}>#{idx + 1}</span>
                  <div className={styles.donorInfo}>
                    <Link
                      href={`/donors/${donor.donor.id}`}
                      className={styles.donorName}
                    >
                      {donor.donor.firstName} {donor.donor.lastName}
                    </Link>
                    <span className={styles.donorDate}>
                      {new Date(donor.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className={styles.donorAmount}>
                    ${donor.amount?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noData}>No donors yet</p>
          )}
        </div>

        {/* Campaign Details Section */}
        <div className={styles.section}>
          <h2>Campaign Details</h2>
          <div className={styles.detailsList}>
            <div className={styles.detailItem}>
              <strong>Status:</strong>
              <span className={styles.badge} style={{ backgroundColor: statusColor[campaign.status] || '#95a5a6' }}>
                {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}
              </span>
            </div>
            <div className={styles.detailItem}>
              <strong>Start Date:</strong>
              <span>{new Date(campaign.startDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>End Date:</strong>
              <span>{new Date(campaign.endDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Duration:</strong>
              <span>
                {Math.ceil((new Date(campaign.endDate) - new Date(campaign.startDate)) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* All Donations Section */}
      {campaign.donations.length > 0 && (
        <div className={styles.section}>
          <h2>All Donations ({campaign.donations.length})</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {campaign.donations.map((cd, idx) => (
                  <tr key={idx}>
                    <td>{new Date(cd.donation.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}</td>
                    <td>
                      <Link href={`/donors/${cd.donation.donorId}`} className={styles.donorLink}>
                        {cd.donation.donor.firstName} {cd.donation.donor.lastName}
                      </Link>
                    </td>
                    <td>${cd.donation.amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className={styles.method}>{cd.donation.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}


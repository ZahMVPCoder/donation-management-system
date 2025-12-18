'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './donor-profile.module.css'

export default function DonorProfilePage({ params }) {
  const [donor, setDonor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetchDonor()
  }, [params.id])

  const fetchDonor = async () => {
    try {
      const res = await fetch(`/api/donors/${params.id}`)
      const data = await res.json()
      setDonor(data)
      setNotes(data.notes || '')
    } catch (error) {
      console.error('Error fetching donor:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotes = async () => {
    try {
      const res = await fetch(`/api/donors/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: donor.firstName,
          lastName: donor.lastName,
          email: donor.email,
          phone: donor.phone,
          streetAddress: donor.streetAddress,
          city: donor.city,
          state: donor.state,
          zipCode: donor.zipCode,
          preferredContactMethod: donor.preferredContactMethod,
          notes,
        }),
      })
      if (res.ok) {
        setEditingNotes(false)
        fetchDonor()
      }
    } catch (error) {
      console.error('Error saving notes:', error)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this donor? This action cannot be undone.')) {
      try {
        await fetch(`/api/donors/${params.id}`, { method: 'DELETE' })
        window.location.href = '/donors'
      } catch (error) {
        console.error('Error deleting donor:', error)
      }
    }
  }

  if (loading) return <div className={styles.container}><div className={styles.loading}>Loading donor profile...</div></div>
  if (!donor) return <div className={styles.container}><div className={styles.error}>Donor not found</div></div>

  const statusColors = {
    active: '#27AE60',
    lapsed: '#f39c12',
    inactive: '#95a5a6',
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>{donor.firstName} {donor.lastName}</h1>
          <span className={styles.badge} style={{ backgroundColor: statusColors[donor.status] || '#95a5a6' }}>
            {donor.status?.toUpperCase()}
          </span>
        </div>
        <div className={styles.headerActions}>
          <Link href={`/donors/${params.id}/edit`} className={styles.actionBtn}>
            Edit Profile
          </Link>
          <button onClick={handleDelete} className={styles.actionBtnDanger}>
            Delete
          </button>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Giving</span>
          <span className={styles.statValue}>
            ${donor.totalGiving?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || '0'}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Donations</span>
          <span className={styles.statValue}>{donor.donations?.length || 0}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Avg. Gift</span>
          <span className={styles.statValue}>
            ${donor.donations && donor.donations.length > 0
              ? (donor.totalGiving / donor.donations.length).toLocaleString('en-US', { maximumFractionDigits: 0 })
              : '0'}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Last Gift</span>
          <span className={styles.statValue}>
            {donor.lastGiftDate
              ? new Date(donor.lastGiftDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Never'}
          </span>
        </div>
      </div>

      {/* Two Column Grid: Contact & Quick Actions */}
      <div className={styles.grid}>
        {/* Contact Information */}
        <div className={styles.section}>
          <h2>Contact Information</h2>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <strong>Email</strong>
              <a href={`mailto:${donor.email}`} className={styles.link}>{donor.email}</a>
            </div>
            <div className={styles.infoItem}>
              <strong>Phone</strong>
              {donor.phone ? (
                <a href={`tel:${donor.phone}`} className={styles.link}>{donor.phone}</a>
              ) : (
                <span className={styles.noData}>Not provided</span>
              )}
            </div>
            <div className={styles.infoItem}>
              <strong>Address</strong>
              {donor.streetAddress || donor.city || donor.state || donor.zipCode ? (
                <address className={styles.addressText}>
                  {donor.streetAddress && <>{donor.streetAddress}<br /></>}
                  {(donor.city || donor.state || donor.zipCode) && (
                    <>{donor.city && donor.city}{donor.city && donor.state && ', '}{donor.state && donor.state} {donor.zipCode && donor.zipCode}</>
                  )}
                </address>
              ) : (
                <span className={styles.noData}>Not provided</span>
              )}
            </div>
            <div className={styles.infoItem}>
              <strong>Preferred Contact</strong>
              <span>{donor.preferredContactMethod || 'Not specified'}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Member Since</strong>
              <span>{new Date(donor.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.section}>
          <h2>Quick Actions</h2>
          <div className={styles.actionsList}>
            <Link href={`/donations/new?donorId=${params.id}`} className={styles.actionCard}>
              <span className={styles.actionIcon}>💝</span>
              <span className={styles.actionText}>Log New Donation</span>
            </Link>
            <Link href={`/donors/${params.id}/edit`} className={styles.actionCard}>
              <span className={styles.actionIcon}>✏️</span>
              <span className={styles.actionText}>Edit Profile</span>
            </Link>
            <Link href="/tasks" className={styles.actionCard}>
              <span className={styles.actionIcon}>✅</span>
              <span className={styles.actionText}>Create Task</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Notes</h2>
          {!editingNotes && (
            <button onClick={() => setEditingNotes(true)} className={styles.editBtn}>
              Edit Notes
            </button>
          )}
        </div>
        {editingNotes ? (
          <div className={styles.editNotes}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={styles.noteInput}
              rows={5}
              placeholder="Add internal notes about this donor..."
            />
            <div className={styles.buttonGroup}>
              <button onClick={handleSaveNotes} className={styles.saveBtn}>
                Save Notes
              </button>
              <button
                onClick={() => {
                  setEditingNotes(false)
                  setNotes(donor.notes || '')
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.noteText}>
            {donor.notes && donor.notes.trim() ? (
              <p>{donor.notes}</p>
            ) : (
              <p className={styles.noData}>No notes yet</p>
            )}
          </div>
        )}
      </div>

      {/* Donation History */}
      {donor.donations && donor.donations.length > 0 && (
        <div className={styles.section}>
          <h2>Donation History ({donor.donations.length})</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Campaign</th>
                </tr>
              </thead>
              <tbody>
                {donor.donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{new Date(donation.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}</td>
                    <td className={styles.amount}>${donation.amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className={styles.method}>{donation.method}</td>
                    <td>{donation.campaigns?.length > 0 && donation.campaigns[0].campaign?.name ? (
                      <Link href={`/campaigns/${donation.campaigns[0].campaign.id}`} className={styles.campaignLink}>
                        {donation.campaigns[0].campaign.name}
                      </Link>
                    ) : (
                      <span className={styles.noData}>General</span>
                    )}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(!donor.donations || donor.donations.length === 0) && (
        <div className={styles.section}>
          <p className={styles.noData} style={{ textAlign: 'center', padding: '2rem' }}>
            No donations yet.{' '}
            <Link href={`/donations/new?donorId=${params.id}`} className={styles.link}>
              Log the first donation →
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}


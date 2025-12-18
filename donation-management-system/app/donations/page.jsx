'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../donations/donations.module.css'

export default function DonationsPage() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const take = 10

  useEffect(() => {
    fetchDonations()
  }, [skip])

  const fetchDonations = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/donations?skip=${skip}&take=${take}`)
      const data = await res.json()
      setDonations(data.donations || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error('Error fetching donations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Donations</h1>
        <Link href="/donations/new" className={styles.primaryBtn}>
          + Log New Donation
        </Link>
      </div>

      {loading ? (
        <p>Loading donations...</p>
      ) : donations.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No donations logged yet.</p>
          <Link href="/donations/new" className={styles.primaryBtn}>
            Log First Donation
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Campaign</th>
                  <th>Method</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>
                      {donation.donor?.firstName} {donation.donor?.lastName}
                    </td>
                    <td>${donation.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
                    <td>{donation.campaign?.name || 'N/A'}</td>
                    <td>{donation.donationMethod}</td>
                    <td>
                      <Link href={`/donations/${donation.id}`} className={styles.actionLink}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button
              onClick={() => setSkip(Math.max(0, skip - take))}
              disabled={skip === 0}
              className={styles.btn}
            >
              ← Previous
            </button>
            
            <span>
              Showing {skip + 1} to {Math.min(skip + take, total)} of {total}
            </span>
            <button
              onClick={() => setSkip(skip + take)}
              disabled={skip + take >= total}
              className={styles.btn}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  )
}

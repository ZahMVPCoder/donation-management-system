'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { withAuth } from '@/lib/withAuth'
import styles from './donor-list.module.css'

function DonorsPage() {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const take = 20

  useEffect(() => {
    fetchDonors()
  }, [search, skip])

  const fetchDonors = async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams({
        q: search,
        skip: skip.toString(),
        take: take.toString(),
      })
      const res = await fetch(`/api/donors?${query}`)
      const data = await res.json()
      setDonors(data.donors)
      setTotal(data.total)
    } catch (error) {
      console.error('Error fetching donors:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusClass = {
      active: 'badgeActive',
      lapsed: 'badgeLapsed',
      new: 'badgeNew',
      inactive: 'badgeInactive',
    }[status]
    return statusClass
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Donors</h1>
        <Link href="/donors/new" className="btn btn-primary">
          + Add Donor
        </Link>
      </div>

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setSkip(0)
          }}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <p>Loading donors...</p>
      ) : donors.length === 0 ? (
        <p>No donors found</p>
      ) : (
        <div>
          <div className={styles.tableWrapper}>
            <table className={styles.donorTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Last Gift</th>
                  <th>Total Giving</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor.id}>
                    <td>
                      <Link href={`/donors/${donor.id}`} className={styles.donorLink}>
                        {donor.firstName} {donor.lastName}
                      </Link>
                    </td>
                    <td>{donor.email}</td>
                    <td>{donor.phone || '-'}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(donor.donorStatus)}`}>
                        {donor.donorStatus}
                      </span>
                    </td>
                    <td>
                      {donor.lastGiftDate
                        ? new Date(donor.lastGiftDate).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td>${donor.totalGiving.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                    <td>
                      <Link href={`/donors/${donor.id}`} className={styles.actionLink}>
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
              className="btn btn-secondary"
            >
              ← Previous
            </button>
            
            <span>
              Showing {skip + 1} to {Math.min(skip + take, total)} of {total}
            </span>
            <button
              onClick={() => setSkip(skip + take)}
              disabled={skip + take >= total}
              className="btn btn-secondary"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default withAuth(DonorsPage)

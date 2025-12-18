'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { withAuth } from '@/lib/withAuth'
import styles from './log-donation.module.css'

function LogDonationPage() {
  const router = useRouter()
  const [donors, setDonors] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const [formData, setFormData] = useState({
    donorId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Credit Card',
    campaignId: '',
    isRecurring: false,
    createThankYouTask: true,
  })

  useEffect(() => {
    fetchDonorsAndCampaigns()
  }, [])

  const fetchDonorsAndCampaigns = async () => {
    try {
      const [donorsRes, campaignsRes] = await Promise.all([
        fetch('/api/donors?take=100'),
        fetch('/api/campaigns?take=100'),
      ])
      const donorsData = await donorsRes.json()
      const campaignsData = await campaignsRes.json()
      setDonors(donorsData.donors || [])
      setCampaigns(campaignsData.campaigns || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.donorId) newErrors.donorId = 'Donor is required'
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Valid amount is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.campaignId) newErrors.campaignId = 'Campaign is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorId: formData.donorId,
          amount: parseFloat(formData.amount),
          date: formData.date,
          paymentMethod: formData.paymentMethod,
          campaignId: formData.campaignId,
          isRecurring: formData.isRecurring,
          createThankYouTask: formData.createThankYouTask,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        router.push(`/donors/${formData.donorId}`)
      } else {
        const error = await res.json()
        setErrors({ submit: error.error || 'Error logging donation' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Error logging donation' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/donors" className={styles.backLink}>← Back</Link>
      
      <h1 className={styles.title}>Log a Donation</h1>
      <p className={styles.subtitle}>Record a new donation and trigger thank-you workflow</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {errors.submit && <p className={styles.error}>{errors.submit}</p>}

        {/* Donor Selector */}
        <div className={styles.formGroup}>
          <label>Donor <span className={styles.required}>*</span></label>
          <select
            value={formData.donorId}
            onChange={(e) => setFormData({ ...formData, donorId: e.target.value })}
            className={errors.donorId ? styles.inputError : ''}
          >
            <option value="">Select a donor...</option>
            {donors.map(d => (
              <option key={d.id} value={d.id}>
                {d.firstName} {d.lastName}
              </option>
            ))}
          </select>
          {errors.donorId && <p className={styles.fieldError}>{errors.donorId}</p>}
        </div>

        {/* Amount and Date */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Amount <span className={styles.required}>*</span></label>
            <div className={styles.inputWithPrefix}>
              <span className={styles.prefix}>$</span>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className={errors.amount ? styles.inputError : ''}
              />
            </div>
            {errors.amount && <p className={styles.fieldError}>{errors.amount}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Date <span className={styles.required}>*</span></label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={errors.date ? styles.inputError : ''}
            />
            {errors.date && <p className={styles.fieldError}>{errors.date}</p>}
          </div>
        </div>

        {/* Payment Method and Campaign */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Payment Method <span className={styles.required}>*</span></label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Check">Check</option>
              <option value="Cash">Cash</option>
              <option value="Wire Transfer">Wire Transfer</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Campaign <span className={styles.required}>*</span></label>
            <select
              value={formData.campaignId}
              onChange={(e) => setFormData({ ...formData, campaignId: e.target.value })}
              className={errors.campaignId ? styles.inputError : ''}
            >
              <option value="">Select a campaign...</option>
              {campaigns.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.campaignId && <p className={styles.fieldError}>{errors.campaignId}</p>}
          </div>
        </div>

        {/* Checkboxes */}
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.isRecurring}
              onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
            />
            This is a recurring donation
          </label>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.createThankYouTask}
              onChange={(e) => setFormData({ ...formData, createThankYouTask: e.target.checked })}
            />
            Create thank-you task and notify donor
          </label>
        </div>

        {/* Info Message */}
        {formData.createThankYouTask && (
          <div className={styles.infoMessage}>
            ✓ A thank-you task will be created for this donation. The donor will receive an automated confirmation email.
          </div>
        )}

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Logging...' : 'Log Donation'}
          </button>
          <button type="button" onClick={() => router.back()} className={styles.btnSecondary}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default withAuth(LogDonationPage)

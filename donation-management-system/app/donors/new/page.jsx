'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { withAuth } from '@/lib/withAuth'
import styles from './donor-form.module.css'

function AddDonorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    status: 'New',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors= {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const data = await res.json()
        router.push(`/donors/${data.id}`)
      } else {
        const error = await res.json()
        setErrors({ submit: error.error })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Error submitting form' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/donors" className={styles.backLink}>← Back to Donors</Link>
      
      <h1 className={styles.title}>Add New Donor</h1>
      <p className={styles.subtitle}>Enter essential donor information</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {errors.submit && <p className={styles.error}>{errors.submit}</p>}

        {/* Basic Information Section */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>First Name <span className={styles.required}>*</span></label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={errors.firstName ? styles.inputError : ''}
                placeholder="John"
              />
              {errors.firstName && <p className={styles.fieldError}>{errors.firstName}</p>}
            </div>

            <div className={styles.formGroup}>
              <label>Last Name <span className={styles.required}>*</span></label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={errors.lastName ? styles.inputError : ''}
                placeholder="Smith"
              />
              {errors.lastName && <p className={styles.fieldError}>{errors.lastName}</p>}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Contact Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroupFull}>
              <label>Email <span className={styles.required}>*</span></label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? styles.inputError : ''}
                placeholder="john.smith@email.com"
              />
              {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
            </div>

            <div className={styles.formGroupFull}>
              <label>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Address</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroupFull}>
              <label>Street Address</label>
              <input
                type="text"
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                placeholder="123 Main St"
              />
            </div>

            <div className={styles.formGroup}>
              <label>City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Anytown"
              />
            </div>

            <div className={styles.formGroup}>
              <label>State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                maxLength={2}
                placeholder="ST"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Zip Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="12345"
              />
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className={styles.formSection}>
          <div className={styles.formGrid}>
            <div className={styles.formGroupFull}>
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="New">New</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className={styles.formSection}>
          <div className={styles.formGrid}>
            <div className={styles.formGroupFull}>
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={5}
                placeholder="Add any relevant notes about this donor..."
              />
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Adding...' : 'Add Donor'}
          </button>
          <button type="button" onClick={() => router.back()} className={styles.btnSecondary}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default withAuth(AddDonorPage)

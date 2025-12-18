'use client'

import { useRouter } from 'next/navigation'
import styles from './logout.module.css'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token')
    
    // Redirect to home
    router.push('/')
    
    // Optional: Refresh the page to clear any cached user data
    router.refresh()
  }

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Logout
    </button>
  )
}

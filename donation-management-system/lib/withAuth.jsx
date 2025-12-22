'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * withAuth - Higher Order Component to protect pages
 * Redirects to login if user is not authenticated
 * Shows loading screen while verifying auth
 */
export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Get token from localStorage
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

          if (!token) {
            // No token, redirect to login
            setIsLoading(false)
            router.push('/auth/login')
            return
          }

          // Set timeout to prevent infinite loading
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)

          try {
            // Verify token with server
            const response = await fetch('/api/auth/me', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            })

            clearTimeout(timeoutId)

            if (response.ok) {
              const userData = await response.json()
              setUser(userData)
              setIsAuthorized(true)
            } else {
              // Token invalid, clear it and redirect to login
              console.warn('Auth verification failed:', response.status)
              localStorage.removeItem('token')
              setIsLoading(false)
              router.push('/auth/login')
            }
          } catch (fetchError) {
            clearTimeout(timeoutId)
            console.error('Fetch error during auth check:', fetchError.message)
            // On timeout or fetch error, assume not authenticated
            localStorage.removeItem('token')
            setIsLoading(false)
            router.push('/auth/login')
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          localStorage.removeItem('token')
          setIsLoading(false)
          router.push('/auth/login')
        } finally {
          setIsLoading(false)
        }
      }

      checkAuth()
    }, [router])

    if (isLoading) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #27AE60',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px',
            }} />
            <p style={{ color: '#27AE60', fontSize: '16px' }}>Verifying access...</p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      )
    }

    if (!isAuthorized) {
      return null // Will redirect to login
    }

    // Pass user data as prop to the protected component
    return <Component {...props} user={user} />
  }
}

/**
 * useAuth - Hook to get current user in a component
 * Returns { user, isLoading, isAuthorized }
 */
export function useAuth() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

        if (!token) {
          setIsAuthorized(false)
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setIsAuthorized(true)
        } else {
          localStorage.removeItem('token')
          setIsAuthorized(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthorized(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  return { user, isLoading, isAuthorized }
}

/**
 * useRequireAuth - Hook that redirects to login if not authenticated
 * Use this in components that must be protected
 */
export function useRequireAuth() {
  const router = useRouter()
  const { user, isLoading, isAuthorized } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.push('/auth/login')
    }
  }, [isLoading, isAuthorized, router])

  return { user, isLoading, isAuthorized }
}

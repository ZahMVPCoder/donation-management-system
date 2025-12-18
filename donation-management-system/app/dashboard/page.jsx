'use client'

import Dashboard from './dashboard'
import { withAuth } from '@/lib/withAuth'

function DashboardPage() {
  return <Dashboard />
}

export default withAuth(DashboardPage)


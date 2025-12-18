import Link from 'next/link'
import LoadingScreen from './components/LoadingScreen'
import LogoutButton from './components/LogoutButton'
import './globals.css'

export const metadata = {
  title: 'DonorHQ',
  description: 'The Place to make a difference.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <div className="navbar">
          <nav className="nav-container">
            <Link href="/" className="nav-logo">
              💝 DonorHQ
            </Link>
            <ul className="nav-links">
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/donors">Donors</Link></li>
              <li><Link href="/donations">Donations</Link></li>
              <li><Link href="/campaigns">Campaigns</Link></li>
              <li><Link href="/tasks">Tasks</Link></li>
            </ul>
            <LogoutButton />
          </nav>
        </div>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}

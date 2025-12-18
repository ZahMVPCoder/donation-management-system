# DonationHub - Donation Management System

A comprehensive, full-stack donation management system built with Next.js, Prisma, React, and SQLite. Designed to streamline donor management, donation tracking, campaign management, and follow-up task organization.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Screen Documentation](#screen-documentation)
- [Development Guide](#development-guide)

## ✨ Features

### Core Screens

1. **Dashboard** - Overview of key metrics and recent activity
   - Total raised this month
   - Monthly goal progress
   - New donors count
   - Lapsed donors count
   - Average gift size
   - Monthly goal amount
   - Recent activity feed

2. **Donor Management**
   - Search and filter donors by name, email, phone
   - View complete donor profiles with donation history
   - Add new donors with validation
   - Edit donor information
   - Delete donors
   - Status tracking (Active, Lapsed, New)

3. **Donation Tracking**
   - Log new donations
   - Auto-create thank-you tasks
   - Track donation method (check, cash, credit card, etc.)
   - Support recurring donations
   - Link donations to campaigns
   - View donation history by donor

4. **Campaign Management**
   - View all campaigns in grid layout
   - Track campaign progress with visual indicators
   - View top donors for each campaign
   - Campaign details with donation breakdowns
   - Campaign status tracking

5. **Task Management**
   - Organize tasks by urgency (Overdue, This Week, Later)
   - Track follow-ups and thank-you tasks
   - Mark tasks complete
   - Link tasks to donors and donations
   - Task type categorization

6. **Responsive Design**
   - Mobile-first approach
   - Fully responsive layouts
   - Touch-friendly interfaces
   - Works on all device sizes

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Database:** SQLite with Prisma ORM
- **Styling:** CSS Modules
- **Language:** TypeScript (with JSDoc in API routes)
- **HTTP Client:** Axios
- **Package Manager:** npm

## 📁 Project Structure

```
donation-management-system/
├── app/
│   ├── api/                          # API Routes
│   │   ├── donors/
│   │   │   ├── route.ts              # GET all donors, POST new donor
│   │   │   └── [id]/route.ts         # GET, PUT, DELETE specific donor
│   │   ├── donations/
│   │   │   └── route.ts              # GET donations, POST new donation
│   │   ├── campaigns/
│   │   │   ├── route.ts              # GET, POST campaigns
│   │   │   └── [id]/route.ts         # GET, PUT campaign details
│   │   ├── tasks/
│   │   │   ├── route.ts              # GET, POST tasks
│   │   │   └── [id]/route.ts         # PUT, DELETE tasks
│   │   └── dashboard/
│   │       └── metrics/route.ts      # GET dashboard metrics
│   │
│   ├── dashboard/
│   │   ├── page.tsx                  # Dashboard page wrapper
│   │   ├── dashboard.tsx             # Dashboard component
│   │   └── dashboard.module.css      # Dashboard styles
│   │
│   ├── donors/
│   │   ├── page.tsx                  # Donor list page
│   │   ├── donor-list.module.css     # List styles
│   │   ├── new/
│   │   │   ├── page.tsx              # Add donor form
│   │   │   └── donor-form.module.css # Form styles
│   │   └── [id]/
│   │       ├── page.tsx              # Donor profile page
│   │       ├── donor-profile.module.css
│   │       └── edit/
│   │           └── page.tsx          # Edit donor form
│   │
│   ├── donations/
│   │   └── new/
│   │       ├── page.tsx              # Log donation form
│   │       └── log-donation.module.css
│   │
│   ├── campaigns/
│   │   ├── page.tsx                  # Campaign list page
│   │   ├── campaigns.module.css      # List styles
│   │   └── [id]/
│   │       ├── page.tsx              # Campaign detail page
│   │       └── campaign-detail.module.css
│   │
│   ├── tasks/
│   │   ├── page.tsx                  # Tasks/follow-ups page
│   │   └── tasks.module.css          # Tasks styles
│   │
│   ├── layout.tsx                    # Root layout with navbar
│   ├── page.tsx                      # Home page
│   ├── page.module.css               # Home page styles
│   ├── globals.css                   # Global styles
│   └── components/                   # Shared components (future)
│
├── prisma/
│   └── schema.prisma                 # Database schema
│
├── lib/                              # Utility functions (future)
│
├── screens/                          # Documentation folder
├── trello-tasks/                     # Trello task cards
│
├── .env.local                        # Environment variables
├── package.json                      # Dependencies
├── README.md                         # This file
└── next.config.js                    # Next.js configuration (auto-generated)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git (optional)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

3. **Create and migrate database:**
   ```bash
   npm run prisma:migrate
   ```
   When prompted, name the migration (e.g., "init")

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
```

## 🗄️ Database Schema

### Models

#### Donor
- **id** (String) - Unique identifier
- **firstName** (String) - First name
- **lastName** (String) - Last name
- **email** (String) - Email address (unique)
- **phone** (String?) - Phone number
- **streetAddress** (String?) - Street address
- **city** (String?) - City
- **state** (String?) - State/Province
- **zipCode** (String?) - Postal code
- **preferredContactMethod** (String?) - Preferred contact method
- **notes** (String?) - Donor notes
- **createdAt** (DateTime) - Created timestamp
- **updatedAt** (DateTime) - Updated timestamp

#### Donation
- **id** (String) - Unique identifier
- **donorId** (String) - Reference to Donor
- **amount** (Float) - Donation amount
- **date** (DateTime) - Donation date
- **method** (String) - Donation method (check, cash, credit card, etc.)
- **isRecurring** (Boolean) - Is recurring donation
- **recurringFrequency** (String?) - Frequency if recurring
- **notes** (String?) - Donation notes
- **createdAt** (DateTime) - Created timestamp
- **updatedAt** (DateTime) - Updated timestamp

#### Campaign
- **id** (String) - Unique identifier
- **name** (String) - Campaign name
- **description** (String?) - Campaign description
- **status** (String) - Campaign status
- **goalAmount** (Float) - Campaign goal
- **startDate** (DateTime) - Campaign start date
- **endDate** (DateTime) - Campaign end date
- **campaignLeadId** (String?) - Campaign lead reference
- **createdAt** (DateTime) - Created timestamp
- **updatedAt** (DateTime) - Updated timestamp

#### CampaignDonation
- **id** (String) - Unique identifier
- **campaignId** (String) - Reference to Campaign
- **donationId** (String) - Reference to Donation

#### Task
- **id** (String) - Unique identifier
- **title** (String) - Task title
- **taskType** (String) - Task type (thank-you, follow-up, reminder)
- **donorId** (String?) - Reference to Donor
- **donationId** (String?) - Reference to Donation
- **dueDate** (DateTime) - Due date
- **status** (String) - Task status (pending, completed)
- **description** (String?) - Task description
- **assignedTo** (String?) - Assigned person
- **completedAt** (DateTime?) - Completion timestamp
- **createdAt** (DateTime) - Created timestamp
- **updatedAt** (DateTime) - Updated timestamp

#### Goal
- **id** (String) - Unique identifier
- **monthlyGoal** (Float) - Monthly fundraising goal
- **annualGoal** (Float) - Annual fundraising goal
- **year** (Int) - Year for the goal
- **month** (Int) - Month for the goal
- **createdAt** (DateTime) - Created timestamp
- **updatedAt** (DateTime) - Updated timestamp

## 📡 API Routes

### Donors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donors` | List all donors with pagination and search |
| POST | `/api/donors` | Create new donor |
| GET | `/api/donors/[id]` | Get specific donor with donation history |
| PUT | `/api/donors/[id]` | Update donor information |
| DELETE | `/api/donors/[id]` | Delete donor |

**Query Parameters (GET /api/donors):**
- `q` - Search query (searches name, email, phone)
- `skip` - Number of records to skip (default: 0)
- `take` - Number of records to return (default: 20)

**Request Body (POST /api/donors):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-0123",
  "streetAddress": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701"
}
```

### Donations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donations` | List donations with filters |
| POST | `/api/donations` | Log new donation |

**Query Parameters (GET /api/donations):**
- `donorId` - Filter by donor
- `campaignId` - Filter by campaign
- `skip` - Number of records to skip (default: 0)
- `take` - Number of records to return (default: 20)

**Request Body (POST /api/donations):**
```json
{
  "donorId": "donor123",
  "amount": 100.00,
  "date": "2024-01-15",
  "method": "credit_card",
  "isRecurring": false,
  "campaignId": "campaign123"
}
```

### Campaigns

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/campaigns` | List all campaigns |
| POST | `/api/campaigns` | Create new campaign |
| GET | `/api/campaigns/[id]` | Get campaign details with donations |
| PUT | `/api/campaigns/[id]` | Update campaign |

**Request Body (POST /api/campaigns):**
```json
{
  "name": "Summer Campaign",
  "description": "Summer fundraising campaign",
  "goalAmount": 10000.00,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "status": "active"
}
```

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks grouped by urgency |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/[id]` | Update task (mark complete) |
| DELETE | `/api/tasks/[id]` | Delete task |

**Request Body (POST /api/tasks):**
```json
{
  "title": "Follow up with John",
  "taskType": "follow-up",
  "donorId": "donor123",
  "dueDate": "2024-01-20",
  "description": "Call to discuss campaign"
}
```

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/metrics` | Get dashboard metrics |

**Response:**
```json
{
  "totalRaisedThisMonth": 5000.00,
  "monthlyGoal": 8000.00,
  "progressPercentage": 62.5,
  "newDonors": 5,
  "lapsedDonors": 3,
  "avgGiftSize": 250.00,
  "recentActivity": [...]
}
```

## 📄 Screen Documentation

### 1. Dashboard
**Location:** `/dashboard`
**Features:**
- 6 metric cards (total raised, goal %, new donors, lapsed donors, avg gift, goal amount)
- Recent activity feed
- Monthly goal tracking
- Server-side rendering for performance

### 2. Donor List
**Location:** `/donors`
**Features:**
- Searchable list of all donors
- Real-time filtering by name, email, phone
- Pagination (20 donors per page)
- Status badges (Active, Lapsed, New)
- Last gift and total giving display
- Add donor button
- Click to view details

### 3. Donor Profile
**Location:** `/donors/[id]`
**Features:**
- Full donor information display
- Contact details section
- Editable notes with save/cancel
- Donation history table (sortable)
- Last gift date and total giving
- Action buttons: Edit, Delete, Log Donation

### 4. Add Donor Form
**Location:** `/donors/new`
**Features:**
- Form validation
- Required fields: First Name, Last Name, Email
- Optional fields: Phone, Address, City, State, ZIP
- Email uniqueness validation
- Success/error messages
- Cancel button

### 5. Edit Donor Form
**Location:** `/donors/[id]/edit`
**Features:**
- Pre-populated donor information
- Same validation as Add form
- Update on submit
- Cancel button

### 6. Log Donation
**Location:** `/donations/new`
**Features:**
- Donor autocomplete search
- Amount input with validation
- Date picker (defaults to today)
- Donation method dropdown
- Campaign selector (optional)
- Recurring donation checkbox with frequency
- Auto-creates thank-you task
- Workflow configuration

### 7. Campaign List
**Location:** `/campaigns`
**Features:**
- Grid layout of campaign cards
- Goal and raised amounts
- Progress bar with percentage
- Donor count
- Campaign date range
- Status badge
- Click to view details

### 8. Campaign Detail
**Location:** `/campaigns/[id]`
**Features:**
- Campaign overview stats
- Large progress bar visualization
- Top 5 donors ranked
- All donations table
- Campaign details sidebar
- Related information

### 9. Tasks/Follow-ups
**Location:** `/tasks`
**Features:**
- Grouped by urgency (Overdue, This Week, Later)
- Checkbox for task completion
- Donor links from tasks
- Task type badges
- Color-coded urgency levels
- Due date display

## 🔧 Development Guide

### Adding a New Feature

1. **Design the database change:**
   - Update `prisma/schema.prisma`
   - Run `npm run prisma:migrate`

2. **Create API routes:**
   - Add files in `app/api/`
   - Implement GET, POST, PUT, DELETE as needed
   - Add error handling

3. **Create UI components:**
   - Add page files in appropriate folder
   - Use `'use client'` for interactive components
   - Create corresponding `.module.css` file

4. **Link navigation:**
   - Update `app/layout.tsx` navbar if needed

### Code Patterns

**API Route Pattern:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Implementation
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error message' }, { status: 500 })
  }
}
```

**Client Component Pattern:**
```typescript
'use client'

import { useState, useEffect } from 'react'
import styles from './component.module.css'

export default function Component() {
  const [data, setData] = useState([])

  useEffect(() => {
    // Fetch data
  }, [])

  return <div className={styles.container}>{/* JSX */}</div>
}
```

### Styling Guidelines

- Use CSS Modules for component styles (`.module.css`)
- Global styles go in `app/globals.css`
- Follow responsive design with mobile-first approach
- Media breakpoint at 768px for mobile

## 🐛 Troubleshooting

**Database connection errors:**
- Check `.env.local` has correct `DATABASE_URL`
- Ensure SQLite file path is correct
- Try deleting `dev.db` and running migrations again

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
npm install
npm run prisma:generate
```

**Build errors:**
```bash
npm run build
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open a GitHub issue or contact the development team.

---

**Built with ❤️ using Next.js, Prisma, and React**

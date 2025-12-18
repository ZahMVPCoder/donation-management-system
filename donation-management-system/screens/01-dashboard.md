# Dashboard Screen Specification

## Purpose
Overview of donation organization metrics and key performance indicators at a glance.

## Layout
```
┌─────────────────────────────────────────────────────────────────┐
│                    DONATION DASHBOARD                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ Total Raised     │  │ Monthly Goal     │  │ % of Goal    │ │
│  │ This Month       │  │ Progress         │  │ Completed    │ │
│  │ $45,230          │  │ ████████░░░░░░   │  │ 65%          │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ New Donors       │  │ Lapsed Donors    │  │ Avg Gift     │ │
│  │ This Month       │  │ (No gift 90+ day)│  │              │ │
│  │ 12 donors        │  │ 8 donors         │  │ $3,769       │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Recent Activity                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ John Smith donated $500 to Annual Fund (Today)             ││
│ │ Sarah Johnson donated $1,000 to Scholarship Fund (2 days) ││
│ │ Mike Davis marked as follow-up needed (5 days)            ││
│ │ Emma Wilson thank-you sent (1 week)                       ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Key Metrics
- **Total Raised This Month** - Sum of all donations in current month
- **Goal Progress** - Visual progress bar toward monthly/annual goal
- **New Donors** - Count of first-time donors this month
- **Lapsed Donors** - Donors with no gift in 90+ days
- **Average Gift Size** - Mean donation amount

## Features
- Quick glance metrics in card format
- Progress bars showing goal percentage
- Recent activity feed (donations, follow-ups, thank-yous)
- Links to drill-down reports
- Date range filter (This Month, Last Month, This Year, Custom)

## User Actions
- Click metric cards to see detailed view
- View recent activity feed
- Access other screens via navigation menu
- Filter date ranges

## Database Fields Needed
- Donations (amount, date, donor_id, campaign_id)
- Donors (created_at, last_gift_date)
- Goals (monthly_goal, annual_goal)

# Donor List / Search Screen Specification

## Purpose
View all donors in organized, searchable format with key information visible.

## Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ DONORS                                                          │
├─────────────────────────────────────────────────────────────────┤
│ [Search...________] [Filter ▼]  [+ Add Donor]  [Export]        │
│                                                                 │
│ Name              | Status      | Last Gift  | Total Giving    │
│ ─────────────────────────────────────────────────────────────  │
│ John Smith        | Active ✓    | 5 days     | $15,230         │
│ Sarah Johnson     | Lapsed ⚠    | 95 days    | $8,900          │
│ Mike Davis        | Active ✓    | 2 weeks    | $3,500          │
│ Emma Wilson       | New ⭐      | 10 days    | $1,000          │
│ James Brown       | Active ✓    | 30 days    | $12,450         │
│ [... more rows]                                                │
│                                                                 │
│ Showing 1-20 of 247  [< Previous]  [Next >]                   │
└─────────────────────────────────────────────────────────────────┘
```

## Key Information per Donor
- **Name** - Full name (clickable → Donor Profile)
- **Status** - Active, Lapsed, New (with visual indicators)
- **Last Gift** - Days/date since last donation
- **Total Giving** - Lifetime total donation amount

## Filter Options
- Status (Active, Lapsed, New, Inactive)
- Giving Amount (High, Medium, Low)
- Time Period (Last 30 days, 90 days, 1 year, all time)
- Campaign affiliation
- Custom date range

## Search Functionality
- Search by name, email, phone
- Real-time search as user types
- Search results highlighted

## User Actions
- Click donor name to view profile
- Click [+ Add Donor] to create new donor
- Click filter icon to refine list
- Click [Export] to download donor list
- Bulk actions (select multiple donors)

## Status Indicators
- **Active** ✓ - Last gift within 90 days
- **Lapsed** ⚠ - Last gift 90+ days ago
- **New** ⭐ - Donor for less than 90 days
- **Inactive** ◯ - No gifts ever or very old

## Database Fields Needed
- Donors (id, first_name, last_name, email, phone)
- Donations (donor_id, amount, date)
- Donor status (calculated from donation history)

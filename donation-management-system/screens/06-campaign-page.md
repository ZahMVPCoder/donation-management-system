# Campaign Page Specification

## Purpose
View campaign details, goal progress, and donations linked to specific fundraising campaigns.

## Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ ANNUAL FUND 2024                                     [Edit][Back] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ CAMPAIGN OVERVIEW                                               │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Status: Active           Goal: $50,000       Raised: $32,450   │
│                                                                 │
│ Progress to Goal:                                               │
│ ██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│ 64.9% Complete  ($17,550 remaining)                             │
│                                                                 │
│ Start Date: Jan 1, 2024     End Date: Dec 31, 2024             │
│ Campaign Lead: Jane Doe     Email: jane@org.com                │
│                                                                 │
│ CAMPAIGN DESCRIPTION                                            │
│ ─────────────────────────────────────────────────────────────  │
│ Support our general operations and mission to serve the        │
│ community. Every dollar donated helps us continue our vital    │
│ programs and services.                                         │
│                                                                 │
│ DONATIONS TO THIS CAMPAIGN (45 donations)                      │
│ ─────────────────────────────────────────────────────────────  │
│ Date       | Donor Name        | Amount | Method    | Status   │
│ ────────────────────────────────────────────────────────────  │
│ Jan 15,24  | John Smith        | $500   | Check     | Complete │
│ Jan 12,24  | Sarah Johnson     | $1,000 | Credit C. | Complete │
│ Jan 10,24  | Mike Davis        | $250   | Transfer  | Complete │
│ Jan 8,24   | Emma Wilson       | $100   | Cash      | Complete │
│ [... more donations]                                           │
│                                                                 │
│ Showing 1-20 of 45 donations  [< Previous]  [Next >]          │
│                                                                 │
│ TOP DONORS TO THIS CAMPAIGN                                    │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 1. Sarah Johnson      $5,000 (5 gifts)                      ││
│ │ 2. John Smith         $3,500 (7 gifts)                      ││
│ │ 3. Mike Davis         $2,000 (4 gifts)                      ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│                [+ Log Donation to Campaign] [Export Data]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Key Information
- **Campaign Name** - Title of fundraising campaign
- **Status** - Active, Completed, Paused, Planned
- **Goal** - Target fundraising amount
- **Total Raised** - Current donation total
- **Goal Progress** - Visual progress bar with percentage
- **Start/End Dates** - Campaign date range
- **Campaign Lead** - Staff member responsible
- **Description** - Campaign purpose and details

## Dashboard Metrics
- Campaign goal amount
- Total raised so far
- Percentage to goal
- Number of donations
- Number of unique donors
- Average gift size
- Largest gift amount
- Days remaining (if active)

## Donations Table
- Date (sortable)
- Donor name (clickable → Donor Profile)
- Amount (sortable)
- Donation method
- Status (Complete, Pending, Cancelled)
- Paginated with 20 per page

## Top Donors Section
- List of top 3-5 donors by amount
- Shows total given and number of gifts
- Clickable to view donor profile

## User Actions
- Click donor name to view profile
- Click [Edit] to modify campaign details
- Click [+ Log Donation to Campaign] to record new gift
- Click [Export Data] to download campaign data (CSV/Excel)
- Sort donation table by date or amount
- Page through donation list

## Database Fields Needed
- Campaigns (id, name, description, status, goal_amount, start_date, end_date, campaign_lead_id, created_at, updated_at)
- Donations (id, donor_id, amount, date, campaign_id, method, status)
- Campaign_donors (campaign_id, donor_id, total_given, num_gifts) - denormalized for quick lookup

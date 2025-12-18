# Donor Profile Screen Specification

## Purpose
Complete view of individual donor with full history and relationship management tools.

## Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ JOHN SMITH                                [Edit] [Delete] [Back] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ DONOR INFORMATION                    CONTACT INFORMATION       │
│ ─────────────────────────────────────────────────────────────  │
│ ID: D-00123                          Email: john@email.com    │
│ Status: Active ✓                     Phone: (555) 123-4567    │
│ Since: Jan 15, 2022                  Address: 123 Main St,    │
│ Last Gift: 5 days ago                        City, ST 12345   │
│ Total Giving: $15,230                       │
│ Giving Frequency: Quarterly                │
│                                                                 │
│ NOTES                                                           │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ Prefers email communication. Interested in scholarship fund.││
│ │ Has corporate matching program - always match gifts.        ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ DONATION HISTORY                         FOLLOW-UP STATUS      │
│ ┌────────────────────────────────────┐ ┌────────────────────┐ │
│ │ Date       | Amount | Campaign  │ │ │ Open Tasks: 1     │ │
│ │ ─────────────────────────────────  │ │ • Send thank-you  │ │
│ │ Jan 10,24  | $500   | Annual    │ │ │ • Quarterly check │ │
│ │ Oct 15,23  | $1,000 | Scholarship│ │ │   in (2 weeks)   │ │
│ │ Jul 20,23  | $250   | Annual    │ │ │                  │ │
│ │ [... more] | ...    | ...       │ │ │ Thank-you Sent:  │ │
│ │                                  │ │ │ ✓ Jan 12, 2024  │ │
│ │ [View All Donations]             │ │ │ ✓ Oct 17, 2023  │ │
│ └────────────────────────────────────┘ └────────────────────┘ │
│                                                                 │
│ [+ Log Donation] [+ Add Task] [+ Add Note] [Send Email]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Sections

### Donor Information
- Full name, ID
- Status with indicator
- Join date
- Last gift date
- Total lifetime giving
- Giving frequency/pattern

### Contact Information
- Email, phone
- Mailing address
- Preferred contact method
- Notes (editable)

### Donation History
- Table of all donations
- Date, amount, campaign, method
- Sortable by date/amount
- Link to view all / filter

### Follow-up Status
- Open tasks/follow-ups
- Last thank-you sent date
- Due follow-up actions
- Quick task creation

## User Actions
- **Edit** - Update donor information
- **Delete** - Remove donor (with confirmation)
- **+ Log Donation** - Record new gift
- **+ Add Task** - Create follow-up or thank-you task
- **+ Add Note** - Add internal note
- **Send Email** - Draft email to donor
- View all donations
- Click donation to see details

## Database Fields Needed
- Donors (id, first_name, last_name, email, phone, address, joined_date, status)
- Donations (donor_id, amount, date, campaign_id, method)
- Tasks (donor_id, title, due_date, status, completed_date)
- Notes (donor_id, content, created_date)
- Thank-yous (donor_id, sent_date, donation_id)

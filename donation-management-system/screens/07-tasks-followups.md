# Tasks / Follow-ups View Specification

## Purpose
Manage open follow-up tasks, thank-you reminders, and donor engagement activities in one prioritized view.

## Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ FOLLOW-UPS & TASKS                                              │
├─────────────────────────────────────────────────────────────────┤
│ [Filter ▼] [Sort: Urgency ▼]  [+ New Task]  [Show Completed]  │
│                                                                 │
│ OVERDUE (3 tasks)                                               │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ [✓]  Send thank-you to John Smith          OVERDUE (5d)    ││
│ │      Donation: $500, Jan 10                Contact to owner  ││
│ │                                                             ││
│ │ [✓]  Follow-up call: Sarah Johnson         OVERDUE (2d)    ││
│ │      Last gift: $1,000, Oct 15             Relationship mgt ││
│ │                                                             ││
│ │ [✓]  Quarterly check-in: Mike Davis        OVERDUE (7d)    ││
│ │      Last contact: Jan 1                   Stewardship      ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ DUE THIS WEEK (8 tasks)                                         │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ [ ]  Send thank-you to Emma Wilson         DUE in 1 day    ││
│ │      Donation: $100, Jan 12                Contact to owner  ││
│ │                                                             ││
│ │ [ ]  Thank-you call: James Brown           DUE in 2 days   ││
│ │      Donation: $500, Jan 8                 Relationship mgt ││
│ │                                                             ││
│ │ [ ]  Event invitation: Mary Johnson        DUE in 3 days   ││
│ │      Prospect for April gala               Engagement       ││
│ │                                                             ││
│ │ [... more tasks]                                            ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ DUE LATER (12 tasks)                                            │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ [ ]  Renewal reminder: Tom Wilson          DUE Jan 25       ││
│ │      Last gift: $250, Apr 23               Stewardship      ││
│ │                                                             ││
│ │ [ ]  Grant report follow-up: ABC Corp      DUE Feb 3        ││
│ │      Grant: $10,000, Oct 2023              Corporate        ││
│ │ [... more tasks]                                            ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ Showing 23 open tasks (out of 67 total)                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Task Categories / Types
- **Thank-you** (Contact to owner) - Send thank-you email/call after donation
- **Follow-up** (Relationship mgt) - Regular check-in calls or communications
- **Quarterly Check-in** (Stewardship) - Scheduled periodic outreach
- **Event Invitation** (Engagement) - Invite to donor event
- **Renewal Reminder** (Stewardship) - Encourage gift renewal
- **Grant Report** (Corporate) - Follow up on grants
- **Other** - Custom task types

## Task Fields
- **Title** - Task description
- **Donor Name** - Associated donor (clickable → Donor Profile)
- **Type** - Category/type of task
- **Related to** - Donation, campaign, or general note
- **Due Date** - When task should be completed
- **Status** - Open, In Progress, Completed
- **Urgency** - Auto-calculated based on due date

## Filter Options
- **Status**: Open, Completed, All
- **Type**: Thank-you, Follow-up, Check-in, Event, Renewal, Grant, Other
- **Urgency**: Overdue, Due This Week, Due Later
- **Assigned To**: Me, Team Member, All
- **Date Range**: Custom

## Sort Options
- Urgency (default - overdue first)
- Due Date (ascending)
- Donor Name (A-Z)
- Task Type
- Date Created

## View Options
- [ ] Show Completed Tasks - Toggle to show/hide completed items
- Group by Urgency (default)
- Group by Type
- Group by Assigned To

## User Actions
- Click task title to expand/view details
- Click [✓] checkbox to mark task complete
- Click donor name to view donor profile
- Click [+ New Task] to create new task
- Select filter/sort options
- Edit task (click on task details)
- Delete task
- Assign task to team member
- Print task list

## Task Details (When Expanded)
- Donor name and profile link
- Task type and related donation/campaign
- Full description
- Due date
- Created date
- Assigned to
- Related note/context
- [Mark Complete] [Edit] [Delete] buttons

## Database Fields Needed
- Tasks (id, title, task_type, donor_id, donation_id, campaign_id, due_date, status, assigned_to_user_id, description, created_at, created_by, completed_at, completed_by)
- Task_templates (id, name, task_type, description, default_due_days_offset) - for creating standard tasks
- Task_notes (task_id, note_content, created_at)

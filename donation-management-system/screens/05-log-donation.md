# Log a Donation Screen Specification

## Purpose
Quick, focused interface to record a new donation and trigger thank-you workflow.

## Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ LOG DONATION                                           [← Back]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ DONATION DETAILS                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Donor *                                                         │
│ [John Smith________________▼]  [Can't find? Add new donor]    │
│                                                                 │
│ Amount * ($)              Date *                               │
│ [$500___________]         [Jan 15, 2024_____]                │
│                                                                 │
│ Donation Method *         Campaign                             │
│ [Check________▼]          [Annual Fund_______▼]               │
│   • Check                                                      │
│   • Cash                 [Optional: assign to multiple         │
│   • Credit Card          campaigns or skip]                   │
│   • Bank Transfer                                             │
│   • Wire Transfer                                             │
│                                                                 │
│ Is this recurring?                                             │
│ [ ] Yes  Frequency: [Monthly_______▼]                        │
│                                                                 │
│ THANK-YOU WORKFLOW                                             │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [✓] Send thank-you email automatically                         │
│ [✓] Create follow-up task for thank-you call (in 3 days)      │
│ [✓] Log this donation in donor history                         │
│                                                                 │
│                                                                 │
│              [Save & Send] [Save & Skip Thank-you] [Cancel]   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Essential Fields (Required - marked with *)
- **Donor** - Dropdown/search to select existing donor or add new
- **Amount** - Dollar amount input
- **Date** - Date picker (defaults to today)
- **Donation Method** - Dropdown (Check, Cash, Credit Card, Bank Transfer, Wire Transfer, Other)
- **Campaign** - Dropdown for campaign assignment

## Optional Fields
- **Is this recurring?** - Checkbox + frequency dropdown (Monthly, Quarterly, Semi-annually, Annually)

## Thank-You Workflow Options (Default: All checked)
- [ ] Send thank-you email automatically
- [ ] Create follow-up task for thank-you call (in 3 days)
- [ ] Log this donation in donor history

## Validation Rules
- Donor must be selected
- Amount must be positive number
- Date must be valid and not in future
- Donation method required
- Campaign optional but if provided must be valid

## User Actions
- Select or search for donor
- Enter donation amount
- Select donation date (date picker)
- Choose donation method
- Optionally assign campaign
- Check recurring if applicable
- Configure thank-you workflow options
- Click [Save & Send] - confirms all workflows activated
- Click [Save & Skip Thank-you] - records donation without workflows
- Click [Cancel] - discard changes

## Form Behavior
- **Donor Dropdown**: 
  - Search/autocomplete by name
  - Show recent donors first
  - "Can't find? Add new donor" link
- **Date Picker**: Calendar widget, default today
- **Amount**: Format as currency ($)
- **On Save**:
  - Validate all required fields
  - Create donation record
  - If "Send thank-you" checked:
    - Queue email task
    - Create follow-up task (if checked)
  - Show confirmation message
  - Option to log another donation or return to donor profile

## Database Fields Needed
- Donations (id, donor_id, amount, date, method, campaign_id, is_recurring, recurring_frequency, created_at, created_by)
- Donation_campaigns (donation_id, campaign_id, amount) - for multi-campaign assignments
- Email_queue (donor_id, donation_id, template, status, scheduled_for)
- Tasks (donor_id, title, type, due_date, donation_id)

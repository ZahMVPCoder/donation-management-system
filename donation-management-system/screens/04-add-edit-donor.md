# Add / Edit Donor Form Specification

## Purpose
Simple, focused form for creating new donors or editing existing donor information.

## Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ NEW DONOR                                              [← Back]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ESSENTIAL INFORMATION                                           │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ First Name *              Last Name *                          │
│ [John________________]     [Smith________________]             │
│                                                                 │
│ Email *                   Phone                                │
│ [john@email.com________]  [(555) 123-4567________]            │
│                                                                 │
│ Street Address            City                                 │
│ [123 Main Street_____]    [Springfield_______]                │
│                                                                 │
│ State                     ZIP Code                             │
│ [IL____]                  [62701______]                        │
│                                                                 │
│ OPTIONAL INFORMATION                                           │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Preferred Contact Method  [ ] Email  [ ] Phone  [ ] Mail      │
│                                                                 │
│ Notes / Initial Interest                                       │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Interested in scholarship programs...                   │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│                     [Save] [Cancel]                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Essential Fields (Required - marked with *)
- **First Name** - Text input
- **Last Name** - Text input
- **Email** - Email input with validation
- **Phone** - Phone number (formatted)

## Standard Fields (Recommended)
- **Street Address** - Text input
- **City** - Text input
- **State** - Dropdown or text
- **ZIP Code** - Text input

## Optional Fields
- **Preferred Contact Method** - Checkboxes (Email, Phone, Mail)
- **Notes** - Text area for initial interest, preferences, etc.

## Validation Rules
- First name and last name required
- Email required and must be valid format
- Phone optional but must be valid if provided
- No duplicate emails allowed
- ZIP code format validation

## User Actions
- Fill in form fields
- Click [Save] to create/update donor
- Click [Cancel] to discard changes and go back
- Form shows validation errors inline

## Form Behavior
- **On Create**: All fields empty (except optional notes field)
- **On Edit**: All fields pre-filled with existing data
- **On Save**: 
  - Validate all required fields
  - Show error messages if validation fails
  - Save to database
  - Redirect to donor profile
- **On Cancel**: Return to previous screen without saving

## Database Fields Needed
- Donors (id, first_name, last_name, email, phone, street_address, city, state, zip_code, preferred_contact_method, notes, created_at, updated_at)

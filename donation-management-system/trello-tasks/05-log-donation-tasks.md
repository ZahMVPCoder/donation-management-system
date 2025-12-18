# TRELLO BOARD: LOG A DONATION SCREEN

## Card 1: Design Log Donation Form
**Type**: Design  
**Priority**: High  
**Story Points**: 3  
**Assigned To**: [Designer]  
**Due Date**: [Date]

### Description
Create visual mockup and wireframe for the log donation form showing:
- Donor selector/search
- Amount input
- Date picker
- Donation method dropdown
- Campaign selector
- Recurring option
- Thank-you workflow checkboxes
- Save buttons

### Acceptance Criteria
- [ ] Wireframe created in Figma/design tool
- [ ] Form layout clean and logical
- [ ] All fields clearly labeled
- [ ] Date picker UI defined
- [ ] Dropdown options clear
- [ ] Thank-you workflow section distinct
- [ ] Action buttons prominent
- [ ] Mobile responsive design

### Dependencies
None

### Resources
- Specification: `screens/05-log-donation.md`

---

## Card 2: Create Donation API Endpoints
**Type**: Backend Development  
**Priority**: High  
**Story Points**: 5  
**Assigned To**: [Backend Dev]  
**Due Date**: [Date]

### Description
Create API endpoints for donation logging:
- POST `/api/donations` - Create new donation
- GET `/api/donors` - Fetch donors for dropdown
- GET `/api/campaigns` - Fetch campaigns for dropdown
- Validate donor exists
- Validate campaign if provided
- Create associated thank-you workflow tasks

### Acceptance Criteria
- [ ] POST creates donation record
- [ ] Donor validation works
- [ ] Campaign validation works
- [ ] Amount validation (positive number)
- [ ] Date validation (not in future)
- [ ] Method from predefined list
- [ ] Recurring fields saved if applicable
- [ ] Donation ID returned in response
- [ ] Error messages clear and helpful

### Dependencies
- Database schema for Donations, Donors, Campaigns

---

## Card 3: Build Log Donation Form Component
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 7  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Develop React form component for logging donations:
- Donor selector with search/autocomplete
- Amount input with currency formatting
- Date picker (calendar widget)
- Donation method dropdown
- Campaign dropdown (optional)
- Recurring donation checkbox and frequency
- Thank-you workflow checkboxes
- Save buttons

### Acceptance Criteria
- [ ] Component renders all form fields
- [ ] Donor selector searchable and autocomplete
- [ ] Amount formatted as currency
- [ ] Date picker shows calendar
- [ ] Method dropdown lists all options
- [ ] Campaign dropdown shows active campaigns
- [ ] Recurring checkbox toggles frequency field
- [ ] Thank-you checkboxes all functional
- [ ] Form validates before submit
- [ ] Loading state during submission
- [ ] Success message after submission

### Dependencies
- Card 1: Design completed
- Card 2: API endpoints ready

---

## Card 4: Implement Donor Selector with Autocomplete
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 4  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Create intelligent donor search/select field:
- Search donors by name, email, phone
- Autocomplete suggestions as user types
- Show recent donors first
- "Can't find? Add new donor" link
- Display donor info (last gift, total) in suggestions
- Prevent duplicate donations in same session

### Acceptance Criteria
- [ ] Search input functional
- [ ] Autocomplete suggestions appear
- [ ] Clicking suggestion selects donor
- [ ] Recent donors appear first
- [ ] "Add new donor" link works
- [ ] Donor preview shows in dropdown
- [ ] Empty search field shows recent donors
- [ ] One donor selected at a time

### Dependencies
- Card 3: Component built
- Card 2: Donor list API endpoint

---

## Card 5: Create Amount Input with Currency Formatting
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 2  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build amount input field with automatic currency formatting:
- Format as $1,234.56 as user types
- Accept numeric input only
- Show formatted value to user
- Store unformatted value in form state

### Acceptance Criteria
- [ ] Input accepts numbers and decimal
- [ ] Format automatically as user types
- [ ] Dollar sign displayed
- [ ] Comma separators for thousands
- [ ] Decimal places limited to 2
- [ ] Paste formatted values work
- [ ] Clear field value works

### Dependencies
- Card 3: Component built

---

## Card 6: Implement Date Picker
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Integrate calendar date picker for donation date:
- Default to today's date
- Calendar widget on input click
- Prevent future dates
- Show month/year navigation
- Format date as MM/DD/YYYY

### Acceptance Criteria
- [ ] Date picker opens on input focus/click
- [ ] Calendar shows current month
- [ ] Can navigate between months
- [ ] Clicking date selects it
- [ ] Today's date highlighted
- [ ] Future dates disabled
- [ ] Selected date formatted correctly
- [ ] Works on mobile/tablet

### Dependencies
- Card 3: Component built

---

## Card 7: Build Thank-You Workflow Configuration
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 4  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Create thank-you workflow options section:
- Checkbox: Send thank-you email automatically
- Checkbox: Create follow-up task for thank-you call
  - Input field for days until follow-up (default 3)
- Checkbox: Log donation in donor history
- Show which actions will be performed
- All checked by default

### Acceptance Criteria
- [ ] All checkboxes present and working
- [ ] Email checkbox can be unchecked
- [ ] Call task checkbox includes day input
- [ ] Day input accepts numbers
- [ ] History checkbox always available
- [ ] Default state: all checked
- [ ] Summary of actions shown
- [ ] Changes reflected in confirmation

### Dependencies
- Card 3: Component built

---

## Card 8: Create Donation Confirmation Modal
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build confirmation dialog before saving donation:
- Show donation summary (donor, amount, date, campaign)
- Show thank-you workflow summary
- Confirm/Edit buttons
- Success message after submission
- Option to log another donation

### Acceptance Criteria
- [ ] Confirmation modal displays all details
- [ ] Workflow actions listed clearly
- [ ] Confirm button saves donation
- [ ] Edit button returns to form
- [ ] Success message shown after save
- [ ] Donor profile link in success message
- [ ] "Log another" button resets form
- [ ] "Done" button returns to dashboard

### Dependencies
- Card 3: Component built

---

## Card 9: Implement Recurring Donation Logic
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Add recurring donation functionality:
- Checkbox to mark donation as recurring
- Frequency dropdown (Monthly, Quarterly, Semi-annually, Annually)
- Show next donation date
- Save recurring info with donation

### Acceptance Criteria
- [ ] Checkbox toggles recurring fields
- [ ] Frequency dropdown shows options
- [ ] Next donation date calculated
- [ ] Recurring info saved to database
- [ ] Non-recurring donations don't save frequency
- [ ] Frequency field disabled if not recurring

### Dependencies
- Card 3: Component built

---

## Card 10: Create Donation Form Tests
**Type**: Testing  
**Priority**: Medium  
**Story Points**: 5  
**Assigned To**: [QA / Dev]  
**Due Date**: [Date]

### Description
Write comprehensive tests for donation form:
- Component rendering tests
- Donor selector tests
- Amount formatting tests
- Date picker tests
- Validation tests
- Submission tests
- Workflow configuration tests

### Acceptance Criteria
- [ ] All fields render correctly
- [ ] Donor search/select works
- [ ] Amount formatting correct
- [ ] Date picker functional
- [ ] Validation rules enforced
- [ ] Form submits correctly
- [ ] API called with correct data
- [ ] Thank-you workflow configured correctly
- [ ] Error handling works
- [ ] Test coverage >80%

### Dependencies
- All development cards completed

---

## Card 11: Log Donation Form Documentation
**Type**: Documentation  
**Priority**: Low  
**Story Points**: 2  
**Assigned To**: [Tech Writer]  
**Due Date**: [Date]

### Description
Document the donation logging process:
- How to log a new donation
- How to set up thank-you workflow
- How to log recurring donations
- How to handle special cases
- Troubleshooting

### Acceptance Criteria
- [ ] Step-by-step user guide
- [ ] Screenshots included
- [ ] Workflow options explained
- [ ] API documentation complete
- [ ] Error messages documented

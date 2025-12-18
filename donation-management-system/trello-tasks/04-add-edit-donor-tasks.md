# TRELLO BOARD: ADD / EDIT DONOR FORM SCREEN

## Card 1: Design Add/Edit Donor Form
**Type**: Design  
**Priority**: High  
**Story Points**: 3  
**Assigned To**: [Designer]  
**Due Date**: [Date]

### Description
Create visual mockup and wireframe for the add/edit donor form showing:
- Essential fields (first name, last name, email, phone)
- Standard fields (address, city, state, zip)
- Optional fields (preferred contact method, notes)
- Form labels and input types
- Validation messages
- Save/Cancel buttons

### Acceptance Criteria
- [ ] Wireframe created in Figma/design tool
- [ ] Form layout clean and simple
- [ ] All fields clearly labeled
- [ ] Required fields indicated (asterisks)
- [ ] Input field types appropriate (email, phone, etc.)
- [ ] Error message placement clear
- [ ] Button placement prominent
- [ ] Responsive design for mobile

### Dependencies
None

### Resources
- Specification: `screens/04-add-edit-donor.md`

---

## Card 2: Create Donor Form API Endpoints
**Type**: Backend Development  
**Priority**: High  
**Story Points**: 4  
**Assigned To**: [Backend Dev]  
**Due Date**: [Date]

### Description
Create API endpoints for donor form operations:
- POST `/api/donors` - Create new donor
- PUT `/api/donors/:id` - Update existing donor
- GET `/api/donors/:id` - Fetch donor for edit form
- Validate email uniqueness
- Validate input data

### Acceptance Criteria
- [ ] POST creates new donor with validation
- [ ] PUT updates existing donor
- [ ] Email validated for uniqueness
- [ ] Phone number validated if provided
- [ ] ZIP code format validated
- [ ] All required fields checked
- [ ] 400 returned for validation errors
- [ ] 404 returned for non-existent donor on PUT
- [ ] Error messages clear

### Dependencies
- Database schema for Donors table

---

## Card 3: Build Add/Edit Donor Form Component
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 6  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Develop React form component for adding/editing donors:
- Form fields for all donor data
- Conditional rendering (create vs. edit mode)
- Form validation and error display
- Save and Cancel buttons
- Loading state during submit
- Success/error messages

### Acceptance Criteria
- [ ] Create mode shows empty form
- [ ] Edit mode pre-fills form with donor data
- [ ] All fields accept input correctly
- [ ] Phone number formatted (555) 123-4567
- [ ] Email field validates email format
- [ ] ZIP code field accepts 5-digit format
- [ ] Form submits on Save button click
- [ ] Cancel button returns without saving
- [ ] Loading spinner shown during submit
- [ ] Success message shown after save
- [ ] Error messages displayed clearly

### Dependencies
- Card 1: Design completed
- Card 2: API endpoints ready

---

## Card 4: Implement Form Validation
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 4  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build comprehensive form validation:
- Required field validation
- Email format validation
- Phone number format validation
- ZIP code format validation
- Real-time validation (as user types)
- Submit button disabled until valid
- Clear error messages

### Acceptance Criteria
- [ ] First name required
- [ ] Last name required
- [ ] Email required and valid format
- [ ] Email must be unique (check via API)
- [ ] Phone optional but must be valid if provided
- [ ] ZIP code optional but must be 5 digits if provided
- [ ] State optional but from dropdown if provided
- [ ] Error messages appear below fields
- [ ] Submit button disabled if validation fails
- [ ] Validation runs real-time

### Dependencies
- Card 3: Component built

---

## Card 5: Add Phone Number Formatting
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 2  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Implement automatic phone number formatting:
- Format as (555) 123-4567 as user types
- Accept numbers only in phone field
- Remove special characters on save
- Display formatted version to user

### Acceptance Criteria
- [ ] Phone field formats as user types
- [ ] Format matches (XXX) XXX-XXXX
- [ ] Non-numeric characters ignored
- [ ] Existing phone numbers formatted on load
- [ ] Formatted version saved to database
- [ ] Works on all devices/browsers

### Dependencies
- Card 3: Component built

---

## Card 6: Create Donor Form Tests
**Type**: Testing  
**Priority**: Medium  
**Story Points**: 4  
**Assigned To**: [QA / Dev]  
**Due Date**: [Date]

### Description
Write comprehensive tests for donor form:
- Component rendering tests
- Form field tests
- Validation tests
- Submit tests
- API integration tests
- Error handling tests

### Acceptance Criteria
- [ ] Component renders correctly
- [ ] All form fields accept input
- [ ] Validation rules tested
- [ ] Required field validation works
- [ ] Email validation works
- [ ] Phone formatting tested
- [ ] Form submit creates/updates donor
- [ ] API errors handled
- [ ] Duplicate email prevented
- [ ] Test coverage >80%

### Dependencies
- Cards 3-5 completed

---

## Card 7: Add Cancel/Discard Changes Confirmation
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 2  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Implement confirmation dialog if user tries to discard unsaved changes:
- Show modal when Cancel clicked and form modified
- "Are you sure?" message
- Confirm/Cancel buttons
- Only show if changes made

### Acceptance Criteria
- [ ] Confirmation modal shown only if form changed
- [ ] Modal message clear
- [ ] Confirm button discards changes
- [ ] Cancel button returns to form
- [ ] Browser back navigation also triggers confirmation
- [ ] No modal if no changes made

### Dependencies
- Card 3: Component built

---

## Card 8: Implement Form State Management
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Set up form state management:
- Track form dirty state
- Save form state to detect changes
- Clear state on successful save
- Handle async validation errors

### Acceptance Criteria
- [ ] Form tracks dirty state correctly
- [ ] Submit button enabled/disabled appropriately
- [ ] Unsaved changes detected
- [ ] State cleared after successful save
- [ ] Validation errors tracked
- [ ] Form state logged for debugging

### Dependencies
- Card 3: Component built

---

## Card 9: Form Accessibility & UX Polish
**Type**: Frontend Development  
**Priority**: Low  
**Story Points**: 2  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Improve form accessibility and user experience:
- Proper label associations
- Tab order logical
- Error message announcements (ARIA)
- Required field indicator
- Tooltips for help text
- Mobile-friendly input

### Acceptance Criteria
- [ ] All form labels associated with inputs
- [ ] Tab order logical
- [ ] Error messages announced to screen readers
- [ ] Required fields indicated visually and in markup
- [ ] Help text available for complex fields
- [ ] Mobile keyboard types appropriate (email@, phone, etc.)
- [ ] Touch targets adequate size

### Dependencies
- Card 3: Component built

---

## Card 10: Write Donor Form Documentation
**Type**: Documentation  
**Priority**: Low  
**Story Points**: 2  
**Assigned To**: [Tech Writer]  
**Due Date**: [Date]

### Description
Document the donor form including:
- How to create a new donor
- How to edit existing donor
- Validation rules
- Field requirements
- Error messages and solutions

### Acceptance Criteria
- [ ] User guide written
- [ ] Screenshots included
- [ ] Validation rules documented
- [ ] API documentation complete
- [ ] Examples provided

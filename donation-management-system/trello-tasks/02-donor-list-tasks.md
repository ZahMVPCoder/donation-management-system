# TRELLO BOARD: DONOR LIST / SEARCH SCREEN

## Card 1: Design Donor List Interface & Wireframe
**Type**: Design  
**Priority**: High  
**Story Points**: 3  
**Assigned To**: [Designer]  
**Due Date**: [Date]

### Description
Create visual mockup and wireframe for the donor list screen showing:
- Donors in table/list format
- Name, Status, Last Gift, Total Giving columns
- Search bar with real-time filtering
- Filter dropdown/panel
- Pagination controls
- Action buttons (Add Donor, Export)

### Acceptance Criteria
- [ ] Wireframe created in Figma/design tool
- [ ] Table layout finalized with column widths
- [ ] Search and filter UI components defined
- [ ] Status indicators (Active, Lapsed, New) visually distinct
- [ ] Responsive design for mobile/tablet included
- [ ] Design approved by stakeholders

### Dependencies
None

### Resources
- Specification: `screens/02-donor-list.md`

---

## Card 2: Implement Database Query for Donor List
**Type**: Backend Development  
**Priority**: High  
**Story Points**: 5  
**Assigned To**: [Backend Dev]  
**Due Date**: [Date]

### Description
Create optimized database queries for fetching donor list with filtering:
- GET `/api/donors` - List all donors with pagination
- GET `/api/donors/search?q=term` - Search donors by name/email/phone
- GET `/api/donors/filter?status=active` - Filter by status
- GET `/api/donors?sortBy=lastGift` - Sortable results
- Include pagination (limit, offset)

### Acceptance Criteria
- [ ] Queries optimized with proper indexes
- [ ] Pagination working (20 per page default)
- [ ] Search returns results in <200ms
- [ ] Filtering by status/giving amount works
- [ ] Sort by last gift, total giving works
- [ ] Donor status correctly calculated from donation history
- [ ] API documented with examples

### Dependencies
- Database schema with Donors and Donations tables

---

## Card 3: Build Donor List React Component
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 8  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Develop the donor list React component with:
- Table display of donors
- Search functionality (real-time)
- Filter controls (status, giving amount, time period)
- Pagination controls
- Click donor name to go to profile
- Add Donor button
- Export functionality

### Acceptance Criteria
- [ ] Component renders donor table correctly
- [ ] Search works and filters results in real-time
- [ ] Filter dropdown shows all options
- [ ] Pagination controls work correctly
- [ ] Clicking donor name navigates to profile
- [ ] Add Donor button opens form
- [ ] Export button downloads CSV
- [ ] Loading states shown
- [ ] Error handling implemented
- [ ] Responsive on mobile

### Dependencies
- Card 1: Design completed
- Card 2: API endpoints ready

---

## Card 4: Implement Real-Time Search Filtering
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 4  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build real-time search that filters donors as user types:
- Search by name, email, phone
- Debounce search input (300ms)
- Show loading indicator while searching
- Highlight search terms in results
- Display "no results" message if needed

### Acceptance Criteria
- [ ] Search input debounced properly
- [ ] Results update as user types
- [ ] Search works across name, email, phone
- [ ] Loading state shown during search
- [ ] Search terms highlighted in results
- [ ] No results message displayed when appropriate
- [ ] Search performance acceptable

### Dependencies
- Card 3: Component built
- Card 2: Search API endpoint ready

---

## Card 5: Add Advanced Filtering Panel
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 5  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Create filter panel allowing users to filter donors by:
- Status (Active, Lapsed, New, Inactive)
- Giving Amount (High, Medium, Low - configurable thresholds)
- Time Period (Last 30 days, 90 days, 1 year, all time)
- Campaign affiliation
- Custom date range
- Save/apply filters
- Clear all filters button

### Acceptance Criteria
- [ ] Filter UI component created
- [ ] All filter options working
- [ ] Multiple filters can be applied together
- [ ] Filter results accurate
- [ ] Filter state shows in URL (shareable links)
- [ ] Clear all button resets to default
- [ ] Mobile-friendly filter UI
- [ ] Filter combinations tested

### Dependencies
- Card 3: Base component built
- Card 2: Filter API endpoints ready

---

## Card 6: Implement Donor List Pagination
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build pagination controls for the donor list:
- Show 20 donors per page
- Previous/Next buttons
- Page number selector
- Total count display
- Jump to page input
- Remember page position

### Acceptance Criteria
- [ ] Pagination controls display correctly
- [ ] Previous/Next buttons work
- [ ] Page selector works
- [ ] Total donor count shown
- [ ] URL reflects current page
- [ ] Page position remembered on reload
- [ ] Works with search and filters

### Dependencies
- Card 3: Component built
- Card 2: Pagination-aware API ready

---

## Card 7: Add Column Sorting
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Make table columns sortable:
- Click column header to sort
- Sort ascending/descending (toggle)
- Visual indicator for sort direction
- Sort by name, last gift, total giving
- Sort state saved in URL

### Acceptance Criteria
- [ ] All sortable columns identified
- [ ] Click header sorts correctly
- [ ] Visual indicator shows sort direction
- [ ] Toggle between ascending/descending works
- [ ] Sort state in URL
- [ ] Sort works with filtered results
- [ ] Performance acceptable with large datasets

### Dependencies
- Card 3: Component built

---

## Card 8: Create Export Donor List Feature
**Type**: Frontend Development  
**Priority**: Low  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Add ability to export visible donor list as CSV/Excel:
- Export button in toolbar
- Export current filtered/sorted view
- Include all visible columns
- Filename with date
- Handle large exports gracefully

### Acceptance Criteria
- [ ] Export button present
- [ ] CSV file generated correctly
- [ ] Exported data matches current view
- [ ] Filename includes date
- [ ] Large exports don't crash UI
- [ ] Excel format also supported
- [ ] User can choose columns to export

### Dependencies
- Card 3: Component built

---

## Card 9: Write Donor List Tests
**Type**: Testing  
**Priority**: Medium  
**Story Points**: 5  
**Assigned To**: [QA / Dev]  
**Due Date**: [Date]

### Description
Write comprehensive tests for donor list:
- Component rendering tests
- Search functionality tests
- Filter tests (all filter types)
- Pagination tests
- Sort tests
- API endpoint tests
- Integration tests

### Acceptance Criteria
- [ ] Unit tests for each component piece
- [ ] Search tested with various inputs
- [ ] All filter combinations tested
- [ ] Pagination logic tested
- [ ] Sort functionality tested
- [ ] API tests verify correct data
- [ ] Error scenarios handled
- [ ] Test coverage >80%

### Dependencies
- All development cards completed

---

## Card 10: Donor List Performance & Optimization
**Type**: Performance  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
cc:
- Virtual scrolling for large lists
- Memoize table rows
- Debounce search input
- Lazy load images
- Optimize API queries

### Acceptance Criteria
- [ ] List loads in <1 second for 100 donors
- [ ] Scrolling smooth with 1000+ donors
- [ ] Search debounced (300ms)
- [ ] No unnecessary re-renders
- [ ] Memory usage within limits
- [ ] Lighthouse performance >80

### Dependencies
- Card 3: Component built

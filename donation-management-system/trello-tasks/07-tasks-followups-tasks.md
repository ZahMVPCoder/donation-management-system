# TRELLO BOARD: TASKS / FOLLOW-UPS VIEW SCREEN

## Card 1: Design Tasks / Follow-ups Interface & Wireframe
**Type**: Design  
**Priority**: High  
**Story Points**: 3  
**Assigned To**: [Designer]  
**Due Date**: [Date]

### Description
Create visual mockup and wireframe for tasks/follow-ups view showing:
- Filter and sort controls
- Grouped tasks by urgency (Overdue, This Week, Later)
- Task list with checkboxes
- Task type badges
- Due dates
- Action buttons

### Acceptance Criteria
- [ ] Wireframe created in Figma/design tool
- [ ] Grouping by urgency clear
- [ ] Urgency colors/indicators defined
- [ ] Checkbox placement clear
- [ ] Filter/sort UI defined
- [ ] Mobile responsive design
- [ ] Task expansion preview shown
- [ ] Design approved

### Dependencies
None

### Resources
- Specification: `screens/07-tasks-followups.md`

---

## Card 2: Create Tasks API Endpoints
**Type**: Backend Development  
**Priority**: High  
**Story Points**: 5  
**Assigned To**: [Backend Dev]  
**Due Date**: [Date]

### Description
Create API endpoints for task management:
- GET `/api/tasks` - List all open tasks (paginated)
- GET `/api/tasks?status=open` - Filter by status
- GET `/api/tasks?type=thank-you` - Filter by type
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update task (mark complete, reassign)
- DELETE `/api/tasks/:id` - Delete task
- Group tasks by urgency level

### Acceptance Criteria
- [ ] GET returns tasks with related donor/donation info
- [ ] Filtering by status/type works
- [ ] Tasks grouped by urgency (calculated server-side)
- [ ] Pagination working
- [ ] POST creates task with validation
- [ ] PUT marks task complete and logs completion
- [ ] DELETE removes task with authorization
- [ ] Task due date calculation correct
- [ ] Performance acceptable

### Dependencies
- Database schema for Tasks, Donations, Donors

---

## Card 3: Build Tasks/Follow-ups View Component
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 8  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Develop the tasks view React component with:
- Task list grouped by urgency
- Checkboxes to mark tasks complete
- Filter controls
- Sort options
- Task expansion for details
- Action buttons

### Acceptance Criteria
- [ ] Component fetches and displays all tasks
- [ ] Tasks grouped by urgency
- [ ] Checkboxes functional (mark complete)
- [ ] Filter dropdown shows all options
- [ ] Sort dropdown working
- [ ] Tasks sortable by all options
- [ ] Task details expandable
- [ ] Donor names clickable
- [ ] New task button opens modal
- [ ] Loading states shown
- [ ] Error handling in place

### Dependencies
- Card 1: Design completed
- Card 2: API endpoints ready

---

## Card 4: Implement Task Grouping by Urgency
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 4  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build task grouping and organization:
- Group tasks into: Overdue, Due This Week, Due Later
- Calculate urgency based on due date
- Show count of tasks in each group
- Expand/collapse groups
- Sort within groups

### Acceptance Criteria
- [ ] Urgency grouping correct
- [ ] Overdue tasks at top
- [ ] Group headers show counts
- [ ] Groups expandable/collapsible
- [ ] Tasks sorted within groups
- [ ] Color-coded by urgency
- [ ] Responsive for mobile

### Dependencies
- Card 3: Component built

---

## Card 5: Create Task Filter Panel
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 4  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build comprehensive task filtering:
- Filter by status (Open, Completed, All)
- Filter by type (Thank-you, Follow-up, Check-in, Event, etc.)
- Filter by assigned to
- Filter by date range
- Show/hide completed tasks toggle
- "Clear all filters" button

### Acceptance Criteria
- [ ] All filter options working
- [ ] Multiple filters combinable
- [ ] Filter state shown
- [ ] Clear all button resets filters
- [ ] Show completed toggle works
- [ ] Filter results accurate
- [ ] Filter state in URL (shareable)
- [ ] Mobile-friendly filters

### Dependencies
- Card 3: Component built

---

## Card 6: Implement Task Sorting
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build task sorting options:
- Sort by Urgency (default)
- Sort by Due Date
- Sort by Donor Name
- Sort by Task Type
- Sort by Date Created
- Ascending/Descending toggle

### Acceptance Criteria
- [ ] Sort dropdown shows all options
- [ ] Default sort by urgency
- [ ] Each sort option works
- [ ] Ascending/descending toggle
- [ ] Visual indicator for current sort
- [ ] Sort state saved in URL
- [ ] Sorting works with filters

### Dependencies
- Card 3: Component built

---

## Card 7: Build Task Expansion / Details View
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Create expandable task details:
- Click task to expand details
- Show full task information
- Show related donor and donation
- Show task history/notes
- Edit and delete options

### Acceptance Criteria
- [ ] Click expands task details
- [ ] Full task info displayed
- [ ] Donor link clickable
- [ ] Related donation shown
- [ ] Task history/notes visible
- [ ] Edit button opens form
- [ ] Delete button shows confirmation
- [ ] Smooth animation on expand

### Dependencies
- Card 3: Component built

---

## Card 8: Implement Task Completion Logic
**Type**: Frontend Development  
**Priority**: High  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build task completion functionality:
- Checkbox to mark task complete
- Confirmation optional for important tasks
- Log completion time
- Move completed task out of view
- Show completed tasks separately or hidden

### Acceptance Criteria
- [ ] Checkbox marks task complete
- [ ] Completion time logged
- [ ] Completed tasks moved/hidden
- [ ] Show completed toggle works
- [ ] Revert completion option
- [ ] Completion recorded in database
- [ ] Reflects immediately in UI

### Dependencies
- Card 3: Component built

---

## Card 9: Create New Task Modal/Form
**Type**: Frontend Development  
**Priority**: Medium  
**Story Points**: 4  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Build modal for creating new tasks:
- Task title input
- Task type selector
- Select related donor (or none)
- Select related donation (optional)
- Due date picker
- Description text area
- Save/Cancel buttons

### Acceptance Criteria
- [ ] Modal opens from button
- [ ] All fields present
- [ ] Type dropdown shows all types
- [ ] Donor autocomplete working
- [ ] Date picker functional
- [ ] Form validates
- [ ] Save creates task
- [ ] Cancel closes modal
- [ ] Task appears in list after create

### Dependencies
- Card 3: Component built

---

## Card 10: Add Task Templates
**Type**: Frontend Development  
**Priority**: Low  
**Story Points**: 3  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Create quick task templates for common follow-ups:
- "Send Thank-you" template
- "Quarterly Check-in" template
- "Renewal Reminder" template
- "Follow-up Call" template
- Select template when creating task
- Pre-fills fields based on template

### Acceptance Criteria
- [ ] Task type dropdown shows templates
- [ ] Selecting template pre-fills form
- [ ] Template defaults adjustable
- [ ] Custom tasks still creatable
- [ ] Templates save time for common tasks

### Dependencies
- Card 9: Task creation modal built

---

## Card 11: Create Tasks/Follow-ups Tests
**Type**: Testing  
**Priority**: Medium  
**Story Points**: 5  
**Assigned To**: [QA / Dev]  
**Due Date**: [Date]

### Description
Write comprehensive tests for tasks view:
- Component rendering tests
- Task grouping tests
- Filter tests
- Sort tests
- Completion tests
- Create/update/delete tests

### Acceptance Criteria
- [ ] Component renders correctly
- [ ] Grouping by urgency correct
- [ ] All filters work
- [ ] All sorts work
- [ ] Task completion works
- [ ] CRUD operations tested
- [ ] Error handling tested
- [ ] API integration tested
- [ ] Test coverage >80%

### Dependencies
- All development cards completed

---

## Card 12: Tasks/Follow-ups Performance Optimization
**Type**: Performance  
**Priority**: Low  
**Story Points**: 2  
**Assigned To**: [Frontend Dev]  
**Due Date**: [Date]

### Description
Optimize tasks view performance:
- Virtual scrolling for long lists
- Memoize task components
- Lazy load task details
- Cache task data

### Acceptance Criteria
- [ ] View loads in <1 second
- [ ] Smooth scrolling with 100+ tasks
- [ ] No unnecessary re-renders
- [ ] Memory usage optimized
- [ ] Lighthouse score >85

### Dependencies
- All development cards completed

---

## Card 13: Tasks/Follow-ups Documentation
**Type**: Documentation  
**Priority**: Low  
**Story Points**: 2  
**Assigned To**: [Tech Writer]  
**Due Date**: [Date]

### Description
Document the tasks/follow-ups screen:
- How to view tasks
- How to create tasks
- How to mark tasks complete
- How to use filters and sorting
- Task type descriptions
- Best practices for follow-ups

### Acceptance Criteria
- [ ] User guide written
- [ ] Screenshots included
- [ ] Task types explained
- [ ] Filter options documented
- [ ] Examples provided
- [ ] Workflow described

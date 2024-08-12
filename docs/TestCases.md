# Test cases

Below is a list of test cases currently covered by automated scripts for the **EngageSphere** application.

The tests cover both the API and Graphical User Interface (GUI.)

> The GUI tests cover integrated frontend tests, accessibility (a11y) tests, and component tests.

## API tests

When sending a GET request to the `/customers` endpoint:

- It returns the correct status and body structure
- It returns an empty array of customers when in an empty page
- It paginates the customer list correctly
- It filters limit of customers correctly
- It filters customers by size correctly
- It handles invalid requests gracefully (e.g., negative page)
- It handles invalid requests gracefully (e.g., negative limit)
- It handles invalid requests gracefully (e.g., page=0)
- It handles invalid requests gracefully (e.g., limit=0)
- It handles invalid requests gracefully (e.g., page as a string)
- It handles invalid requests gracefully (e.g., limit as a boolean)
- It handles invalid requests gracefully (e.g., unsupported size)

## GUI tests

Below are the three kinds of GUI tests:

### Frontend integrated tests

Below are the three kinds of GUI tests:

### Frontend integrated tests

- It filters by All sizes
- It filters by Small size
- It filters by Medium size
- It filters by Enterprise size
- It filters by Large Enterprise size
- It filters by Very Large Enterprise size
- It persists the limit of items per page in the local storage when changing the limit
- It triggers the correct request when clicking the Next and Prev buttons
- It goes back to the customers list when clicking the "Back" button
- It shows the image of an empty box and the text "No customers available." when there are no customers in the database
- It disables the name text input field when there are no customers in the database
- It shows a Loading... fallback element before the initial customers' fetch

### A11y tests

- Customers table
  - It finds no a11y issues in light mode
  - It finds no a11y issues in dark mode
  - Empty state
    - It finds no a11y issues in light mode
    - It finds no a11y issues in dark mode
- Customer details and address
  - It finds no a11y issues in light mode
  - It finds no a11y issues in dark mode
- Without customers (empty state)
  - It finds no a11y issues in light mode
  - It finds no a11y issues in dark mode

### Component tests

- `<CustomerDetails />`
  - It renders with contact details
  - It renders a fallback paragraph ('No contact info available') when contact details are not available
  - It shows and hides customer address
  - It renders a fallback paragraph ('No address available') when address is not available
- `<DownloadCSV />`
  - It correctly downloads a list of customers as a CSV file
- `<Footer />`
  - It renders with the right text and links
- `<Greeting />`
  - It renders "Hi there" when no name is provided
  - It renders "Hi Joe" when name is provided
- `<Header />`
  - It renders with heading and theme's toggle
  - It changes to the dark mode then back to light mode
- `<Input />`
  - It renders enabled
  - It renders disabled
- `<Pagination />`
  - It renders in the middle page (both Prev and Next buttons are enabled)
  - It renders in the first of two pages (Prev button is disabled)
  - It renders in the last of two pages (Next button is disabled)
  - It renders the Prev and Next buttons disabled when there is only one page
  - It renders with a limit of 50 items per page
- `<Table />`
  - It shows a list of customers when there's data in the database
  - It sorts by Size in descending order by default
  - It sorts by Size in ascending order
  - It sorts by Number of employees in descending order
  - It sorts by Number of employees in ascending order
  - Mobile
    - It shows the Company name and Action columns, and hides the ID, Number of Employees, and Size columns

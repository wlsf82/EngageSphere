# Test cases

Below is a list of test cases currently covered by automated scripts for the **EngageSphere** application.

The tests cover both the API and Graphical User Interface (GUI.)

> The GUI tests cover integrated frontend tests, accessibility (a11y) tests, and component tests.

## API tests

Below is the list of all the API tests.

```sh
cypress/e2e/api/EngageSphere.cy.js (14 tests)
└─ EngageSphere API
  ├─ General
  │ ├─ returns the correct status and body structure on a simple get request (with default query params.)
  │ └─ returns an empty array of customers when in an empty page
  ├─ Pagination
  │ ├─ gets customers from page 2
  │ └─ filters by limit of customers
  ├─ Size filtering
  │ └─ filters customers by size
  ├─ Industry filtering
  │ └─ filters customers by industry
  └─ Error scenarios
    ├─ handles invalid requests gracefully (e.g., negative page)
    ├─ handles invalid requests gracefully (e.g., negative limit)
    ├─ handles invalid requests gracefully (e.g., page=0)
    ├─ handles invalid requests gracefully (e.g., limit=0)
    ├─ handles invalid requests gracefully (e.g., page as a string)
    ├─ handles invalid requests gracefully (e.g., limit as a boolean)
    ├─ handles invalid requests gracefully (e.g., unsupported size)
    └─ handles invalid requests gracefully (e.g., unsupported industry)

```

## GUI tests

Below are the three kinds of GUI tests:

### Frontend integrated and a11y tests

Below is a list of all the frontend integrated and a11y tests.

```sh
cypress/e2e/gui/EngageSphere.cy.js (28 tests)
├─ EngageSphere Frontend
│ ├─ Filtering
│ │ ├─ keeps the filters when coming back from the customer details view
│ │ ├─ re-enables the input field when coming back from an empty state filter to a non-empty one
│ │ ├─ By size
│ │ │ ├─ filters by All
│ │ │ ├─ filters by Small
│ │ │ ├─ filters by Medium
│ │ │ ├─ filters by Enterprise
│ │ │ ├─ filters by Large Enterprise
│ │ │ └─ filters by Very Large Enterprise
│ │ └─ By industry
│ │   ├─ filters by All
│ │   ├─ filters by Logistics
│ │   ├─ filters by Retail
│ │   ├─ filters by Technology
│ │   ├─ filters by HR
│ │   └─ filters by Finance
│ ├─ Pagination
│ │ ├─ persists the limit of items per page in the local storage when changing the limit
│ │ └─ triggers the correct request when clicking the Next and Prev buttons
│ └─ Customer details
│   └─ goes back to the customers list when clicking the "Back" button
├─ EngageSphere Frontend - empty state
│ ├─ shows the image of an empty box and the text "No customers available." when there are no customers in the database
│ └─ disables the name text input field when there are no customers in the database
├─ EngageSphere Frontend - A11y
│ ├─ With customers
│ │ ├─ Customers table
│ │ │ ├─ finds no a11y issues in light mode
│ │ │ └─ finds no a11y issues in dark mode
│ │ └─ Customer details and address
│ │   ├─ finds no a11y issues in light mode
│ │   └─ finds no a11y issues in dark mode
│ └─ Without customers (empty state)
│   ├─ finds no a11y issues in light mode
│   └─ finds no a11y issues in dark mode
├─ EngageSphere Frontend - Loading fallback
│ └─ shows a Loading... fallback element before the initial customers' fetch
└─ Cookie consent
  ├─ accepts the cookies
  └─ declines the cookies

```

### Component tests

Below is a list of all the component tests.

```sh
frontend/src/components/Button/Button.cy.js (2 tests)
└─ <Button />
  ├─ renders with a sample text
  └─ renders with an icon and text

frontend/src/components/CookieConsent/CookieConsent.cy.js (2 tests)
└─ <CookieConsent />
  ├─ renders in light mode and finds no a11y issues
  └─ renders in dark mode and finds no a11y issues

frontend/src/components/CustomerDetails/CustomerDetails.cy.js (4 tests)
└─ <CustomerDetails />
  ├─ renders with contact details
  ├─ renders a fallback paragraph ('No contact info available') when contact details are not available
  ├─ shows and hides customer address
  └─ renders a fallback paragraph ('No address available') when address is not available

frontend/src/components/DownloadCSV/DownloadCSV.cy.js (1 test)
└─ <DownloadCSV />
  └─ correctly downloads a list of customers as a CSV file

frontend/src/components/Footer/Footer.cy.js (1 test)
└─ <Footer />
  └─ renders with the right text and links

frontend/src/components/Greeting/Greeting.cy.js (3 tests)
└─ <Greeting />
  ├─ renders "Hi there" when no name is provided
  ├─ renders "Hi Joe" when name is provided
  └─ renders the easteregg

frontend/src/components/Header/Header.cy.js (2 tests)
└─ <Header />
  ├─ renders with heading, theme's toggle, and a text input field
  └─ changes to the dark mode then back to light mode

frontend/src/components/Input/Input.cy.js (3 tests)
└─ <Input />
  ├─ renders enabled
  ├─ renders disabled
  └─ limits the input data to 40 characters

frontend/src/components/Messenger/Messenger.cy.js (6 tests)
└─ <Messenger />
  ├─ Light mode
  │ ├─ opens and closes the messenger and finds no a11y issue
  │ ├─ makes sure all fields are mandatory and the first one is focused
  │ ├─ shows and hides a success message when successfully submitting the form
  │ └─ clears all form fields when filling them, closing the messenger, and opening it again
  └─ Dark mode
    ├─ finds on a11y issues with the bubble button
    └─ successfully submits the form and finds no a11y issue

frontend/src/components/Pagination/Pagination.cy.js (5 tests)
└─ <Pagination />
  ├─ renders in the middle page (both Prev and Next buttons are enabled)
  ├─ renders in the first of two pages (Prev button is disabled)
  ├─ renders in the last of two pages (Next button is disabled)
  ├─ renders the Prev and Next buttons disabled when there is only one page
  └─ renders with a limit of 50 items per page

frontend/src/components/Table/Table.cy.js (6 tests)
├─ <Table />
│ ├─ shows a list of customers when there's data in the database
│ ├─ sorts by Size in descending order by default
│ ├─ sorts by Size in ascending order
│ ├─ sorts by Number of employees in descending order
│ └─ sorts by Number of employees in ascending order
└─ <Table /> mobile
  └─ shows the Company name and Action columns, and hides the ID, Industry, Number of Employees, and Size columns

```

## `find-cypress-specs`

The above lists of test cases were generated using the [`find-cypress-specs`](https://www.npmjs.com/package/find-cypress-specs) library, using the below commands:

```sh
npx find-cypress-specs --names # Get the list of all e2e tests

npx find-cypress-specs --names --component # Get the list of all component tests

```

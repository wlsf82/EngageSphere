# Test cases

Below is a list of test cases that should be covered by automated scripts for the **EngageSphere** application.

The tests should cover both the API and Graphical User Interface (GUI.)

## API

When sending a POST request to the `/customers` endpoint:

- Returns a 200 status code
- Returns the `customers` and `pageInfo` properties
- Returns the right customer's size based on the number of employees

## GUI

- Shows the default greeting (i.e., Hi there! ...)
- Shows a customized greeting (e.g., Hi Joe! ...)
- Shows a list of customers when there's data in the database
- Shows the image of an empty box and the text "No customers available." when there are not customers in the database
- Disables the text input field when in the customer details page
- Shows the contact info of a specific customer
- Shows "No contact info available" for a customer without contact info
- Goes back to the customers list when clicking the "Back to the list" button
- Sorts by Number of employees in ascending order
- Sorts by Number of employees in descending order
- Sorts by Size in ascending order
- Sorts by Size in descending order by default
- Shorts in descending order by default when changing the sorting column
- Disables the Prev pagination button when in the first page
- Disables the Next pagination button when in the last page
- Disables both the Prev and Next pagination buttons when there's only one page
- Shows "Page 1 of n" (where 'n' is the number of pages)

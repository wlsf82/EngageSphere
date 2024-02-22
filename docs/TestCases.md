# Test cases

Below is a list of test cases that should be covered by automated scripts for the **EngageSphere** application.

The tests should cover both the API and Graphical User Interface (GUI).

## API

- Returns a 200 status code when sending a POST request to the existing endpoint
- Returns the `name`, `timestamp`, and `customers` property when sending a POST request to the existing endpoint
- Returns the right customer's size based on the number of employees when sending a POST request to the existing endpoint

## GUI

- Shows an error message when submitting the form without providing the name
- Typing a name and submitting the form directs the user to the customer's list
- Typing a name and submitting the form shows a greeting and a table with the headers "Name", "# of employees", and "Size"
- Shows the right customer's size based on the number of employees
- Shows the contact info of a specific customer
- Shows "No contact info available" for a customer without contact info
- Goes back to the customer's list when clicking the "Back to the list" button
- Sorts by Name in ascending order by default
- Sorts by Name in descending order
- Sorts by # of employees in ascending
- Sorts by # of employees in descending order
- Sorts by Size in ascending
- Sorts by Size in descending order

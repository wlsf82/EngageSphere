# EngageSphere

The **EngageSphere** web application is aimed at our salespeople so they can access our customer's contact information.

## Graphical User Interface

As soon as the user access the application, he/she can type his/her name, which will show in the greeting (e.g., Hi Joe! It is Friday, February 23, 2024.)

If no name is provided, a default greeting is shown instead (i.e., Hi there! ...)

If there are no customers in the database, the text input field gets disabled.

### Theme

The EngageSphere application offers two themes (light and dark.) Light is the default theme.

When in light mode, a half-moon is shown just below the application's heading, which allows switching to the dark mode.

When in dark mode, a sun is shown just below the application's heading, which allows switching to the light mode.

The CSS is adjusted to light or dark mode depending on the selected theme.

The theme is persisted in the local storage, and the last chosen one is kept in case of a page load.

### Footer

Independent of the view, the application always shows a footer with the text "Copyright 2024 - Talking About Testing", and links to TAT's Hotmart, Udemy, Blog, and YouTube.

### Customers' table

The customers' table shows the list of registered customers in the database.

Before the initial table rendering (while the first request to get customers is happening), a fallback paragraph with the text 'Loading...' is shown instead.

When the request is finished, the customers' table is rendered.

For each customer, the following information is displayed (if the viewport width is greater than `468px`):

- **ID**
- **Company name**
- **Number of employees**
- **Size**: if **Number of employees** is less than 100, size is **Small**; if greater than or equal to 100 and less than 1000, **Medium**; if greater than or equal to 1000 and less than 10000, **Enterprise**; if greater than or equal to 10000 and less than 50000 **Large Enterprise**; otherwise, **Very Large Enterprise**

If the viewport width is less than or equal to `468px`, only the **Company name** is displayed.

#### Action column

In addition to the customer information, the table also shows an **Action** column (visible independent of the viewport), which allows you to view a customer's details.

When the user clicks on the view column of a customer's row, the **Contact details** are shown.

#### Empty state

If there are no customers in the database, the image of an empty box is shown. Below it, a paragraph is displayed with the following text: "No customers available."

#### Sorting

The table headings for **Number of employees** and **Size** are sortable. They can be sorted in ascending or descending order.

By default, it's sorted by **Size** in descending order (i.e., Very Large Enterprise, Large Enterprise, Enterprise, Medium, Small.)

When a column is being sorted by, it shows an up (&uarr;) or down arrow (&darr;), depending on whether sort by is ascending or descending.

When changing the sorting column, it defaults to the descending order.

#### Pagination

There's also pagination, where the default number of customers per page is 10, and it's possible to set a different limit, where the options are 5, 10, 20, or 50.

When changing the pagination limit (e.g., from 5 to 20), it resets to the page 1. This happens to avoid a page out of bounds error. The idea is as follows. Let's say there are 100 customers, and the pagination limit is set to 5. In this case, there would be 20 pages. Let's also imagine page 14 is being displayed, and the user sets the new pagination limit to 10. In such case, it resets to the page 1 (since page 14 wouldn't exist), and now, there are 10 pages.

The page limit is persisted in the local storage, and the last chosen one is kept in case of a page load.

#### Filtering

It's possible to apply a filter based on the customers' size. The available options are 'All', 'Small', 'Medium', 'Enterprise, 'Large Enterprise' and 'Very Large Enterprise'. 'All' is the default one.

##### Empty state per size

If there are no customers in the database for the filtered size, the image of an empty box is shown. Below it, a paragraph is displayed with the following text: "No customers available."

#### Downloading

It's possible to download the list of customers to a CSV file called `customers.csv`.

When clicking the Download CSV button, the downloaded file will respect the size filter and the customer limit per page.

The following fields are available at the file, in this exact order: ID, Company_Name, Number_of_Employees, Size, Contact_Name, Contact_Email, Street, City, State, Zip_Code, and Country.

For customers with no contact info or address, empty values should be available for such fields at the downloaded file.

The Download CSV button isn't displayed if there are no customers in the database.

### Contact details

When in the Contact details view, the text input field gets disabled (with or without a defined name.)

This view shows the customer details information (**Company ID**, **Company name**, **Number of employees**, and **Size**), besides the contact details (**Contact name** and **Contact e-mail**) of the person to be contacted.

When the customer doesn't have contact information, a paragraph is shown with the following text: **No contact info available**.

#### Show address

There's also the option to show the customer's address.

When clicking the Show address button, the customer's address is shown (**Street**, **City**, **State**, **Zip code**, and **Country**).

When the customer doesn't have an address, a paragraph is shown with the following text: **No address available**.

#### Back button

In this view, a **Back** button is presented, and when clicked, the user is taken back to **Customers table**.

### Messenger

Independent of the user's view (customers' table, contact details, or empty state), a chat bubble button appears at the bottom right of the screen.

When the chat bubble button is clicked, it opens the messenger form.

The for has a close button and three fields (Name, Email, and Message).
All fields are mandatory.

**Note:** The email field must be filled with an email with a valid email format.

After submitting the form with valid data, a success message is displayed for three seconds and then disappears.

The success message is: Your message has been sent.

When clicking the close button, the form is closed, and the chat bubble button is shown again.

### Accessibility (A11y)

The EngageSphere's front end was created with a11y in mind, so users should be able to navigate through it using the <kbd>TAB</kbd> keyboard key.

Also, screen readers should be able to read the relevant app's information so that users who need such assistive tools can use it.

Finally, the color contrast between text and backgrounds was thoroughly designed to be suitable for anyone reading it.

## API

The app backend offers one endpoint:

### GET /customers

This endpoint accepts three query parameters, as listed below.

#### Query parameters

- `page` (optional; current page - default is 1)
- `limit` (optional; number of customers to be shown per page - default is 10)
- `size` (optional; filter customers by size: 'Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise' - default is 'All')

Below is an example of how the request URL would look like if you wanted to retrieve ten medium customers from page two.

`http://localhost:3001/customers?page=2&limit=10&size=Medium`

#### Response body

If there are customers in the database, the following JSON structure should be returned after a successful request.

```json
{
  "customers": [
    {
      "id": 1,
      "name": "Thompson, Zboncak and Mueller",
      "employees": 850,
      "contactInfo": null,
      "size": "Medium",
      "address": {
        "street": "988 Kimberly Fort Apt. 921",
        "city": "Lake Tracy",
        "state": "Connecticut",
        "zipCode": "07115",
        "country": "United States of America"
      }
    },
    {
      "id": 2,
      "name": "Americas Inc.",
      "employees": 200,
      "contactInfo": {
        "name": "John Smith",
        "email": "jsmith@americasinc.com"
      },
      "size": "Medium",
      "address": {
        "street": "5099 Murray Inlet",
        "city": "South Tiffany",
        "state": "Kentucky",
        "zipCode": "08496",
        "country": "United States of America"
      }
    },
    ...
  ],
  "pageInfo": {
    "currentPage": 2,
    "totalPages": 20,
    "totalCustomers": 199
  }
}
```

**Notes:**

- The **contactInfo** and **address** value is `null` when the customer doesn't have contact or address information in the database;
- The `size` attribute in the response for each customer is dynamically determined based on the number of employees according to the specified criteria;
- Customer **size** is: **Small**, when **Number of employees** is less than 100; **Medium** when it is greater or equal to 100 and less than 1000; **Enterprise** when it is greater than or equal to 1000 and less than 10000; **Large Enterprise** when it is greater than or equal to 10000 and less than 50000; **Very Large Enterprise** otherwise;
- The API responds with a `400 Bad Request` status code for invalid request parameters, such as negative or non-number values for `page` or `limit`, or unsupported values for `size`.

### Swagger

The API also has a Swagger documentation, which can be accessed via the URL `http://localhost:3001/api-docs/`, as far as the backend server is up and running.

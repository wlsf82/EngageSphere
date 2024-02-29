# EngageSphere

The **EngageSphere** web application is aimed at our salespeople so they can access our customer's contact information.

## Graphical User Interface

As soon as the user access the application, he/she can type his/her name, which will show in the greeting (e.g., Hi Joe! It is now Fri Feb 23 2024.)

If no name is typed, a default greeting is shown instead (i.e., Hi there! ...)

If there are no customers in the database, the text input field gets disabled.

### Theme

The EngageSphere application offers two themes (light and dark.)

When in light mode, a half-moon is shown just below the application's heading, which allows switching to the dark mode.

When in dark mode, a sun is shown just below the application's heading, which allows switching to the light mode.

The CSS is adjusted to light or darkk mode depending on the selected theme.

The theme is persisted in the local storage, and the last chosen one is kept in case of a page load.

### Footer

Independent of the view, the application always shows a footer with the text "Copyright 2024 - Talking About Testing", and links to TAT's Udemy, Blog, and YouTube.

### Customers table

The customers table shows the list of registered customers in the database.

For each customer, the following information is displayed:

- **ID**
- **Company name**
- **Number of employees**
- **Size**: if **Number of employees** is less than or equal to 100, size is **Small**; if greater than 100 and less than or equal to 1000, **Medium**; otherwise, **Big**

When the user clicks on a customer's row, the **Contact details** are shown.

If there are no customers in the database, the image of an empty box is shown. Below it, a paragraph is displayed with the following text: "No customers available."

#### Sorting

The table headings for **Number of employees** and **Size** are sortable. They can be sorted in ascending or descending order.

By default, it's sorted by **Size** in descending order (i.e., Big, Medium, Small.)

When a column is being sorted by, it shows an up (&uarr;) or down arrow (&darr;), depending on whether sort by is ascending or descending.

When changing the sorting column, it defaults to the descending order.

#### Pagination

There's also pagination, where the default number of customers per page is 10, and it's possible to set a different limit, where the options are 5, 10, 20, or 50.

When changing the pagination limit (e.g., from 5 to 20), it resets to the page 1. This happens to avoid a page out of bounds error. The idea is as follows. Let's say there are 100 customers, and the pagination limit is set to 5. In this case, there would be 20 pages. Let's also imagine page 14 is being displayed, and the user sets the new pagination limit to 10. In such case, it resets to the page 1 (since page 14 wouldn't exist), and now, there are 10 pages.

The page limit is persisted in the local storage, and the last chosen one is kept in case of a page load.

#### Filtering

It's possible to apply a filter based on the customers' size. The available options are 'All', 'Small', 'Medium', and 'Big'. 'All' is the default one.

If there are no customers in the database for the filtered size, the image of an empty box is shown. Below it, a paragraph is displayed with the following text: "No customers available."

### Contact details

When in the Contact details view, the text input field gets disabled (with or without a defined name.)

This view shows the customer details information (**Company name**, **Number of employees**, and **Size**), besides the contact details (**Contact name** and **Contact e-mail**) of the person to be contacted.

When a customer doesn't have contact information, a paragraph is shown with the following text: **No contact info available**.

In this view, a **Back** button is presented, and when clicked, the user is taken back to **Customers table**.

## API

The app backend offers one endpoint:

### POST /customers

#### Request body

```json
{
    "page": "<current page>",
    "limit": "<number of customers to be shown per page>",
    "size": "<optional; filter customers by size: 'Small', 'Medium', 'Big'>"
}
```

#### Response body

```json
{
    "customers": [
        {
            "id": 1,
            "name": "Thompson, Zboncak and Mueller",
            "employees": 1125,
            "contactInfo": null,
            "size": "Big"
        },
        {
            "id": 2,
            "name": "Americas Inc.",
            "employees": 100,
            "contactInfo": {
                "name": "John Smith",
                "email": "jsmith@americasinc.com"
            },
            "size": "Small"
        },
        ...
    ],
    "pageInfo": {
        "currentPage": 1,
        "totalPages": 20,
        "totalCustomers": 199
    }
}
```

**Notes:**

- The **contactInfo** object is not returned when the customer doesn't have contact information in the database;
- The `size` attribute in the response for each customer is dynamically determined based on the number of employees according to the specified criteria;
- Customer **size** is: **Small**, when **Number of employees** is less than or equal to 100; **Medium** when it is greater than 100 and less than or equal to 1000; **Big** otherwise;
- The API responds with a `400 Bad Request` status code for invalid request parameters, such as negative values for `page` or `limit`, or unsupported values for `size`.

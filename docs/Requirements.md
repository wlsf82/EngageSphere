# EngageSphere

The **EngageSphere** web application is aimed at our salespeople so they can access our customer's contact information.

## Graphical User Interface

As soon as the user access the application, it can type his/her name, which will show in the greeting (e.g., Hi Joe! It is now Sat Feb 24 2024.)

If no name is typed, a default greeting is shown instead (i.e., Hi there! ...)

If there are no customers in the database, the text input field gets disabled.

### Customers list screen

This screen presents the list of all registered customers in the database. For each customer, the following info is displayed:

- **Company name**
- **Number of employees**
- **Size**: if **Number of employees** is less than or equal 100, size is **Small**; if greater than 100 and less than or equal 1000, **Medium**; otherwise, **Big**

The headings for **Number of employees** and **Size** are sortable. You can sort them in ascending or descending order.

By default, it's sorted by **Size** in descending order.

When a column is being sorted by, it shows an up (&uarr;) or down arrow (&darr;), depending on whether sort by is ascending or descending.

When changing the sorting column, it defaulcts to the descending order.

There's also pagination, where the default number of customers per page is ten, and it's possible to set a different limit, where the options are 5, 10, 20, or 50.

When changing the pagination limit (e.g., from 10 to 5), it resets to the page 1 to avoid a page out of bounds error. The idea is as follows. Let's say there are 10 pages, the pagination limit is set to 10, page 2 is being displayed, and the user sets the new pagination limit to 5. In such case, it resets to the page 1, and now, there are 20 pages.

When the user clicks on a customer name, the **Contact details screen** is shown.

### Contact details screen

When in the Contact details screen, the text input field gets disabled.

This screen shows the customers detailed info (**Company name**, **Number of employees**, and **Size**), besides the **Contact name** and **Contact e-mail** of the person to be contacted.

When a customer doesn't have contact info, a paragraph is shown with the following text: **No contact info available**.

A **Back** button is also presented, and when clicked, the user is taken back to **Customers list screen**.

### Footer

At the bottom of the page, there's a footer with the text "Copyright 2024 - Talking About Testing", and links to TAT's Udemy, Blog, and YouTube.

## API

The app backend offers one endpoint:

### POST /customers

#### Request body

```json
{
    "page": "<current page>",
    "limit": "<number of customers to be shown per page>"
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

- The **contactInfo** object is not returned when the customer doesn't have contact information in the database; and
- Customer **size** is: **Small**, when **Number of employees** is less than or equal to 100; **Medium** when it is greater than 100 and less than or equal to 1000; **Big** otherwise.

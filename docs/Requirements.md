# EngageSphere

The **EngageSphere** web application is aimed at our salespeople so they can access our customer's contact information.

## User-Interface

Its front-end is composed by the following screens.

### Welcome Screen

The Welcome Screen presents the user to a form where he/she can be identified. The form consists of:

- **Instructions** text: "Please provide your name:";
- A **text field** where the user will input his/her name; and
- A **Submit** button;

When the user fills in his/her name and click the button, the **Customer List Screen** is presented. If the user clicks the button leaving the text field blank, an error message is presented for three seconds with the text **Name is required!**

### Customer List Screen

This screen presents the list of all registered customers. For each customer, the following info is shown:

- **Name**
- **# of Employees**
- **Size**: if **# of Employees** is less than or equal 100, size is **Small**; if greater than 100 and less than or equal 1000, **Medium**; otherwise, **Big**

Each heading in the table is sortable. You can sort them in ascending or descending order.

By default, it's sorted by Name in ascending order.

When a column is being sorted by, it shows a blue border and an up or down arrow, depending on whether sort by is ascending or descending.

When the user clicks on a customer name, the **Contacts Detail Screen** is shown.

### Contacts Detail Screen

This screen shows the customers detailed info (Name, # of Employees, and Size) and also the name and e-mail of the person in the company to be contacted.

When a customer doesn't have contact info, the message **No contact info available** should be presented.

A **Back to the list** button is also presented. When it is clicked, the user is taken back to **Customer List Screen**.

## API

The app backend offers 1 endpoint:

### POST /

**Request Body**

```
{"name":"<name of the user>"}
```

**Response Body**

```json
{
    "name":"<name of the user>",
    "timestamp":"<timestamp of the request>",
    "customers":[
        {
            "id":<customer's id>,
            "name":"<customer's name>",
            "employees":<customer's number of employees>,
            "contactInfo":
            {
                "name":"<contact person's name>",
                "email":"<contact person's email>"
            },
            "size":"<company size>"
        },
        ...
    ]
}
```

**Notes:**

- the **contactInfo** object is not returned when the customer doesn't have contact information in our database; and
- customer **size** is: **Small**, when **# of employees** is <= 100; **Medium** when it is <= 1000; **Big** otherwise.

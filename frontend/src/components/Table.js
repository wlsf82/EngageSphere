const Table = ({
  customers,
  customerClickHandler,
  sortCriteria,
  sortOrder,
  sortNumberOfEmployessHandler,
  sortSizeHandler,
}) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Company name</th>
          <th onClick={sortNumberOfEmployessHandler}>
            <button onClick={sortNumberOfEmployessHandler}>
              Number of employees {sortCriteria === 'employees' && (sortOrder === 'asc' ? <span aria-label="up arrow">&uarr;</span> : <span aria-label="down arrow">&darr;</span>)}
            </button>
          </th>
          <th onClick={sortSizeHandler}>
            <button onClick={sortSizeHandler}>
              Size {sortCriteria === 'size' && (sortOrder === 'asc' ? <span aria-label="up arrow">&uarr;</span> : <span aria-label="down arrow">&darr;</span>)}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id} onClick={() => customerClickHandler(customer)}>
            <td>
              <button key={customer.id} onClick={() => customerClickHandler(customer)}>
                {customer.id}
              </button>
            </td>
            <td>
              <button key={customer.id} onClick={() => customerClickHandler(customer)}>
                {customer.name}
              </button>
            </td>
            <td>
              <button key={customer.id} onClick={() => customerClickHandler(customer)}>
                {customer.employees}
              </button>
            </td>
            <td>
              <button key={customer.id} onClick={() => customerClickHandler(customer)}>
                {customer.size}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table

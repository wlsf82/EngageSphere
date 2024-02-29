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
            Number of employees {sortCriteria === 'employees' && (sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>)}
          </th>
          <th onClick={sortSizeHandler}>
            Size {sortCriteria === 'size' && (sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>)}
          </th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id} onClick={() => customerClickHandler(customer)}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.employees}</td>
            <td>{customer.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table

import { useEffect, useState, useRef } from 'react'

const serverPort = 3001
const serverURL = `http://localhost:${serverPort}`

const CustomerApp = () => {
  const [name, setName] = useState('')
  const [timestamp, setTimestamp] = useState(null)
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState(null)
  const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, totalPages: 1 })

  const [sortCriteria, setSortCriteria] = useState('size')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)

  const nameInputRef = useRef(null)

  useEffect(() => {
    getCustomers(currentPage)
  }, [currentPage])

  const selectCustomer = (customer) => {
    setCustomer(customer)
  }

  async function getCustomers(page) {
    try {
      const response = await fetch(`${serverURL}/customers`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page, limit: 10 })
      })
      const jsonResponse = await response.json()
      const { timestamp, customers, pageInfo } = jsonResponse

      setTimestamp(timestamp)
      setCustomers(customers)
      setPaginationInfo({ currentPage: pageInfo.currentPage, totalPages: pageInfo.totalPages })
    } catch (error) {
      console.error(error)
    }
  }

  const sortCustomers = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortOrder('desc')
    }
    setSortCriteria(criteria)
  }

  const sortedCustomers = [...customers].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1
    if (sortCriteria === 'size') {
      const mapSizeToNumber = (size) => {
        switch (size.toLowerCase()) {
          case 'small': return 1
          case 'medium': return 2
          case 'big': return 3
          default: return 0
        }
      }
      return order * (mapSizeToNumber(a[sortCriteria]) - mapSizeToNumber(b[sortCriteria]))
    }
    return order * (a[sortCriteria] - b[sortCriteria])
  })

  return (
    <div className="container">
      <div className="header-container">
        <h1>EngageSphere</h1>
      </div>
      <div className="input-container">
        <input
          autoFocus
          type="text"
          id="name"
          data-testid="name"
          ref={nameInputRef}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {customer ? (
        <div className="customer-details">
          <h2>Customer Details</h2>
          <p><strong>Company name:</strong> {customer.name}</p>
          <p><strong>Number of employees:</strong> {customer.employees}</p>
          <p><strong>Size:</strong> {customer.size}</p>
          {customer.contactInfo ? (
            <>
              <p><strong>Contact name:</strong> {customer.contactInfo.name}</p>
              <p><strong>Contact email:</strong> {customer.contactInfo.email}</p>
            </>
          ) : (
            <p>No contact info available</p>
          )}
          <div className="button-container">
            <button onClick={() => setCustomer(null)}>Back to List</button>
          </div>
        </div>
      ) : (
        <div data-testid="table" className="table-container">
          <p>Hi <b>{name ? name : 'there'}</b>! It is now <b>{timestamp}</b>.</p>
          <div>
            <p>Below is our customer list.</p>
            <p>Click on each of them to view their contact details.</p>
            <table border="1">
              <thead>
                <tr>
                  <th>Company name</th>
                  <th onClick={() => sortCustomers('employees')}>
                    Number of employees {sortCriteria === 'employees' && (sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>)}
                  </th>
                  <th onClick={() => sortCustomers('size')}>
                    Size {sortCriteria === 'size' && (sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.map((customer) => (
                  <tr key={customer.id} onClick={() => selectCustomer(customer)}>
                    <td>{customer.name}</td>
                    <td>{customer.employees}</td>
                    <td>{customer.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div data-testid="pagination" className="pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
              <span>Page {currentPage} of {paginationInfo.totalPages}</span>
              <button onClick={() => setCurrentPage(prev => (prev < paginationInfo.totalPages ? prev + 1 : prev))} disabled={currentPage === paginationInfo.totalPages}>Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const App = () => (
  <div>
    <CustomerApp />
  </div>
)

export default App

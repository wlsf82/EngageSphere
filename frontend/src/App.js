import { useEffect, useState } from 'react'

const serverPort = 3001
const serverURL = `http://localhost:${serverPort}`

const CustomerApp = () => {
  const [name, setName] = useState('')
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState(null)

  const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, totalPages: 1 })
  const [currentPage, setCurrentPage] = useState(1)

  const [sortCriteria, setSortCriteria] = useState('size')
  const [sortOrder, setSortOrder] = useState('desc')

  const [initialFetchDone, setInitialFetchDone] = useState(false)

  useEffect(() => {
    getCustomers(currentPage)
  }, [currentPage])

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
      const { customers, pageInfo } = jsonResponse

      setCustomers(customers)
      setPaginationInfo({ currentPage: pageInfo.currentPage, totalPages: pageInfo.totalPages })
    } catch (error) {
      console.error(error)
    } finally {
      setInitialFetchDone(true)
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
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          disabled={customer || !customers.length ? true : false}
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
            <button onClick={() => setCustomer(null)}>Back</button>
          </div>
        </div>
      ) : (
        <div data-testid="table" className="table-container">
          {initialFetchDone && !customers.length ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <div className="no-customers-available-text">
                <span>No customers available.</span>
              </div>
            </>
          ) : customers.length > 0 ? (
            <>
              <p>Hi <b>{name ? name : 'there'}</b>! It is now <b>{(new Date()).toDateString()}</b>.</p>
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
                      <tr key={customer.id} onClick={() => setCustomer(customer)}>
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
            </>
          ) : null}
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

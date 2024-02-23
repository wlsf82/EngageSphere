import { useState, useRef } from 'react'

const serverPort = 3001 
const serverURL = `http://localhost:${serverPort}/`

const CustomerApp = () => {
  const [name, setName] = useState(null)
  const [timestamp, setTimestamp] = useState(null)
  const [customers, setCustomers] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [error, setError] = useState(null)

  const [sortCriteria, setSortCriteria] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' for ascending, 'desc' for descending

  const nameInputRef = useRef(null)

  function getCustomer(customer) {
    setCustomer(customer)
  }

  async function getCustomers() {
    if(!nameInputRef.current.value){
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000)
      return nameInputRef.current.focus()
    }

    try {
      setError(false)

      const response = await fetch(serverURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nameInputRef.current.value })
      })
      const jsonResponse = await response.json()
      const { name, timestamp, customers } = jsonResponse

      setName(name)
      setTimestamp(timestamp)
      setCustomers(customers)
    } catch (error) {
      console.error(error)
    }
  }

  function sortCustomers(criteria) {
    if (sortCriteria === criteria) {
      // If the same criteria is clicked again, reverse the order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // If a new criteria is clicked, set the new criteria and default to ascending order
      setSortCriteria(criteria)
      setSortOrder('asc')
    }
  }

  function mapSizeToNumber(size) {
    switch (size.toLowerCase()) {
      case 'small':
        return 1
      case 'medium':
        return 2
      case 'big':
        return 3
      default:
        return 0 // Default to 0 for unknown sizes
    }
  }

  return (
    <div className="container">
      <div className="header-container">
        <h1>EngageSphere</h1>
      </div>
      { !name &&
        <div className="form-container">
          <div className={`error ${error ? 'visible' : ''}`}>
            <span>Name is required!</span>
          </div>
          <p>Please provide your name:</p>
          <div className="input-container">
            <input
              autoFocus
              type="text"
              id="name"
              data-testid="name"
              ref={nameInputRef}
            />
            <input
              type="button"
              value="Submit"
              data-testid="submit-btn"
              onClick={getCustomers}
            />
          </div>
        </div>
      }
      { name && 
        <div className="table-container">
          <p>Hi <b>{ name }</b>. It is now <b>{ timestamp }</b>.</p>
          { !customer &&
          <div>
            <p>Below is our customer list.</p>
            <p>Click on each of them to view their contact details.</p>
            <table border='1'>
            <thead>
            <tr>
              <th onClick={() => sortCustomers('name')} className={sortCriteria === 'name' ? 'active' : ''}>
                Name {sortCriteria === 'name' && sortOrder === 'asc' ? <span>&uarr;</span> : sortCriteria === 'name' && sortOrder === 'desc' ? <span>&darr;</span> : null}
              </th>
              <th onClick={() => sortCustomers('employees')} className={sortCriteria === 'employees' ? 'active' : ''}>
                Number of employees {sortCriteria === 'employees' ? <span>{sortOrder === 'asc' ? '\u2191' : '\u2193'}</span> : null}
              </th>
              <th onClick={() => sortCustomers('size')} className={sortCriteria === 'size' ? 'active' : ''}>
                Size {sortCriteria === 'size' ? <span>{sortOrder === 'asc' ? '\u2191' : '\u2193'}</span> : null}
              </th>
              </tr>
              </thead>
              <tbody>
              { [...customers].sort((a, b) => {
                  const order = sortOrder === 'asc' ? 1 : -1
                  if (sortCriteria) {
                    const aValue = sortCriteria === 'size' ? mapSizeToNumber(a[sortCriteria]) : a[sortCriteria]
                    const bValue = sortCriteria === 'size' ? mapSizeToNumber(b[sortCriteria]) : b[sortCriteria]

                    return sortCriteria === 'name'
                      ? order * a[sortCriteria].localeCompare(b[sortCriteria])
                      : order * (aValue - bValue)
                  }
                }).map(customer => (
                  <tr key={customer.id}>
                    <td><a href='#' onClick={() => getCustomer(customer)}>{customer.name}</a></td>
                    <td>{customer.employees}</td>
                    <td>{customer.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          }
          { customer &&
            <div className='customer-details'>
              <p><b><em>Customer Details</em></b></p>
              <p><b>Name:</b> { customer.name }</p>
              <p><b>Number of Employees:</b> { customer.employees }</p>
              <p><b>Size:</b> { customer.size }</p>
              { customer.contactInfo ?
                <p><b>Contact:</b> {customer.contactInfo.name} ({ customer.contactInfo.email })</p> :
                <p>No contact info available</p>
              }
              <input type='button' value='Back to the list' onClick={ () => setCustomer(null) }/>
            </div>
          }
        </div>
      }
    </div>
  )
}

const App = () => (
  <div>
    <CustomerApp/>
  </div>
)

export default App

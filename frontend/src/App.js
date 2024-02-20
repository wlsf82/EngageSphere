import { useState, useRef } from 'react'

const serverPort = 3001 
const serverURL = `http://localhost:${serverPort}/`

const CustomerApp = () => {
  const [name, setName] = useState(null)
  const [timestamp, setTimestamp] = useState(null)
  const [customers, setCustomers] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [error, setError] = useState(null)

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

  return (
    <div>
      {
        error &&
        <div className='error'>
          <span>Name is required!</span>
        </div>
      }
      { !name &&
        <div>
          <p>Please provide your name:</p>
          <input autoFocus type='text' id='name' data-testid='name' ref={ nameInputRef } />
          <input type='button' value='Submit' data-testid='submit-btn' onClick={ getCustomers }/>
        </div>
      }
      { name && 
        <div>
          <p>Hi <b>{ name }</b>. It is now <b>{ timestamp }</b> and here is our customer list.</p>
          { !customer &&
          <div>
            <p>Click on each of them to view their contact details.</p>
            <table border='1'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th># of employees</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                { customers.map(customer => 
                  <tr key={ customer.id }>
                    <td><a href='#' onClick={ () => getCustomer(customer) }>{ customer.name }</a></td>
                    <td>{ customer.employees }</td>
                    <td>{ customer.size }</td>
                  </tr>  
                )}
              </tbody>
            </table>
          </div>
          }
          { customer &&
            <div>
              <hr></hr>
              <p><b><em>Customer Details</em></b></p>
              <p><b>Name:</b> { customer.name }</p>
              <p><b># of Employees:</b> { customer.employees }</p>
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
    <h1>EngageSphere</h1>
    <CustomerApp/>
  </div>
)

export default App

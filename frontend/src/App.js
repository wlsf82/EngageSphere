import { useEffect, useState } from 'react'

import CustomerDetails from './components/CustomerDetails'
import Greeting from './components/Greeting'
import EmptyState from './components/EmptyState'
import Input from './components/Input'
import Header from './components/Header'
import Pagination from './components/Pagination'
import SizeFilter from './components/SizeFilter'
import Table from './components/Table'
import Footer from './components/Footer'

const serverPort = 3001
const serverURL = process.env.REACT_APP_HEROKU_API_URL || `http://localhost:${serverPort}`

const App = () => {
  const [name, setName] = useState('')
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState(null)

  const [paginationInfo, setPaginationInfo] = useState(() => ({
    totalPages: 1,
    limit: parseInt(localStorage.getItem('paginationLimit'), 10) || 10,
  }))
  const [currentPage, setCurrentPage] = useState(1)

  const [initialFetchDone, setInitialFetchDone] = useState(false)

  const [sizeFilter, setSizeFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem('paginationLimit', paginationInfo.limit.toString())
  }, [paginationInfo.limit])

  useEffect(() => {
    getCustomers(currentPage, paginationInfo.limit, sizeFilter)
  }, [currentPage, paginationInfo.limit, sizeFilter])

  async function getCustomers(page, limit, sizeFilter) {
    try {
      const response = await fetch(`${serverURL}/customers?page=${page}&limit=${limit}&size=${sizeFilter}`, { method: 'GET' })
      const jsonResponse = await response.json()
      const { customers, pageInfo } = jsonResponse

      setCustomers(customers)
      setPaginationInfo(prevState => ({ ...prevState, totalPages: pageInfo.totalPages }))
    } catch (error) {
      console.error(error)
    } finally {
      setInitialFetchDone(true)
    }
  }

  const handleInputChange = (event) => setName(event.target.value)

  const customerClickHandler = (customer) => setCustomer(customer)
  const handleCustomerDetailsBackButtonClick = () => setCustomer(null)

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10)
    setPaginationInfo(prevState => ({ ...prevState, limit: newLimit }))
    setCurrentPage(1)
  }

  const handlePaginationPrevClick = () =>
    setCurrentPage(prev => Math.max(prev - 1, 1))
  const handlePaginationNextClick = () =>
    setCurrentPage(prev => (prev < paginationInfo.totalPages ? prev + 1 : prev))

  const handleFilterChange = (event) => {
    setSizeFilter(event.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <main className="container">
        <Header />
        <Input customer={customer} customers={customers} onChange={handleInputChange} />
        {customer ? (
          <CustomerDetails customer={customer} onClick={handleCustomerDetailsBackButtonClick} />
        ) : (
          <>
            <SizeFilter sizeFilter={sizeFilter} onChange={handleFilterChange} />
            <div data-testid="table" className="table-container">
              {initialFetchDone ? (
                customers.length ? (
                  <>
                    <Greeting name={name} />
                    <Table
                      customers={customers}
                      customerClickHandler={customerClickHandler}
                    />
                    <Pagination
                      currentPage={currentPage}
                      paginationInfo={paginationInfo}
                      onClickPrev={handlePaginationPrevClick}
                      onClickNext={handlePaginationNextClick}
                      onChange={handleLimitChange}
                    />
                  </>
                ) : (
                  <EmptyState />
                )
              ) : <p id="loading">Loading...</p>}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App

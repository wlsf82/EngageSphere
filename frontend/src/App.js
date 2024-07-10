import { useEffect, useState } from 'react'

import CustomerDetails from './components/CustomerDetails'
import Greeting from './components/Greeting'
import EmptyState from './components/EmptyState'
import Input from './components/Input'
import Header from './components/Header'
import Pagination from './components/Pagination'
import DownloadCSV from './components/DownloadCSV'
import SizeFilter from './components/SizeFilter'
import Table from './components/Table'
import Footer from './components/Footer'

const serverPort = 3001
const serverURL = process.env.REACT_APP_HEROKU_API_URL || `http://localhost:${serverPort}`

const App = () => {
  const [name, setName] = useState('')
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState(null)
  const [inputDisabled, setInputDisabled] = useState(false)

  const [sizeFilter, setSizeFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationInfo, setPaginationInfo] = useState(() => ({
    totalPages: 1,
    limit: parseInt(localStorage.getItem('paginationLimit'), 10) || 10,
  }))

  const [initialFetchDone, setInitialFetchDone] = useState(false)

  useEffect(() => {
    localStorage.setItem('paginationLimit', paginationInfo.limit.toString())
  }, [paginationInfo.limit])

  useEffect(() => {
    getCustomers(currentPage, paginationInfo.limit, sizeFilter)
  }, [currentPage, paginationInfo.limit, sizeFilter])

  useEffect(() => {
    if (initialFetchDone && customers.length === 0) {
      setInputDisabled(true)
    }
  }, [initialFetchDone, customers])

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

  const inputChangeHandler = event => setName(event.target.value)

  const customerClickHandler = customer => {
    setCustomer(customer)
    setInputDisabled(true)
  }
  const customerDetailsBackButtonClickHandler = () => {
    setCustomer(null)
    setInputDisabled(false)
  }

  const limitChangeHandler = event => {
    const newLimit = parseInt(event.target.value, 10)
    setPaginationInfo(prevState => ({ ...prevState, limit: newLimit }))
    setCurrentPage(1)
  }

  const paginationPrevClickHandler = () =>
    setCurrentPage(prev => Math.max(prev - 1, 1))
  const paginationNextClickHandler = () =>
    setCurrentPage(prev => (prev < paginationInfo.totalPages ? prev + 1 : prev))

  const filterChangeHandler = event => {
    setSizeFilter(event.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <main className="container">
        <Header />
        <Input disabled={inputDisabled} onChange={inputChangeHandler} />
        {customer ? (
          <CustomerDetails customer={customer} onClick={customerDetailsBackButtonClickHandler} />
        ) : (
          <>
            <SizeFilter size={sizeFilter} onChange={filterChangeHandler} />
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
                      onClickPrev={paginationPrevClickHandler}
                      onClickNext={paginationNextClickHandler}
                      onChange={limitChangeHandler}
                    />
                    <div className="download-csv-button-container">
                      <DownloadCSV customers={customers} />
                    </div>
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
